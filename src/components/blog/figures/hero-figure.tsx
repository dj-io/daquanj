import { asBoolean, asString, asStringArray } from '@/lib/blog-figures'
import { cn } from '@/lib/utils'

const DEFAULT_COLORS = ['#E9541D', '#5683D2', '#1F2937', '#DEB1B9', '#E4F222']

type HeroFigureProps = {
	spec: Record<string, unknown>
}

export function HeroFigure({ spec }: HeroFigureProps) {
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
			<div className="grid gap-8 p-6 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] sm:p-8">
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
							<h3 className="font-crimson text-[1.85rem] leading-[1.15] italic text-white sm:text-[2.1rem]">
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

				<div
					className="relative grid h-44 grid-cols-5 gap-1.5 sm:h-full sm:min-h-52"
					aria-hidden
				>
					{palette.slice(0, 5).map((color, index) => (
						<div
							key={`${color}-${index}`}
							className={cn('rounded-sm self-stretch', animate && 'hero-slab')}
							style={{
								background: color,
								animationDelay: animate ? `${index * 90}ms` : undefined,
								marginTop: index % 2 === 0 ? '8%' : 0,
								marginBottom: index % 2 === 1 ? '8%' : 0,
							}}
						/>
					))}
					<div className="absolute inset-6 rounded-md border border-white/25 bg-zinc-950/35 backdrop-blur-[2px]" />
				</div>
			</div>
		</div>
	)
}
