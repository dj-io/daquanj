'use client'

import { SOCIAL_LINKS } from '@/lib/constants'
import { SocialLinks } from './social-links'
import { HeroTitle } from './hero-title'
import { HeroBody } from './hero-body'
import Medium from '@/app/svg/Medium'
import XformerlyTwitter from '@/app/svg/X'
import GitHub from '@/app/svg/GitHub'
import Substack from '@/app/svg/Substack'
import LinkedIn from '@/app/svg/LinkedIn'

const SOCIAL_ICON_MAP = {
	'X': XformerlyTwitter,
	'Substack': Substack,
	'Medium': Medium,
	'GitHub': GitHub,
	'LinkedIn': LinkedIn
}

export function HeroSection () {
	return (
		<>
			<section className="w-full relative z-10 overflow-hidden md:overflow-auto">
				<div className="mx-auto max-w-5xl px-4 py-10 md:py-20 sm:px-6 lg:px-8 space-y-12">

					{/* Hero content */}
					<div className="flex flex-col items-center text-center justify-center">
						<HeroTitle />
						<HeroBody />
					</div>

			</div>


			{/* Footer section with social links */}
			<footer className="fixed bottom-4 left-0 right-0 z-20">
				<div className="mx-auto max-w-4xl px-4 py-8 text-center space-y-4">
					{/* Copyright */}
					<p className="text-xs text-muted-foreground/60 transition-colors duration-300">
					Da'Quan Johnson · {new Date().getFullYear() - 2020} YOE &copy; {new Date().getFullYear()}
					</p>

					{/* Social Links */}
					<SocialLinks className="text-sm" LINKS={SOCIAL_LINKS} iconMap={SOCIAL_ICON_MAP} />
				</div>
			</footer>
		</section>

		{/* Bottom Gaussian blur overlay (fades page bottom) */}
		<div
			aria-hidden
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
