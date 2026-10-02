'use client'

import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { ContactDialog } from './contact-dialog'
import { captureEvent } from '@/lib/posthog'
import { INTRO_FADE_DELAY, INTRO_FADE_DURATION } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

export function Header() {
	const { setTheme, resolvedTheme } = useTheme()
	const pathname = usePathname()
	const shouldReduceMotion = useReducedMotion()
	const isHome = pathname === '/'
	const isBlog = pathname.startsWith('/blog')
	const [released, setReleased] = useState(false)
	const hidden = isBlog && released
	const skipIntroDelay = Boolean(shouldReduceMotion) || !isHome

	const toggleTheme = () => {
		const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
		setTheme(newTheme)
		captureEvent('toggle_theme', {
			from: resolvedTheme,
			to: newTheme,
		})
	}

	useEffect(() => {
		if (!isBlog) {
			setReleased(false)
			return
		}

		const sentinel = document.getElementById('blog-content-start')
		if (!sentinel) return

		const observer = new IntersectionObserver(
			([entry]) => {
				const leftThroughTop =
					!entry.isIntersecting && entry.boundingClientRect.top < 0
				setReleased(leftThroughTop)
			},
			{ threshold: 0 },
		)

		observer.observe(sentinel)
		return () => observer.disconnect()
	}, [isBlog, pathname])

	return (
		<motion.nav
			initial={shouldReduceMotion ? false : { opacity: 0, y: 0 }}
			animate={hidden ? { opacity: 0, y: '-120%' } : { opacity: 1, y: 0 }}
			transition={{
				duration: hidden ? 0.3 : INTRO_FADE_DURATION,
				delay: hidden || skipIntroDelay ? 0 : INTRO_FADE_DELAY,
				ease: 'easeOut',
			}}
			className={cn(
				'fixed left-4 top-2 z-50 flex flex-col items-center bg-transparent',
				hidden && 'pointer-events-none',
			)}
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
		</motion.nav>
	)
}
