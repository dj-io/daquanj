'use client'

import { SOCIAL_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { SOCIAL_ICON_MAP } from './social-icons'
import { SocialLinks } from './social-links'

interface SiteFooterProps {
	className?: string
	variant?: 'fixed' | 'page'
}

export function SiteFooter({ className, variant = 'page' }: SiteFooterProps) {
	return (
		<footer
			className={cn(
				variant === 'fixed'
					? 'fixed bottom-4 left-0 right-0 z-20'
					: 'mt-auto',
				className,
			)}
		>
			<div className="mx-auto max-w-4xl px-4 py-8 text-center space-y-4">
				<p className="text-xs text-muted-foreground/60 transition-colors duration-300">
					Da&apos;Quan Johnson · {new Date().getFullYear() - 2020} YOE &copy;{' '}
					{new Date().getFullYear()}
				</p>
				<SocialLinks
					className="text-sm"
					LINKS={SOCIAL_LINKS}
					iconMap={SOCIAL_ICON_MAP}
				/>
			</div>
		</footer>
	)
}
