import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogIndex } from '@/components/blog/blog-index'
import { BLOG_TOPICS, getPostsByTopic, getTopic } from '@/lib/blog'

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
		openGraph: {
			title: `${topic.label} · Writing`,
			description: topic.description,
			type: 'website',
		},
		alternates: {
			canonical: `/blog/topic/${topic.slug}`,
		},
	}
}

export default async function TopicPage({ params }: TopicPageProps) {
	const { topic: slug } = await params
	const topic = getTopic(slug)
	if (!topic) notFound()

	return <BlogIndex posts={getPostsByTopic(topic.slug)} topic={topic.slug} />
}
