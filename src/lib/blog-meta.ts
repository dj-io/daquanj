export const BLOG_TOPICS = {
	research: {
		slug: 'research',
		label: 'Research',
		description: 'Longer investigations into applied AI and how people think with machines.',
	},
	building: {
		slug: 'building',
		label: 'Building',
		description: 'How products actually get made — from customer spec to something you can ship.',
	},
	notes: {
		slug: 'notes',
		label: 'Notes',
		description: 'Shorter observations from the work of learning and making.',
	},
} as const

export type BlogTopicSlug = keyof typeof BLOG_TOPICS

export const BLOG_AUTHOR = "Da'Quan Johnson"

export type BlogHeading = {
	id: string
	text: string
	level: 2 | 3
}

export type BlogPostMeta = {
	slug: string
	title: string
	description: string
	date: string
	topic: BlogTopicSlug
	image?: string
	imageTitle?: string
	imageSubtitle?: string
	featured: boolean
	draft: boolean
	readingTime: number
	wordCount: number
	headings: BlogHeading[]
}

export type BlogPost = BlogPostMeta & {
	content: string
}

export type BlogFrontmatter = {
	title: string
	description: string
	date: string
	topic: BlogTopicSlug
	image?: string
	imageTitle?: string
	imageSubtitle?: string
	featured?: boolean
	draft?: boolean
}

export function parseDate(date: string) {
	const [year, month, day] = date.split('-').map(Number)
	return new Date(year, month - 1, day)
}

export function formatDate(date: string) {
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	}).format(parseDate(date))
}

export function formatDateLong(date: string) {
	return new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	}).format(parseDate(date))
}
