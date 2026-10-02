import type { MetadataRoute } from 'next'
import { BLOG_TOPICS, blogOrigin, getAllPosts, toUtcDate } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
	const origin = blogOrigin()
	const posts = getAllPosts()
	const latest = posts[0] ? toUtcDate(posts[0].date) : new Date()

	return [
		{
			url: origin,
			lastModified: latest,
		},
		{
			url: `${origin}/blog`,
			lastModified: latest,
		},
		...posts.map((post) => ({
			url: `${origin}/blog/${post.slug}`,
			lastModified: toUtcDate(post.date),
		})),
		...Object.values(BLOG_TOPICS).flatMap((topic) => {
			const newest = posts.find((post) => post.topic === topic.slug)
			if (!newest) return []
			return [
				{
					url: `${origin}/blog/topic/${topic.slug}`,
					lastModified: toUtcDate(newest.date),
				},
			]
		}),
	]
}
