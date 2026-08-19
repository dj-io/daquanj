import type { ReactNode } from 'react'
import { Permanent_Marker } from 'next/font/google'
import { asBoolean, asString } from '@/lib/blog-figures'
import { cn } from '@/lib/utils'

const scrawl = Permanent_Marker({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
})

const ink = {
	canvas: '#EFE6D2',
	field: '#090909',
	chalk: '#F7F1E3',
	bone: '#E6DCC8',
	cyan: '#3EC8FF',
	cyanHot: '#8AEBFF',
	red: '#E31820',
	yellow: '#F4CF2A',
	gold: '#E0A41A',
	green: '#7DFF4A',
	ochre: '#A45A22',
	white: '#FFFEF6',
}

type DiagramFigureProps = {
	spec: Record<string, unknown>
	id?: string
}

function svgId(id: string, name: string) {
	return `${id.replace(/[^a-zA-Z0-9_-]+/g, '-')}-${name}`
}

function PaintGround({
	id,
	animate,
	children,
	ariaLabel,
}: {
	id: string
	animate: boolean
	children: ReactNode
	ariaLabel: string
}) {
	const grain = svgId(id, 'grain')
	const stick = svgId(id, 'stick')

	return (
		<svg
			viewBox="0 0 800 460"
			className={cn(scrawl.className, 'h-auto w-full overflow-visible')}
			role="img"
			aria-label={ariaLabel}
		>
			<defs>
				<filter id={grain} x="0" y="0" width="100%" height="100%">
					<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" seed="7" result="n" />
					<feColorMatrix
						in="n"
						type="matrix"
						values="0 0 0 0 0.9  0 0 0 0 0.86  0 0 0 0 0.78  0 0 0 0.16 0"
					/>
				</filter>
				<filter id={stick} x="-10%" y="-10%" width="120%" height="120%">
					<feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="3" seed="9" result="n" />
					<feDisplacementMap in="SourceGraphic" in2="n" scale="2.1" xChannelSelector="R" yChannelSelector="G" />
				</filter>
			</defs>

			<path
				d="M 12 28 C 40 10, 180 18, 390 12 C 610 6, 760 16, 788 14 L 794 438 C 640 450, 420 444, 210 452 C 90 456, 18 444, 10 432 Z"
				fill={ink.canvas}
			/>
			<path
				d="M 26 24 C 70 16, 220 22, 410 14 C 620 6, 750 18, 772 22 L 780 408 C 620 396, 400 404, 170 416 C 70 422, 32 410, 26 400 Z"
				fill={ink.field}
			/>
			<rect x="26" y="22" width="754" height="394" filter={`url(#${grain})`} opacity="0.5" />
			<path
				d="M 26 400 C 180 418, 430 406, 780 408 L 788 438 C 640 450, 420 444, 210 452 C 90 456, 18 444, 10 432 L 26 400 Z"
				fill={ink.canvas}
			/>

			<g fill="none" strokeLinecap="round" strokeLinejoin="round" filter={`url(#${stick})`}>
				{children}
			</g>
		</svg>
	)
}

function draw(animate: boolean) {
	return animate ? 'paint-stroke' : undefined
}

function reveal(animate: boolean) {
	return animate ? 'paint-reveal' : undefined
}

function wait(animate: boolean, ms: number) {
	return animate ? { animationDelay: `${ms}ms` } : undefined
}

