'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Header() {
	return (
		<>
			{/* Mobile Header (default) */}
			<nav className='fixed top-0 left-0 w-full z-50 lg:hidden pt-10'>
				<div className='w-full px-4 pb-3 flex items-center justify-between'>
					{/* Logo and Brand */}
					<Link href="/" className="flex items-center gap-2">
						<Image
							src='/images/grit-icon-macOS-Dark-1x.png'
							alt='Grit logo'
							width={60}
							height={60}
							className='w-6 h-6 object-cover transition-colors'
							priority
						/>
						<span className="text-base text-foreground font-semibold tracking-tight">Grit</span>
					</Link>

					{/* Mobile Tagline */}
					<p className={cn(
						"text-sm text-muted-foreground/80 font-medium",
						"bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60",
						"dark:from-white dark:via-[#bfc3c9] dark:to-[#6b7280]",
						"bg-clip-text text-transparent",
					)}>
						Work Faster
					</p>
				</div>
			</nav>

			{/* Desktop Header */}
			<nav className='fixed top-4 left-0 w-full z-50 hidden lg:flex justify-center'>
				<div className='max-w-5xl w-[95vw] py-2 flex items-center justify-between'>
					{/* Left: Logo and Brand */}
					<Link href="/" className="flex items-center gap-2 group">
						<Image
							src='/images/grit-icon-macOS-Dark-1x.png'
							alt='Grit logo'
							width={100}
							height={100}
							className='w-8 h-8 object-cover transition-colors'
							priority
						/>
						<span className="text-foreground font-semibold text-2xl tracking-tight">Grit</span>
					</Link>

					{/* Desktop Tagline */}
					<p className={cn(
						"text-2xl text-muted-foreground font-semibold",
						"bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60",
						"dark:from-white dark:via-[#bfc3c9] dark:to-[#6b7280]",
						"bg-clip-text text-transparent",
						"transition-colors duration-300"
					)}>
						Work Faster
					</p>
				</div>
			</nav>
		</>
	)
}
