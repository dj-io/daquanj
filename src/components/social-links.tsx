'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { captureEvent } from '@/lib/posthog'
import { SOCIAL_LINKS } from '@/lib/constants'
import XformerlyTwitter from '@/app/svg/X'
import Substack from '@/app/svg/Substack'

interface SocialLinksProps {
	className?: string
}

const iconMap = {
	'X': XformerlyTwitter,
	'Substack': Substack
}

export function SocialLinks({ className }: SocialLinksProps) {
	const handleSocialClick = (platform: string, url: string) => {
		captureEvent('social_link_clicked', {
			platform,
			url,
			location: 'footer'
		})
	}

	return (
		<div className={cn('flex justify-center gap-6', className)}>
			{SOCIAL_LINKS.map((link) => {
				const IconComponent = iconMap[link.name as keyof typeof iconMap]
				return (
					<Link
						key={link.name}
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						onClick={() => handleSocialClick(link.name, link.url)}
						className={cn(
							'flex items-center gap-2 text-sm',
							'text-[#9CA3AF] dark:text-[#9CA3AF]',
							'hover:text-foreground dark:hover:text-white',
							'transition-colors duration-300'
						)}
					>
						{IconComponent && <IconComponent className="w-4 h-4" />}
						<span>{link.handle}</span>
					</Link>
				)
			})}
		</div>
	)
}
