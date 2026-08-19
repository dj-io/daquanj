import type { BlogPostMeta, BlogTopicSlug } from '@/lib/blog-meta'
import { BlogArchive } from './blog-archive'
import { PostCard } from './post-card'

type BlogIndexProps = {
	posts: BlogPostMeta[]
	topic?: BlogTopicSlug
}

export function BlogIndex({ posts, topic }: BlogIndexProps) {
	const [lead, ...remaining] = posts
	const tiles = remaining.slice(0, 2)
	const archive = remaining.slice(2)

	return (
		<div className="mx-auto w-full max-w-3xl">
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
				<p className="py-16 text-sm text-muted-foreground">Nothing published yet.</p>
			)}

			<BlogArchive posts={archive} topic={topic} />
		</div>
	)
}
