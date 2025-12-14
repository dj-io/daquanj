'use client'

import { PROJECT_LINKS } from '@/lib/constants'
import { SocialLinks } from './social-links'
import XformerlyTwitter from '@/app/svg/X'
import NPM from '@/app/svg/Npm'
import Image from 'next/image'

const SOCIAL_ICON_MAP = {
	'Stratum Labs': XformerlyTwitter,
	'Grit': () => <Image src="/images/grit-icon-macOS-Dark-1x.png" alt="Grit" width={20} height={20} />,
    'FreightFi': () => <Image src="/images/FreightFi-logo.svg" alt="FreightFi" width={18} height={18} />,
	'@prose-motions/core': NPM,
}

export function HeroBody() {

	return (
		<div className='z-10 flex flex-col gap-10 items-center text-center justify-center mt-18 sm:mt-12'>
			<SocialLinks className="text-sm md:text-md" LINKS={PROJECT_LINKS} iconMap={SOCIAL_ICON_MAP} />
		</div>
	)
}
