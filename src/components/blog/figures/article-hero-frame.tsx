import type { ReactNode } from 'react'

type ArticleHeroFrameProps = {
	title?: string
	subtitle?: string
	wide?: boolean
	children: ReactNode
}

export function ArticleHeroFrame({ title, subtitle, wide = false, children }: ArticleHeroFrameProps) {
	return (
		<div className="rounded-xl bg-black px-5 py-8 text-center sm:px-10 sm:py-10">
			{title ? (
				<p className="text-[13px] leading-6 text-white/90">{title}</p>
			) : null}
			<div
				className={
					wide
						? 'mx-auto mt-6 mb-6 w-full max-w-2xl'
						: 'mx-auto mt-6 mb-6 flex w-full max-w-lg items-center justify-center'
				}
			>
				{children}
			</div>
			{subtitle ? (
				<p className="text-[13px] leading-6 text-white/65">{subtitle}</p>
			) : null}
		</div>
	)
}
