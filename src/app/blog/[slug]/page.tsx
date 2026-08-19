import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { ArticleByline } from '@/components/blog/article-byline'
import { ArticlePager } from '@/components/blog/article-pager'
import { ArticleToc } from '@/components/blog/article-toc'
import { createMdxComponents } from '@/components/blog/mdx-components'
import {
	BLOG_TOPICS,
	adaptArticleMarkdown,
	blogOrigin,
	getAdjacentPosts,
	getAllPosts,
	getAuthor,
	getPostBySlug,
	type BlogPost,
} from '@/lib/blog'

type ArticlePageProps = {
	params: Promise<{ slug: string }>
}

function articleJsonLd(post: BlogPost) {
	const origin = blogOrigin()
	const url = `${origin}/blog/${post.slug}`
	const image = post.image
		? post.image.startsWith('http')
			? post.image
			: `${origin}${post.image}`
		: undefined

	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.description,
		datePublished: `${post.date}T00:00:00.000Z`,
		url,
		mainEntityOfPage: url,
		image,
		wordCount: post.wordCount,
		timeRequired: `PT${post.readingTime}M`,
		author: post.authors.map((id) => {
			const author = getAuthor(id)
			return {
				'@type': 'Person',
				name: author.name,
				url: author.url,
			}
		}),
	}
}

export function generateStaticParams() {
	return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
	const { slug } = await params
	const post = getPostBySlug(slug)
	if (!post) return {}

	const authors = post.authors.map((id) => {
		const author = getAuthor(id)
		return author.url ? { name: author.name, url: author.url } : { name: author.name }
	})
	const images = post.image
		? [{ url: post.image, alt: post.imageAlt ?? post.title }]
		: undefined

	return {
		title: `${post.title} · Writing`,
		description: post.description,
		authors,
		openGraph: {
			title: post.title,
			description: post.description,
			type: 'article',
			publishedTime: `${post.date}T00:00:00.000Z`,
			authors: authors.map((author) => author.name),
			images,
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description: post.description,
			images: post.image ? [post.image] : undefined,
		},
		alternates: {
			canonical: `/blog/${post.slug}`,
			types: {
				'application/json': `/blog/${post.slug}/article.json`,
				'text/markdown': `/blog/${post.slug}/index.md`,
			},
		},
	}
}

export default async function ArticlePage({ params }: ArticlePageProps) {
	const { slug } = await params
	const post = getPostBySlug(slug)
	if (!post) notFound()

	const topic = BLOG_TOPICS[post.topic]
	const { older, newer } = getAdjacentPosts(post.slug)
	const jsonLd = articleJsonLd(post)

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLd).replaceAll('<', '\\u003c'),
				}}
			/>

			<article className="mx-auto w-full max-w-3xl pb-28">
				<ArticleToc headings={post.headings} />

				<p className="mt-10 text-sm text-muted-foreground">
					<Link
						href={`/blog/topic/${topic.slug}`}
						className="transition-colors hover:text-foreground"
					>
						{topic.label}
					</Link>
				</p>
				<h1 className="mt-3 text-[2rem] font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
					{post.title}
				</h1>
				<p className="mt-3 max-w-2xl text-lg leading-7 text-muted-foreground">
					{post.description}
				</p>
				<ArticleByline post={post} />

				<div className="blog-prose mt-8">
					<MDXRemote
						source={adaptArticleMarkdown(post.content)}
						components={createMdxComponents(post.figures, {
							priorityFigureId:
								post.figureIds.find((id) => post.figures[id]?.kind === 'image') ??
								post.figureIds[0],
						})}
						options={{
							mdxOptions: {
								remarkPlugins: [remarkGfm],
								rehypePlugins: [rehypeSlug],
							},
						}}
					/>
				</div>
			</article>

			<ArticlePager older={older} newer={newer} />
		</>
	)
}
