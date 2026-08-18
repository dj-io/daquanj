import Link from 'next/link'
import { BLOG_TOPICS, type BlogTopicSlug } from '@/lib/blog'
import { cn } from '@/lib/utils'

type TopicFilterProps = {
	active?: BlogTopicSlug | 'all'
	counts?: Partial<Record<BlogTopicSlug | 'all', number>>
}

const FILTERS = [
	{ slug: 'all' as const, label: 'All', href: '/blog' },
	...Object.values(BLOG_TOPICS).map((topic) => ({
		slug: topic.slug,
		label: topic.label,
		href: `/blog/topic/${topic.slug}`,
	})),
]

export function TopicFilter({ active = 'all', counts }: TopicFilterProps) {
	return (
		<nav aria-label="Writing topics" className="flex flex-wrap items-center gap-x-5 gap-y-2">
			{FILTERS.map((topic) => {
				const isActive = topic.slug === active
				const count = counts?.[topic.slug]

				return (
					<Link
						key={topic.slug}
						href={topic.href}
						className={cn(
							'text-sm tracking-wide transition-colors duration-300',
							isActive
								? 'text-grit'
								: 'text-muted-foreground hover:text-foreground',
						)}
					>
						{topic.label}
						{typeof count === 'number' && (
							<span className="ml-1.5 text-xs text-muted-foreground/70">
								{count}
							</span>
						)}
					</Link>
				)
			})}
		</nav>
	)
}
