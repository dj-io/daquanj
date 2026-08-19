import Image from 'next/image'
import { cn } from '@/lib/utils'

type ArticleFigureProps = {
	src: string
	title?: string
	subtitle?: string
	alt?: string
	priority?: boolean
	className?: string
}

export function ArticleFigure({
	src,
	title,
	subtitle,
	alt = '',
	priority = false,
	className,
}: ArticleFigureProps) {
	return (
		<figure className={cn('my-10', className)}>
			{title ? (
				<p className="mb-3 text-center text-sm leading-relaxed text-muted-foreground">
					{title}
				</p>
			) : null}
			<div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-zinc-950">
				<Image
					src={src}
					alt={alt || title || ''}
					fill
					priority={priority}
					sizes="(min-width: 768px) 672px, 100vw"
					className="object-cover"
				/>
			</div>
			{subtitle ? (
				<figcaption className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
					{subtitle}
				</figcaption>
			) : null}
		</figure>
	)
}
