import { asString } from '@/lib/blog-figures'

type CompassFigureProps = {
	spec: Record<string, unknown>
}

export function CompassFigure({ spec }: CompassFigureProps) {
	const label = asString(spec.label)
	const text = label === undefined ? 'Proven with Grit' : label

	return (
		<div className="flex items-center gap-3">
			<svg
				viewBox="0 0 72 84"
				className="h-auto w-28 shrink-0 overflow-visible text-foreground sm:w-32"
				role="img"
				aria-label="Drawing compass"
			>
				<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
					<circle cx="24.6" cy="60.5" r="22.4" strokeWidth="1.15" opacity="0.45" />

					<rect x="33.4" y="4" width="5.2" height="11" rx="1.4" strokeWidth="1.35" />
					<path
						d="M 32.2 16 L 36 13.6 L 39.8 16 L 38.8 21.2 L 36 23 L 33.2 21.2 Z"
						strokeWidth="1.4"
					/>
					<circle cx="36" cy="18" r="1.55" strokeWidth="1.15" />

					<g transform="rotate(15 36 18)">
						<line x1="36" y1="22" x2="36" y2="52" strokeWidth="2.35" />
						<circle cx="36" cy="49.5" r="1.7" strokeWidth="1.05" />
						<path d="M 34.7 52 L 36 62 L 37.3 52" strokeWidth="1.25" />
					</g>

					<g transform="rotate(-15 36 18)">
						<line x1="36" y1="22" x2="36" y2="46" strokeWidth="2.35" />
						<circle cx="36" cy="47.5" r="2" strokeWidth="1.15" />
						<path d="M 34.5 50 L 34.5 56.5 L 37.5 56.5 L 37.5 50" strokeWidth="1.2" />
						<line
							x1="36"
							y1="56.5"
							x2="36"
							y2="62"
							stroke="var(--blog-accent)"
							strokeWidth="1.7"
						/>
					</g>
				</g>
			</svg>
			{text ? (
				<span className="text-[1.05rem] leading-[1.7] text-foreground/90">{text}</span>
			) : null}
		</div>
	)
}
