import { Copy, ProjectTimeline } from './types'
import { CheckCircleIcon } from 'lucide-react'

export const INTRO_FADE_DURATION = 0.45
export const INTRO_FADE_DELAY = 1.7

export const COPY: Copy[] = [
	{
		heading: 'Full Stack Engineer with forward deployed experience turning customer specs into shippable software. ',
		body: 'Now focused on applied AI, building better ways to solve practical problems.',
	},
]

// Social links
export const SOCIAL_LINKS = [
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/daquanj/',
		handle: 'IN/DAQUANJ'
	},
	{
		name: 'GitHub',
		url: 'https://github.com/dj-io',
		handle: '@DJ-IO'
	},
	{
		name: 'Substack',
		url: 'https://stratumlabs.substack.com',
		handle: 'BLOG'
	},
	{
		name: 'X',
		url: 'https://x.com/@d16nx',
		handle: '@D16NX'
	},
]

// Project links
export const PROJECT_LINKS = [
	{
		name: 'Grit',
		url: 'https://gritai.app',
		handle: 'GRIT',
		info: {
            about: "The Agent Workspace For Researchers",
			timelineIcon: CheckCircleIcon,
			timeline: 'Active' satisfies ProjectTimeline,
            role: "Founder",
            contributions: "0→1 product strategy, customer discovery, fundraising, and full product delivery."
        }
	},
	{
		name: 'FreightFi',
		url: 'https://freightfi.app',
		handle: 'FREIGHTFI',
		info: {
            about: "AI Freight Reconciliation for Billing Teams & Brokers",
			timelineIcon: CheckCircleIcon,
            timeline: 'Completed' satisfies ProjectTimeline,
            role: "AI Consultant",
			contributions: "Translated founder's vision into an AI-first product roadmap, securing pilot deals & VC interest. Completed 6 weeks of product delivery support.",
        }
	},
	{
		name: '@prose-motions/core',
		url: 'https://www.npmjs.com/package/@prose-motions/core',
		handle: '@PROSE-MOTIONS/CORE',
		info: {
            about: "Vim keybindings extension for ProseMirror",
			timelineIcon: CheckCircleIcon,
			timeline: 'Sidelined' satisfies ProjectTimeline,
            role: "Maintainer",
            contributions: "Created drop-in Vim motions library for ProseMirror, addressing 2-year community request. Ongoing maintenance and support."
        }
	},
	// {
	// 	name: 'Stratum Labs',
	// 	url: 'https://stratumlabs.ai',
	// 	handle: 'STRATUM LABS',
	// 	info: {
	//         about: "AI Consulting Agency",
	//         timelineIcon: CheckCircleIcon,
	//         timeline: "Active",
	//         role: "Founder",
	//         contributions: "Customer discovery, product strategy, and full product delivery."
	//     }
	// },
]
