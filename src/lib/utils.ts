import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// OS detection logic
export function detectOS () {
	if (typeof window === 'undefined') return 'macOS'
	const { userAgent, platform } = window.navigator
	if (/Mac/i.test(platform)) return 'macOS'
	if (/Win/i.test(platform)) return 'Windows'
	if (/Linux/i.test(platform)) return 'Linux'
	if (/iPhone|iPad|iPod/i.test(userAgent)) return 'iOS'
	if (/Android/i.test(userAgent)) return 'Android'
	return 'macOS'
}
