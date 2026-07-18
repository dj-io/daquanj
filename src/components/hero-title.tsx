'use client'

import { COPY, INTRO_FADE_DURATION } from '@/lib/constants'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { useIntro } from './intro-provider'

interface HeroTitleProps {
	introComplete: boolean
}

export function HeroTitle ({ introComplete }: HeroTitleProps) {
	const shouldReduceMotion = useReducedMotion()
	const { completeIntro } = useIntro()
	const showContent = introComplete || shouldReduceMotion

	return (
		<div className='z-10 flex flex-col gap-18 items-center text-center justify-center max-w-2xl'>
			<motion.div
				layout
				initial={false}
				transition={{
					duration: shouldReduceMotion ? 0 : 1.2,
					ease: [0.22, 1, 0.36, 1],
				}}
				onLayoutAnimationComplete={() => {
					if (introComplete) completeIntro()
				}}
				className={
					showContent
						? 'relative h-24 w-24'
						: 'fixed left-1/2 top-1/2 z-50 h-[min(72vw,440px)] w-[min(72vw,440px)] -translate-x-1/2 -translate-y-1/2'
				}
			>
				<Image
					src="/images/gleam_crypto_punk.jpg"
					alt="DaquanJ"
					fill
					priority
					className="object-cover rounded-full"
				/>
			</motion.div>
			<motion.h1
				initial={false}
				animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
				transition={{
				duration: INTRO_FADE_DURATION,
					delay: shouldReduceMotion ? 0 : 0.15,
					ease: 'easeOut',
				}}
				className="text-2xl md:text-3xl text-grit leading-snug italic font-crimson"
			>
				{COPY?.[0]?.heading}{' '}
				<span className="text-muted-foreground">{COPY?.[0]?.body}</span>
			</motion.h1>
		</div>
	)
}
