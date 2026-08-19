import type { SVGProps } from 'react'

const Home = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		strokeWidth="1.75"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<path d="M4.75 10.75 12 4.75l7.25 6V19.5a.75.75 0 0 1-.75.75h-4.25v-5.5h-4.5v5.5H5.5a.75.75 0 0 1-.75-.75v-8.75Z" />
	</svg>
)

export default Home
