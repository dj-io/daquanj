import type { ComponentType } from 'react'

export interface Copy {
	heading: string
	body: string
	bodyLink?: {
		label: string
		href: string
	}
	subline?: string
}

export type ProjectTimeline = 'Active' | 'Completed' | 'Sidelined'

export type SocialLink = {
	name: string
	url: string
	handle: string
	internal?: boolean
}

export type ProjectLink = SocialLink & {
	info: {
		about: string
		timelineIcon: ComponentType<{ className?: string }>
		timeline: ProjectTimeline
		role: string
		contributions: string
	}
}
