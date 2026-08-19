import Image from 'next/image'
import { asBoolean, asString } from '@/lib/blog-figures'
import { cn } from '@/lib/utils'
import { ArticleHeroFrame } from './article-hero-frame'

type GritHeroFigureProps = {
	spec: Record<string, unknown>
}

export function GritHeroFigure({ spec }: GritHeroFigureProps) {
	const title = asString(spec.title)
	const subtitle = asString(spec.subtitle)
	const prompt = asString(spec.prompt) ?? 'how can grit help my research?'
	const animate = asBoolean(spec.animate) ?? true

	return (
		<ArticleHeroFrame title={title} subtitle={subtitle}>
			<div
				className={cn(
					'w-full overflow-hidden rounded-lg border border-white/10 bg-zinc-950 text-left shadow-[0_20px_50px_rgba(0,0,0,0.35)]',
					animate && 'hero-slab',
				)}
			>
				<div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
					<Image
						src="/images/grit-icon-macOS-Dark-1x.png"
						alt=""
						width={16}
						height={16}
						className="rounded-[3px]"
					/>
					<span className="text-[11px] font-medium tracking-tight text-white/80">Grit</span>
					<span className="ml-auto text-[10px] text-white/35">Library</span>
				</div>
				<div className="grid grid-cols-[7.5rem_minmax(0,1fr)] sm:grid-cols-[9rem_minmax(0,1fr)]">
					<div className="space-y-1.5 border-r border-white/10 px-2.5 py-3">
						<p className="px-1.5 text-[10px] uppercase tracking-[0.14em] text-white/30">work in a project</p>
						{[
							['⚡', 'Attention Is All You Need'],
							['🦄', 'Unicorns & Frontier AI'],
							['📝', 'Research Scratchpad'],
						].map(([icon, label]) => (
							<div
								key={label}
								className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[11px] text-white/70"
							>
								<span aria-hidden className="text-[10px]">
									{icon}
								</span>
								<span className="truncate">{label}</span>
							</div>
						))}
					</div>
					<div className="flex min-h-36 flex-col justify-between px-3 py-3 sm:min-h-40">
						<p className="font-crimson text-[15px] leading-6 text-white/85 sm:text-base">{prompt}</p>
						<div className="flex items-center justify-end">
							<span className="rounded-full bg-[#E9541D] px-3 py-1 text-[11px] font-medium text-white">
								Ask
							</span>
						</div>
					</div>
				</div>
			</div>
		</ArticleHeroFrame>
	)
}
