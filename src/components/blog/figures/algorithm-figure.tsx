import type { ReactNode } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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
		<Card className="gap-0 py-0 shadow-none">
			{title ? (
				<CardHeader className="border-b py-4">
					<CardTitle className="text-sm">{title}</CardTitle>
				</CardHeader>
			) : null}
			{input.length > 0 ? (
				<CardContent className="border-b py-3 text-[13px] leading-6 text-muted-foreground">
					<span className="font-medium text-foreground">Input: </span>
					{input.join(', ')}
				</CardContent>
			) : null}
			<CardContent className="py-4">
				<ol className="space-y-1.5 font-mono text-[13px] leading-6">
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
			</CardContent>
			{note ? (
				<CardFooter className="border-t py-3 text-sm leading-6 text-muted-foreground">
					{note}
				</CardFooter>
			) : null}
		</Card>
	)
}
