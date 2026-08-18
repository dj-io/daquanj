import type { ReactNode } from 'react'
import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'
import { cn } from '@/lib/utils'

function Note({ children }: { children: ReactNode }) {
	return (
		<aside className="my-8 border-l-2 border-grit/50 pl-5 text-[0.95em] leading-relaxed text-muted-foreground">
			{children}
		</aside>
	)
}

export const mdxComponents = {
	h1: ({ className, ...props }) => (
		<h1
			className={cn(
				'mt-12 mb-4 font-crimson text-3xl italic leading-tight text-grit',
				className,
			)}
			{...props}
		/>
	),
	h2: ({ className, ...props }) => (
		<h2
			className={cn(
				'mt-12 mb-4 font-crimson text-2xl italic leading-snug text-grit',
				className,
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }) => (
		<h3
			className={cn(
				'mt-8 mb-3 text-base font-semibold tracking-tight text-foreground',
				className,
			)}
			{...props}
		/>
	),
	p: ({ className, ...props }) => (
		<p
			className={cn(
				'my-5 text-[1.05rem] leading-7 text-foreground/90',
				className,
			)}
			{...props}
		/>
	),
	a: ({ href, className, ...props }) => {
		const isInternal = href?.startsWith('/')
		const styles = cn(
			'underline decoration-grit/35 underline-offset-3 transition-colors hover:text-grit hover:decoration-grit',
			className,
		)

		if (href && isInternal) {
			return <Link href={href} className={styles} {...props} />
		}

		return (
			<a
				href={href}
				className={styles}
				target="_blank"
				rel="noopener noreferrer"
				{...props}
			/>
		)
	},
	ul: ({ className, ...props }) => (
		<ul className={cn('my-5 list-disc space-y-2 pl-6 text-[1.05rem] leading-7', className)} {...props} />
	),
	ol: ({ className, ...props }) => (
		<ol className={cn('my-5 list-decimal space-y-2 pl-6 text-[1.05rem] leading-7', className)} {...props} />
	),
	li: ({ className, ...props }) => (
		<li className={cn('pl-1 text-foreground/90', className)} {...props} />
	),
	blockquote: ({ className, ...props }) => (
		<blockquote
			className={cn(
				'my-8 border-l-2 border-grit/40 pl-5 font-crimson text-xl italic leading-relaxed text-grit',
				className,
			)}
			{...props}
		/>
	),
	hr: ({ className, ...props }) => (
		<hr className={cn('my-12 border-border/70', className)} {...props} />
	),
	strong: ({ className, ...props }) => (
		<strong className={cn('font-semibold text-foreground', className)} {...props} />
	),
	em: ({ className, ...props }) => (
		<em className={cn('font-crimson italic', className)} {...props} />
	),
	code: ({ className, ...props }) => (
		<code
			className={cn(
				'rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.86em] text-foreground',
				className,
			)}
			{...props}
		/>
	),
	pre: ({ className, ...props }) => (
		<pre
			className={cn(
				'my-8 overflow-x-auto rounded-lg bg-muted/70 px-4 py-4 text-[0.86rem] leading-6',
				className,
			)}
			{...props}
		/>
	),
	img: ({ className, alt, ...props }) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			alt={alt ?? ''}
			className={cn('my-8 w-full rounded-lg', className)}
			{...props}
		/>
	),
	table: ({ className, ...props }) => (
		<div className="my-8 overflow-x-auto">
			<table className={cn('w-full text-left text-sm', className)} {...props} />
		</div>
	),
	th: ({ className, ...props }) => (
		<th className={cn('border-b border-border py-2 pr-4 font-semibold', className)} {...props} />
	),
	td: ({ className, ...props }) => (
		<td className={cn('border-b border-border/60 py-2 pr-4 text-muted-foreground', className)} {...props} />
	),
	Note,
} satisfies MDXComponents
