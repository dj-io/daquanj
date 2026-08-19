'use client'

import { useLayoutEffect, useRef } from 'react'
import { path as d3Path, select, timer } from 'd3'
import { asBoolean, asString } from '@/lib/blog-figures'

type CompassFigureProps = {
	spec: Record<string, unknown>
}

const DEG = 180 / Math.PI
const LEG = 44
const REST_THETA = 15 / DEG
const REST_OPENING = 30 / DEG
const NEEDLE = { x: 47.4, y: 60.5 }
const MARK_RADIUS = 2 * LEG * Math.sin(REST_OPENING / 2)
const REST_PIVOT = {
	x: NEEDLE.x - LEG * Math.sin(REST_THETA),
	y: NEEDLE.y - LEG * Math.cos(REST_THETA),
}

function pivotAt(theta: number) {
	return {
		x: NEEDLE.x - LEG * Math.sin(theta),
		y: NEEDLE.y - LEG * Math.cos(theta),
	}
}

function leadMark(start: number, end: number) {
	const delta = end - start
	if (delta < 0.02) return ''

	const mark = d3Path()
	mark.moveTo(
		NEEDLE.x + MARK_RADIUS * Math.sin(start),
		NEEDLE.y + MARK_RADIUS * Math.cos(start),
	)
	mark.arc(NEEDLE.x, NEEDLE.y, MARK_RADIUS, start + Math.PI / 2, end + Math.PI / 2, false)
	return mark.toString()
}

