import type { BlogHeading } from '@/lib/blog'

export function ArticleToc({ headings }: { headings: BlogHeading[] }) {
	const sections = headings.filter((heading) => heading.level === 2)
	if (sections.length < 3) return null

	return (
		<nav aria-label="On this page" className="mb-12">
			<p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
				Contents
			</p>
			<ol className="space-y-2">
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
		</nav>
	)
}
