'use client'

import { useEffect, useRef } from 'react'
import { useIntro } from './intro-provider'

const PARTICLE_COUNT = 12
const PARTICLE_LIFETIME = 420

interface Particle {
	element: HTMLSpanElement
	bornAt: number
	x: number
	y: number
}

export function CursorTrail() {
	const containerRef = useRef<HTMLDivElement>(null)
	const { isIntroComplete } = useIntro()

	useEffect(() => {
		const container = containerRef.current
		const hasFinePointer = window.matchMedia('(pointer: fine)').matches
		const prefersReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches

		if (
			!container ||
			!isIntroComplete ||
			!hasFinePointer ||
			prefersReducedMotion
		) return

		const particles = Array.from(
			container.querySelectorAll<HTMLSpanElement>('[data-cursor-particle]'),
		).map<Particle>((element) => ({
			element,
			bornAt: 0,
			x: 0,
			y: 0,
		}))
		let nextParticle = 0
		let animationFrame = 0
		let isAnimating = false

		const render = (time: number) => {
			let hasVisibleParticles = false

			for (const particle of particles) {
				if (!particle.bornAt) continue

				const progress = Math.min(
					(time - particle.bornAt) / PARTICLE_LIFETIME,
					1,
				)
				const opacity = 1 - progress
				particle.element.style.opacity = String(opacity)
				particle.element.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0) scale(${1 - progress * 0.45})`

				if (progress < 1) {
					hasVisibleParticles = true
				} else {
					particle.bornAt = 0
				}
			}

			if (hasVisibleParticles) {
				animationFrame = requestAnimationFrame(render)
			} else {
				isAnimating = false
			}
		}

		const handlePointerMove = (event: PointerEvent) => {
			const particle = particles[nextParticle]
			nextParticle = (nextParticle + 1) % particles.length
			particle.x = event.clientX - 6
			particle.y = event.clientY - 6
			particle.bornAt = performance.now()

			if (!isAnimating) {
				isAnimating = true
				animationFrame = requestAnimationFrame(render)
			}
		}

		window.addEventListener('pointermove', handlePointerMove)

		return () => {
			window.removeEventListener('pointermove', handlePointerMove)
			cancelAnimationFrame(animationFrame)
		}
	}, [isIntroComplete])

	return (
		<div
			ref={containerRef}
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 z-[60] hidden overflow-hidden md:block"
		>
			{Array.from({ length: PARTICLE_COUNT }, (_, index) => (
				<span
					key={index}
					data-cursor-particle
					className="absolute left-0 top-0 h-3 w-3 rounded-xs bg-apollo"
					style={{ opacity: 0, willChange: 'transform, opacity' }}
				/>
			))}
		</div>
	)
}
