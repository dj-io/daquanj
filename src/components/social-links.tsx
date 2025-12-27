'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { captureEvent } from '@/lib/posthog'
import { PROJECT_LINKS, SOCIAL_LINKS } from '@/lib/constants'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

interface SocialLinksProps {
	className?: string
	LINKS: typeof PROJECT_LINKS | typeof SOCIAL_LINKS
	iconMap: Record<string, React.ComponentType<{ className?: string }>>
	popover?: boolean
}

export function SocialLinks({
	className,
	LINKS,
	iconMap,
	popover = false,
}: SocialLinksProps) {
	const handleSocialClick = (platform: string, url: string) => {
		captureEvent('social_link_clicked', {
			platform,
			url,
			location: popover ? 'hero_body' : 'footer',
		})
	}

	return (
		<div className={cn('flex justify-center gap-6', className)}>
			{LINKS.map((link) => {
				const IconComponent = iconMap?.[link.name as keyof typeof iconMap]

				const info = 'info' in link ? link.info : undefined
				const popoverEnabled = popover && !!info

				return (
					<Popover
						key={link.name}
						openOnHover
						enabled={popoverEnabled}
						hoverOpenDelay={400}
						hoverCloseDelay={200}
					>
						<PopoverTrigger asChild>
							<Link
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								onClick={() =>
									handleSocialClick(link.name, link.url)
								}
								className={cn(
									'flex items-center gap-2',
									'text-grit dark:text-[#9CA3AF]',
									'hover:text-foreground dark:hover:text-white',
									'transition-colors duration-300',
								)}
							>
								{IconComponent && (
									<IconComponent className='w-3 h-3 md:w-4 md:h-4' />
								)}
								<span>{link.handle}</span>
							</Link>
						</PopoverTrigger>

						{popoverEnabled && (
							<PopoverContent
								side='bottom'
								align='center'
								sideOffset={10}
								className='w-72 bg-background border border-border rounded-lg px-6 py-5 shadow-md text-xs'
							>
								<div className='space-y-2'>
									<div className='flex items-center gap-1'>
										<div className='min-w-0 flex-1'>
											<div className='text-sm font-semibold truncate'>
												{link.name}
											</div>
											<div className='text-xs text-muted-foreground'>
												{info.about}
											</div>
										</div>
										<Badge
											variant='default'
											className='text-xs'
										>
											<info.timelineIcon className='w-3 h-3 inline mr-1' />
											<span>{info.timeline}</span>
										</Badge>
									</div>
									<div className='text-xs'>
										<span className='font-medium'>Role:</span>{' '}
										<span className='text-muted-foreground'>
											{info.role}
										</span>
									</div>
									<div className='text-xs'>
										<span className='font-medium'>Work:</span>{' '}
										<span className='text-muted-foreground'>
											{info.contributions}
										</span>
									</div>
								</div>
							</PopoverContent>
						)}
					</Popover>
				)
			})}
		</div>
	)
}
