import { BLOG_TOPICS, blogOrigin, getAllPosts } from '@/lib/blog'

function siteUrl() {
	return blogOrigin()
}

function escapeXml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
}

export function GET() {
	const origin = siteUrl()
	const posts = getAllPosts()

	const items = posts
		.map((post) => {
			const url = `${origin}/blog/${post.slug}`
			return `
		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${url}</link>
			<guid>${url}</guid>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
			<category>${escapeXml(BLOG_TOPICS[post.topic].label)}</category>
			<description>${escapeXml(post.description)}</description>
		</item>`
		})
		.join('')

	const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
	<channel>
		<title>Da'Quan Johnson — Writing</title>
		<link>${origin}/blog</link>
		<description>Field notes from applied AI, shipping software, and the work of thinking clearly.</description>
		${items}
	</channel>
</rss>`

	return new Response(feed, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 's-maxage=3600, stale-while-revalidate',
		},
	})
}
