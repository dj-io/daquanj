import { BLOG_TOPICS, type BlogPostMeta, type BlogTopicSlug } from '@/lib/blog'
import { PostCard } from './post-card'
import { PostList } from './post-list'
import { TopicDropdown } from './topic-dropdown'

type BlogIndexProps = {
	posts: BlogPostMeta[]
	topic?: BlogTopicSlug
}

export function BlogIndex({ posts, topic }: BlogIndexProps) {
	const [lead, ...remaining] = posts
	const tiles = remaining.slice(0, 2)
	const archive = remaining.slice(2)
	const activeTopic = topic ? BLOG_TOPICS[topic] : undefined

	return (
		<div className="mx-auto w-full max-w-3xl">
			<header className="mb-8">
				<TopicDropdown active={topic ?? 'all'} />
			</header>

			{lead ? (
				<div className="space-y-4">
					<PostCard post={lead} variant="lead" />
					{tiles.length > 0 && (
						<div className="grid grid-cols-2 gap-4">
							{tiles.map((post) => (
								<PostCard key={post.slug} post={post} variant="tile" />
							))}
						</div>
					)}
				</div>
			) : (
				<p className="py-16 text-center text-sm text-muted-foreground">
					{activeTopic
						? `No ${activeTopic.label.toLowerCase()} pieces yet.`
						: 'Nothing published yet.'}
				</p>
			)}

			{archive.length > 0 && (
				<div className="mt-4">
					<PostList posts={archive} />
				</div>
			)}
		</div>
	)
}
