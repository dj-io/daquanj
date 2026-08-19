import type { ReactNode } from 'react'
import type { FigureRecord } from '@/lib/blog-figures'
import { AlgorithmFigure } from '@/components/blog/figures/algorithm-figure'
import { CanvasHeroFigure } from '@/components/blog/figures/canvas-hero-figure'
import { ChartFigure } from '@/components/blog/figures/chart-figure'
import { HeroFigure } from '@/components/blog/figures/hero-figure'
import { ImageFigure } from '@/components/blog/figures/image-figure'
import { StatGridFigure } from '@/components/blog/figures/stat-grid-figure'
import { TableFigure } from '@/components/blog/figures/table-figure'
import { cn } from '@/lib/utils'

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
		case 'hero':
			return <HeroFigure spec={record.spec} />
		case 'canvas-hero':
			return <CanvasHeroFigure spec={record.spec} />
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

	const captionInside = record.kind === 'hero' || record.kind === 'canvas-hero'

	return (
		<figure className="my-8 space-y-3">
			<div data-viz={record.kind}>
				<FigureViz record={record} priority={priority} />
			</div>
			{caption && !captionInside ? (
				<figcaption
					className={cn(
						'text-sm leading-6 text-muted-foreground [&_p]:my-0',
						record.kind === 'image' && 'text-center',
					)}
				>
					{caption}
				</figcaption>
			) : null}
		</figure>
	)
}
