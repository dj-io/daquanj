import { Permanent_Marker } from 'next/font/google'
import { asBoolean } from '@/lib/blog-figures'
import { cn } from '@/lib/utils'

const scrawl = Permanent_Marker({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
})

const ink = {
	canvas: '#EFE6D2',
	canvasEdge: '#CDBF9E',
	field: '#090909',
	chalk: '#F7F1E3',
	bone: '#E6DCC8',
	cyan: '#3EC8FF',
	cyanHot: '#8AEBFF',
	blue: '#2F6DFF',
	blueDeep: '#17356F',
	red: '#E31820',
	magenta: '#D10F6A',
	yellow: '#F4CF2A',
	gold: '#E0A41A',
	green: '#7DFF4A',
	greenHot: '#D4FF73',
	brown: '#6A3114',
	ochre: '#A45A22',
	white: '#FFFEF6',
}

type PaintingFigureProps = {
	spec: Record<string, unknown>
}

export function PaintingFigure({ spec }: PaintingFigureProps) {
	const animate = asBoolean(spec.animate) ?? true
	const draw = animate ? 'paint-stroke' : undefined
	const reveal = animate ? 'paint-reveal' : undefined
	const wait = (ms: number) => (animate ? { animationDelay: `${ms}ms` } : undefined)

	return (
		<svg
			viewBox="0 0 800 820"
			className={cn(scrawl.className, 'h-auto w-full overflow-visible')}
			aria-hidden
		>
			<defs>
				<filter id="paint-grain" x="0" y="0" width="100%" height="100%">
					<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" seed="7" result="n" />
					<feColorMatrix
						in="n"
						type="matrix"
						values="0 0 0 0 0.9  0 0 0 0 0.86  0 0 0 0 0.78  0 0 0 0.16 0"
					/>
				</filter>
				<filter id="paint-stick" x="-12%" y="-12%" width="124%" height="124%">
					<feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" seed="11" result="n" />
					<feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
				</filter>
				<filter id="paint-impasto" x="-18%" y="-18%" width="136%" height="136%">
					<feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="3" result="n" />
					<feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" />
					<feGaussianBlur stdDeviation="0.35" />
				</filter>
				<filter id="paint-glow" x="-40%" y="-40%" width="180%" height="180%">
					<feGaussianBlur stdDeviation="4.5" result="b" />
					<feMerge>
						<feMergeNode in="b" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>

			{/* Raw canvas — the object on the page, not a UI panel */}
			<path
				d="M14 28 C 40 8, 160 16, 280 10 C 430 2, 590 18, 786 12 L 794 798 C 640 812, 420 806, 210 816 C 90 822, 22 804, 10 790 Z"
				fill={ink.canvas}
			/>
			<path
				d="M28 22 C 70 14, 200 20, 400 12 C 610 4, 760 18, 778 22 L 786 742 C 620 728, 400 736, 170 748 C 70 754, 32 742, 26 730 Z"
				fill={ink.field}
			/>
			<rect x="26" y="22" width="760" height="726" filter="url(#paint-grain)" opacity="0.55" />
			<path
				d="M26 730 C 180 748, 430 736, 786 742 L 794 798 C 640 812, 420 806, 210 816 C 90 822, 22 804, 10 790 L 26 730 Z"
				fill={ink.canvas}
			/>
			<path
				d="M40 748 C 160 762, 420 750, 760 758"
				fill="none"
				stroke={ink.canvasEdge}
				strokeWidth="6"
				opacity="0.55"
			/>

			<g fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#paint-stick)">
				{/* Impasto swipes — paint first, drawing later, some paint over again */}
				<g filter="url(#paint-impasto)">
					<path
						d="M 86 48 C 118 210, 64 430, 132 730"
						stroke={ink.brown}
						strokeWidth="62"
						opacity="0.72"
					/>
					<path
						d="M 240 90 C 300 240, 210 470, 280 700"
						stroke={ink.ochre}
						strokeWidth="28"
						opacity="0.38"
					/>
					<path
						d="M 420 40 C 500 180, 560 390, 490 720"
						stroke={ink.blueDeep}
						strokeWidth="70"
						opacity="0.42"
					/>
					<path
						d="M 40 560 C 220 520, 480 590, 760 540"
						stroke={ink.brown}
						strokeWidth="36"
						opacity="0.5"
					/>
					<path
						d="M 500 80 C 620 220, 700 360, 760 520"
						stroke={ink.blue}
						strokeWidth="22"
						opacity="0.28"
					/>
				</g>

				{/* Underdrawing, ribs, hatches */}
				<g stroke={ink.chalk} opacity="0.38">
					{[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
						<line
							key={`rib-${index}`}
							className={draw}
							pathLength={1}
							x1={58}
							y1={168 + index * 11}
							x2={132}
							y2={154 + index * 10}
							strokeWidth={index % 3 === 0 ? 1.8 : 1.1}
							style={wait(180 + index * 40)}
						/>
					))}
					{[0, 1, 2, 3, 4, 5].map((index) => (
						<line
							key={`grid-${index}`}
							className={draw}
							pathLength={1}
							x1={520 + index * 18}
							y1={430}
							x2={508 + index * 16}
							y2={610}
							strokeWidth="0.9"
							style={wait(520 + index * 50)}
						/>
					))}
				</g>

				{/* Upper-left skull — green-eyed, spiked, skeletal */}
				<g>
					<path
						className={draw}
						pathLength={1}
						d="M 78 78 C 62 42, 96 16, 138 22 C 178 28, 206 58, 198 96 C 192 138, 150 162, 108 152 C 70 142, 58 112, 78 78 Z"
						stroke={ink.chalk}
						strokeWidth="3.2"
						style={wait(120)}
					/>
					<path
						className={draw}
						pathLength={1}
						d="M 84 84 C 70 50, 104 24, 140 30 C 174 36, 196 64, 190 98"
						stroke={ink.white}
						strokeWidth="1.4"
						opacity="0.7"
						style={wait(200)}
					/>
					{[0, 1, 2, 3, 4, 5, 6].map((index) => (
						<line
							key={`spike-${index}`}
							className={draw}
							pathLength={1}
							x1={100 + index * 14}
							y1={36 - (index % 2) * 6}
							x2={92 + index * 15}
							y2={8 - (index % 3) * 8}
							stroke={ink.chalk}
							strokeWidth="1.6"
							style={wait(240 + index * 30)}
						/>
					))}
					<ellipse
						className={draw}
						pathLength={1}
						cx="118"
						cy="78"
						rx="11"
						ry="13"
						stroke={ink.chalk}
						strokeWidth="2.2"
						fill={ink.field}
						style={wait(320)}
					/>
					<ellipse
						className={draw}
						pathLength={1}
						cx="156"
						cy="76"
						rx="10"
						ry="12"
						stroke={ink.chalk}
						strokeWidth="2.2"
						fill={ink.field}
						style={wait(360)}
					/>
					<ellipse className={animate ? 'paint-flicker' : undefined} cx="118" cy="78" rx="7" ry="8" fill={ink.green} stroke="none" />
					<ellipse className={animate ? 'paint-flicker' : undefined} cx="156" cy="76" rx="6.5" ry="7.5" fill={ink.greenHot} stroke="none" />
					<circle className={animate ? 'paint-pulse' : undefined} cx="118" cy="78" r="3.4" fill={ink.red} />
					<circle className={animate ? 'paint-pulse' : undefined} cx="156" cy="76" r="3.2" fill={ink.red} />
					<path
						className={draw}
						pathLength={1}
						d="M 128 96 L 122 118 L 142 116"
						stroke={ink.chalk}
						strokeWidth="1.8"
						style={wait(400)}
					/>
					{[0, 1, 2, 3, 4].map((index) => (
						<rect
							key={`upper-tooth-${index}`}
							className={reveal}
							x={114 + index * 10}
							y={128}
							width="7"
							height={12 + (index % 2) * 3}
							fill={ink.white}
							stroke={ink.field}
							strokeWidth="0.8"
							style={wait(480 + index * 40)}
						/>
					))}
					<line
						className={draw}
						pathLength={1}
						x1="96"
						y1="64"
						x2="168"
						y2="118"
						stroke={ink.red}
						strokeWidth="2.4"
						style={wait(560)}
					/>
				</g>

				{/* Lower-left mask — the wide-jawed head the crown surmounts */}
				<g>
					<path
						className={draw}
						pathLength={1}
						d="M 108 430 C 84 318, 126 228, 214 208 C 302 188, 372 238, 384 336 C 398 438, 348 538, 236 568 C 124 598, 86 522, 108 430 Z"
						stroke={ink.chalk}
						strokeWidth="4.2"
						style={wait(80)}
					/>
					<path
						className={draw}
						pathLength={1}
						d="M 98 438 C 72 320, 118 214, 210 196 C 314 176, 386 232, 396 342 C 408 452, 352 554, 230 582 C 108 610, 74 528, 98 438 Z"
						stroke={ink.white}
						strokeWidth="2.2"
						opacity="0.55"
						style={wait(140)}
					/>
					<path
						className={draw}
						pathLength={1}
						d="M 118 424 C 96 330, 136 246, 216 228 C 296 210, 356 252, 368 340"
						stroke={ink.red}
						strokeWidth="2.1"
						opacity="0.85"
						style={wait(160)}
					/>
					<path
						className={draw}
						pathLength={1}
						d="M 142 250 C 188 232, 250 236, 318 268"
						stroke={ink.cyan}
						strokeWidth="1.4"
						opacity="0.7"
						style={wait(240)}
					/>
					<ellipse
						cx="188"
						cy="332"
						rx="28"
						ry="32"
						stroke={ink.chalk}
						strokeWidth="3"
						className={draw}
						pathLength={1}
						style={wait(220)}
					/>
					<ellipse
						cx="276"
						cy="326"
						rx="26"
						ry="30"
						stroke={ink.chalk}
						strokeWidth="3"
						className={draw}
						pathLength={1}
						style={wait(260)}
					/>
					<ellipse
						className={animate ? 'paint-flicker' : undefined}
						cx="188"
						cy="332"
						rx="16"
						ry="18"
						fill={ink.green}
						stroke="none"
					/>
					<ellipse
						className={animate ? 'paint-flicker' : undefined}
						cx="276"
						cy="326"
						rx="15"
						ry="17"
						fill={ink.greenHot}
						stroke="none"
					/>
					<circle className={animate ? 'paint-pulse' : undefined} cx="188" cy="332" r="5.5" fill={ink.red} />
					<circle className={animate ? 'paint-pulse' : undefined} cx="276" cy="326" r="5.2" fill={ink.red} />
					<path
						className={draw}
						pathLength={1}
						d="M 224 360 L 208 418 L 248 414 Z"
						stroke={ink.chalk}
						strokeWidth="2.4"
						style={wait(400)}
					/>
					<path
						className={cn(reveal)}
						d="M 148 448 L 328 436 L 336 498 L 140 512 Z"
						fill={ink.field}
						stroke={ink.red}
						strokeWidth="3.2"
						style={wait(480)}
					/>
					{[0, 1, 2, 3, 4, 5, 6].map((index) => (
						<rect
							key={`jaw-tooth-${index}`}
							className={reveal}
							x={158 + index * 24}
							y={450}
							width="16"
							height={index % 2 === 0 ? 42 : 36}
							fill={ink.white}
							stroke={ink.field}
							strokeWidth="1.2"
							style={wait(520 + index * 35)}
						/>
					))}
					<line
						className={draw}
						pathLength={1}
						x1="146"
						y1="478"
						x2="332"
						y2="468"
						stroke={ink.field}
						strokeWidth="3"
						style={wait(760)}
					/>
					<path
						className={draw}
						pathLength={1}
						d="M 168 560 C 214 610, 286 608, 332 548"
						stroke={ink.ochre}
						strokeWidth="7"
						opacity="0.8"
						style={wait(640)}
					/>
					<path
						d="M 70 500 C 180 470, 320 510, 400 490"
						stroke={ink.brown}
						strokeWidth="22"
						opacity="0.32"
						filter="url(#paint-impasto)"
						className={reveal}
						style={wait(700)}
					/>
				</g>

				{/* Right: side-view box, pyramid, PEZ, yellow frames */}
				<g>
					<path
						className={draw}
						pathLength={1}
						d="M 548 268 L 738 258 L 748 392 L 542 408 Z"
						stroke={ink.yellow}
						strokeWidth="2.4"
						style={wait(500)}
					/>
					<path
						className={draw}
						pathLength={1}
						d="M 572 292 C 600 278, 640 286, 678 310 C 700 324, 708 348, 692 366 C 668 392, 610 398, 576 372 C 558 358, 556 322, 572 292 Z"
						stroke={ink.chalk}
						strokeWidth="2"
						style={wait(580)}
					/>
					<path
						className={draw}
						pathLength={1}
						d="M 628 318 L 668 338 L 622 358"
						stroke={ink.cyan}
						strokeWidth="1.6"
						style={wait(660)}
					/>
					<path
						className={draw}
						pathLength={1}
						d="M 590 430 L 734 424 L 742 508 L 584 518 Z"
						stroke={ink.magenta}
						strokeWidth="1.8"
						style={wait(620)}
					/>
					<g className={animate ? 'paint-float' : undefined}>
						<path
							className={draw}
							pathLength={1}
							d="M 610 690 L 762 698 L 684 548 Z"
							stroke={ink.blue}
							strokeWidth="2.6"
							style={wait(700)}
						/>
					</g>
					<path
						className={draw}
						pathLength={1}
						d="M 702 214 L 768 188 L 768 262 Z"
						stroke={ink.cyan}
						strokeWidth="2.2"
						style={wait(540)}
					/>
					<rect
						className={draw}
						pathLength={1}
						x="596"
						y="148"
						width="92"
						height="58"
						stroke={ink.yellow}
						strokeWidth="2"
						transform="rotate(-7 642 177)"
						style={wait(480)}
					/>
				</g>

				{/* Crown — three points, cyan, gold, the painting’s sovereign mark */}
				<g className={animate ? 'paint-float' : undefined} filter="url(#paint-glow)">
					<g className={animate ? 'paint-glow' : undefined}>
						<path
							className={reveal}
							d="M 322 172 L 360 58 L 400 170 L 448 42 L 494 170 L 542 64 L 572 172 L 318 176 Z"
							fill={ink.cyan}
							fillOpacity="0.28"
							stroke="none"
							style={wait(240)}
						/>
					</g>
					<path
						className={reveal}
						d="M 318 168 L 358 52 L 402 168 L 448 40 L 496 168 L 542 62 L 574 170 L 312 176 Z"
						fill={ink.gold}
						fillOpacity="0.88"
						stroke="none"
						style={wait(280)}
					/>
					<path
						className={draw}
						pathLength={1}
						d="M 328 170 L 360 58 L 398 168"
						stroke={ink.cyanHot}
						strokeWidth="6.2"
					/>
					<path
						className={draw}
						pathLength={1}
						d="M 392 172 L 448 36 L 504 170"
						stroke={ink.cyan}
						strokeWidth="6.8"
					/>
					<path
						className={draw}
						pathLength={1}
						d="M 496 168 L 544 48 L 578 172"
						stroke={ink.cyanHot}
						strokeWidth="6.2"
						style={wait(320)}
					/>
					<path
						className={draw}
						pathLength={1}
						d="M 318 174 C 380 186, 470 182, 580 170"
						stroke={ink.yellow}
						strokeWidth="3.4"
						style={wait(380)}
					/>
					<path
						className={draw}
						pathLength={1}
						d="M 336 166 L 364 70 L 394 164 M 408 166 L 450 48 L 492 166 M 508 164 L 542 72 L 568 166"
						stroke={ink.white}
						strokeWidth="1.5"
						opacity="0.65"
						style={wait(420)}
					/>
					<circle
						className={draw}
						pathLength={1}
						cx="448"
						cy="214"
						r="28"
						stroke={ink.cyan}
						strokeWidth="2.4"
						style={wait(460)}
					/>
					<circle
						cx="448"
						cy="214"
						r="6"
						fill={ink.cyanHot}
						className={animate ? 'paint-pulse' : undefined}
					/>
				</g>

				{/* Crossing marks, arcs, copyrights — the palimpsest */}
				<path
					className={draw}
					pathLength={1}
					d="M 48 36 C 220 180, 430 360, 772 700"
					stroke={ink.red}
					strokeWidth="3.4"
					style={wait(160)}
				/>
				<path
					className={animate ? 'paint-drift' : undefined}
					d="M 70 680 C 240 500, 470 280, 760 90"
					stroke={ink.blue}
					strokeWidth="2.2"
					strokeDasharray="7 11"
				/>
				<path
					className={draw}
					pathLength={1}
					d="M 90 120 C 280 8, 540 8, 760 140"
					stroke={ink.cyan}
					strokeWidth="1.8"
					opacity="0.85"
					style={wait(240)}
				/>
				<g className={animate ? 'paint-drip' : undefined}>
					<path
						className={draw}
						pathLength={1}
						d="M 214 22 L 210 86"
						stroke={ink.yellow}
						strokeWidth="3.2"
						style={wait(300)}
					/>
					<path
						className={draw}
						pathLength={1}
						d="M 612 30 L 618 102"
						stroke={ink.red}
						strokeWidth="4"
						style={wait(340)}
					/>
					<path
						className={draw}
						pathLength={1}
						d="M 404 18 L 400 64"
						stroke={ink.chalk}
						strokeWidth="2.4"
						style={wait(280)}
					/>
				</g>
				<circle
					className={draw}
					pathLength={1}
					cx="392"
					cy="248"
					r="13"
					stroke={ink.chalk}
					strokeWidth="1.6"
					style={wait(640)}
				/>
				<text x="385" y="254" fill={ink.chalk} fontSize="16" style={wait(680)} className={reveal}>
					©
				</text>

				{/* Hieroglyphic chatter */}
				<path
					className={draw}
					pathLength={1}
					d="M 430 620 L 430 668 M 414 636 L 446 636 M 418 652 L 442 652"
					stroke={ink.yellow}
					strokeWidth="2"
					style={wait(720)}
				/>
				<path
					className={draw}
					pathLength={1}
					d="M 470 628 C 490 612, 512 612, 528 630 C 512 648, 490 648, 470 628 Z"
					stroke={ink.magenta}
					strokeWidth="1.7"
					style={wait(760)}
				/>
				<path
					className={draw}
					pathLength={1}
					d="M 40 620 C 70 600, 90 640, 60 660 C 40 644, 36 628, 40 620"
					stroke={ink.green}
					strokeWidth="1.8"
					style={wait(800)}
				/>
			</g>

			{/* Scrawled labels — cramped, rotated, struck-through, repeated */}
			<g className={animate ? 'paint-jitter' : undefined} filter="url(#paint-stick)">
				<text
					x="198"
					y="62"
					fill={ink.chalk}
					fontSize="34"
					transform="rotate(-8 198 62)"
					className={reveal}
					style={wait(80)}
				>
					RAMESES II
				</text>
				<line
					x1="196"
					y1="68"
					x2="468"
					y2="50"
					stroke={ink.red}
					strokeWidth="5"
					className={draw}
					pathLength={1}
					style={wait(220)}
				/>
				<text
					x="228"
					y="102"
					fill={ink.yellow}
					fontSize="26"
					transform="rotate(-4 228 102)"
					className={reveal}
					style={wait(140)}
				>
					RAMESES II
				</text>
				<text
					x="448"
					y="128"
					fill={ink.cyanHot}
					fontSize="22"
					transform="rotate(6 448 128)"
					className={reveal}
					style={wait(180)}
				>
					CROWN COPYRIGHT
				</text>
				<text x="472" y="146" fill={ink.cyan} fontSize="24" className={reveal} style={wait(200)}>
					©
				</text>
				<text
					x="428"
					y="258"
					fill={ink.cyan}
					fontSize="16"
					textAnchor="middle"
					className={reveal}
					style={wait(220)}
				>
					CROWN
				</text>
				<text
					x="78"
					y="188"
					fill={ink.bone}
					fontSize="18"
					transform="rotate(-18 78 188)"
					className={reveal}
					style={wait(120)}
				>
					SCALP
				</text>
				<text x="332" y="500" fill={ink.red} fontSize="28" className={reveal} style={wait(200)}>
					TEETH
				</text>
				<text
					x="54"
					y="524"
					fill={ink.chalk}
					fontSize="26"
					transform="rotate(-12 54 524)"
					className={reveal}
					style={wait(160)}
				>
					JAW
				</text>
				<text x="88" y="704" fill={ink.ochre} fontSize="32" className={reveal} style={wait(240)}>
					TORSO
				</text>
				<line
					x1="88"
					y1="708"
					x2="210"
					y2="708"
					stroke={ink.yellow}
					strokeWidth="3"
					className={draw}
					pathLength={1}
					style={wait(280)}
				/>
				<text
					x="556"
					y="252"
					fill={ink.yellow}
					fontSize="15"
					transform="rotate(-7 556 252)"
					className={reveal}
					style={wait(180)}
				>
					SIDE VIEW OF HEAD
				</text>
				<text x="604" y="478" fill={ink.magenta} fontSize="26" className={reveal} style={wait(220)}>
					PEZ
				</text>
				<text
					x="640"
					y="176"
					fill={ink.red}
					fontSize="28"
					transform="rotate(8 640 176)"
					className={reveal}
					style={wait(160)}
				>
					II
				</text>
				<text
					x="430"
					y="710"
					fill={ink.chalk}
					fontSize="18"
					opacity="0.75"
					transform="rotate(-3 430 710)"
					className={reveal}
					style={wait(260)}
				>
					KINGS
				</text>
			</g>
		</svg>
	)
}
