import type { ReactNode } from 'react'
import { asString, asStringArray } from '@/lib/blog-figures'

type AlgorithmLine = {
	number?: number
	indent?: number
	text?: string
}

type AlgorithmFigureProps = {
	spec: Record<string, unknown>
}

function inlineMarkdown(text: string) {
	const parts = text.split(/(\*\*[^*]+\*\*)/g)
	return parts.map((part, index) => {
		if (part.startsWith('**') && part.endsWith('**')) {
			return (
				<strong key={index} className="font-semibold text-foreground">
					{part.slice(2, -2)}
				</strong>
			)
		}
		return part
	})
}

export function AlgorithmFigure({ spec }: AlgorithmFigureProps) {
	const title = asString(spec.title)
	const note = asString(spec.note)
	const input = asStringArray(spec.input)
	const lines = Array.isArray(spec.lines) ? (spec.lines as AlgorithmLine[]) : []

	return (
		<div className="overflow-hidden rounded-lg border border-border bg-card">
			{title ? (
				<div className="border-b border-border px-4 py-3 text-sm font-semibold text-foreground">
					{title}
				</div>
			) : null}
			{input.length > 0 ? (
				<div className="border-b border-border px-4 py-3 text-[13px] leading-6 text-muted-foreground">
					<span className="font-medium text-foreground">Input: </span>
					{input.join(', ')}
				</div>
			) : null}
			<ol className="space-y-1.5 px-4 py-4 font-mono text-[13px] leading-6">
				{lines.map((line, index) => {
					const indent = typeof line.indent === 'number' ? line.indent : 0
					const content: ReactNode = inlineMarkdown(line.text ?? '')
					return (
						<li
							key={`${line.number ?? index}-${line.text ?? index}`}
							className="flex gap-3"
							style={{ paddingLeft: indent * 16 }}
						>
							<span className="w-6 shrink-0 text-right text-muted-foreground">
								{line.number ?? index + 1}
							</span>
							<span className="text-foreground/90">{content}</span>
						</li>
					)
				})}
			</ol>
			{note ? (
				<p className="border-t border-border px-4 py-3 text-sm leading-6 text-muted-foreground">
					{note}
				</p>
			) : null}
		</div>
	)
}
