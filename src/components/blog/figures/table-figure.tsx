'use client'

import { useMemo, useState } from 'react'
import { asBoolean, asString } from '@/lib/blog-figures'
import { cn } from '@/lib/utils'

type Column = {
	key: string
	label?: string
	align?: 'left' | 'right' | 'center'
	monospace?: boolean
}

type Row = {
	cells?: Record<string, string>
	highlight?: boolean
}

type TableFigureProps = {
	spec: Record<string, unknown>
}

function readColumns(spec: Record<string, unknown>): Column[] {
	if (!Array.isArray(spec.columns)) return []
	return spec.columns.flatMap((column) => {
		if (!column || typeof column !== 'object') return []
		const record = column as Record<string, unknown>
		const key = asString(record.key)
		if (!key) return []
		const align = asString(record.align)
		return [
			{
				key,
				label: asString(record.label) ?? key,
				align: align === 'right' || align === 'center' ? align : 'left',
				monospace: asBoolean(record.monospace),
			},
		]
	})
}

function readRows(spec: Record<string, unknown>): Row[] {
	if (!Array.isArray(spec.rows)) return []
	return spec.rows.flatMap((row) => {
		if (!row || typeof row !== 'object') return []
		const record = row as Record<string, unknown>
		const cells =
			record.cells && typeof record.cells === 'object' && !Array.isArray(record.cells)
				? (record.cells as Record<string, string>)
				: {}
		return [{ cells, highlight: Boolean(record.highlight) }]
	})
}

export function TableFigure({ spec }: TableFigureProps) {
	const title = asString(spec.title)
	const sortable = asBoolean(spec.sortable) ?? false
	const columns = readColumns(spec)
	const rows = readRows(spec)
	const [sortKey, setSortKey] = useState<string | null>(null)
	const [direction, setDirection] = useState<'asc' | 'desc'>('asc')

	const sortedRows = useMemo(() => {
		if (!sortKey) return rows
		return [...rows].sort((left, right) => {
			const a = left.cells?.[sortKey] ?? ''
			const b = right.cells?.[sortKey] ?? ''
			return direction === 'asc' ? a.localeCompare(b, undefined, { numeric: true }) : b.localeCompare(a, undefined, { numeric: true })
		})
	}, [direction, rows, sortKey])

	function toggleSort(key: string) {
		if (!sortable) return
		if (sortKey === key) {
			setDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
			return
		}
		setSortKey(key)
		setDirection('asc')
	}

	return (
		<div className="space-y-3">
			{title ? <h3 className="text-base text-foreground">{title}</h3> : null}
			<div className="overflow-x-auto rounded-lg border border-border">
				<table className="w-full text-left text-sm">
					<thead className="bg-muted/60">
						<tr>
							{columns.map((column) => (
								<th
									key={column.key}
									className={cn(
										'border-b border-border px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-wider text-muted-foreground',
										column.align === 'right' && 'text-right',
										column.align === 'center' && 'text-center',
									)}
								>
									{sortable ? (
										<button
											type="button"
											onClick={() => toggleSort(column.key)}
											className="inline-flex items-center gap-1 uppercase tracking-wider"
										>
											{column.label}
											<span aria-hidden>{sortKey === column.key ? (direction === 'asc' ? '↑' : '↓') : '↕'}</span>
										</button>
									) : (
										column.label
									)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{sortedRows.map((row, index) => (
							<tr key={index} data-featured={row.highlight ? '' : undefined}>
								{columns.map((column) => (
									<td
										key={column.key}
										className={cn(
											'border-b border-border/60 px-4 py-3 text-muted-foreground last:border-b-0',
											column.align === 'right' && 'text-right',
											column.align === 'center' && 'text-center',
											column.monospace && 'font-mono tabular-nums',
											row.highlight && 'bg-[color-mix(in_oklch,var(--blog-accent)_9%,var(--card))] text-foreground shadow-[inset_3px_0_0_var(--blog-accent)]',
										)}
									>
										{row.cells?.[column.key] ?? ''}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
