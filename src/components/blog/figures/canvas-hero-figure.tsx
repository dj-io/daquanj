import { asBoolean, asString, asStringArray } from '@/lib/blog-figures'
import { cn } from '@/lib/utils'

const DEFAULT_COLORS = ['#E9541D', '#5683D2', '#1F2937', '#DEB1B9', '#E4F222']

type CanvasHeroFigureProps = {
	spec: Record<string, unknown>
}

export function CanvasHeroFigure({ spec }: CanvasHeroFigureProps) {
	const title = asString(spec.title)
	const subtitle = asString(spec.subtitle)
	const introLine1 = asString(spec.introLine1)
	const introLine2 = asString(spec.introLine2)
	const brand = asString(spec.brand)
	const brandSub = asString(spec.brandSub)
	const animate = asBoolean(spec.animate) ?? true
	const colors = asStringArray(spec.colors)
	const palette = colors.length > 0 ? colors : DEFAULT_COLORS

	return (
		<div className="overflow-hidden rounded-xl bg-zinc-950 text-white">
			<div className="grid gap-8 p-6 sm:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] sm:p-8">
				<div className="flex min-w-0 flex-col justify-between gap-8">
					<div className="space-y-3">
						{introLine1 ? (
							<p className="text-[13px] leading-6 text-white/70">{introLine1}</p>
						) : null}
						{introLine2 ? (
							<p className="text-[13px] leading-6 text-white/70">{introLine2}</p>
						) : null}
					</div>
					<div className="space-y-2">
						{brand ? (
							<p className="text-sm font-medium tracking-tight text-[#E9541D]">{brand}</p>
						) : null}
						{title ? (
							<h3 className="font-crimson text-[1.85rem] leading-[1.15] italic text-white sm:text-[2.15rem]">
								{title}
							</h3>
						) : null}
						{subtitle ? (
							<p className="max-w-md text-sm leading-6 text-white/65">{subtitle}</p>
						) : null}
						{brandSub ? (
							<p className="pt-2 text-xs uppercase tracking-[0.18em] text-white/45">{brandSub}</p>
						) : null}
					</div>
				</div>

				<div className="relative flex min-h-52 items-end justify-center pb-2 sm:min-h-56" aria-hidden>
					<div className="absolute bottom-3 left-1/2 h-[88%] w-1.5 origin-bottom -translate-x-[42px] -rotate-[17deg] rounded-full bg-zinc-600" />
					<div className="absolute bottom-3 left-1/2 h-[88%] w-1.5 origin-bottom translate-x-[34px] rotate-[17deg] rounded-full bg-zinc-600" />
					<div className="absolute bottom-6 left-1/2 h-1.5 w-24 -translate-x-1/2 rounded-full bg-zinc-700" />

					<div
						className={cn(
							'relative z-10 mb-10 aspect-[4/5] w-[58%] max-w-[210px] rounded-[2px] bg-[#F3EEE3] shadow-[0_18px_40px_rgba(0,0,0,0.45)] ring-1 ring-black/50',
							animate && 'hero-slab',
						)}
					>
						<div className="absolute inset-[11px] border border-zinc-950/10" />
					</div>

					<div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
						{palette.slice(0, 5).map((color, index) => (
							<span
								key={`${color}-${index}`}
								className={cn('size-3 rounded-full ring-1 ring-white/15', animate && 'hero-slab')}
								style={{
									background: color,
									animationDelay: animate ? `${180 + index * 90}ms` : undefined,
								}}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
