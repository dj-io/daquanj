import { BLOG_TOPICS, getFeaturedPost, type BlogPostMeta, type BlogTopicSlug } from '@/lib/blog'
import { FeaturedPost } from './featured-post'
import { PostList } from './post-list'
import { TopicFilter } from './topic-filter'

type BlogIndexProps = {
	posts: BlogPostMeta[]
	topic?: BlogTopicSlug
	counts?: Partial<Record<BlogTopicSlug | 'all', number>>
}

export function BlogIndex({ posts, topic, counts }: BlogIndexProps) {
	const featured = topic ? undefined : getFeaturedPost(posts)
	const list = featured
		? posts.filter((post) => post.slug !== featured.slug)
		: posts
	const activeTopic = topic ? BLOG_TOPICS[topic] : undefined

	return (
		<div className="mx-auto w-full max-w-2xl">
			<header className="mb-12">
				<p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
					Writing
				</p>
				<h1 className="mt-3 font-crimson text-4xl italic leading-tight text-grit md:text-5xl">
					{activeTopic?.label ?? 'Notes on building and thinking'}
				</h1>
				<p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
					{activeTopic?.description ??
						'Field notes from applied AI, shipping software, and the work of thinking clearly.'}
				</p>
				<div className="mt-8 flex flex-wrap items-center justify-between gap-4">
					<TopicFilter active={topic ?? 'all'} counts={counts} />
					<a
						href="/blog/rss.xml"
						className="text-xs tracking-wide text-muted-foreground transition-colors hover:text-foreground"
					>
						RSS
					</a>
				</div>
			</header>

			{featured && <FeaturedPost post={featured} />}

			<div className={featured ? 'pt-2' : undefined}>
				{featured && list.length > 0 && (
					<p className="pt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
						More writing
					</p>
				)}
				<PostList
					posts={list}
					emptyLabel={
						activeTopic
							? `No ${activeTopic.label.toLowerCase()} pieces yet.`
							: 'Nothing published yet.'
					}
				/>
			</div>
		</div>
	)
}
