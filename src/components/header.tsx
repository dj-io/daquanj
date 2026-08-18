'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { ContactDialog } from './contact-dialog'
import { captureEvent } from '@/lib/posthog'
import { INTRO_FADE_DELAY, INTRO_FADE_DURATION } from '@/lib/constants'
import { motion, useReducedMotion } from 'motion/react'

export function Header() {
	const { setTheme, resolvedTheme } = useTheme()
	const pathname = usePathname()
	const shouldReduceMotion = useReducedMotion()
	const isHome = pathname === '/'

	const toggleTheme = () => {
		const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
		setTheme(newTheme)
		captureEvent('toggle_theme', {
			from: resolvedTheme,
			to: newTheme,
		})
	}

	return (
		<motion.nav
			initial={shouldReduceMotion ? false : { opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				duration: INTRO_FADE_DURATION,
				delay: shouldReduceMotion || !isHome ? 0 : INTRO_FADE_DELAY,
			}}
			className="flex flex-col items-center fixed left-4 top-2 z-50 bg-transparent"
		>
			<div className="flex flex-row items-center gap-2">
				<div className="w-3 h-3 object-cover transition-colors bg-apollo rounded-xs" />
				<ContactDialog>
					<Button
						variant="ghost"
						size="icon"
						className="flex items-center justify-between"
					>
						<span className="text-sm text-grit font-semibold tracking-tight">
							CONTACT
						</span>
					</Button>
				</ContactDialog>
			</div>
			<div className="flex flex-row items-center gap-2 -mt-2">
				<div className="w-3 h-3 object-cover transition-colors bg-black dark:bg-white rounded-xs" />
				<Button
					variant="ghost"
					size="icon"
					className="flex items-center justify-between"
					onClick={toggleTheme}
				>
					<span className="text-sm text-grit font-semibold tracking-tight">
						THEME
					</span>
				</Button>
			</div>
			{!isHome && (
				<div className="flex flex-row items-center gap-2 -mt-2">
					<div className="w-3 h-3 object-cover transition-colors bg-grit rounded-xs" />
					<Button
						variant="ghost"
						size="icon"
						className="flex items-center justify-between"
						asChild
					>
						<Link
							href="/"
							onClick={() => captureEvent('home_link_clicked', { from: pathname })}
						>
							<span className="text-sm text-grit font-semibold tracking-tight">
								HOME
							</span>
						</Link>
					</Button>
				</div>
			)}
		</motion.nav>
	)
}
