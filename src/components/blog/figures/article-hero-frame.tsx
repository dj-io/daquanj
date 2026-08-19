import type { ReactNode } from 'react'

type ArticleHeroFrameProps = {
	title?: string
	subtitle?: string
	children: ReactNode
}

export function ArticleHeroFrame({ title, subtitle, children }: ArticleHeroFrameProps) {
	return (
		<div className="rounded-xl bg-black px-5 py-8 text-center sm:px-10 sm:py-10">
			{title ? (
				<p className="text-[13px] leading-6 text-white/90">{title}</p>
			) : null}
			<div className="mx-auto mt-6 mb-6 flex w-full max-w-lg items-center justify-center">
				{children}
			</div>
			{subtitle ? (
				<p className="text-[13px] leading-6 text-white/65">{subtitle}</p>
			) : null}
		</div>
	)
}
