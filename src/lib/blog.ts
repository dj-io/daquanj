import fs from 'node:fs'
import path from 'node:path'
import { cache } from 'react'
import matter from 'gray-matter'
import {
	coverFromFigures,
	coverVisualFromFigures,
	extractFigurePlaceholders,
	matchFigureLine,
	parseFiguresFile,
	validateFigurePlaceholders,
} from './blog-figures'
import {
	BLOG_AUTHORS,
	BLOG_TOPICS,
	getAuthor,
	parseDate,
	topicFromTag,
	type ArticleDocument,
	type ArticleFrontmatter,
	type BlogAuthorId,
	type BlogHeading,
	type BlogPost,
	type BlogPostMeta,
	type BlogTopicSlug,
} from './blog-meta'

export {
	BLOG_AUTHOR,
	BLOG_AUTHORS,
	BLOG_TOPICS,
	formatDate,
	formatDateLong,
	getAuthor,
	parseDate,
	toUtcDate,
	topicFromTag,
	type ArticleDocument,
	type ArticleFrontmatter,
	type BlogAuthorId,
	type BlogHeading,
	type BlogPost,
	type BlogPostMeta,
	type BlogTopicSlug,
} from './blog-meta'

export { adaptArticleMarkdown, adaptCalloutPlaceholders, adaptFigurePlaceholders } from './blog-figures'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')
const WORDS_PER_MINUTE = 220
const POST_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

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
	const words = content
		.split('\n')
		.filter((line) => !matchFigureLine(line))
		.join('\n')
		.trim()
		.split(/\s+/)
		.filter(Boolean).length

	return {
		wordCount: words,
		readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
	}
}

function normalizeDate(value: unknown, slug: string) {
	if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
		if (Number.isNaN(Date.parse(`${value}T00:00:00.000Z`))) {
			throw new Error(`Post "${slug}" has an invalid date`)
		}
		return value
	}

	throw new Error(`Post "${slug}" has an invalid date`)
}

function asString(value: unknown, field: string, slug: string) {
	if (typeof value !== 'string' || !value.trim()) {
		throw new Error(`Post "${slug}" is missing ${field}`)
	}
	return value.trim()
}

function normalizeAuthorId(value: string) {
	const trimmed = value.trim()
	if (trimmed in BLOG_AUTHORS) return trimmed as BlogAuthorId

	const match = Object.values(BLOG_AUTHORS).find(
		(author) => author.id === trimmed || author.name === trimmed,
	)
	return match?.id ?? trimmed
}

function parseFrontmatter(data: Record<string, unknown>, slug: string): ArticleFrontmatter {
	const authors = (
		Array.isArray(data.authors)
			? data.authors.filter((author): author is string => typeof author === 'string' && author.trim() !== '')
			: typeof data.authors === 'string'
				? [data.authors]
				: ['daquan-johnson']
	).map(normalizeAuthorId)

	if (authors.length === 0) {
		throw new Error(`Post "${slug}" is missing authors`)
	}

	return {
		title: asString(data.title, 'title', slug),
		description: asString(data.description, 'description', slug),
		date: normalizeDate(data.date, slug),
		authors,
		tag: asString(data.tag, 'tag', slug),
		slug: typeof data.slug === 'string' && data.slug.trim() ? data.slug.trim() : slug,
		draft: Boolean(data.draft),
		doi: typeof data.doi === 'string' ? data.doi : '',
	}
}

function yamlString(value: string) {
	return JSON.stringify(value)
}

function buildMarkdown(frontmatter: ArticleFrontmatter, body: string, canonicalUrl: string) {
	const authorNames = frontmatter.authors.map((id) => getAuthor(id).name).join(', ')

	return [
		'---',
		`title: ${yamlString(frontmatter.title)}`,
		`description: ${yamlString(frontmatter.description)}`,
		`date: ${yamlString(frontmatter.date)}`,
		`authors: ${yamlString(authorNames)}`,
		`tag: ${yamlString(frontmatter.tag)}`,
		`slug: ${yamlString(frontmatter.slug)}`,
		`canonical: ${yamlString(canonicalUrl)}`,
		'---',
		'',
		body.trim(),
		'',
	].join('\n')
}

