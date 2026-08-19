import { BLOG_AUTHOR, formatDateLong, type BlogPostMeta } from '@/lib/blog-meta'

export function ArticleByline({
	post,
}: {
	post: Pick<BlogPostMeta, 'date' | 'readingTime'>
}) {
	return (
		<div className="mt-5 flex items-center gap-2.5 text-sm">
			<div
				aria-hidden
				className="flex size-7 shrink-0 items-center justify-center rounded-full bg-grit text-[11px] font-semibold text-white"
			>
				D
			</div>
			<p className="flex flex-wrap items-center gap-x-1.5 text-muted-foreground">
				<span className="font-medium text-foreground">{BLOG_AUTHOR}</span>
				<span aria-hidden>·</span>
				<time dateTime={post.date}>{formatDateLong(post.date)}</time>
				<span aria-hidden>·</span>
				<span>{post.readingTime} min read</span>
			</p>
		</div>
	)
}
