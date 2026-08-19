import Image from 'next/image'
import Link from 'next/link'
import { BLOG_AUTHOR, BLOG_TOPICS, formatDate, type BlogPostMeta } from '@/lib/blog'
import { cn } from '@/lib/utils'

type PostCardProps = {
	post: BlogPostMeta
	variant?: 'lead' | 'tile'
}

export function PostCard({ post, variant = 'tile' }: PostCardProps) {
	const topic = BLOG_TOPICS[post.topic]
	const isLead = variant === 'lead'

	return (
		<Link
			href={`/blog/${post.slug}`}
			className={cn(
				'group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card',
				'transition-colors duration-300 hover:border-border',
			)}
		>
			<div
				className={cn(
					'relative overflow-hidden bg-zinc-950',
					isLead ? 'aspect-[16/9] sm:aspect-[2/1]' : 'aspect-[16/10]',
				)}
			>
				{post.image ? (
					<Image
						src={post.image}
						alt=""
						fill
						sizes={isLead ? '(min-width: 768px) 768px, 100vw' : '(min-width: 768px) 384px, 50vw'}
						className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
						priority={isLead}
					/>
				) : (
					<div className="flex h-full items-end bg-gradient-to-br from-zinc-900 to-zinc-950 p-5">
						<p className="font-crimson text-2xl italic text-white/80">{topic.label}</p>
					</div>
				)}
			</div>

			<div className={cn('flex flex-1 flex-col', isLead ? 'p-5 sm:p-6' : 'p-4 sm:p-5')}>
				<p className="text-xs text-muted-foreground">
					<time dateTime={post.date}>{formatDate(post.date)}</time>
					<span aria-hidden> · </span>
					<span>{topic.label}</span>
				</p>
				<h2
					className={cn(
						'mt-2 font-semibold tracking-tight text-foreground',
						isLead ? 'text-2xl leading-snug sm:text-[1.65rem]' : 'text-lg leading-snug',
					)}
				>
					{post.title}
				</h2>
				<p
					className={cn(
						'mt-2 text-muted-foreground',
						isLead ? 'line-clamp-3 text-sm leading-relaxed' : 'line-clamp-2 text-[13px] leading-relaxed',
					)}
				>
					{post.description}
				</p>
				<p className="mt-auto pt-4 text-xs text-muted-foreground">
					{BLOG_AUTHOR} · {post.readingTime} min read
				</p>
			</div>
		</Link>
	)
}