function HarnessScene({ animate }: { animate: boolean }) {
	const stroke = draw(animate)
	const show = reveal(animate)

	return (
		<>
			<path
				className={stroke}
				pathLength={1}
				d="M 392 48 C 400 160, 398 280, 404 390"
				stroke={ink.ochre}
				strokeWidth="3.2"
				opacity="0.55"
				style={wait(animate, 80)}
			/>

			<rect
				className={stroke}
				pathLength={1}
				x="58"
				y="78"
				width="250"
				height="250"
				stroke={ink.chalk}
				strokeWidth="3.2"
				style={wait(animate, 120)}
			/>
			{[0, 1, 2, 3].map((index) => (
				<line
					key={`bar-${index}`}
					className={stroke}
					pathLength={1}
					x1={88 + index * 52}
					y1="96"
					x2={88 + index * 52}
					y2="308"
					stroke={ink.bone}
					strokeWidth="1.6"
					opacity="0.55"
					style={wait(animate, 180 + index * 40)}
				/>
			))}
			{[0, 1, 2].map((index) => (
				<line
					key={`rail-${index}`}
					className={stroke}
					pathLength={1}
					x1="74"
					y1={128 + index * 58}
					x2="288"
					y2={128 + index * 58}
					stroke={ink.bone}
					strokeWidth="1.6"
					opacity="0.45"
					style={wait(animate, 220 + index * 40)}
				/>
			))}
			<rect
				className={stroke}
				pathLength={1}
				x="148"
				y="168"
				width="64"
				height="52"
				rx="4"
				stroke={ink.yellow}
				strokeWidth="2.4"
				style={wait(animate, 360)}
			/>
			<path
				className={stroke}
				pathLength={1}
				d="M 164 168 V 150 A 16 16 0 0 1 196 150 V 168"
				stroke={ink.yellow}
				strokeWidth="2.6"
				style={wait(animate, 400)}
			/>
			<path
				className={stroke}
				pathLength={1}
				d="M 48 70 L 330 348"
				stroke={ink.red}
				strokeWidth="5"
				style={wait(animate, 480)}
			/>
			<text
				x="70"
				y="64"
				fill={ink.red}
				fontSize="28"
				className={show}
				style={wait(animate, 200)}
			>
				LOCKED
			</text>
			<text
				x="86"
				y="356"
				fill={ink.chalk}
				fontSize="22"
				opacity="0.8"
				className={show}
				style={wait(animate, 280)}
			>
				MODEL
			</text>

			<path className={stroke} pathLength={1} d="M 470 390 L 560 86" stroke={ink.chalk} strokeWidth="3.2" style={wait(animate, 140)} />
			<path className={stroke} pathLength={1} d="M 670 390 L 560 86" stroke={ink.chalk} strokeWidth="3.2" style={wait(animate, 180)} />
			<path className={stroke} pathLength={1} d="M 500 300 H 640" stroke={ink.gold} strokeWidth="3" style={wait(animate, 240)} />
			<rect
				className={stroke}
				pathLength={1}
				x="502"
				y="118"
				width="116"
				height="156"
				fill={ink.field}
				stroke={ink.cyan}
				strokeWidth="3.4"
				style={wait(animate, 280)}
			/>
			<rect
				x="514"
				y="132"
				width="92"
				height="128"
				stroke={ink.chalk}
				strokeWidth="1.2"
				opacity="0.35"
			/>
			<circle cx="560" cy="86" r="6" fill={ink.cyanHot} className={animate ? 'paint-pulse' : undefined} />
			{[0, 1, 2, 3].map((index) => {
				const colors = [ink.cyan, ink.red, ink.yellow, ink.green]
				return (
					<g key={`brush-${index}`} transform={`translate(${518 + index * 22} 368)`}>
						<line className={stroke} pathLength={1} x1="0" y1="0" x2="0" y2="28" stroke={ink.chalk} strokeWidth="2" style={wait(animate, 420 + index * 40)} />
						<circle cx="0" cy="0" r="6" fill={colors[index]} className={show} style={wait(animate, 460 + index * 40)} />
					</g>
				)
			})}
			<text
				x="488"
				y="64"
				fill={ink.cyanHot}
				fontSize="26"
				className={show}
				style={wait(animate, 240)}
			>
				HARNESS
			</text>
			<text
				x="508"
				y="112"
				fill={ink.yellow}
				fontSize="18"
				className={show}
				style={wait(animate, 320)}
			>
				BRUSHES
			</text>
		</>
	)
}

function TenAmScene({ animate }: { animate: boolean }) {
	const stroke = draw(animate)
	const show = reveal(animate)

	return (
		<>
			<circle
				className={stroke}
				pathLength={1}
				cx="210"
				cy="210"
				r="118"
				stroke={ink.chalk}
				strokeWidth="3.4"
				style={wait(animate, 80)}
			/>
			{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => {
				const angle = (index / 12) * Math.PI * 2
				const inner = index % 3 === 0 ? 92 : 102
				return (
					<line
						key={`tick-${index}`}
						className={stroke}
						pathLength={1}
						x1={210 + Math.sin(angle) * inner}
						y1={210 - Math.cos(angle) * inner}
						x2={210 + Math.sin(angle) * 110}
						y2={210 - Math.cos(angle) * 110}
						stroke={ink.bone}
						strokeWidth={index % 3 === 0 ? 3 : 1.4}
						style={wait(animate, 120 + index * 20)}
					/>
				)
			})}
			<line className={stroke} pathLength={1} x1="210" y1="210" x2="210" y2="118" stroke={ink.white} strokeWidth="4" style={wait(animate, 360)} />
			<line className={stroke} pathLength={1} x1="210" y1="210" x2="138" y2="168" stroke={ink.red} strokeWidth="5" style={wait(animate, 400)} />
			<circle cx="210" cy="210" r="7" fill={ink.cyanHot} className={animate ? 'paint-pulse' : undefined} />
			<text x="168" y="268" fill={ink.yellow} fontSize="34" className={show} style={wait(animate, 280)}>
				TUE
			</text>
			<text x="86" y="64" fill={ink.cyan} fontSize="30" className={show} style={wait(animate, 160)}>
				10 AM
			</text>

			<path className={stroke} pathLength={1} d="M 430 390 L 560 92" stroke={ink.chalk} strokeWidth="3.2" style={wait(animate, 200)} />
			<path className={stroke} pathLength={1} d="M 700 390 L 560 92" stroke={ink.chalk} strokeWidth="3.2" style={wait(animate, 240)} />
			<path className={stroke} pathLength={1} d="M 470 292 H 650" stroke={ink.gold} strokeWidth="3" style={wait(animate, 300)} />
			<rect
				className={stroke}
				pathLength={1}
				x="478"
				y="128"
				width="164"
				height="214"
				fill={ink.field}
				stroke={ink.cyan}
				strokeWidth="3.2"
				style={wait(animate, 340)}
			/>
			<rect x="494" y="146" width="132" height="178" stroke={ink.chalk} strokeWidth="1.2" opacity="0.3" />
			<circle cx="560" cy="92" r="6" fill={ink.cyanHot} className={animate ? 'paint-pulse' : undefined} />
			<path
				d="M 420 400 C 500 388, 620 408, 720 396"
				stroke={ink.ochre}
				strokeWidth="10"
				opacity="0.55"
				className={show}
				style={wait(animate, 480)}
			/>
			{[0, 1, 2, 3].map((index) => (
				<circle
					key={`ready-${index}`}
					cx={500 + index * 28}
					cy="372"
					r="6"
					fill={[ink.cyan, ink.red, ink.yellow, ink.green][index]}
					className={show}
					style={wait(animate, 500 + index * 40)}
				/>
			))}
			<text x="478" y="112" fill={ink.chalk} fontSize="22" className={show} style={wait(animate, 320)}>
				READY
			</text>
		</>
	)
}

