import { asBoolean, asString } from '@/lib/blog-figures'
import { ArticleHeroFrame } from './article-hero-frame'

type PaintingFigureProps = {
	spec: Record<string, unknown>
}

export function PaintingFigure({ spec }: PaintingFigureProps) {
	const title = asString(spec.title)
	const subtitle = asString(spec.subtitle)
	const animate = asBoolean(spec.animate) ?? true
	const draw = animate ? 'paint-stroke' : undefined

	return (
		<ArticleHeroFrame title={title} subtitle={subtitle} wide>
			<svg
				viewBox="0 0 720 300"
				className="h-auto w-full"
				aria-hidden
			>
				<g fill="none" strokeLinecap="round" strokeLinejoin="round">
					<rect
						className={draw}
						pathLength={1}
						x="86"
						y="38"
						width="548"
						height="224"
						rx="2"
						stroke="rgba(255,255,255,0.16)"
						strokeWidth="1"
						style={{ animationDelay: '0ms' }}
					/>

					<path
						className={animate ? 'paint-drift' : undefined}
						d="M118 252 C 210 198, 410 92, 602 74"
						stroke="#5683D2"
						strokeWidth="1.15"
					/>
					<path
						className={draw}
						pathLength={1}
						d="M132 78 C 260 140, 430 210, 590 236"
						stroke="#E9541D"
						strokeWidth="1.05"
						opacity="0.85"
						style={{ animationDelay: '220ms' }}
					/>

					<g className={animate ? 'paint-float' : undefined}>
						<path
							className={draw}
							pathLength={1}
							d="M338 58 L356 102 L320 102 Z"
							stroke="#E8C36A"
							strokeWidth="1.2"
							style={{ animationDelay: '280ms' }}
						/>
						<path
							className={draw}
							pathLength={1}
							d="M356 54 L376 102 L338 102 Z"
							stroke="#7FA0DE"
							strokeWidth="1.15"
							style={{ animationDelay: '340ms' }}
						/>
						<path
							className={draw}
							pathLength={1}
							d="M376 60 L392 102 L356 102 Z"
							stroke="#E8C36A"
							strokeWidth="1.2"
							style={{ animationDelay: '400ms' }}
						/>
					</g>

					<circle
						className={draw}
						pathLength={1}
						cx="168"
						cy="176"
						r="44"
						stroke="rgba(255,255,255,0.78)"
						strokeWidth="1.2"
						style={{ animationDelay: '180ms' }}
					/>
					<circle cx="154" cy="166" r="3.2" fill="rgba(255,255,255,0.82)" />
					<circle cx="180" cy="166" r="3.2" fill="rgba(255,255,255,0.82)" />
					<path
						className={draw}
						pathLength={1}
						d="M148 190 C 158 204, 178 204, 188 190"
						stroke="#E9541D"
						strokeWidth="1.15"
						style={{ animationDelay: '420ms' }}
					/>

					<g stroke="rgba(255,255,255,0.28)" strokeWidth="0.9">
						{[0, 1, 2, 3, 4].map((index) => (
							<line
								key={index}
								className={draw}
								pathLength={1}
								x1={118}
								y1={118 + index * 7}
								x2={142}
								y2={112 + index * 7}
								style={{ animationDelay: `${480 + index * 40}ms` }}
							/>
						))}
					</g>

					<g className={animate ? 'paint-dots' : undefined}>
						{(
							[
								['#5683D2', 248],
								['#439858', 292],
								['#E9541D', 336],
								['#DEB1B9', 380],
								['#E8C36A', 424],
							] as const
						).map(([color, x]) => (
							<circle
								key={color}
								cx={x}
								cy={248}
								r="5.5"
								fill={color}
								stroke="rgba(255,255,255,0.2)"
								strokeWidth="0.6"
							/>
						))}
					</g>

					<text
						x="508"
						y="92"
						fill="rgba(255,255,255,0.45)"
						fontSize="11"
						fontFamily="ui-sans-serif, system-ui, sans-serif"
						letterSpacing="0.18em"
					>
						CANVAS
					</text>
					<text
						x="96"
						y="272"
						fill="rgba(255,255,255,0.32)"
						fontSize="10"
						fontFamily="ui-sans-serif, system-ui, sans-serif"
						letterSpacing="0.16em"
					>
						EASEL
					</text>
				</g>
			</svg>
		</ArticleHeroFrame>
	)
}
