import type { ReactNode } from 'react'
import type { FigureRecord } from '@/lib/blog-figures'
import { asString } from '@/lib/blog-figures'
import { CompassFigure } from '@/components/blog/figures/compass-figure'
import { ImageFigure } from '@/components/blog/figures/image-figure'
import { PaintingFigure } from '@/components/blog/figures/painting-figure'
import { cn } from '@/lib/utils'

type BlogFigureProps = {
	id: string
	record?: FigureRecord
	caption?: ReactNode
	priority?: boolean
}

function FigureViz({
	id,
	record,
	priority,
}: {
	id: string
	record: FigureRecord
	priority?: boolean
}) {
	switch (record.kind) {
		case 'painting':
			return <PaintingFigure id={id} spec={record.spec} />
		case 'compass':
			return <CompassFigure spec={record.spec} />
		case 'image':
			return <ImageFigure spec={record.spec} priority={priority} />
		default:
			throw new Error(`Unsupported figure kind "${String((record as FigureRecord).kind)}"`)
	}
}

export function BlogFigure({ id, record, caption, priority }: BlogFigureProps) {
	if (!record) {
		throw new Error(`Unknown figure "${id}"`)
	}

	const captionInside = record.kind === 'compass'
	const resolvedCaption = caption ?? asString(record.spec.caption)
	const creditCaption = record.kind === 'image' || record.kind === 'painting'

	return (
		<figure className={cn(record.kind === 'compass' ? 'my-5' : 'my-8 space-y-3')}>
			<div
				data-viz={record.kind}
				className={record.kind === 'painting' || record.kind === 'compass' ? 'overflow-visible' : undefined}
			>
				<FigureViz id={id} record={record} priority={priority} />
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
