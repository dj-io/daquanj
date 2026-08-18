import Link from 'next/link'
import type { BlogPostMeta } from '@/lib/blog'
import { PostMeta } from './post-meta'

type PostListProps = {
	posts: BlogPostMeta[]
	emptyLabel?: string
}

export function PostList({ posts, emptyLabel = 'Nothing here yet.' }: PostListProps) {
	if (posts.length === 0) {
		return (
			<p className="py-16 text-center font-crimson text-xl italic text-muted-foreground">
				{emptyLabel}
			</p>
		)
	}

	return (
		<ul className="divide-y divide-border/60">
			{posts.map((post) => (
				<li key={post.slug}>
					<Link
						href={`/blog/${post.slug}`}
						className="group block py-7 transition-colors"
					>
						<PostMeta post={post} className="mb-2" />
						<h2 className="font-crimson text-2xl italic leading-snug text-grit transition-colors group-hover:text-foreground">
							{post.title}
						</h2>
						<p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
							{post.description}
						</p>
					</Link>
				</li>
			))}
		</ul>
	)
}
