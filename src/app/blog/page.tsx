import { BlogIndex } from '@/components/blog/blog-index'
import { BLOG_TOPICS, getAllPosts } from '@/lib/blog'

export default function BlogPage() {
	const posts = getAllPosts()
	const counts = {
		all: posts.length,
		...Object.fromEntries(
			Object.values(BLOG_TOPICS).map((topic) => [
				topic.slug,
				posts.filter((post) => post.topic === topic.slug).length,
			]),
		),
	}

	return <BlogIndex posts={posts} counts={counts} />
}
