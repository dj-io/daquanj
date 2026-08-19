import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { ArticleByline } from '@/components/blog/article-byline'
import { ArticleFigure } from '@/components/blog/article-figure'
import { ArticlePager } from '@/components/blog/article-pager'
import { ArticleToc } from '@/components/blog/article-toc'
import { mdxComponents } from '@/components/blog/mdx-components'
import {
	BLOG_TOPICS,
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
			<article className="mx-auto w-full max-w-2xl pb-28">
				<ArticleToc headings={post.headings} />

				<p className="mt-10 text-sm text-muted-foreground">{topic.label}</p>
				<h1 className="mt-3 text-[2rem] font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
					{post.title}
				</h1>
				<ArticleByline post={post} />

				{post.image ? (
					<ArticleFigure
						src={post.image}
						title={post.imageTitle}
						subtitle={post.imageSubtitle}
						alt={post.imageTitle ?? post.title}
						priority
						className="mt-10"
					/>
				) : null}

				<div className="blog-prose mt-2">
					<MDXRemote
						source={post.content}
						components={mdxComponents}
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
