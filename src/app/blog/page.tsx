import { BlogIndex } from '@/components/blog/blog-index'
import { getAllPosts } from '@/lib/blog'

export default function BlogPage() {
	return <BlogIndex posts={getAllPosts()} />
}
