'use client'

import { cn } from '@/lib/utils'
import { COPY } from '@/lib/constants'
import { useEffect, useState } from 'react'

export function HeroCentered () {
	const words = ['Write', 'Learn', 'Spec', 'Issue', 'Track', 'Finish']
	const [currentWordIndex, setCurrentWordIndex] = useState(0)
	const [isAnimating, setIsAnimating] = useState(false)

	useEffect(() => {
		const interval = setInterval(() => {
			setIsAnimating(true)
			setTimeout(() => {
				setCurrentWordIndex((prev) => (prev + 1) % words.length)
				setIsAnimating(false)
			}, 250) // Half of transition duration
		}, 3500) // Change word every 3.5 seconds

		return () => clearInterval(interval)
	}, [words.length])

	return (
		<div className='relative z-10 flex flex-col items-center text-center justify-center mt-24 sm:mt-24  max-w-8xl px-4 sm:px-6 lg:px-8'>
			<div className="mx-auto flex px-4 py-3 md:px-8">
				{/* Tagline */}
				<p className={cn(
					"text-5xl md:text-7xl font-medium md:font-semibold",
					"transition-colors duration-300",
					"flex flex-col md:flex-row items-center md:flex-nowrap",
				)}>
					<span className="relative inline-block w-[8rem] md:w-[12rem] text-center overflow-hidden">
						<span
							className={cn(
								"text-center",
								"bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60",
								"dark:from-white dark:via-[#bfc3c9] dark:to-[#6b7280]",
								"bg-clip-text text-transparent",
								"block transition-all duration-600 ease-in-out",
								isAnimating ? "opacity-0 transform" : "opacity-100 transform translate-y-0"
							)}
						>
							{words[currentWordIndex]}
						</span>
					</span>
					<span className="md:mt-0 md:ml-2 whitespace-nowrap">Anything Faster</span>
				</p>
			</div>
			<h1 className="text-sm md:text-xl text-muted-foreground font-medium">{COPY?.[0]?.heading}</h1>
			{/* <h1 className="block md:hidden text-md text-muted-foreground font-medium">{COPY?.[1]?.heading}</h1> */}
		</div>
	)
}


