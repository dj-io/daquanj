'use client'

import Image from 'next/image'
import Link from 'next/link'
// import { ModeToggle } from './theme-toggle'
import { cn } from '@/lib/utils'

export function Header() {
	return (
		<nav className='fixed top-4 left-0 w-full z-50 flex justify-center'>
			<div
				className='
					bg-background/90
					dark:bg-background/80
					max-w-5xl
					w-[95vw]
					py-2
					flex items-center justify-between
				'
			>
				{/* Left: Logo and Brand */}
				<Link href="/" className="flex items-center gap-2 group">
					<div className="w-12 h-8 flex items-center justify-center rounded-full overflow-hidden bg-black dark:bg-white">
						<Image
							src='/images/str-logo.jpg'
							alt='Grit logo'
							width={100}
							height={100}
							className='w-12 h-12 object-cover transition-colors dark:invert'
							priority
						/>
					</div>
					<span className="text-muted-foreground font-semibold text-4xl tracking-tight">Grit</span>
				</Link>

				{/* Center: Nav Links */}
				{/* <ul className='flex gap-6 mx-8'>
					{navLinks.map(link => (
						<li key={link.title}>
							<Link
								href={link.href}
								className='text-sm font-medium hover:text-foreground transition-colors cursor-pointer'
							>
								{link.title}
							</Link>
						</li>
					))}
				</ul> */}
                        {/* <ModeToggle /> */}
				{/* <div className='flex items-center'> */}
                <p className={cn(
                    "text-2xl text-muted-foreground font-semibold",
                    "bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60",
                    "dark:from-white dark:via-[#bfc3c9] dark:to-[#6b7280]",
                    "bg-clip-text text-transparent",
                    "transition-colors duration-300"
                )}>
                    Write with Intelligence
                </p>
				{/* </div> */}
			</div>
		</nav>
	)
}
