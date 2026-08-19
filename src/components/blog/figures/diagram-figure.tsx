import { asString } from '@/lib/blog-figures'
import { cn } from '@/lib/utils'

type DiagramFigureProps = {
	spec: Record<string, unknown>
}

type Panel = {
	label?: string
	scene?: string
}

const MUTED = 'color-mix(in oklch, var(--foreground) 38%, transparent)'
const FAINT = 'color-mix(in oklch, var(--foreground) 12%, transparent)'
const FILL = 'color-mix(in oklch, var(--foreground) 4%, transparent)'
const ACCENT = 'var(--blog-accent)'

function panel(value: unknown): Panel {
	if (!value || typeof value !== 'object') return {}
	return value as Panel
}

function Scene({ name, className }: { name: string; className?: string }) {
	switch (name) {
		case 'locked':
			return <LockedProduct className={className} />
		case 'canvas':
			return <BlankCanvas className={className} />
		case 'ten-am':
			return <TenAmStudio className={className} />
		case 'code':
			return <CodeStudio className={className} />
		case 'tangle':
			return <ToolTangle className={className} />
		default:
			return null
	}
}

function LockedProduct({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 280 188"
			className={cn('h-auto w-full', className)}
			role="img"
			aria-label="A crowded product window with a locked model and a stepped workflow"
		>
			<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
				<rect x="18" y="16" width="244" height="156" rx="10" fill={FILL} strokeWidth="1.4" />
				<path d="M 18 40 H 262" strokeWidth="1.15" />
				<circle cx="34" cy="28" r="3.2" fill={MUTED} stroke="none" />
				<circle cx="46" cy="28" r="3.2" fill={MUTED} stroke="none" />
				<circle cx="58" cy="28" r="3.2" fill={MUTED} stroke="none" />
				<rect x="198" y="21" width="46" height="14" rx="7" strokeWidth="1.15" />
				<rect x="216" y="25.2" width="7" height="6" rx="1.1" strokeWidth="1.05" />
				<path d="M 217.6 25.2 V 23.4 A 1.7 1.7 0 0 1 221.4 23.4 V 25.2" strokeWidth="1.05" />

				{[0, 1, 2, 3, 4, 5].map((index) => (
					<rect
						key={`tool-${index}`}
						x={28 + index * 22}
						y="50"
						width="16"
						height="10"
						rx="2"
						strokeWidth="1.05"
						opacity={index > 2 ? 0.45 : 0.8}
					/>
				))}
				<path d="M 168 55 H 248" strokeWidth="1" opacity="0.35" />

				<rect x="28" y="72" width="54" height="84" rx="4" strokeWidth="1.1" opacity="0.7" />
				{[0, 1, 2, 3, 4].map((index) => (
					<line
						key={`nav-${index}`}
						x1="36"
						y1={84 + index * 13}
						x2="70"
						y2={84 + index * 13}
						strokeWidth="1.05"
						opacity={0.28 + index * 0.08}
					/>
				))}

				<rect x="96" y="72" width="148" height="84" rx="4" strokeWidth="1.15" />
				<circle cx="128" cy="108" r="14" strokeWidth="1.3" />
				<text
					x="128"
					y="112"
					textAnchor="middle"
					fill={MUTED}
					stroke="none"
					fontSize="11"
					fontFamily="ui-sans-serif, system-ui"
				>
					1
				</text>
				<path d="M 144 108 H 168" strokeWidth="1.25" />
				<path d="M 168 108 L 176 102 M 168 108 L 176 114" strokeWidth="1.25" />
				<circle cx="196" cy="108" r="14" strokeWidth="1.3" />
				<text
					x="196"
					y="112"
					textAnchor="middle"
					fill={MUTED}
					stroke="none"
					fontSize="11"
					fontFamily="ui-sans-serif, system-ui"
				>
					2
				</text>
				<path d="M 212 108 H 236" strokeWidth="1.25" opacity="0.45" />
				<rect x="118" y="136" width="104" height="10" rx="2" strokeWidth="1" opacity="0.28" />
			</g>
		</svg>
	)
}

