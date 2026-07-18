'use client'

import { INTRO_FADE_DURATION, PROJECT_LINKS } from '@/lib/constants'
import { SocialLinks } from './social-links'
import XformerlyTwitter from '@/app/svg/X'
import NPM from '@/app/svg/Npm'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'

const SOCIAL_ICON_MAP = {
	'Stratum Labs': XformerlyTwitter,
	'Grit': () => <Image src="/images/grit-icon-macOS-Dark-1x.png" alt="Grit" width={20} height={20} />,
    'FreightFi': () => <Image src="/images/FreightFi-logo.svg" alt="FreightFi" width={18} height={18} />,
	'@prose-motions/core': NPM,
}

interface HeroBodyProps {
	introComplete: boolean
}

export function HeroBody({ introComplete }: HeroBodyProps) {
	const shouldReduceMotion = useReducedMotion()
	const showContent = introComplete || shouldReduceMotion

	return (
		<motion.div
			initial={false}
			animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
			transition={{
				duration: INTRO_FADE_DURATION,
				delay: shouldReduceMotion ? 0 : 0.4,
				ease: 'easeOut',
			}}
			className='z-10 flex flex-col gap-10 items-center text-center justify-center mt-18 sm:mt-12'
		>
			<SocialLinks
				className='text-sm md:text-md'
				LINKS={PROJECT_LINKS}
				iconMap={SOCIAL_ICON_MAP}
				popover
			/>
		</motion.div>
	)
}
