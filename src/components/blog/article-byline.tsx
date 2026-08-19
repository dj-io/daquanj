import { AuthorAvatars } from '@/components/blog/author-avatar'
import { getAuthor, formatDateLong, type BlogPostMeta } from '@/lib/blog-meta'

export function ArticleByline({
	post,
}: {
	post: Pick<BlogPostMeta, 'date' | 'readingTime' | 'authors'>
}) {
	const authors = (post.authors?.length ? post.authors : ['daquan-johnson']).map(getAuthor)

	return (
		<div className="mt-5 flex items-center gap-2.5 text-sm">
			<AuthorAvatars ids={post.authors} />
			<p className="flex flex-wrap items-center gap-x-1.5 text-muted-foreground">
				<span className="font-medium text-foreground">
					{authors.map((author, index) => (
						<span key={author.id}>
							{index > 0 ? ', ' : null}
							{author.url ? (
								<a href={author.url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
									{author.name}
								</a>
							) : (
								author.name
							)}
						</span>
					))}
				</span>
				<span aria-hidden>·</span>
				<time dateTime={post.date}>{formatDateLong(post.date)}</time>
				<span aria-hidden>·</span>
				<span>{post.readingTime} min read</span>
			</p>
		</div>
	)
}
