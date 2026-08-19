import Link from 'next/link'
import { AuthorAvatars } from '@/components/blog/author-avatar'
import { getAuthor, BLOG_TOPICS, formatDate, type BlogPostMeta } from '@/lib/blog-meta'
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
						const authors = (post.authors?.length ? post.authors : ['daquan-johnson']).map(getAuthor)

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
									<p className="mt-2 flex items-center gap-2 text-[13px] text-muted-foreground">
										<AuthorAvatars ids={post.authors} avatarClassName="size-5 ring-1 ring-background" />
										<span>
											{authors.map((author) => author.name).join(', ')} · {post.readingTime}m
										</span>
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
