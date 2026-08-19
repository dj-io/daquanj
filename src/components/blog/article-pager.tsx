'use client'

import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type AdjacentPost = {
	slug: string
	title: string
}

type ArticlePagerProps = {
	older: AdjacentPost | null
	newer: AdjacentPost | null
}

export function ArticlePager({ older, newer }: ArticlePagerProps) {
	const [copied, setCopied] = useState(false)

	async function share() {
		const url = window.location.href
		const title = document.title

		try {
			if (navigator.share) {
				await navigator.share({ title, url })
				return
			}

			await navigator.clipboard.writeText(url)
			setCopied(true)
			window.setTimeout(() => setCopied(false), 1600)
		} catch {
			// User cancelled the share sheet.
		}
	}

	return (
		<nav
			aria-label="Article"
			className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-8 rounded-full bg-zinc-900/90 px-7 py-2.5 text-sm text-white shadow-lg backdrop-blur-md"
		>
			{older ? (
				<Link href={`/blog/${older.slug}`} className="transition-opacity hover:opacity-70">
					Prev
				</Link>
			) : (
				<span className="opacity-35">Prev</span>
			)}
			<button
				type="button"
				onClick={share}
				className={cn('transition-opacity hover:opacity-70')}
			>
				{copied ? 'Copied' : 'Share'}
			</button>
			{newer ? (
				<Link href={`/blog/${newer.slug}`} className="transition-opacity hover:opacity-70">
					Next
				</Link>
			) : (
				<span className="opacity-35">Next</span>
			)}
		</nav>
	)
}
