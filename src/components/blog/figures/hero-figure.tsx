import { asBoolean, asString, asStringArray } from '@/lib/blog-figures'
import { cn } from '@/lib/utils'
import { ArticleHeroFrame } from './article-hero-frame'

const DEFAULT_COLORS = ['#E9541D', '#5683D2', '#1F2937', '#DEB1B9', '#E4F222']

type HeroFigureProps = {
	spec: Record<string, unknown>
}

export function HeroFigure({ spec }: HeroFigureProps) {
	const title = asString(spec.title)
	const subtitle = asString(spec.subtitle)
	const animate = asBoolean(spec.animate) ?? true
	const colors = asStringArray(spec.colors)
	const palette = colors.length > 0 ? colors : DEFAULT_COLORS

	return (
		<ArticleHeroFrame title={title} subtitle={subtitle}>
			<div className="grid h-36 w-full grid-cols-5 gap-1.5 sm:h-44" aria-hidden>
				{palette.slice(0, 5).map((color, index) => (
					<div
						key={`${color}-${index}`}
						className={cn('rounded-sm', animate && 'hero-slab')}
						style={{
							background: color,
							animationDelay: animate ? `${index * 90}ms` : undefined,
							marginTop: index % 2 === 0 ? '10%' : 0,
							marginBottom: index % 2 === 1 ? '10%' : 0,
						}}
					/>
				))}
			</div>
		</ArticleHeroFrame>
	)
}
