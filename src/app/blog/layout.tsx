import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
	title: "Writing · a'Quan Johnson",
	description:
		'Field notes from applied AI, shipping software, and the work of thinking clearly.',
	openGraph: {
		title: "Writing · a'Quan Johnson",
		description:
			'Field notes from applied AI, shipping software, and the work of thinking clearly.',
		type: 'website',
	},
	alternates: {
		types: {
			'application/rss+xml': '/blog/rss.xml',
		},
	},
}

export default function BlogLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex min-h-dvh flex-col bg-background">
			<div className="flex-1 px-5 pb-8 pt-24 sm:px-8 sm:pt-20">
				<div id="blog-content-start" className="h-px w-px" aria-hidden />
				{children}
			</div>
			<SiteFooter />
		</div>
	)
}
