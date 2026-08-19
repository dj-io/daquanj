'use client'

import type { BlogHeading } from '@/lib/blog-meta'
import { cn } from '@/lib/utils'

export function ArticleToc({ headings }: { headings: BlogHeading[] }) {
	const sections = headings.filter((heading) => heading.level === 2)
	if (sections.length === 0) return null

	return (
		<details className="group rounded-lg bg-muted/80 open:bg-muted">
			<summary
				className={cn(
					'flex cursor-pointer list-none items-center gap-2.5 px-4 py-3 text-sm font-medium text-foreground',
					'[&::-webkit-details-marker]:hidden',
				)}
			>
				<span
					aria-hidden
					className="inline-block text-[0.65rem] leading-none transition-transform duration-200 group-open:rotate-90"
				>
					▶
				</span>
				On this page
			</summary>
			<ol className="space-y-2.5 px-4 pb-4">
				{sections.map((heading) => (
					<li key={heading.id}>
						<a
							href={`#${heading.id}`}
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							{heading.text}
						</a>
					</li>
				))}
			</ol>
		</details>
	)
}
