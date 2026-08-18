import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogIndex } from '@/components/blog/blog-index'
import { BLOG_TOPICS, getAllPosts, getPostsByTopic, getTopic, type BlogTopicSlug } from '@/lib/blog'

type TopicPageProps = {
	params: Promise<{ topic: string }>
}

export function generateStaticParams() {
	return Object.keys(BLOG_TOPICS).map((topic) => ({ topic }))
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
	const { topic: slug } = await params
	const topic = getTopic(slug)
	if (!topic) return {}

	return {
		title: `${topic.label} · Writing`,
		description: topic.description,
	}
}

export default async function TopicPage({ params }: TopicPageProps) {
	const { topic: slug } = await params
	const topic = getTopic(slug)
	if (!topic) notFound()

	const posts = getAllPosts()
	const counts = {
		all: posts.length,
		...Object.fromEntries(
			Object.values(BLOG_TOPICS).map((item) => [
				item.slug,
				posts.filter((post) => post.topic === item.slug).length,
			]),
		),
	}

	return (
		<BlogIndex
			posts={getPostsByTopic(topic.slug as BlogTopicSlug)}
			topic={topic.slug}
			counts={counts}
		/>
	)
}
