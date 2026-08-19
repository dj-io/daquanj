import type { ReactNode } from 'react'
import type { FigureRecord } from '@/lib/blog-figures'
import { asString } from '@/lib/blog-figures'
import { AlgorithmFigure } from '@/components/blog/figures/algorithm-figure'
import { CanvasHeroFigure } from '@/components/blog/figures/canvas-hero-figure'
import { ChartFigure } from '@/components/blog/figures/chart-figure'
import { CompassFigure } from '@/components/blog/figures/compass-figure'
import { HeroFigure } from '@/components/blog/figures/hero-figure'
import { ImageFigure } from '@/components/blog/figures/image-figure'
import { PaintingFigure } from '@/components/blog/figures/painting-figure'
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
		case 'painting':
			return <PaintingFigure spec={record.spec} />
		case 'compass':
			return <CompassFigure spec={record.spec} />
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

	const captionInside =
		record.kind === 'hero' || record.kind === 'canvas-hero' || record.kind === 'compass'
	const resolvedCaption = caption ?? asString(record.spec.caption)
	const creditCaption = record.kind === 'image' || record.kind === 'painting'

	return (
		<figure className={cn('my-8 space-y-3', record.kind === 'compass' && 'my-12')}>
			<div
				data-viz={record.kind}
				className={record.kind === 'painting' || record.kind === 'compass' ? 'overflow-visible' : undefined}
			>
				<FigureViz record={record} priority={priority} />
			</div>
			{resolvedCaption && !captionInside ? (
				<figcaption
					className={cn(
						'text-sm leading-6 text-muted-foreground [&_p]:my-0',
						creditCaption && 'text-center',
					)}
				>
					{resolvedCaption}
				</figcaption>
			) : null}
		</figure>
	)
}
