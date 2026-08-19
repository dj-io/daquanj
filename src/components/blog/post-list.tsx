import Link from 'next/link'
import { BLOG_AUTHOR, BLOG_TOPICS, formatDate, type BlogPostMeta } from '@/lib/blog'

type PostListProps = {
	posts: BlogPostMeta[]
	emptyLabel?: string
}

export function PostList({ posts, emptyLabel = 'Nothing here yet.' }: PostListProps) {
	if (posts.length === 0) {
		return (
			<p className="py-16 text-center text-sm text-muted-foreground">
				{emptyLabel}
			</p>
		)
	}

	return (
		<ul>
			{posts.map((post) => {
				const topic = BLOG_TOPICS[post.topic]

				return (
					<li key={post.slug} className="border-b border-border/70 last:border-b-0">
						<Link
							href={`/blog/${post.slug}`}
							className="group block py-5 transition-colors"
						>
							<p className="text-xs text-muted-foreground">
								<time dateTime={post.date}>{formatDate(post.date)}</time>
								<span aria-hidden> · </span>
								<span>{topic.label}</span>
							</p>
							<h2 className="mt-1.5 text-[1.05rem] font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-grit">
								{post.title}
							</h2>
							<p className="mt-1.5 text-xs text-muted-foreground">
								{BLOG_AUTHOR} · {post.readingTime}m
							</p>
						</Link>
					</li>
				)
			})}
		</ul>
	)
}