function BlankCanvas({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 280 188"
			className={cn('h-auto w-full', className)}
			role="img"
			aria-label="An easel with a blank canvas and brushes waiting at the edge"
		>
			<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
				<path d="M 86 168 L 140 22" strokeWidth="1.7" />
				<path d="M 194 168 L 140 22" strokeWidth="1.7" />
				<path d="M 104 124 H 176" strokeWidth="1.5" />
				<rect
					x="96"
					y="40"
					width="88"
					height="110"
					rx="2"
					fill={FILL}
					strokeWidth="1.5"
				/>
				<rect x="104" y="48" width="72" height="94" rx="1" strokeWidth="1" opacity="0.35" />
				<circle cx="140" cy="22" r="3.2" fill={ACCENT} stroke="none" />
				{[0, 1, 2, 3].map((index) => (
					<g key={`brush-${index}`} transform={`translate(${108 + index * 18} 158)`}>
						<line x1="0" y1="0" x2="0" y2="18" strokeWidth="1.3" />
						<circle cx="0" cy="0" r="3.1" fill={index === 0 ? ACCENT : MUTED} stroke="none" />
					</g>
				))}
			</g>
		</svg>
	)
}

function TenAmStudio({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 560 220"
			className={cn('h-auto w-full', className)}
			role="img"
			aria-label="A studio at 10 o'clock on a Tuesday, easel ready, no setup in the way"
		>
			<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
				<circle cx="118" cy="110" r="72" strokeWidth="1.6" />
				<circle cx="118" cy="110" r="4" fill="currentColor" stroke="none" />
				{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => {
					const angle = (index / 12) * Math.PI * 2
					const inner = index % 3 === 0 ? 58 : 64
					return (
						<line
							key={`tick-${index}`}
							x1={118 + Math.sin(angle) * inner}
							y1={110 - Math.cos(angle) * inner}
							x2={118 + Math.sin(angle) * 68}
							y2={110 - Math.cos(angle) * 68}
							strokeWidth={index % 3 === 0 ? 1.6 : 1}
							opacity={index % 3 === 0 ? 0.9 : 0.4}
						/>
					)
				})}
				<line x1="118" y1="110" x2="118" y2="58" strokeWidth="2.1" />
				<line x1="118" y1="110" x2="78" y2="86" stroke={ACCENT} strokeWidth="2.4" />
				<text
					x="118"
					y="158"
					textAnchor="middle"
					fill={MUTED}
					stroke="none"
					fontSize="13"
					fontFamily="ui-sans-serif, system-ui"
				>
					Tue
				</text>

				<path d="M 248 196 L 248 48 H 520 V 196" strokeWidth="1.3" opacity="0.55" />
				<path d="M 248 196 H 520" strokeWidth="1.3" />
				<path d="M 248 196 L 214 214 H 548 L 520 196" stroke={FAINT} strokeWidth="1.2" />

				<path d="M 338 188 L 394 58" strokeWidth="1.7" />
				<path d="M 450 188 L 394 58" strokeWidth="1.7" />
				<path d="M 356 148 H 432" strokeWidth="1.5" />
				<rect x="348" y="74" width="92" height="114" rx="2" fill={FILL} strokeWidth="1.5" />
				<rect x="356" y="82" width="76" height="98" rx="1" strokeWidth="1" opacity="0.32" />
				<circle cx="394" cy="58" r="3.2" fill={ACCENT} stroke="none" />
				{[0, 1, 2, 3].map((index) => (
					<circle
						key={`ready-${index}`}
						cx={360 + index * 18}
						cy="200"
						r="3"
						fill={index === 1 ? ACCENT : MUTED}
						stroke="none"
					/>
				))}
			</g>
		</svg>
	)
}

