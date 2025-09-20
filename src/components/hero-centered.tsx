'use client'

import { cn } from '@/lib/utils'
import { COPY } from '@/lib/constants'

export function HeroCentered () {
	return (
		<div className='relative z-10 flex flex-col items-center text-center mt-24 sm:mt-24  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<h1
					className={cn(
						'text-4xl sm:text-7xl md:text-8xl lg:text-8xl font-medium leading-[1.1]',
						'[&>span]:text-foreground',
					)}
				>
					{COPY?.[0]?.heading}
				</h1>
				<p className='text-base sm:text-xl text-foreground/90 mt-4 max-w-3xl'>
					{COPY?.[0]?.body}
				</p>
		</div>
	)
}


