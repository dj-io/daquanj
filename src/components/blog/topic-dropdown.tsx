'use client'

import { useRouter } from 'next/navigation'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { BLOG_TOPICS, type BlogTopicSlug } from '@/lib/blog-meta'
import { cn } from '@/lib/utils'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type TopicDropdownProps = {
	active?: BlogTopicSlug | 'all'
}

const FILTERS = [
	{ slug: 'all' as const, label: 'All', href: '/blog' },
	...Object.values(BLOG_TOPICS).map((topic) => ({
		slug: topic.slug,
		label: topic.label,
		href: `/blog/topic/${topic.slug}`,
	})),
]

export function TopicDropdown({ active = 'all' }: TopicDropdownProps) {
	const router = useRouter()
	const current = FILTERS.find((topic) => topic.slug === active) ?? FILTERS[0]

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				aria-label="Filter writing by topic"
				className={cn(
					'inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card px-3.5 py-1.5',
					'text-sm text-foreground outline-none',
					'hover:bg-accent/60',
					'focus-visible:ring-ring/50 focus-visible:ring-[3px]',
					'data-[state=open]:bg-accent/60',
					'[&[data-state=open]_svg]:rotate-180',
				)}
			>
				{current.label}
				<ChevronDownIcon className="size-3.5 text-muted-foreground transition-transform duration-200" />
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="start"
				sideOffset={8}
				className="min-w-40 rounded-xl border-border/80 bg-popover p-1.5"
			>
				{FILTERS.map((topic) => {
					const isActive = topic.slug === active

					return (
						<DropdownMenuItem
							key={topic.slug}
							onSelect={() => router.push(topic.href)}
							className="cursor-pointer justify-between rounded-lg px-3 py-2 text-sm"
						>
							<span>{topic.label}</span>
							{isActive && <CheckIcon className="size-3.5 text-foreground" />}
						</DropdownMenuItem>
					)
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