function CodeStudio({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 280 188"
			className={cn('h-auto w-full', className)}
			role="img"
			aria-label="A single coding workspace with editor and terminal on one surface"
		>
			<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
				<rect x="22" y="20" width="236" height="148" rx="10" fill={FILL} strokeWidth="1.4" />
				<path d="M 22 42 H 258" strokeWidth="1.15" />
				<circle cx="38" cy="31" r="3.2" fill={MUTED} stroke="none" />
				<circle cx="50" cy="31" r="3.2" fill={MUTED} stroke="none" />
				<circle cx="62" cy="31" r="3.2" fill={MUTED} stroke="none" />
				<path d="M 96 31 H 168" strokeWidth="1.1" opacity="0.35" />

				{[0, 1, 2, 3, 4, 5, 6].map((index) => (
					<line
						key={`code-${index}`}
						x1="40"
						y1={58 + index * 12}
						x2={index % 3 === 0 ? 150 : index % 2 === 0 ? 196 : 172}
						y2={58 + index * 12}
						strokeWidth="1.15"
						opacity={index === 0 ? 0.9 : 0.35 + (index % 3) * 0.12}
						stroke={index === 2 ? ACCENT : 'currentColor'}
					/>
				))}
				<rect x="36" y="146" width="208" height="12" rx="2" strokeWidth="1" opacity="0.28" />
			</g>
		</svg>
	)
}

function ToolTangle({ className }: { className?: string }) {
	const cards = [
		{ x: 28, y: 28, w: 108, h: 64, r: -8, label: 'notes' },
		{ x: 132, y: 22, w: 118, h: 58, r: 6, label: 'chat' },
		{ x: 40, y: 102, w: 100, h: 58, r: 4, label: 'docs' },
		{ x: 148, y: 96, w: 104, h: 62, r: -5, label: 'bill' },
	]

	return (
		<svg
			viewBox="0 0 280 188"
			className={cn('h-auto w-full', className)}
			role="img"
			aria-label="Overlapping tools that have to be coordinated by hand"
		>
			<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
				<path
					d="M 82 60 C 120 48, 150 70, 190 50"
					strokeDasharray="4 5"
					strokeWidth="1.15"
					opacity="0.55"
				/>
				<path
					d="M 90 130 C 130 90, 150 140, 198 126"
					strokeDasharray="4 5"
					strokeWidth="1.15"
					opacity="0.55"
					stroke={ACCENT}
				/>
				{cards.map((card) => (
					<g key={card.label} transform={`rotate(${card.r} ${card.x + card.w / 2} ${card.y + card.h / 2})`}>
						<rect
							x={card.x}
							y={card.y}
							width={card.w}
							height={card.h}
							rx="7"
							fill={FILL}
							strokeWidth="1.25"
						/>
						<text
							x={card.x + 14}
							y={card.y + 36}
							fill={MUTED}
							stroke="none"
							fontSize="13"
							fontFamily="ui-sans-serif, system-ui"
						>
							{card.label}
						</text>
					</g>
				))}
			</g>
		</svg>
	)
}

function SplitDiagram({
	left,
	right,
}: {
	left: Panel
	right: Panel
}) {
	return (
		<div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
			{[left, right].map((side, index) => (
				<div key={`${side.scene ?? 'scene'}-${side.label ?? index}`} className="min-w-0">
					<Scene name={side.scene ?? ''} />
					{side.label ? (
						<p className="mt-3 text-center text-sm text-muted-foreground">{side.label}</p>
					) : null}
				</div>
			))}
		</div>
	)
}

export function DiagramFigure({ spec }: DiagramFigureProps) {
	const type = asString(spec.type) ?? 'split'
	const title = asString(spec.title)
	const scene = asString(spec.scene)
	const left = panel(spec.left)
	const right = panel(spec.right)

	return (
		<div className="space-y-3">
			{title ? <h3 className="text-base text-foreground">{title}</h3> : null}
			{type === 'scene' && scene ? <Scene name={scene} /> : null}
			{type === 'split' ? <SplitDiagram left={left} right={right} /> : null}
		</div>
	)
}
