'use client'

import { useMemo, useState } from 'react'
import { BLOG_TOPICS, type BlogPostMeta, type BlogTopicSlug } from '@/lib/blog-meta'
import { PostList } from './post-list'
import { PostSearch } from './post-search'
import { TopicDropdown } from './topic-dropdown'

type BlogArchiveProps = {
	posts: BlogPostMeta[]
	topic?: BlogTopicSlug
}

function matchesQuery(post: BlogPostMeta, query: string) {
	const topic = BLOG_TOPICS[post.topic].label
	const haystack = `${post.title} ${post.description} ${topic}`.toLowerCase()
	return haystack.includes(query)
}

export function BlogArchive({ posts, topic }: BlogArchiveProps) {
	const [query, setQuery] = useState('')
	const [activeTopic, setActiveTopic] = useState<BlogTopicSlug | 'all'>(topic ?? 'all')
	const normalizedQuery = query.trim().toLowerCase()

	const visiblePosts = useMemo(() => {
		return posts.filter((post) => {
			if (activeTopic !== 'all' && post.topic !== activeTopic) return false
			if (normalizedQuery && !matchesQuery(post, normalizedQuery)) return false
			return true
		})
	}, [activeTopic, normalizedQuery, posts])

	const hasActiveFilter = Boolean(activeTopic !== 'all' || normalizedQuery)

	if (posts.length === 0 && !hasActiveFilter) return null

	return (
		<div className="mt-10">
			<div className="mb-6 flex items-center gap-3">
				<TopicDropdown active={activeTopic} onChange={setActiveTopic} />
				<PostSearch
					value={query}
					onChange={setQuery}
					className="ml-auto w-[min(100%,13.5rem)] sm:w-56"
				/>
			</div>
			<PostList posts={visiblePosts} />
		</div>
	)
}
