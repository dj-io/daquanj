import Image from 'next/image'
import { asString } from '@/lib/blog-figures'

type ImageFigureProps = {
	spec: Record<string, unknown>
	priority?: boolean
}

export function ImageFigure({ spec, priority = false }: ImageFigureProps) {
	const src = asString(spec.src)
	const title = asString(spec.title)
	const alt = asString(spec.alt) ?? title ?? ''

	if (!src) {
		throw new Error('image figure is missing spec.src')
	}

	return (
		<div>
			{title ? (
				<p className="mb-3 text-center text-sm leading-relaxed text-muted-foreground">
					{title}
				</p>
			) : null}
			<div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-zinc-950">
				<Image
					src={src}
					alt={alt}
					fill
					priority={priority}
					sizes="(min-width: 768px) 672px, 100vw"
					className="object-cover"
				/>
			</div>
		</div>
	)
}
