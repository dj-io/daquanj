import type { BlogCoverFigure, BlogFigures } from './blog-figures'

export type { BlogCoverFigure }

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

export type BlogAuthor = {
	id: string
	name: string
	initial: string
	url?: string
	image?: string
}

export const BLOG_AUTHORS = {
	'daquan-johnson': {
		id: 'daquan-johnson',
		name: "Da'Quan Johnson",
		url: 'https://x.com/d16nx',
		initial: 'D',
		image: '/images/gleam_crypto_punk.jpg',
	},
} as const satisfies Record<string, BlogAuthor>

export type BlogAuthorId = keyof typeof BLOG_AUTHORS

export const BLOG_AUTHOR = BLOG_AUTHORS['daquan-johnson'].name

export type BlogHeading = {
	id: string
	text: string
	level: 2 | 3
}

export function slugifyHeading(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[`*_~[\]()]/g, '')
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
}

export type ArticleFrontmatter = {
	title: string
	description: string
	date: string
	authors: string[]
	tag: string
	slug: string
	draft: boolean
	doi: string
}

export type ArticleDocument = {
	slug: string
	frontmatter: ArticleFrontmatter
	canonicalUrl: string
	markdown: string
	headings: BlogHeading[]
	readingTimeMinutes: number
	wordCount: number
	figureIds: string[]
	figures: BlogFigures
}

export type BlogPostMeta = {
	slug: string
	title: string
	description: string
	date: string
	topic: BlogTopicSlug
	authors: string[]
	tag: string
	doi: string
	image?: string
	imageAlt?: string
	coverFigure?: BlogCoverFigure
	draft: boolean
	readingTime: number
	wordCount: number
	headings: BlogHeading[]
	figureIds: string[]
}

export type BlogPost = BlogPostMeta & {
	content: string
	markdown: string
	figures: BlogFigures
	document: ArticleDocument
}

export function parseDate(date: string) {
	const [year, month, day] = date.split('-').map(Number)
	return new Date(year, month - 1, day)
}

export function toUtcDate(date: string) {
	return new Date(`${date}T00:00:00.000Z`)
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

export function topicFromTag(tag: string): BlogTopicSlug {
	const topic = Object.values(BLOG_TOPICS).find((item) => item.label === tag)
	if (!topic) {
		throw new Error(`Unknown article tag: ${tag}`)
	}
	return topic.slug
}

export function getAuthor(id: string): BlogAuthor {
	return (
		BLOG_AUTHORS[id as BlogAuthorId] ?? {
			id,
			name: id,
			initial: id.slice(0, 1).toUpperCase(),
		}
	)
}
