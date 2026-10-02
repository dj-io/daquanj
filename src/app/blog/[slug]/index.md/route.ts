import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, serializeArticleMarkdown } from '@/lib/blog'

type ArticleMarkdownProps = {
	params: Promise<{ slug: string }>
}

export function generateStaticParams() {
	return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function GET(_request: Request, { params }: ArticleMarkdownProps) {
	const { slug } = await params
	const post = getPostBySlug(slug)
	if (!post) notFound()

	return new Response(serializeArticleMarkdown(post), {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Cache-Control': 's-maxage=3600, stale-while-revalidate',
		},
	})
}