function GapScene({ animate }: { animate: boolean }) {
	const stroke = draw(animate)
	const show = reveal(animate)

	return (
		<>
			<path className={stroke} pathLength={1} d="M 86 390 L 176 96" stroke={ink.chalk} strokeWidth="3" style={wait(animate, 80)} />
			<path className={stroke} pathLength={1} d="M 276 390 L 176 96" stroke={ink.chalk} strokeWidth="3" style={wait(animate, 120)} />
			<path className={stroke} pathLength={1} d="M 118 292 H 238" stroke={ink.gold} strokeWidth="2.8" style={wait(animate, 180)} />
			<rect
				className={stroke}
				pathLength={1}
				x="118"
				y="128"
				width="116"
				height="154"
				fill={ink.field}
				stroke={ink.cyan}
				strokeWidth="3.2"
				style={wait(animate, 220)}
			/>
			{[0, 1, 2, 3, 4].map((index) => (
				<line
					key={`code-${index}`}
					className={stroke}
					pathLength={1}
					x1="132"
					y1={152 + index * 22}
					x2={index % 2 === 0 ? 214 : 198}
					y2={152 + index * 22}
					stroke={index === 2 ? ink.cyan : ink.chalk}
					strokeWidth="2"
					opacity={0.55}
					style={wait(animate, 280 + index * 30)}
				/>
			))}
			<text x="70" y="64" fill={ink.cyanHot} fontSize="28" className={show} style={wait(animate, 160)}>
				CODE
			</text>

			<path
				className={stroke}
				pathLength={1}
				d="M 360 70 C 480 180, 520 120, 740 80"
				stroke={ink.red}
				strokeWidth="3"
				style={wait(animate, 200)}
			/>
			<path
				className={animate ? 'paint-drift' : undefined}
				d="M 380 360 C 500 240, 620 320, 750 200"
				stroke={ink.yellow}
				strokeWidth="2.2"
				strokeDasharray="7 11"
			/>

			{[
				{ x: 390, y: 110, r: -11, label: 'NOTES', color: ink.yellow },
				{ x: 560, y: 96, r: 8, label: 'CHAT', color: ink.cyan },
				{ x: 420, y: 230, r: 6, label: 'DOCS', color: ink.green },
				{ x: 590, y: 220, r: -7, label: 'BILL', color: ink.red },
			].map((card, index) => (
				<g key={card.label} transform={`rotate(${card.r} ${card.x + 70} ${card.y + 44})`}>
					<rect
						className={stroke}
						pathLength={1}
						x={card.x}
						y={card.y}
						width="140"
						height="88"
						fill={ink.field}
						stroke={card.color}
						strokeWidth="2.8"
						style={wait(animate, 240 + index * 60)}
					/>
					<text
						x={card.x + 16}
						y={card.y + 54}
						fill={card.color}
						fontSize="22"
						className={show}
						style={wait(animate, 280 + index * 60)}
					>
						{card.label}
					</text>
				</g>
			))}
			<text x="430" y="64" fill={ink.red} fontSize="24" className={show} style={wait(animate, 200)}>
				PILE OF TOOLS
			</text>
		</>
	)
}

export function DiagramFigure({ spec, id = 'diagram' }: DiagramFigureProps) {
	const animate = asBoolean(spec.animate) ?? true
	const scene = asString(spec.scene) ?? asString(spec.type) ?? 'harness'
	const aria =
		scene === 'ten-am'
			? 'A painted studio at 10 o’clock on a Tuesday, easel already ready'
			: scene === 'gap'
				? 'A painted split: one coding easel versus a pile of crooked tool canvases'
				: 'A painted split: a locked model cage versus an easel with brushes waiting'

	return (
		<PaintGround id={id} animate={animate} ariaLabel={aria}>
			{scene === 'ten-am' ? <TenAmScene animate={animate} /> : null}
			{scene === 'gap' ? <GapScene animate={animate} /> : null}
			{scene === 'harness' || scene === 'locked' || scene === 'canvas' || scene === 'split' ? (
				<HarnessScene animate={animate} />
			) : null}
		</PaintGround>
	)
}
