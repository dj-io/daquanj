import Image from 'next/image'
import { getAuthor, type BlogAuthor } from '@/lib/blog-meta'
import { cn } from '@/lib/utils'

export function AuthorAvatar({
	author,
	className,
}: {
	author: BlogAuthor
	className?: string
}) {
	if (author.image) {
		return (
			<Image
				src={author.image}
				alt=""
				width={48}
				height={48}
				className={cn('size-7 rounded-full object-cover', className)}
			/>
		)
	}

	return (
		<span
			className={cn(
				'flex size-7 items-center justify-center rounded-full bg-grit text-[11px] font-semibold text-white',
				className,
			)}
		>
			{author.initial}
		</span>
	)
}

export function AuthorAvatars({
	ids,
	className,
	avatarClassName,
}: {
	ids?: string[]
	className?: string
	avatarClassName?: string
}) {
	const authors = (ids?.length ? ids : ['daquan-johnson']).map(getAuthor)

	return (
		<div className={cn('flex items-center -space-x-1.5', className)} aria-hidden>
			{authors.map((author) => (
				<AuthorAvatar
					key={author.id}
					author={author}
					className={cn('ring-2 ring-background', avatarClassName)}
				/>
			))}
		</div>
	)
}
