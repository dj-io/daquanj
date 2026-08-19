import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import {
	adaptFigurePlaceholders,
	coverImageFromFigures,
	extractFigurePlaceholders,
	parseFiguresFile,
	validateFigurePlaceholders,
	type BlogFigures,
} from './blog-figures'
import {
	BLOG_TOPICS,
	parseDate,
	type BlogFrontmatter,
	type BlogHeading,
	type BlogPost,
	type BlogPostMeta,
	type BlogTopicSlug,
} from './blog-meta'

export {
	BLOG_AUTHOR,
	BLOG_TOPICS,
	formatDate,
	formatDateLong,
	parseDate,
	type BlogFrontmatter,
	type BlogHeading,
	type BlogPost,
	type BlogPostMeta,
	type BlogTopicSlug,
} from './blog-meta'

export { adaptFigurePlaceholders } from './blog-figures'

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
		if (line.startsWith('> [Figure:') || line.startsWith('<BlogFigure')) continue

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
		featured: Boolean(data.featured),
		draft: Boolean(data.draft),
	}
}

function loadFigures(slug: string): BlogFigures {
	const file = path.join(BLOG_DIR, `${slug}.json`)
	if (!fs.existsSync(file)) return {}

	const data = JSON.parse(fs.readFileSync(file, 'utf8')) as unknown
	return parseFiguresFile(slug, data)
}

function readPostFile(filename: string): BlogPost {
	const slug = filename.replace(/\.mdx$/, '')
	const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
	const { data, content } = matter(raw)
	const frontmatter = parseFrontmatter(data, slug)
	const figures = loadFigures(slug)
	const placeholders = extractFigurePlaceholders(content)
	validateFigurePlaceholders(slug, placeholders, figures)
	const figureIds = placeholders.map((placeholder) => placeholder.id)
	const { wordCount, readingTime } = readingStats(content)

	return {
		slug,
		...frontmatter,
		featured: frontmatter.featured ?? false,
		draft: frontmatter.draft ?? false,
		image: coverImageFromFigures(figureIds, figures),
		readingTime,
		wordCount,
		headings: extractHeadings(content),
		figureIds,
		figures,
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

export function blogOrigin() {
	return (
		process.env.NEXT_PUBLIC_SITE_URL ||
		(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
	)
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

export function getAdjacentPosts(slug: string) {
	const posts = getAllPosts()
	const index = posts.findIndex((post) => post.slug === slug)

	return {
		newer: index > 0 ? posts[index - 1] : null,
		older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
	}
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

export function serializeArticle(post: BlogPost) {
	const origin = blogOrigin()

	return {
		slug: post.slug,
		frontmatter: {
			title: post.title,
			description: post.description,
			date: post.date,
			topic: post.topic,
			slug: post.slug,
			featured: post.featured,
			draft: post.draft,
		},
		canonicalUrl: `${origin}/blog/${post.slug}/`,
		markdown: post.content,
		headings: post.headings,
		readingTimeMinutes: post.readingTime,
		wordCount: post.wordCount,
		figureIds: post.figureIds,
		figures: post.figures,
	}
}

export function serializeArticleMarkdown(post: BlogPost) {
	const yaml = [
		'---',
		`title: ${JSON.stringify(post.title)}`,
		`description: ${JSON.stringify(post.description)}`,
		`date: ${JSON.stringify(post.date)}`,
		`topic: ${JSON.stringify(post.topic)}`,
		`slug: ${JSON.stringify(post.slug)}`,
		`canonical: ${JSON.stringify(`${blogOrigin()}/blog/${post.slug}/`)}`,
		'---',
		'',
		post.content.trim(),
		'',
	].join('\n')

	return yaml
}
