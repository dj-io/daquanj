import type { Metadata } from 'next'
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
	getAdjacentPosts,
	getAllPosts,
	getPostBySlug,
} from '@/lib/blog'

type ArticlePageProps = {
	params: Promise<{ slug: string }>
}

export function generateStaticParams() {
	return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
	const { slug } = await params
	const post = getPostBySlug(slug)
	if (!post) return {}

	return {
		title: `${post.title} · Writing`,
		description: post.description,
		openGraph: {
			title: post.title,
			description: post.description,
			type: 'article',
			publishedTime: post.date,
			images: post.image ? [{ url: post.image }] : undefined,
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

	return (
		<>
			<article className="mx-auto w-full max-w-3xl pb-28">
				<ArticleToc headings={post.headings} />

				<p className="mt-10 text-sm text-muted-foreground">{topic.label}</p>
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
