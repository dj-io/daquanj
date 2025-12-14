'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { captureEvent } from '@/lib/posthog'
import { PROJECT_LINKS, SOCIAL_LINKS } from '@/lib/constants'

interface SocialLinksProps {
	className?: string
	LINKS: typeof PROJECT_LINKS | typeof SOCIAL_LINKS
	iconMap: Record<string, React.ComponentType<{ className?: string }>>
}

export function SocialLinks({ className, LINKS, iconMap }: SocialLinksProps) {
	const handleSocialClick = (platform: string, url: string) => {
		captureEvent('social_link_clicked', {
			platform,
			url,
			location: 'footer'
		})
	}

	return (
		<div className={cn('flex justify-center gap-6', className)}>
			{LINKS.map((link) => {
				const IconComponent = iconMap?.[link.name as keyof typeof iconMap]
				return (
					<Link
						key={link.name}
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						onClick={() => handleSocialClick(link.name, link.url)}
						className={cn(
							'flex items-center gap-2',
							'text-grit dark:text-[#9CA3AF]',
							'hover:text-foreground dark:hover:text-white',
							'transition-colors duration-300',
						)}
					>
						{IconComponent && <IconComponent className="w-3 h-3 md:w-4 md:h-4" />}
						<span>{link.handle}</span>
					</Link>
				)
			})}
		</div>
	)
}
