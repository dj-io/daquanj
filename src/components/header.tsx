'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Header() {
	return (
		<nav className="fixed inset-x-0 top-0 z-50 bg-transparent">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
				{/* Logo and Brand */}
				<Link href="/" className="flex items-center gap-2">
					<Image
						src='/images/grit-icon-macOS-Dark-1x.png'
						alt='Grit logo'
						width={60}
						height={60}
						className='w-6 h-6 sm:w-8 sm:h-8 object-cover transition-colors'
						priority
					/>
					<span className="text-base sm:text-xl lg:text-2xl text-foreground font-semibold tracking-tight">Grit</span>
				</Link>

				{/* Tagline */}
				<p className={cn(
					"text-sm sm:text-lg lg:text-2xl text-muted-foreground font-medium lg:font-semibold",
					"bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60",
					"dark:from-white dark:via-[#bfc3c9] dark:to-[#6b7280]",
					"bg-clip-text text-transparent",
					"transition-colors duration-300"
				)}>
					Work Faster
				</p>
			</div>
		</nav>
	)
}
