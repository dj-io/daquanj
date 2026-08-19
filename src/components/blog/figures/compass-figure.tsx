import { asBoolean, asString } from '@/lib/blog-figures'

type CompassFigureProps = {
	spec: Record<string, unknown>
}

export function CompassFigure({ spec }: CompassFigureProps) {
	const animate = asBoolean(spec.animate) ?? true
	const label = asString(spec.label)
	const text = label === undefined ? 'Proven with Grit' : label
	const draw = animate ? 'compass-stroke' : undefined
	const wait = (ms: number) => (animate ? { animationDelay: `${ms}ms` } : undefined)

	return (
		<div className="flex flex-col items-center gap-4">
			<svg
				viewBox="0 0 200 200"
				className="h-auto w-28 overflow-visible text-foreground sm:w-32"
				role="img"
				aria-label="Drawing compass"
			>
				<g
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					className={animate ? 'compass-idle' : undefined}
				>
					<circle
						className={animate ? 'compass-arc' : undefined}
						pathLength={1}
						cx="65"
						cy="163"
						r="69"
						strokeWidth="0.85"
						opacity="0.28"
					/>

					{/* Handle */}
					<rect
						className={draw}
						pathLength={1}
						x="94"
						y="10"
						width="12"
						height="24"
						rx="3.2"
						strokeWidth="1.7"
						style={wait(40)}
					/>
					{[0, 1, 2, 3, 4, 5, 6].map((index) => (
						<line
							key={`knurl-${index}`}
							className={draw}
							pathLength={1}
							x1="96.5"
							y1={14 + index * 2.6}
							x2="103.5"
							y2={14 + index * 2.6}
							strokeWidth="0.7"
							opacity="0.55"
							style={wait(80 + index * 30)}
						/>
					))}

					{/* Hinge / head */}
					<path
						className={draw}
						pathLength={1}
						d="M 90 34 L 100 30 L 110 34 L 108 46 L 100 50 L 92 46 Z"
						strokeWidth="1.8"
						style={wait(120)}
					/>
					<circle
						className={draw}
						pathLength={1}
						cx="100"
						cy="40"
						r="3.4"
						strokeWidth="1.4"
						style={wait(180)}
					/>

					{/* Needle leg */}
					<g className={animate ? 'compass-leg-left' : 'compass-leg-left-rest'}>
						<line
							className={draw}
							pathLength={1}
							x1="100"
							y1="48"
							x2="100"
							y2="140"
							strokeWidth="3.4"
							style={wait(160)}
						/>
						<line
							className={draw}
							pathLength={1}
							x1="98.2"
							y1="56"
							x2="98.2"
							y2="132"
							strokeWidth="0.8"
							opacity="0.35"
							style={wait(200)}
						/>
						<circle
							className={draw}
							pathLength={1}
							cx="100"
							cy="132"
							r="4.2"
							strokeWidth="1.35"
							style={wait(320)}
						/>
						{[0, 1, 2].map((index) => (
							<line
								key={`needle-screw-${index}`}
								className={draw}
								pathLength={1}
								x1={100 + Math.cos((index * 2 * Math.PI) / 3) * 1.6}
								y1={132 + Math.sin((index * 2 * Math.PI) / 3) * 1.6}
								x2={100 + Math.cos((index * 2 * Math.PI) / 3) * 3.4}
								y2={132 + Math.sin((index * 2 * Math.PI) / 3) * 3.4}
								strokeWidth="0.7"
								style={wait(360)}
							/>
						))}
						<path
							className={draw}
							pathLength={1}
							d="M 97.4 140 L 100 168 L 102.6 140"
							strokeWidth="1.7"
							style={wait(280)}
						/>
					</g>

					{/* Pencil / lead leg */}
					<g className={animate ? 'compass-leg-right' : 'compass-leg-right-rest'}>
						<line
							className={draw}
							pathLength={1}
							x1="100"
							y1="48"
							x2="100"
							y2="112"
							strokeWidth="3.4"
							style={wait(200)}
						/>
						<line
							className={draw}
							pathLength={1}
							x1="101.8"
							y1="56"
							x2="101.8"
							y2="104"
							strokeWidth="0.8"
							opacity="0.35"
							style={wait(240)}
						/>
						<circle
							className={draw}
							pathLength={1}
							cx="100"
							cy="116"
							r="5"
							strokeWidth="1.45"
							style={wait(360)}
						/>
						<circle
							className={draw}
							pathLength={1}
							cx="107.5"
							cy="116"
							r="2.4"
							strokeWidth="1.1"
							style={wait(400)}
						/>
						<path
							className={draw}
							pathLength={1}
							d="M 96.4 122 L 96.4 148 L 103.6 148 L 103.6 122"
							strokeWidth="1.6"
							style={wait(320)}
						/>
						<g className={animate ? 'compass-lead' : undefined}>
							<line
								className={draw}
								pathLength={1}
								x1="100"
								y1="148"
								x2="100"
								y2="168"
								stroke="var(--blog-accent)"
								strokeWidth="2.15"
								style={wait(420)}
							/>
						</g>
					</g>
				</g>
			</svg>
			{text ? (
				<p className="text-center text-sm tracking-[0.04em] text-muted-foreground">{text}</p>
			) : null}
		</div>
	)
}
