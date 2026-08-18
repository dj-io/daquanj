import Link from 'next/link'
import type { BlogPostMeta } from '@/lib/blog'
import { PostMeta } from './post-meta'

export function FeaturedPost({ post }: { post: BlogPostMeta }) {
	return (
		<Link
			href={`/blog/${post.slug}`}
			className="group block border-b border-border/60 pb-10"
		>
			<p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
				Latest
			</p>
			<h2 className="max-w-xl font-crimson text-4xl italic leading-[1.15] text-grit transition-colors group-hover:text-foreground md:text-[2.75rem]">
				{post.title}
			</h2>
			<p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
				{post.description}
			</p>
			<PostMeta post={post} className="mt-5" />
		</Link>
	)
}
