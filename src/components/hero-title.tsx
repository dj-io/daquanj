'use client'

import { COPY, INTRO_FADE_DURATION } from '@/lib/constants'
import type { Copy } from '@/lib/types'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { useIntro } from './intro-provider'

function HeroCopyBody ({ copy }: { copy: Copy }) {
	const { body, bodyLink } = copy
	if (!bodyLink) return body

	const index = body.indexOf(bodyLink.label)
	if (index === -1) return body

	return (
		<>
			{body.slice(0, index)}
			<a
				href={bodyLink.href}
				target="_blank"
				rel="noreferrer"
				className="underline decoration-dashed decoration-current/70 underline-offset-[0.22em] transition-colors hover:text-grit hover:decoration-grit"
			>
				{bodyLink.label}
			</a>
			{body.slice(index + bodyLink.label.length)}
		</>
	)
}

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
						: 'fixed inset-0 z-50 m-auto h-[min(72vw,70svh,440px)] w-[min(72vw,70svh,440px)]'
				}
			>
				<Image
					src="/images/gleam_crypto_punk.jpg"
					alt="DaquanJ"
					fill
					priority
					sizes="(max-width: 768px) 72vw, 440px"
					className="rounded-full object-cover"
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
				<span className="text-muted-foreground">
					<HeroCopyBody copy={COPY[0]} />
				</span>
			</motion.h1>
		</div>
	)
}
