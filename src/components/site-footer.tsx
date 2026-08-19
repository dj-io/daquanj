'use client'

import { usePathname } from 'next/navigation'
import { SOCIAL_LINKS } from '@/lib/constants'
import type { SocialLink } from '@/lib/types'
import { cn } from '@/lib/utils'
import { SOCIAL_ICON_MAP } from './social-icons'
import { SocialLinks } from './social-links'
import { motion, type HTMLMotionProps } from 'motion/react'

interface SiteFooterProps extends Omit<HTMLMotionProps<'footer'>, 'children'> {
	variant?: 'fixed' | 'page'
}

const HOME_LINK = {
	name: 'Home',
	url: '/',
	handle: 'HOME',
	internal: true as const,
}

function FooterContent({ links }: { links: SocialLink[] }) {
	return (
		<div className="mx-auto max-w-4xl px-4 py-8 text-center space-y-4">
			<p className="text-xs text-muted-foreground/60 transition-colors duration-300">
				Da&apos;Quan Johnson · {new Date().getFullYear() - 2020} YOE &copy;{' '}
				{new Date().getFullYear()}
			</p>
			<SocialLinks
				className="text-sm"
				LINKS={links}
				iconMap={SOCIAL_ICON_MAP}
			/>
		</div>
	)
}

export function SiteFooter({
	className,
	variant = 'page',
	...motionProps
}: SiteFooterProps) {
	const pathname = usePathname()
	const onBlog = pathname.startsWith('/blog')
	const links = onBlog
		? SOCIAL_LINKS.map((link) => (link.name === 'Blog' ? HOME_LINK : link))
		: SOCIAL_LINKS

	if (variant === 'fixed') {
		return (
			<motion.footer
				className={cn('fixed bottom-4 left-0 right-0 z-20', className)}
				{...motionProps}
			>
				<FooterContent links={links} />
			</motion.footer>
		)
	}

	return (
		<footer className={cn('mt-auto', className)}>
			<FooterContent links={links} />
		</footer>
	)
}
