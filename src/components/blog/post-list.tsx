import Link from 'next/link'
import { BLOG_AUTHOR, BLOG_TOPICS, formatDate, type BlogPostMeta } from '@/lib/blog-meta'
import { cn } from '@/lib/utils'

type PostListProps = {
	posts: BlogPostMeta[]
	emptyLabel?: string
	className?: string
}

export function PostList({
	posts,
	emptyLabel = 'No posts found',
	className,
}: PostListProps) {
	return (
		<div
			className={cn(
				'overflow-hidden rounded-2xl border border-border bg-card',
				className,
			)}
		>
			{posts.length === 0 ? (
				<p className="px-5 py-16 text-sm text-muted-foreground">{emptyLabel}</p>
			) : (
				<ul>
					{posts.map((post) => {
						const topic = BLOG_TOPICS[post.topic]

						return (
							<li
								key={post.slug}
								className="border-b border-border last:border-b-0"
							>
								<Link
									href={`/blog/${post.slug}`}
									className="group block px-5 py-6 transition-colors hover:bg-muted/40"
								>
									<p className="text-[13px] text-muted-foreground">
										<time dateTime={post.date}>{formatDate(post.date)}</time>
										<span aria-hidden> · </span>
										<span>{topic.label}</span>
									</p>
									<h2 className="mt-2 text-[1.15rem] font-semibold leading-snug tracking-tight text-foreground">
										{post.title}
									</h2>
									<p className="mt-2 text-[13px] text-muted-foreground">
										{BLOG_AUTHOR} · {post.readingTime}m
									</p>
								</Link>
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}
