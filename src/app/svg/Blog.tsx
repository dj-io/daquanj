import type { SVGProps } from 'react'

const Blog = (props: SVGProps<SVGSVGElement>) => (
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
		<path d="M5 4.75h10.5A2.75 2.75 0 0 1 18.25 7.5v11.25H7.25A2.25 2.25 0 0 1 5 16.5V4.75Z" />
		<path d="M5 16.5c0 .97.78 1.75 1.75 1.75H18.25" />
		<path d="M8.5 8.5h6.5M8.5 12h4.5" />
	</svg>
)

export default Blog
