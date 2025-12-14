'use client'

import { useTheme } from "next-themes"
import { Button } from "./ui/button"
import { ContactDialog } from "./contact-dialog"
import { captureEvent } from '@/lib/posthog'

export function Header() {
	const { setTheme, resolvedTheme } = useTheme()

	const toggleTheme = () => {
		const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
		setTheme(newTheme)
		captureEvent("toggle_theme", {
			from: resolvedTheme,
			to: newTheme
		})
	}

	return (
		<nav className="flex flex-col items-center fixed left-4 top-2 z-50 bg-transparent">
			<div className="flex flex-row items-center gap-2">
				<div className='w-3 h-3 object-cover transition-colors bg-apollo rounded-xs'/>
				<ContactDialog>
					<Button
						variant="ghost"
						size="icon"
						className="flex items-center justify-between"
					>
						<span className="text-sm text-grit font-semibold tracking-tight">CONTACT</span>
					</Button>
				</ContactDialog>
			</div>
			<div className="flex flex-row items-center gap-2 -mt-2">
				<div className='w-3 h-3 object-cover transition-colors bg-black dark:bg-white rounded-xs'/>
				<Button
					variant="ghost"
					size="icon"
					className="flex items-center justify-between"
					onClick={toggleTheme}
				>
					<span className="text-sm text-grit font-semibold tracking-tight">THEME</span>
				</Button>
			</div>
		</nav>
	)
}
