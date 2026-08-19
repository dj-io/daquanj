'use client'

import { useLayoutEffect, useRef } from 'react'
import { line, range, select, timer } from 'd3'
import { asBoolean, asString } from '@/lib/blog-figures'

type CompassFigureProps = {
	spec: Record<string, unknown>
}

const DEG = 180 / Math.PI
const LEG = 44
const REST_SPIN = 15 / DEG
const REST_OPENING = 30 / DEG
const CLOSED_OPENING = 0.1
const MARK_RADIUS = 2 * LEG * Math.sin(REST_OPENING / 2)
const LAP = Math.PI * 2
const DRAW_SPEED = 1.05
const ORIGIN = { x: 64, y: 68 }

type Point = { x: number; y: number }
type Phase = 'drop' | 'open' | 'draw'

function rotate2(point: Point, angle: number): Point {
	const cos = Math.cos(angle)
	const sin = Math.sin(angle)
	return {
		x: point.x * cos - point.y * sin,
		y: point.x * sin + point.y * cos,
	}
}

function restPencilLocal(opening: number): Point {
	return {
		x: LEG * Math.sin(opening),
		y: LEG * (Math.cos(opening) - 1),
	}
}

const REST_PENCIL = rotate2(restPencilLocal(REST_OPENING), REST_SPIN)
const REST_PENCIL_ANGLE = Math.atan2(REST_PENCIL.y, REST_PENCIL.x)

function hingeLocalTarget(opening: number, orbit: number): Point {
	if (orbit === 0) {
		return { x: LEG * Math.sin(opening), y: LEG * Math.cos(opening) }
	}

	const world = rotate2(REST_PENCIL, orbit)
	const inSpin = rotate2(world, -REST_SPIN)
	return { x: inSpin.x, y: inSpin.y + LEG }
}

function leadFrom(start: number, distance: number) {
	if (distance < 0.03) return ''
	const span = Math.min(distance, LAP)
	const steps = Math.max(8, Math.ceil(span / 0.04))
	const points = range(steps + 1).map((index) => {
		const angle = start + (span * index) / steps
		return [MARK_RADIUS * Math.cos(angle), MARK_RADIUS * Math.sin(angle)] as [number, number]
	})
	return line()(points) ?? ''
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
		const world = node.select('[data-part="world"]')
		const spin = node.select('[data-part="spin"]')
		const pencil = node.select('[data-part="pencil"]')
		const mark = node.select('[data-part="mark"]')
		const guide = node.select('[data-part="guide"]')

		const aimPencil = (target: Point) => {
			const length = Math.hypot(target.x, target.y) || LEG
			const turn = Math.atan2(-target.x, target.y) * DEG
			pencil.attr('transform', `rotate(${turn}) scale(1 ${length / LEG})`)
		}

		const pose = (opening: number, orbit = 0, y = 0) => {
			world.attr('transform', `translate(${ORIGIN.x} ${ORIGIN.y + y})`)
			spin.attr('transform', `rotate(${REST_SPIN * DEG})`)
			aimPencil(hingeLocalTarget(opening, orbit))
		}

		if (reduced) {
			pose(REST_OPENING)
			guide.attr('opacity', 0.45)
			return
		}

		let phase: Phase = 'drop'
		let phaseTime = 0
		let opening = CLOSED_OPENING
		let openingVel = 0
		let orbit = 0
		let y = -14
		let yVel = 0
		let drawn = 0
		let prev = 0

		pose(opening, 0, y)
		guide.attr('opacity', 0)
		mark.attr('d', '')

		const step = (dt: number) => {
			phaseTime += dt

			if (phase === 'drop') {
				yVel += 520 * dt
				y += yVel * dt
				if (y >= 0) {
					y = 0
					yVel *= -0.32
					if (Math.abs(yVel) < 22 || phaseTime > 0.55) {
						y = 0
						yVel = 0
						phase = 'open'
						phaseTime = 0
					}
				}
			} else {
				y = 0
			}

			if (phase === 'open') {
				const accel = 78 * (REST_OPENING - opening) - 6.8 * openingVel
				openingVel += accel * dt
				opening += openingVel * dt
				orbit = 0
				if (phaseTime > 0.9) {
					opening = REST_OPENING
					openingVel = 0
					phase = 'draw'
					phaseTime = 0
				}
			} else if (phase === 'draw') {
				opening = REST_OPENING
				drawn += DRAW_SPEED * dt
				orbit = drawn

				const tipAngle = REST_PENCIL_ANGLE + drawn
				if (drawn < LAP) {
					mark.attr('d', leadFrom(REST_PENCIL_ANGLE, drawn))
					guide.attr('opacity', Math.min(0.22, drawn / LAP))
				} else {
					guide.attr('opacity', 0.42)
					mark.attr('d', leadFrom(tipAngle - 0.9, 0.9))
				}
			}

			pose(opening, orbit, y)
		}

		let loop: ReturnType<typeof timer> | undefined

		const play = () => {
			if (loop) return
			prev = performance.now()
			loop = timer(() => {
				const now = performance.now()
				const dt = Math.min(0.033, Math.max(0.008, (now - prev) / 1000))
				prev = now
				step(dt)
			})
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) play()
				else {
					loop?.stop()
					loop = undefined
				}
			},
			{ threshold: 0.25 },
		)
		observer.observe(root)

		return () => {
			observer.disconnect()
			loop?.stop()
		}
	}, [animate])

	return (
		<div ref={rootRef} className="flex flex-col items-start gap-2">
			<svg
				ref={svgRef}
				viewBox="0 0 128 128"
				className="h-auto w-40 shrink-0 overflow-visible text-foreground sm:w-48"
				role="img"
				aria-label="Drawing compass"
			>
				<g data-part="world" transform={`translate(${ORIGIN.x} ${ORIGIN.y})`}>
					<circle
						data-part="guide"
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
						strokeWidth="1.35"
						strokeLinecap="round"
						opacity="0.9"
					/>

					<g data-part="spin" transform={`rotate(${REST_SPIN * DEG})`}>
						<g
							data-part="hinge"
							transform={`translate(0 ${-LEG})`}
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<rect x="-2.6" y="-14" width="5.2" height="11" rx="1.4" strokeWidth="1.35" />
							<path
								d="M -3.8 -2 L 0 -4.4 L 3.8 -2 L 2.8 3.2 L 0 5 L -2.8 3.2 Z"
								strokeWidth="1.4"
							/>
							<circle cx="0" cy="0" r="1.55" strokeWidth="1.15" />

							<line x1="0" y1="4" x2="0" y2="34" strokeWidth="2.35" />
							<circle cx="0" cy="31.5" r="1.7" strokeWidth="1.05" />
							<path d="M -1.3 34 L 0 44 L 1.3 34" strokeWidth="1.25" />

							<g data-part="pencil" transform={`rotate(${-REST_OPENING * DEG})`}>
								<line
									x1="0"
									y1="4"
									x2="0"
									y2="28"
									strokeWidth="2.35"
									vectorEffect="non-scaling-stroke"
								/>
								<circle
									cx="0"
									cy="29.5"
									r="2"
									strokeWidth="1.15"
									vectorEffect="non-scaling-stroke"
								/>
								<path
									d="M -1.5 32 L -1.5 38.5 L 1.5 38.5 L 1.5 32"
									strokeWidth="1.2"
									vectorEffect="non-scaling-stroke"
								/>
								<line
									x1="0"
									y1="38.5"
									x2="0"
									y2="44"
									stroke="var(--blog-accent)"
									strokeWidth="1.7"
									vectorEffect="non-scaling-stroke"
								/>
							</g>
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
