import * as React from 'react'
import type { SVGProps } from 'react'

export default function DesktopAppFrame (props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 1200 850'
			fill='none'
			{...props}
		>
			{/* Main desktop app window outline */}
			<rect
				x='0.5'
				y='0.5'
				width='1199'
				height='849'
				rx='10'
			stroke='currentColor'
			strokeWidth='1.2'
			fill='currentColor'
			fillOpacity='0.03'
			/>

			{/* Top header bar */}
			<rect
				x='0.5'
				y='0.5'
				width='1199'
				height='44'
				rx='10'
			fill='currentColor'
			fillOpacity='0.08'
			/>

		{/* Header separator line */}
		<line
			x1='0.5'
			y1='44.5'
			x2='1199.5'
			y2='44.5'
			stroke='currentColor'
			strokeWidth='1'
			strokeOpacity='0.6'
		/>

			{/* Traffic light buttons */}
		<circle cx='18' cy='22' r='6' fill='currentColor' fillOpacity='0.6' />
		<circle cx='36' cy='22' r='6' fill='currentColor' fillOpacity='0.6' />
		<circle cx='54' cy='22' r='6' fill='currentColor' fillOpacity='0.6' />

		{/* Left sidebar */}
		<rect
			x='0.5'
			y='44.5'
			width='250'
			height='805'
			fill='currentColor'
			fillOpacity='0.05'
		/>
		<line
			x1='250.5'
			y1='44.5'
			x2='250.5'
			y2='849.5'
			stroke='currentColor'
			strokeWidth='1'
			strokeOpacity='0.6'
		/>

		{/* Right sidebar */}
		<rect
			x='900'
			y='44.5'
			width='299.5'
			height='805'
			fill='currentColor'
			fillOpacity='0.05'
		/>
		<line
			x1='900'
			y1='44.5'
			x2='900'
			y2='849.5'
			stroke='currentColor'
			strokeWidth='1'
			strokeOpacity='0.6'
		/>

		{/* Center main content area */}
		<rect
			x='250.5'
			y='44.5'
			width='649.5'
			height='805'
			fill='currentColor'
			fillOpacity='0.02'
		/>

		{/* Subtle content hints - left sidebar */}
		<rect x='12' y='62' width='180' height='8' rx='2' fill='currentColor' fillOpacity='0.15' />
		<rect x='12' y='78' width='140' height='6' rx='1' fill='currentColor' fillOpacity='0.12' />
		<rect x='20' y='92' width='120' height='6' rx='1' fill='currentColor' fillOpacity='0.1' />
		<rect x='20' y='106' width='100' height='6' rx='1' fill='currentColor' fillOpacity='0.1' />

		{/* Subtle content hints - right sidebar */}
		<rect x='915' y='62' width='160' height='7' rx='1.5' fill='currentColor' fillOpacity='0.12' />
		<rect x='915' y='76' width='200' height='6' rx='1' fill='currentColor' fillOpacity='0.1' />
		<rect x='915' y='88' width='180' height='6' rx='1' fill='currentColor' fillOpacity='0.1' />

			{/* Right sidebar • chat affordances */}
			{/* Title chip (e.g., Ask) */}
			<rect x='1000' y='118' width='96' height='18' rx='9' fill='currentColor' fillOpacity='0.06' stroke='currentColor' strokeWidth='0.3' strokeOpacity='0.2' />
			<circle cx='1011' cy='127' r='4' fill='currentColor' fillOpacity='0.18' />
			<rect x='1020' y='123' width='54' height='8' rx='4' fill='currentColor' fillOpacity='0.08' />

		{/* Message bubbles */}
		<rect
			x='920'
			y='160'
			width='260'
			height='100'
			rx='12'
			fill='currentColor'
			fillOpacity='0.12'
			stroke='currentColor'
			strokeWidth='0.6'
			strokeOpacity='0.4'
		/>
			<circle cx='934' cy='178' r='8' fill='currentColor' fillOpacity='0.18' />
			<rect x='948' y='170' width='150' height='8' rx='3' fill='currentColor' fillOpacity='0.06' />
			<rect x='948' y='186' width='120' height='8' rx='3' fill='currentColor' fillOpacity='0.05' />

			<rect
				x='920'
				y='280'
				width='240'
				height='76'
				rx='12'
				fill='currentColor'
				fillOpacity='0.06'
				stroke='currentColor'
				strokeWidth='0.35'
				strokeOpacity='0.25'
			/>
			<rect x='932' y='292' width='160' height='8' rx='3' fill='currentColor' fillOpacity='0.06' />
			<rect x='932' y='308' width='120' height='8' rx='3' fill='currentColor' fillOpacity='0.05' />

			{/* Chat input bar */}
			<rect
				x='915'
				y='775'
				width='270'
				height='38'
				rx='19'
				fill='currentColor'
				fillOpacity='0.08'
				stroke='currentColor'
				strokeWidth='0.35'
				strokeOpacity='0.25'
			/>
			<circle cx='932' cy='794' r='7' fill='currentColor' fillOpacity='0.25' />
			<rect x='946' y='786' width='72' height='16' rx='8' fill='currentColor' fillOpacity='0.06' />
			<circle cx='1170' cy='794' r='8' fill='currentColor' fillOpacity='0.28' />

			{/* Left sidebar • directory tree hints */}
			{/* Root folder row */}
			<rect x='18' y='150' width='8' height='8' rx='1' fill='currentColor' fillOpacity='0.12' />
			<rect x='36' y='150' width='120' height='6' rx='2' fill='currentColor' fillOpacity='0.08' />
			{/* Tree connector */}
			<line x1='24' y1='158' x2='24' y2='228' stroke='currentColor' strokeWidth='0.4' strokeOpacity='0.25' />
			{/* Child rows with chevrons */}
			<path d='M30 171 l5 4 -5 4 z' fill='currentColor' fillOpacity='0.12' />
			<rect x='44' y='170' width='110' height='6' rx='2' fill='currentColor' fillOpacity='0.06' />
			<path d='M30 187 l5 4 -5 4 z' fill='currentColor' fillOpacity='0.12' />
			<rect x='44' y='186' width='84' height='6' rx='2' fill='currentColor' fillOpacity='0.06' />
			{/* Nested item */}
			<line x1='36' y1='192' x2='36' y2='216' stroke='currentColor' strokeWidth='0.35' strokeOpacity='0.22' />
			<path d='M42 207 l5 4 -5 4 z' fill='currentColor' fillOpacity='0.12' />
			<rect x='52' y='206' width='98' height='6' rx='2' fill='currentColor' fillOpacity='0.06' />

			{/* Center bottom chat composer (action shapes) */}
			<rect
				x='300'
				y='720'
				width='640'
				height='72'
				rx='18'
				fill='currentColor'
				fillOpacity='0.12'
				stroke='currentColor'
				strokeWidth='0.6'
				strokeOpacity='0.35'
			/>
			{/* @ icon */}
			<circle cx='324' cy='744' r='14' fill='currentColor' fillOpacity='0.3' />
			{/* placeholder text line */}
			<rect x='350' y='738' width='380' height='12' rx='6' fill='currentColor' fillOpacity='0.12' />
			{/* mode pill */}
			<rect x='318' y='760' width='120' height='26' rx='13' fill='currentColor' fillOpacity='0.1' stroke='currentColor' strokeWidth='0.4' strokeOpacity='0.3' />
			<circle cx='336' cy='773' r='6' fill='currentColor' fillOpacity='0.35' />
			<rect x='346' y='766' width='42' height='10' rx='5' fill='currentColor' fillOpacity='0.14' />
			<circle cx='394' cy='773' r='7' fill='currentColor' fillOpacity='0.3' />
			<path d='M410 769 l6 6 -6 6' stroke='currentColor' strokeOpacity='0.5' strokeWidth='1' fill='none' />
			{/* right side action icons */}
			<rect x='900' y='752' width='20' height='14' rx='2' fill='currentColor' fillOpacity='0.35' />
			<circle cx='930' cy='758' r='12' fill='currentColor' fillOpacity='0.4' />
		</svg>
	)
}