function readArticleFile(slug: string): BlogPost {
	const file = path.join(BLOG_DIR, slug, 'article.json')
	let raw: Record<string, unknown>
	try {
		raw = JSON.parse(fs.readFileSync(file, 'utf8')) as Record<string, unknown>
	} catch {
		throw new Error(`Post "${slug}" has invalid article JSON`)
	}
	const documentSlug = typeof raw.slug === 'string' && raw.slug.trim() ? raw.slug.trim() : slug
	if (documentSlug !== slug) {
		throw new Error(`Post "${slug}" slug does not match folder name`)
	}

	const frontmatter = parseFrontmatter(
		(raw.frontmatter && typeof raw.frontmatter === 'object'
			? raw.frontmatter
			: {}) as Record<string, unknown>,
		slug,
	)
	const markdownSource = typeof raw.markdown === 'string' ? raw.markdown : ''
	if (!markdownSource.trim()) {
		throw new Error(`Post "${slug}" is missing markdown`)
	}

	const { content } = matter(markdownSource)
	const figures = parseFiguresFile(slug, raw)
	const placeholders = extractFigurePlaceholders(content)
	validateFigurePlaceholders(slug, placeholders, figures)
	const figureIds = placeholders.map((placeholder) => placeholder.id)
	const { wordCount, readingTime } = readingStats(content)
	const canonicalUrl = `${blogOrigin()}/blog/${slug}`
	const markdown = buildMarkdown(frontmatter, content, canonicalUrl)
	const headings = extractHeadings(content)
	const topic = topicFromTag(frontmatter.tag)
	const coverFigure = coverVisualFromFigures(figureIds, figures)
	const cover = coverFromFigures(figureIds, figures)

	const document: ArticleDocument = {
		slug,
		frontmatter: {
			...frontmatter,
			slug,
		},
		canonicalUrl,
		markdown,
		headings,
		readingTimeMinutes: readingTime,
		wordCount,
		figureIds,
		figures,
	}

	return {
		slug,
		title: frontmatter.title,
		description: frontmatter.description,
		date: frontmatter.date,
		topic,
		authors: frontmatter.authors,
		tag: frontmatter.tag,
		doi: frontmatter.doi,
		image: cover?.src,
		imageAlt: cover?.alt,
		coverFigure,
		draft: frontmatter.draft,
		readingTime,
		wordCount,
		headings,
		figureIds,
		content,
		markdown,
		figures,
		document,
	}
}

function listPostSlugs() {
	if (!fs.existsSync(BLOG_DIR)) return []
	return fs
		.readdirSync(BLOG_DIR, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.filter((slug) => POST_SLUG.test(slug) && fs.existsSync(path.join(BLOG_DIR, slug, 'article.json')))
}

function isPublished(post: BlogPostMeta) {
	if (!post.draft) return true
	return process.env.NODE_ENV !== 'production'
}

function comparePosts(a: BlogPostMeta, b: BlogPostMeta) {
	return parseDate(b.date).getTime() - parseDate(a.date).getTime()
}

export function blogOrigin() {
	const origin =
		process.env.NEXT_PUBLIC_SITE_URL ||
		(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
	return origin.replace(/\/+$/, '')
}

export const getAllPosts = cache((): BlogPost[] => {
	return listPostSlugs()
		.map(readArticleFile)
		.filter(isPublished)
		.sort(comparePosts)
})

export const getPostBySlug = cache((slug: string): BlogPost | null => {
	if (!POST_SLUG.test(slug)) return null
	if (!fs.existsSync(path.join(BLOG_DIR, slug, 'article.json'))) return null
	const post = readArticleFile(slug)
	return isPublished(post) ? post : null
})

export function getPostsByTopic(topic: BlogTopicSlug): BlogPost[] {
	return getAllPosts().filter((post) => post.topic === topic)
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

export function serializeArticle(post: BlogPost): ArticleDocument {
	return post.document
}

export function serializeArticleMarkdown(post: BlogPost) {
	return post.markdown
}
