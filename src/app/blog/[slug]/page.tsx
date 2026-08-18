import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { ArticleToc } from '@/components/blog/article-toc'
import { mdxComponents } from '@/components/blog/mdx-components'
import { PostList } from '@/components/blog/post-list'
import { PostMeta } from '@/components/blog/post-meta'
import {
	BLOG_TOPICS,
	getAllPosts,
	getPostBySlug,
	getRelatedPosts,
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
	const related = getRelatedPosts(post)

	return (
		<article className="mx-auto w-full max-w-2xl">
			<nav className="mb-10 text-xs tracking-wide text-muted-foreground">
				<Link href="/blog" className="transition-colors hover:text-foreground">
					Writing
				</Link>
				<span className="mx-2" aria-hidden>
					/
				</span>
				<Link
					href={`/blog/topic/${topic.slug}`}
					className="transition-colors hover:text-foreground"
				>
					{topic.label}
				</Link>
			</nav>

			<header className="mb-10">
				<h1 className="font-crimson text-4xl italic leading-tight text-grit md:text-5xl">
					{post.title}
				</h1>
				<p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
					{post.description}
				</p>
				<PostMeta post={post} className="mt-6" />
			</header>

			<ArticleToc headings={post.headings} />

			<div className="blog-prose">
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

			{related.length > 0 && (
				<section className="mt-20 border-t border-border/60 pt-10">
					<p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
						More in {topic.label}
					</p>
					<PostList posts={related} />
				</section>
			)}
		</article>
	)
}
