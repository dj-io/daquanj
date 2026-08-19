'use client'

import {
	CartesianGrid,
	ComposedChart,
	Legend,
	Line,
	ResponsiveContainer,
	Scatter,
	Tooltip,
	XAxis,
	YAxis,
	BarChart,
	Bar,
} from 'recharts'
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

const ACCENT = 'var(--blog-accent)'
const MUTED = 'color-mix(in oklch, var(--foreground) 35%, transparent)'
const GRID = 'color-mix(in oklch, var(--foreground) 12%, transparent)'

function axis(value: unknown): EncodingAxis {
	if (!value || typeof value !== 'object') return {}
	return value as EncodingAxis
}

function toNumber(value: unknown) {
	return typeof value === 'number' ? value : Number(value)
}

export function ChartFigure({ spec }: ChartFigureProps) {
	const type = asString(spec.type) ?? 'multi-line'
	const title = asString(spec.title)
	const height = typeof spec.height === 'number' ? spec.height : 400
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
	const seriesNames = seriesField
		? [...new Set(data.map((row) => String(row[seriesField] ?? '')))]
		: ['series']

	const colors = seriesNames.map((name, index) => {
		return style.seriesColors?.[name] ?? (index === 0 ? ACCENT : MUTED)
	})

	const showLegend = style.showLegend ?? seriesNames.length > 1

	return (
		<div className="space-y-3">
			{title ? <h3 className="text-base text-foreground">{title}</h3> : null}
			<div className="relative" style={{ height }}>
				{axisHints.y ? (
					<p className="absolute left-0 top-0 text-xs text-blog-accent">{axisHints.y === 'better' ? '↑ better' : axisHints.y}</p>
				) : null}
				{axisHints.x ? (
					<p className="absolute right-0 bottom-8 text-xs text-blog-accent">
						{axisHints.x === 'slower' ? 'slower →' : `${axisHints.x} →`}
					</p>
				) : null}
				<ResponsiveContainer width="100%" height="100%">
					{type === 'bar' ? (
						<BarChart data={data} margin={{ top: 16, right: 12, left: 8, bottom: 8 }}>
							<CartesianGrid stroke={GRID} strokeDasharray="3 6" />
							<XAxis dataKey={xField} stroke={MUTED} tick={{ fill: MUTED, fontSize: 12 }} label={x.label ? { value: x.label, position: 'bottom', offset: 0 } : undefined} />
							<YAxis stroke={MUTED} tick={{ fill: MUTED, fontSize: 12 }} domain={y.domain} ticks={y.ticks} label={y.label ? { value: y.label, angle: -90, position: 'insideLeft' } : undefined} />
							<Tooltip />
							{showLegend ? <Legend /> : null}
							{seriesNames.map((name, index) => (
								<Bar
									key={name}
									dataKey={yField}
									name={name}
									fill={colors[index]}
									{...(seriesField ? { data: data.filter((row) => String(row[seriesField]) === name) } : {})}
								/>
							))}
						</BarChart>
					) : (
						<ComposedChart data={data} margin={{ top: 16, right: 12, left: 8, bottom: 8 }}>
							<CartesianGrid stroke={GRID} strokeDasharray="3 6" />
							<XAxis
								dataKey={xField}
								type="number"
								stroke={MUTED}
								tick={{ fill: MUTED, fontSize: 12 }}
								domain={x.domain ?? ['auto', 'auto']}
								ticks={x.ticks}
								label={x.label ? { value: x.label, position: 'bottom', offset: 0 } : undefined}
							/>
							<YAxis
								stroke={MUTED}
								tick={{ fill: MUTED, fontSize: 12 }}
								domain={y.domain ?? ['auto', 'auto']}
								ticks={y.ticks}
								label={y.label ? { value: y.label, angle: -90, position: 'insideLeft' } : undefined}
							/>
							<Tooltip />
							{showLegend ? <Legend /> : null}
							{seriesNames.map((name, index) => {
								const seriesData = seriesField
									? data.filter((row) => String(row[seriesField]) === name)
									: data
								if (type === 'scatter') {
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
										data={seriesData}
										dataKey={yField}
										name={name}
										stroke={colors[index]}
										dot={{ r: 3, fill: colors[index] }}
										strokeWidth={name.toLowerCase().includes('portal') || index === 0 ? 2 : 1.5}
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
										stroke={overlay.color ?? ACCENT}
										strokeDasharray={overlay.dashed ? '5 6' : undefined}
										dot={false}
										legendType="line"
									/>
								)
							})}
						</ComposedChart>
					)}
				</ResponsiveContainer>
			</div>
		</div>
	)
}
