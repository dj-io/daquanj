import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, serializeArticle } from '@/lib/blog'

type ArticleJsonProps = {
	params: Promise<{ slug: string }>
}

export function generateStaticParams() {
	return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function GET(_request: Request, { params }: ArticleJsonProps) {
	const { slug } = await params
	const post = getPostBySlug(slug)
	if (!post) notFound()

	return Response.json(serializeArticle(post), {
		headers: {
			'Cache-Control': 's-maxage=3600, stale-while-revalidate',
		},
	})
}