export function CompassFigure({ spec }: CompassFigureProps) {
	const rootRef = useRef<HTMLDivElement>(null)
	const svgRef = useRef<SVGSVGElement>(null)
	const animate = asBoolean(spec.animate) ?? true
	const label = asString(spec.label)
	const text = label === undefined ? 'Proven with Grit' : label

	useLayoutEffect(() => {
		const svg = svgRef.current
		const root = rootRef.current
		if (!svg || !root || !animate) return

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		const node = select(svg)
		const rig = node.select('[data-part="rig"]')
		const handle = node.select('[data-part="handle"]')
		const needleLeg = node.select('[data-part="needle"]')
		const pencilLeg = node.select('[data-part="pencil"]')
		const mark = node.select('[data-part="mark"]')
		const guide = node.select('[data-part="guide"]')

		const pose = (theta: number, opening: number, y = 0) => {
			const pivot = pivotAt(theta)
			const bisector = (theta - opening / 2) * DEG
			rig.attr('transform', `translate(0 ${y})`)
			handle.attr('transform', `translate(${pivot.x} ${pivot.y}) rotate(${bisector})`)
			needleLeg.attr('transform', `translate(${pivot.x} ${pivot.y}) rotate(${theta * DEG})`)
			pencilLeg.attr(
				'transform',
				`translate(${pivot.x} ${pivot.y}) rotate(${(theta - opening) * DEG})`,
			)
		}

		if (reduced) {
			pose(REST_THETA, REST_OPENING)
			guide.attr('opacity', 0.45)
			return
		}

		let theta = REST_THETA
		let thetaVel = 0
		let opening = 0.11
		let openingVel = 0
		let y = -11
		let yVel = 0
		let planted = false
		let opened = false
		let drawing = false
		let drawn = false
		let sweep = 0
		let last = 0
		let idle = 0

		pose(theta, opening, y)
		guide.attr('opacity', 0)
		mark.attr('d', '')

		const step = (dt: number) => {
			if (!planted) {
				yVel += 420 * dt
				y += yVel * dt
				if (y >= 0) {
					y = 0
					yVel *= -0.28
					if (Math.abs(yVel) < 18) {
						yVel = 0
						planted = true
					}
				}
			} else {
				y = 0
				yVel = 0
			}

			if (!planted) {
				opening += (0.11 - opening) * (1 - Math.exp(-dt * 12))
			} else if (!opened) {
				const accel = 86 * (REST_OPENING - opening) - 7.4 * openingVel
				openingVel += accel * dt
				opening += openingVel * dt
				if (Math.abs(opening - REST_OPENING) < 0.018 && Math.abs(openingVel) < 0.12) {
					opened = true
					opening = REST_OPENING
					openingVel = 0
					thetaVel = 2.05
					drawing = true
				}
			} else if (drawing) {
				thetaVel -= (1.55 * Math.sign(thetaVel) + 0.72 * thetaVel) * dt
				theta += thetaVel * dt
				openingVel += (9 * (REST_OPENING - opening) - 2.8 * openingVel + thetaVel * 0.02) * dt
				opening += openingVel * dt
				sweep = Math.max(sweep, theta - REST_THETA)
				if (thetaVel <= 0.02) {
					thetaVel = 0
					drawing = false
					drawn = true
				}
			} else {
				thetaVel += (18 * (REST_THETA - theta) - 5.6 * thetaVel) * dt
				theta += thetaVel * dt
				openingVel += (28 * (REST_OPENING - opening) - 5 * openingVel) * dt
				opening += openingVel * dt
				idle += dt
				guide.attr('opacity', Math.min(0.45, idle * 1.4))
			}

			if (sweep > 0.03) {
				mark.attr('d', leadMark(REST_THETA - REST_OPENING, REST_THETA - REST_OPENING + sweep))
			}

			pose(theta, opening, y)
		}

		let loop: ReturnType<typeof timer> | undefined

		const play = () => {
			if (loop) return
			loop = timer((elapsed) => {
				const dt = Math.min(0.032, (elapsed - last) / 1000 || 0.016)
				last = elapsed
				step(dt)

				const resting =
					drawn &&
					Math.abs(theta - REST_THETA) < 0.012 &&
					Math.abs(thetaVel) < 0.02 &&
					Math.abs(opening - REST_OPENING) < 0.012 &&
					idle > 0.45

				if (resting) {
					pose(REST_THETA, REST_OPENING, 0)
					guide.attr('opacity', 0.45)
					mark.attr(
						'd',
						leadMark(REST_THETA - REST_OPENING, REST_THETA - REST_OPENING + sweep),
					)
					loop?.stop()
				}
			})
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					play()
					observer.disconnect()
				}
			},
			{ threshold: 0.35 },
		)
		observer.observe(root)

		return () => {
			observer.disconnect()
			loop?.stop()
		}
	}, [animate])

	return (
		<div ref={rootRef} className="flex items-center gap-3">
			<svg
				ref={svgRef}
				viewBox="-12 -8 96 100"
				className="h-auto w-32 shrink-0 overflow-visible text-foreground sm:w-40"
				role="img"
				aria-label="Drawing compass"
			>
				<circle
					data-part="guide"
					cx={NEEDLE.x}
					cy={NEEDLE.y}
					r={MARK_RADIUS}
					fill="none"
					stroke="currentColor"
					strokeWidth="1.15"
					opacity={animate ? 0 : 0.45}
				/>
				<path
					data-part="mark"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.2"
					strokeLinecap="round"
					opacity="0.72"
				/>

				<g
					data-part="rig"
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<g
						data-part="handle"
						transform={`translate(${REST_PIVOT.x} ${REST_PIVOT.y})`}
					>
						<rect x="-2.6" y="-14" width="5.2" height="11" rx="1.4" strokeWidth="1.35" />
						<path d="M -3.8 -2 L 0 -4.4 L 3.8 -2 L 2.8 3.2 L 0 5 L -2.8 3.2 Z" strokeWidth="1.4" />
						<circle cx="0" cy="0" r="1.55" strokeWidth="1.15" />
					</g>

					<g
						data-part="needle"
						transform={`translate(${REST_PIVOT.x} ${REST_PIVOT.y}) rotate(15)`}
					>
						<line x1="0" y1="4" x2="0" y2="34" strokeWidth="2.35" />
						<circle cx="0" cy="31.5" r="1.7" strokeWidth="1.05" />
						<path d="M -1.3 34 L 0 44 L 1.3 34" strokeWidth="1.25" />
					</g>

					<g
						data-part="pencil"
						transform={`translate(${REST_PIVOT.x} ${REST_PIVOT.y}) rotate(-15)`}
					>
						<line x1="0" y1="4" x2="0" y2="28" strokeWidth="2.35" />
						<circle cx="0" cy="29.5" r="2" strokeWidth="1.15" />
						<path d="M -1.5 32 L -1.5 38.5 L 1.5 38.5 L 1.5 32" strokeWidth="1.2" />
						<line
							x1="0"
							y1="38.5"
							x2="0"
							y2="44"
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
