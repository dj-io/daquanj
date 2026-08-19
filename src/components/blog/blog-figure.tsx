import type { ReactNode } from 'react'
import type { FigureRecord } from '@/lib/blog-figures'
import { AlgorithmFigure } from '@/components/blog/figures/algorithm-figure'
import { ChartFigure } from '@/components/blog/figures/chart-figure'
import { ImageFigure } from '@/components/blog/figures/image-figure'
import { StatGridFigure } from '@/components/blog/figures/stat-grid-figure'
import { TableFigure } from '@/components/blog/figures/table-figure'

type BlogFigureProps = {
	id: string
	record?: FigureRecord
	caption?: ReactNode
	priority?: boolean
}

function FigureViz({
	record,
	priority,
}: {
	record: FigureRecord
	priority?: boolean
}) {
	switch (record.kind) {
		case 'image':
			return <ImageFigure spec={record.spec} priority={priority} />
		case 'chart':
			return <ChartFigure spec={record.spec} />
		case 'table':
			return <TableFigure spec={record.spec} />
		case 'algorithm':
			return <AlgorithmFigure spec={record.spec} />
		case 'stat-grid':
			return <StatGridFigure spec={record.spec} />
		default:
			throw new Error(`Unsupported figure kind "${String((record as FigureRecord).kind)}"`)
	}
}

export function BlogFigure({ id, record, caption, priority }: BlogFigureProps) {
	if (!record) {
		throw new Error(`Unknown figure "${id}"`)
	}

	return (
		<figure className="my-8 space-y-3">
			<div data-viz={record.kind}>
				<FigureViz record={record} priority={priority} />
			</div>
			{caption ? (
				<figcaption className="text-sm leading-6 text-muted-foreground [&_p]:my-0">
					{caption}
				</figcaption>
			) : null}
		</figure>
	)
}
