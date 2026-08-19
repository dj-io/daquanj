import { asBoolean } from '@/lib/blog-figures'

type PaintingFigureProps = {
	spec: Record<string, unknown>
}

export function PaintingFigure({ spec }: PaintingFigureProps) {
	const animate = asBoolean(spec.animate) ?? true
	const draw = animate ? 'paint-stroke' : undefined

	return (
		<svg viewBox="0 0 760 420" className="h-auto w-full text-foreground" aria-hidden>
			<g fill="none" strokeLinecap="round" strokeLinejoin="round">
				<path
					className={animate ? 'paint-drift' : undefined}
					d="M48 356 C 170 280, 390 110, 730 72"
					stroke="#5683D2"
					strokeWidth="1.35"
				/>
				<path
					className={draw}
					pathLength={1}
					d="M64 48 C 250 160, 470 290, 720 372"
					stroke="#E9541D"
					strokeWidth="1.2"
					style={{ animationDelay: '160ms' }}
				/>
				<path
					className={draw}
					pathLength={1}
					d="M90 210 C 240 40, 520 40, 680 190"
					stroke="#7FA0DE"
					strokeWidth="0.9"
					opacity="0.7"
					style={{ animationDelay: '240ms' }}
				/>

				<g className={animate ? 'paint-float' : undefined}>
					<path
						className={draw}
						pathLength={1}
						d="M332 36 L358 108 H306 Z"
						stroke="#E8C36A"
						strokeWidth="1.45"
						style={{ animationDelay: '200ms' }}
					/>
					<path
						className={draw}
						pathLength={1}
						d="M358 28 L390 108 H332 Z"
						stroke="#5683D2"
						strokeWidth="1.35"
						style={{ animationDelay: '280ms' }}
					/>
					<path
						className={draw}
						pathLength={1}
						d="M390 40 L418 108 H358 Z"
						stroke="#E8C36A"
						strokeWidth="1.45"
						style={{ animationDelay: '360ms' }}
					/>
					<circle
						className={draw}
						pathLength={1}
						cx="364"
						cy="128"
						r="22"
						stroke="#5683D2"
						strokeWidth="1"
						style={{ animationDelay: '420ms' }}
					/>
				</g>

				<g stroke="currentColor">
					<ellipse
						className={draw}
						pathLength={1}
						cx="168"
						cy="268"
						rx="78"
						ry="86"
						strokeWidth="1.55"
						style={{ animationDelay: '80ms' }}
					/>
					<circle cx="142" cy="248" r="7" fill="currentColor" stroke="none" />
					<circle cx="188" cy="246" r="7" fill="currentColor" stroke="none" />
					<circle cx="142" cy="248" r="2.4" fill="#E9541D" stroke="none" />
					<circle cx="188" cy="246" r="2.4" fill="#E9541D" stroke="none" />
					<path
						className={draw}
						pathLength={1}
						d="M118 292 C 138 322, 198 326, 218 290"
						stroke="#E9541D"
						strokeWidth="1.4"
						style={{ animationDelay: '320ms' }}
					/>
					{[0, 1, 2, 3, 4].map((index) => (
						<line
							key={`tooth-${index}`}
							className={draw}
							pathLength={1}
							x1={136 + index * 12}
							y1={304}
							x2={136 + index * 12}
							y2={318}
							stroke="currentColor"
							strokeWidth="1.05"
							style={{ animationDelay: `${380 + index * 30}ms` }}
						/>
					))}
				</g>

				<g stroke="currentColor" opacity="0.7">
					<ellipse
						className={draw}
						pathLength={1}
						cx="118"
						cy="92"
						rx="36"
						ry="40"
						strokeWidth="1.2"
						style={{ animationDelay: '140ms' }}
					/>
					<circle cx="106" cy="84" r="3.2" fill="currentColor" stroke="none" />
					<circle cx="128" cy="83" r="3.2" fill="currentColor" stroke="none" />
					<path
						className={draw}
						pathLength={1}
						d="M98 104 C 110 114, 126 114, 138 104"
						strokeWidth="1.05"
						style={{ animationDelay: '260ms' }}
					/>
				</g>

				<rect
					className={draw}
					pathLength={1}
					x="470"
					y="168"
					width="86"
					height="64"
					stroke="currentColor"
					strokeWidth="0.95"
					opacity="0.45"
					style={{ animationDelay: '500ms' }}
				/>
				<path
					className={draw}
					pathLength={1}
					d="M580 214 L628 186 L628 246 Z"
					stroke="#5683D2"
					strokeWidth="1.05"
					style={{ animationDelay: '560ms' }}
				/>

				<g stroke="currentColor" strokeWidth="0.85" opacity="0.4">
					{[0, 1, 2, 3, 4, 5, 6].map((index) => (
						<line
							key={`hatch-${index}`}
							className={draw}
							pathLength={1}
							x1={70}
							y1={168 + index * 8}
							x2={108}
							y2={156 + index * 8}
							style={{ animationDelay: `${440 + index * 28}ms` }}
						/>
					))}
				</g>

				<text
					x="214"
					y="58"
					fill="currentColor"
					opacity="0.55"
					fontSize="13"
					fontFamily="ui-sans-serif, system-ui, sans-serif"
					letterSpacing="0.12em"
					transform="rotate(-6 214 58)"
				>
					RAMESES II
				</text>
				<text
					x="232"
					y="318"
					fill="#E9541D"
					opacity="0.85"
					fontSize="11"
					fontFamily="ui-sans-serif, system-ui, sans-serif"
					letterSpacing="0.16em"
				>
					TEETH
				</text>
				<text
					x="86"
					y="360"
					fill="currentColor"
					opacity="0.5"
					fontSize="11"
					fontFamily="ui-sans-serif, system-ui, sans-serif"
					letterSpacing="0.18em"
				>
					JAW
				</text>
				<text
					x="338"
					y="156"
					fill="#5683D2"
					opacity="0.8"
					fontSize="10"
					fontFamily="ui-sans-serif, system-ui, sans-serif"
					letterSpacing="0.2em"
					textAnchor="middle"
				>
					CROWN
				</text>
				<text
					x="78"
					y="402"
					fill="currentColor"
					opacity="0.45"
					fontSize="12"
					fontFamily="ui-sans-serif, system-ui, sans-serif"
					letterSpacing="0.22em"
				>
					TORSO
				</text>
				<text
					x="488"
					y="158"
					fill="currentColor"
					opacity="0.4"
					fontSize="9"
					fontFamily="ui-sans-serif, system-ui, sans-serif"
					letterSpacing="0.12em"
				>
					SIDE VIEW
				</text>
			</g>
		</svg>
	)
}
