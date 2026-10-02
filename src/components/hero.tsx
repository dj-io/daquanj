'use client'

import {
	INTRO_FADE_DELAY,
	INTRO_FADE_DURATION,
} from '@/lib/constants'
import { HeroTitle } from './hero-title'
import { HeroBody } from './hero-body'
import { SiteFooter } from './site-footer'
import { cn } from '@/lib/utils'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useIntro } from './intro-provider'

export function HeroSection () {
	const shouldReduceMotion = useReducedMotion()
	const { completeIntro, isIntroComplete } = useIntro()
	const [introComplete, setIntroComplete] = useState(false)

	useEffect(() => {
		if (shouldReduceMotion) {
			setIntroComplete(true)
			completeIntro()
			return
		}

		const introTimer = window.setTimeout(() => {
			setIntroComplete(true)
		}, 500)

		return () => window.clearTimeout(introTimer)
	}, [completeIntro, shouldReduceMotion])

	return (
		<>
			<section
				className={cn(
					'w-full relative z-10',
					isIntroComplete
						? 'overflow-hidden md:overflow-auto'
						: 'overflow-visible',
				)}
			>
				<div className="mx-auto max-w-5xl px-4 py-10 md:py-20 sm:px-6 lg:px-8 space-y-12">
					<div className="flex flex-col items-center text-center justify-center">
						<HeroTitle introComplete={introComplete} />
						<HeroBody introComplete={introComplete} />
					</div>
				</div>

				<SiteFooter
					variant="fixed"
					initial={shouldReduceMotion ? false : { opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: INTRO_FADE_DURATION,
						delay: shouldReduceMotion ? 0 : INTRO_FADE_DELAY,
					}}
				/>
			</section>

			<motion.div
				aria-hidden
				initial={shouldReduceMotion ? false : { opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{
					duration: INTRO_FADE_DURATION,
					delay: shouldReduceMotion ? 0 : INTRO_FADE_DELAY,
				}}
				className="pointer-events-none fixed left-0 right-0 h-30 z-20 backdrop-blur-2xl bg-background/40"
				style={{
					bottom: '-2px',
					WebkitMaskImage:
						'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 24%, rgba(0,0,0,0.7) 48%, rgba(0,0,0,0.35) 72%, rgba(0,0,0,0.08) 90%, rgba(0,0,0,0) 100%)',
					maskImage:
						'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 24%, rgba(0,0,0,0.7) 48%, rgba(0,0,0,0.35) 72%, rgba(0,0,0,0.08) 90%, rgba(0,0,0,0) 100%)',
				}}
			/>
		</>
	)
}
