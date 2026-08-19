'use client'

import { useLayoutEffect, useRef } from 'react'
import { line, range, select, timer } from 'd3'
import { asBoolean, asString } from '@/lib/blog-figures'

type CompassFigureProps = {
	spec: Record<string, unknown>
}

const DEG = 180 / Math.PI
const LEG = 44
const REST_THETA = 15 / DEG
const REST_OPENING = 30 / DEG
const CLOSED_OPENING = 0.1
const NEEDLE = { x: 52, y: 72 }
const MARK_RADIUS = 2 * LEG * Math.sin(REST_OPENING / 2)
const REST_PIVOT = {
	x: NEEDLE.x - LEG * Math.sin(REST_THETA),
	y: NEEDLE.y - LEG * Math.cos(REST_THETA),
}

type Phase = 'drop' | 'open' | 'draw' | 'settle'

function pivotAt(theta: number) {
	return {
		x: NEEDLE.x - LEG * Math.sin(theta),
		y: NEEDLE.y - LEG * Math.cos(theta),
	}
}

function leadMark(start: number, end: number) {
	const delta = end - start
	if (Math.abs(delta) < 0.03) return ''

	const steps = Math.max(8, Math.ceil(Math.abs(delta) / 0.04))
	const points = range(steps + 1).map((index) => {
		const angle = start + (delta * index) / steps
		return [
			NEEDLE.x + MARK_RADIUS * Math.sin(angle),
			NEEDLE.y + MARK_RADIUS * Math.cos(angle),
		] as [number, number]
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

		let phase: Phase = 'drop'
		let phaseTime = 0
		let theta = REST_THETA
		let thetaVel = 0
		let opening = CLOSED_OPENING
		let openingVel = 0
		let y = -14
		let yVel = 0
		let sweep = 0
		let prev = 0

		pose(theta, opening, y)
		guide.attr('opacity', 0)
		mark.attr('d', '')

		const spring = (
			value: number,
			velocity: number,
			target: number,
			stiffness: number,
			damping: number,
			dt: number,
		) => {
			const accel = stiffness * (target - value) - damping * velocity
			const nextVel = velocity + accel * dt
			return { value: value + nextVel * dt, velocity: nextVel }
		}

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
				const next = spring(opening, openingVel, REST_OPENING, 78, 6.8, dt)
				opening = next.value
				openingVel = next.velocity
				if (phaseTime > 1.05) {
					opening = REST_OPENING
					openingVel = 0
					thetaVel = 2.55
					phase = 'draw'
					phaseTime = 0
				}
			} else if (phase === 'draw') {
				thetaVel -= (0.58 * Math.sign(thetaVel) + 0.34 * thetaVel) * dt
				theta += thetaVel * dt
				const flex = spring(opening, openingVel, REST_OPENING, 22, 3.1, dt)
				opening = flex.value + thetaVel * 0.012
				openingVel = flex.velocity
				sweep = Math.max(sweep, theta - REST_THETA)
				if (thetaVel <= 0.03 || phaseTime > 2.6) {
					thetaVel = 0
					phase = 'settle'
					phaseTime = 0
				}
			} else if (phase === 'settle') {
				const nextTheta = spring(theta, thetaVel, REST_THETA, 9.5, 4.4, dt)
				theta = nextTheta.value
				thetaVel = nextTheta.velocity
				const nextOpen = spring(opening, openingVel, REST_OPENING, 22, 4.8, dt)
				opening = nextOpen.value
				openingVel = nextOpen.velocity
				guide.attr('opacity', Math.min(0.45, phaseTime * 0.7))
			}

			if (sweep > 0.04) {
				mark.attr('d', leadMark(REST_THETA - REST_OPENING, REST_THETA - REST_OPENING + sweep))
			}

			pose(theta, opening, y)
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

				if (phase === 'settle' && phaseTime > 1.35) {
					pose(REST_THETA, REST_OPENING, 0)
					guide.attr('opacity', 0.45)
					if (sweep > 0.04) {
						mark.attr(
							'd',
							leadMark(REST_THETA - REST_OPENING, REST_THETA - REST_OPENING + sweep),
						)
					}
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
			{ threshold: 0.3, rootMargin: '0px 0px -8% 0px' },
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
				viewBox="-16 -8 108 152"
				className="h-auto w-40 shrink-0 overflow-visible text-foreground sm:w-48"
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
					strokeWidth="1.25"
					strokeLinecap="round"
					opacity="0.78"
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
