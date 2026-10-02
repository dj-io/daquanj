'use client'

import {
	Bar,
	BarChart,
	CartesianGrid,
	ComposedChart,
	Line,
	Scatter,
	XAxis,
	YAxis,
} from 'recharts'
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from '@/components/ui/chart'
import { asString } from '@/lib/blog-figures'

type EncodingAxis = {
	field?: string
	label?: string
	domain?: number[]
	ticks?: number[]
}

type Overlay = {
	type?: string
	label?: string
	color?: string
	dashed?: boolean
	points?: { x: number; y: number }[]
}

type ChartFigureProps = {
	spec: Record<string, unknown>
}

const FALLBACK_COLORS = [
	'var(--chart-1)',
	'var(--chart-2)',
	'var(--chart-3)',
	'var(--chart-4)',
	'var(--chart-5)',
]
const MUTED = 'color-mix(in oklch, var(--foreground) 35%, transparent)'
const GRID = 'color-mix(in oklch, var(--foreground) 12%, transparent)'

function axis(value: unknown): EncodingAxis {
	if (!value || typeof value !== 'object') return {}
	return value as EncodingAxis
}

function toNumber(value: unknown) {
	return typeof value === 'number' ? value : Number(value)
}

function isNumeric(value: unknown) {
	return typeof value === 'number' || (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value)))
}

function pivotSeries(
	data: Record<string, unknown>[],
	xField: string,
	yField: string,
	seriesField?: string,
) {
	if (!seriesField) {
		return { rows: data, seriesNames: [yField] }
	}

	const seriesNames = [...new Set(data.map((row) => String(row[seriesField] ?? '')))]
	const rowsByX = new Map<string, Record<string, unknown>>()

	for (const row of data) {
		const x = row[xField]
		const key = String(x)
		const current = rowsByX.get(key) ?? { [xField]: x }
		current[String(row[seriesField])] = row[yField]
		rowsByX.set(key, current)
	}

	return { rows: [...rowsByX.values()], seriesNames }
}

export function ChartFigure({ spec }: ChartFigureProps) {
	const type = asString(spec.type) ?? 'multi-line'
	const title = asString(spec.title)
	const height = typeof spec.height === 'number' ? spec.height : 340
	const data = Array.isArray(spec.data) ? (spec.data as Record<string, unknown>[]) : []
	const encoding = (spec.encoding ?? {}) as {
		x?: unknown
		y?: unknown
		series?: { field?: string; legend?: string }
	}
	const x = axis(encoding.x)
	const y = axis(encoding.y)
	const seriesField = encoding.series?.field
	const style = (spec.style ?? {}) as {
		seriesColors?: Record<string, string>
		showLegend?: boolean
	}
	const axisHints = (spec.axisHints ?? {}) as { x?: string; y?: string }
	const overlays = Array.isArray(spec.overlays) ? (spec.overlays as Overlay[]) : []

	const xField = x.field ?? 'x'
	const yField = y.field ?? 'y'
	const { rows, seriesNames } = pivotSeries(data, xField, yField, seriesField)
	const numericX = rows.length > 0 && rows.every((row) => isNumeric(row[xField]))
	const showLegend = style.showLegend ?? seriesNames.length > 1

	const colors = seriesNames.map((name, index) => {
		return style.seriesColors?.[name] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length]
	})

	const chartConfig = Object.fromEntries(
		seriesNames.map((name, index) => [name, { label: name, color: colors[index] }]),
	) satisfies ChartConfig

	const xAxisLabel = x.label
		? { value: x.label, position: 'insideBottom' as const, offset: -8, fill: MUTED, fontSize: 12 }
		: undefined
	const yAxisLabel = y.label
		? { value: y.label, angle: -90, position: 'insideLeft' as const, fill: MUTED, fontSize: 12 }
		: undefined

	const plot =
		type === 'bar' ? (
			<BarChart data={rows} margin={{ top: 16, right: 8, left: 4, bottom: 24 }}>
				<CartesianGrid stroke={GRID} strokeDasharray="3 6" vertical={false} />
				<XAxis dataKey={xField} stroke={MUTED} tick={{ fill: MUTED, fontSize: 12 }} label={xAxisLabel} />
				<YAxis
					stroke={MUTED}
					tick={{ fill: MUTED, fontSize: 12 }}
					domain={y.domain}
					ticks={y.ticks}
					label={yAxisLabel}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				{showLegend ? <ChartLegend content={<ChartLegendContent />} /> : null}
				{seriesNames.map((name, index) => (
					<Bar
						key={name}
						dataKey={seriesField ? name : yField}
						name={name}
						fill={colors[index]}
						radius={[3, 3, 0, 0]}
						maxBarSize={48}
					/>
				))}
			</BarChart>
		) : (
			<ComposedChart data={rows} margin={{ top: 16, right: 8, left: 4, bottom: 24 }}>
				<CartesianGrid stroke={GRID} strokeDasharray="3 6" />
				<XAxis
					dataKey={xField}
					type={numericX ? 'number' : 'category'}
					stroke={MUTED}
					tick={{ fill: MUTED, fontSize: 12 }}
					domain={numericX ? (x.domain ?? ['auto', 'auto']) : undefined}
					ticks={x.ticks}
					label={xAxisLabel}
				/>
				<YAxis
					stroke={MUTED}
					tick={{ fill: MUTED, fontSize: 12 }}
					domain={y.domain ?? ['auto', 'auto']}
					ticks={y.ticks}
					label={yAxisLabel}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				{showLegend ? <ChartLegend content={<ChartLegendContent />} /> : null}
				{seriesNames.map((name, index) => {
					const dataKey = seriesField ? name : yField
					if (type === 'scatter') {
						const seriesData = seriesField
							? data.filter((row) => String(row[seriesField]) === name)
							: data
						return (
							<Scatter
								key={name}
								name={name}
								data={seriesData.map((row) => ({
									[xField]: toNumber(row[xField]),
									[yField]: toNumber(row[yField]),
								}))}
								fill={colors[index]}
							/>
						)
					}
					return (
						<Line
							key={name}
							type="monotone"
							dataKey={dataKey}
							name={name}
							stroke={colors[index]}
							dot={{ r: 3, fill: colors[index] }}
							strokeWidth={index === 0 ? 2.25 : 1.75}
							connectNulls
						/>
					)
				})}
				{overlays.map((overlay, index) => {
					if (overlay.type !== 'line' || !overlay.points?.length) return null
					return (
						<Line
							key={overlay.label ?? index}
							type="monotone"
							data={overlay.points}
							dataKey="y"
							name={overlay.label}
							stroke={overlay.color ?? 'var(--chart-1)'}
							strokeDasharray={overlay.dashed ? '5 6' : undefined}
							dot={false}
							legendType="line"
						/>
					)
				})}
			</ComposedChart>
		)

	return (
		<div className="space-y-3">
			{title ? <h3 className="text-base text-foreground">{title}</h3> : null}
			<div className="relative" style={{ height }}>
				{axisHints.y ? (
					<p className="absolute left-0 top-0 z-10 text-xs text-blog-accent">
						{axisHints.y === 'better' ? '↑ better' : axisHints.y}
					</p>
				) : null}
				{axisHints.x ? (
					<p className="absolute right-0 bottom-8 z-10 text-xs text-blog-accent">
						{axisHints.x === 'slower' ? 'slower →' : `${axisHints.x} →`}
					</p>
				) : null}
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-full w-full"
					initialDimension={{ width: 640, height }}
				>
					{plot}
				</ChartContainer>
			</div>
		</div>
	)
}
