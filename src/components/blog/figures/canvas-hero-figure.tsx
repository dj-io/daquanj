import { asBoolean, asString, asStringArray } from '@/lib/blog-figures'
import { cn } from '@/lib/utils'
import { ArticleHeroFrame } from './article-hero-frame'

const DEFAULT_COLORS = ['#E9541D', '#5683D2', '#1F2937', '#DEB1B9', '#E4F222']

type CanvasHeroFigureProps = {
	spec: Record<string, unknown>
}

export function CanvasHeroFigure({ spec }: CanvasHeroFigureProps) {
	const title = asString(spec.title)
	const subtitle = asString(spec.subtitle)
	const animate = asBoolean(spec.animate) ?? true
	const colors = asStringArray(spec.colors)
	const palette = colors.length > 0 ? colors : DEFAULT_COLORS

	return (
		<ArticleHeroFrame title={title} subtitle={subtitle}>
			<div className="relative flex h-44 w-full items-end justify-center sm:h-52" aria-hidden>
				<div className="absolute bottom-2 left-1/2 h-[88%] w-1.5 origin-bottom -translate-x-[40px] -rotate-[17deg] rounded-full bg-zinc-600" />
				<div className="absolute bottom-2 left-1/2 h-[88%] w-1.5 origin-bottom translate-x-[32px] rotate-[17deg] rounded-full bg-zinc-600" />
				<div
					className={cn(
						'relative z-10 mb-8 aspect-[4/5] w-[42%] max-w-[150px] rounded-[2px] bg-[#F3EEE3] shadow-[0_18px_40px_rgba(0,0,0,0.45)] ring-1 ring-black/50',
						animate && 'hero-slab',
					)}
				>
					<div className="absolute inset-[10px] border border-zinc-950/10" />
				</div>
				<div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
					{palette.slice(0, 5).map((color, index) => (
						<span
							key={`${color}-${index}`}
							className={cn('size-2.5 rounded-full ring-1 ring-white/15', animate && 'hero-slab')}
							style={{
								background: color,
								animationDelay: animate ? `${160 + index * 80}ms` : undefined,
							}}
						/>
					))}
				</div>
			</div>
		</ArticleHeroFrame>
	)
}
