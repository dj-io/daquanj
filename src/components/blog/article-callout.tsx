import type { ReactNode } from 'react'

export function Callout({
	title,
	children,
}: {
	title: string
	children?: ReactNode
}) {
	return (
		<div
			role="note"
			className="relative my-8 flex w-full flex-col gap-2 border border-dashed border-blog-accent/40 px-4 pb-3.5 pt-4 text-sm text-muted-foreground"
		>
			<h5 className="text-sm tracking-tight text-foreground">{title}</h5>
			{children ? <div className="text-sm leading-6 [&_p]:my-0">{children}</div> : null}
		</div>
	)
}
