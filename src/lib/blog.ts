import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

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

export type BlogPostMeta = {
	slug: string
	title: string
	description: string
	date: string
	topic: BlogTopicSlug
	image?: string
	featured: boolean
	draft: boolean
	readingTime: number
	wordCount: number
	headings: BlogHeading[]
}

export type BlogPost = BlogPostMeta & {
	content: string
}

export type BlogHeading = {
	id: string
	text: string
	level: 2 | 3
}

export type BlogFrontmatter = {
	title: string
	description: string
	date: string
	topic: BlogTopicSlug
	image?: string
	featured?: boolean
	draft?: boolean
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog')
const WORDS_PER_MINUTE = 220

function isTopicSlug(value: string): value is BlogTopicSlug {
	return value in BLOG_TOPICS
}

function slugify(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[`*_~[\]()]/g, '')
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
}

function extractHeadings(content: string): BlogHeading[] {
	const headings: BlogHeading[] = []

	for (const line of content.split('\n')) {
		const match = /^(#{2,3})\s+(.+)$/.exec(line)
		if (!match) continue

		const level = match[1].length as 2 | 3
		const text = match[2].replace(/[*_`]/g, '').trim()
		headings.push({ id: slugify(text), text, level })
	}

	return headings
}

function readingStats(content: string) {
	const words = content.trim().split(/\s+/).filter(Boolean).length
	return {
		wordCount: words,
		readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
	}
}

function normalizeDate(value: unknown, slug: string) {
	if (value instanceof Date && !Number.isNaN(value.getTime())) {
		return value.toISOString().slice(0, 10)
	}

	if (typeof value === 'string' && !Number.isNaN(Date.parse(value))) {
		return value
	}

	throw new Error(`Post "${slug}" has an invalid date`)
}

function parseFrontmatter(data: Record<string, unknown>, slug: string): BlogFrontmatter {
	const title = data.title
	const description = data.description
	const date = normalizeDate(data.date, slug)
	const topic = data.topic

	if (typeof title !== 'string' || !title.trim()) {
		throw new Error(`Post "${slug}" is missing a title`)
	}
	if (typeof description !== 'string' || !description.trim()) {
		throw new Error(`Post "${slug}" is missing a description`)
	}
	if (typeof topic !== 'string' || !isTopicSlug(topic)) {
		throw new Error(`Post "${slug}" has an unknown topic: ${String(topic)}`)
	}

	return {
		title: title.trim(),
		description: description.trim(),
		date,
		topic,
		image: typeof data.image === 'string' && data.image.trim() ? data.image.trim() : undefined,
		featured: Boolean(data.featured),
		draft: Boolean(data.draft),
	}
}

function readPostFile(filename: string): BlogPost {
	const slug = filename.replace(/\.mdx$/, '')
	const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
	const { data, content } = matter(raw)
	const frontmatter = parseFrontmatter(data, slug)
	const { wordCount, readingTime } = readingStats(content)

	return {
		slug,
		...frontmatter,
		featured: frontmatter.featured ?? false,
		draft: frontmatter.draft ?? false,
		readingTime,
		wordCount,
		headings: extractHeadings(content),
		content,
	}
}

function listPostFiles() {
	if (!fs.existsSync(BLOG_DIR)) return []
	return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.mdx'))
}

function isPublished(post: BlogPostMeta) {
	if (!post.draft) return true
	return process.env.NODE_ENV !== 'production'
}

function comparePosts(a: BlogPostMeta, b: BlogPostMeta) {
	return parseDate(b.date).getTime() - parseDate(a.date).getTime()
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

export function getAllPosts(): BlogPost[] {
	return listPostFiles()
		.map(readPostFile)
		.filter(isPublished)
		.sort(comparePosts)
}

export function getPostBySlug(slug: string): BlogPost | null {
	const filename = `${slug}.mdx`
	if (!listPostFiles().includes(filename)) return null

	const post = readPostFile(filename)
	return isPublished(post) ? post : null
}

export function getPostsByTopic(topic: BlogTopicSlug): BlogPost[] {
	return getAllPosts().filter((post) => post.topic === topic)
}

export function getRelatedPosts(post: BlogPostMeta, limit = 3): BlogPost[] {
	return getPostsByTopic(post.topic)
		.filter((candidate) => candidate.slug !== post.slug)
		.slice(0, limit)
}

export function getTopic(slug: string) {
	if (!isTopicSlug(slug)) return null
	return BLOG_TOPICS[slug]
}

export function getTopics() {
	const posts = getAllPosts()

	return Object.values(BLOG_TOPICS).map((topic) => ({
		...topic,
		count: posts.filter((post) => post.topic === topic.slug).length,
	}))
}
