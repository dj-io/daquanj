import { BLOG_TOPICS, blogOrigin, getAllPosts, toUtcDate } from '@/lib/blog'

function escapeXml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
}

export function GET() {
	const origin = blogOrigin()
	const posts = getAllPosts()
	const lastBuildDate = (posts[0] ? toUtcDate(posts[0].date) : new Date()).toUTCString()

	const items = posts
		.map((post) => {
			const url = `${origin}/blog/${post.slug}`
			return `
		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${url}</link>
			<guid>${url}</guid>
			<pubDate>${toUtcDate(post.date).toUTCString()}</pubDate>
			<category>${escapeXml(BLOG_TOPICS[post.topic].label)}</category>
			<description>${escapeXml(post.description)}</description>
		</item>`
		})
		.join('')

	const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Da'Quan Johnson — Writing</title>
		<link>${origin}/blog</link>
		<atom:link href="${origin}/blog/rss.xml" rel="self" type="application/rss+xml" />
		<description>Field notes from applied AI, shipping software, and the work of thinking clearly.</description>
		<language>en-us</language>
		<lastBuildDate>${lastBuildDate}</lastBuildDate>
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
