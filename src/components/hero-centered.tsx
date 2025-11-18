'use client'

import { cn } from '@/lib/utils'
import { COPY } from '@/lib/constants'

export function HeroCentered () {

	return (
		<div className='relative z-10 flex flex-col gap-4 items-center text-center justify-center mt-24 sm:mt-24 max-w-8xl px-4 sm:px-6 lg:px-8'>
			<div className="mx-auto flex py-3">
				{/* Tagline */}
				<p className={cn(
					"text-6xl md:text-8xl font-medium md:font-semibold",
					"transition-colors duration-300",
					"flex flex-col md:flex-row items-center md:flex-nowrap",
				)}>
					<span className="md:mt-0 whitespace-pre-wrap mx-auto max-w-3xl">The Research Workspace</span>
				</p>
			</div>
			<h1 className="md:text-2xl text-grit leading-snug">{COPY?.[0]?.heading} <span className="inline text-accent-foreground/70 font-medium dark:text-accent-foreground/30">{COPY?.[0]?.body}</span></h1>
		</div>
	)
}


