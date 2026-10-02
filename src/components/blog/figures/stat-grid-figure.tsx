import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { asNumber, asString } from '@/lib/blog-figures'
import { cn } from '@/lib/utils'

type Stat = {
	label?: string
	value?: string
	delta?: string
	trend?: string
}

type StatGridFigureProps = {
	spec: Record<string, unknown>
}

export function StatGridFigure({ spec }: StatGridFigureProps) {
	const title = asString(spec.title)
	const columns = asNumber(spec.columns) ?? 4
	const stats = Array.isArray(spec.stats) ? (spec.stats as Stat[]) : []

	return (
		<Card className="gap-0 py-0 shadow-none">
			{title ? (
				<CardHeader className="py-4">
					<CardTitle className="text-base font-normal">{title}</CardTitle>
				</CardHeader>
			) : null}
			<CardContent
				className={cn(
					'grid gap-0 pb-2',
					columns >= 4 ? 'grid-cols-2 min-[40rem]:grid-cols-4' : 'grid-cols-2',
				)}
			>
				{stats.map((stat, index) => (
					<div
						key={`${stat.label ?? index}-${stat.value ?? index}`}
						className={cn(
							'space-y-1 border-border py-6',
							index < stats.length - 1 && 'border-b sm:border-b-0 sm:border-r sm:pr-6',
							index > 0 && 'sm:pl-6',
						)}
					>
						<p className="text-sm text-muted-foreground">{stat.label}</p>
						<p className="text-2xl tabular-nums text-foreground">{stat.value}</p>
						{stat.delta ? (
							<p className="text-xs leading-snug text-muted-foreground">{stat.delta}</p>
						) : null}
					</div>
				))}
			</CardContent>
		</Card>
	)
}
