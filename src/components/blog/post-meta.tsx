import Link from 'next/link'
import { BLOG_TOPICS, formatDate, type BlogPostMeta } from '@/lib/blog'
import { cn } from '@/lib/utils'

type PostMetaProps = {
	post: Pick<BlogPostMeta, 'date' | 'topic' | 'readingTime'>
	className?: string
}

export function PostMeta({ post, className }: PostMetaProps) {
	const topic = BLOG_TOPICS[post.topic]

	return (
		<p
			className={cn(
				'flex flex-wrap items-center gap-x-2 text-xs tracking-wide text-muted-foreground',
				className,
			)}
		>
			<time dateTime={post.date}>{formatDate(post.date)}</time>
			<span aria-hidden>·</span>
			<Link
				href={`/blog/topic/${topic.slug}`}
				className="transition-colors hover:text-foreground"
			>
				{topic.label}
			</Link>
			<span aria-hidden>·</span>
			<span>{post.readingTime} min</span>
		</p>
	)
}
