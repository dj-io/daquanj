'use client'

import { useEffect, useState } from 'react'
import { asBoolean, asString } from '@/lib/blog-figures'

type CompassFigureProps = {
	spec: Record<string, unknown>
}

const NEEDLE = { x: 24.6, y: 60.5 }

function usePrefersReducedMotion() {
	const [reduced, setReduced] = useState(false)

	useEffect(() => {
		const media = window.matchMedia('(prefers-reduced-motion: reduce)')
		const sync = () => setReduced(media.matches)
		sync()
		media.addEventListener('change', sync)
		return () => media.removeEventListener('change', sync)
	}, [])

	return reduced
}

export function CompassFigure({ spec }: CompassFigureProps) {
	const reducedMotion = usePrefersReducedMotion()
	const animate = (asBoolean(spec.animate) ?? true) && !reducedMotion
	const label = asString(spec.label)
	const text = label === undefined ? 'Proven with Grit' : label
	const draw = animate ? 'compass-stroke' : undefined
	const wait = (ms: number) => (animate ? { animationDelay: `${ms}ms` } : undefined)

	return (
		<div className="flex items-center gap-2.5">
			<svg
				viewBox="0 0 72 84"
				className="h-[1.85em] w-[1.85em] shrink-0 overflow-visible text-foreground"
				role="img"
				aria-label="Drawing compass"
			>
				<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
					<circle
						className={animate ? 'compass-arc' : undefined}
						pathLength={1}
						cx={NEEDLE.x}
						cy={NEEDLE.y}
						r="22.4"
						strokeWidth="1.15"
						opacity="0.45"
					/>

					<g>
						{animate ? (
							<animateTransform
								attributeName="transform"
								type="rotate"
								from={`0 ${NEEDLE.x} ${NEEDLE.y}`}
								to={`360 ${NEEDLE.x} ${NEEDLE.y}`}
								dur="6.5s"
								repeatCount="indefinite"
							/>
						) : null}

						<rect
							className={draw}
							pathLength={1}
							x="33.4"
							y="4"
							width="5.2"
							height="11"
							rx="1.4"
							strokeWidth="1.35"
							style={wait(40)}
						/>
						<path
							className={draw}
							pathLength={1}
							d="M 32.2 16 L 36 13.6 L 39.8 16 L 38.8 21.2 L 36 23 L 33.2 21.2 Z"
							strokeWidth="1.4"
							style={wait(80)}
						/>
						<circle
							className={draw}
							pathLength={1}
							cx="36"
							cy="18"
							r="1.55"
							strokeWidth="1.15"
							style={wait(120)}
						/>

						<g transform="rotate(15 36 18)">
							<line
								className={draw}
								pathLength={1}
								x1="36"
								y1="22"
								x2="36"
								y2="52"
								strokeWidth="2.35"
								style={wait(100)}
							/>
							<circle
								className={draw}
								pathLength={1}
								cx="36"
								cy="49.5"
								r="1.7"
								strokeWidth="1.05"
								style={wait(180)}
							/>
							<path
								className={draw}
								pathLength={1}
								d="M 34.7 52 L 36 62 L 37.3 52"
								strokeWidth="1.25"
								style={wait(160)}
							/>
						</g>

						<g transform="rotate(-15 36 18)">
							<line
								className={draw}
								pathLength={1}
								x1="36"
								y1="22"
								x2="36"
								y2="46"
								strokeWidth="2.35"
								style={wait(140)}
							/>
							<circle
								className={draw}
								pathLength={1}
								cx="36"
								cy="47.5"
								r="2"
								strokeWidth="1.15"
								style={wait(200)}
							/>
							<path
								className={draw}
								pathLength={1}
								d="M 34.5 50 L 34.5 56.5 L 37.5 56.5 L 37.5 50"
								strokeWidth="1.2"
								style={wait(180)}
							/>
							<line
								className={draw}
								pathLength={1}
								x1="36"
								y1="56.5"
								x2="36"
								y2="62"
								stroke="var(--blog-accent)"
								strokeWidth="1.7"
								style={wait(220)}
							/>
						</g>
					</g>
				</g>
			</svg>
			{text ? (
				<span className="text-[1.05rem] leading-[1.7] text-foreground/90">{text}</span>
			) : null}
		</div>
	)
}
