'use client'

import { SearchIcon, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type PostSearchProps = {
	value: string
	onChange: (value: string) => void
	className?: string
}

export function PostSearch({ value, onChange, className }: PostSearchProps) {
	return (
		<label className={cn('relative block', className)}>
			<span className="sr-only">Search writing</span>
			<SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
			<input
				type="search"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder="Search"
				className={cn(
					'w-full rounded-full border border-foreground/25 bg-card py-1.5 text-sm text-foreground',
					'pl-8 placeholder:text-muted-foreground',
					value ? 'pr-8' : 'pr-3.5',
					'outline-none transition-colors',
					'focus-visible:border-foreground/50 focus-visible:ring-ring/40 focus-visible:ring-[3px]',
					'[&::-webkit-search-cancel-button]:hidden',
				)}
			/>
			{value ? (
				<button
					type="button"
					aria-label="Clear search"
					onClick={() => onChange('')}
					className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground transition-colors hover:text-foreground"
				>
					<XIcon className="size-3.5" />
				</button>
			) : null}
		</label>
	)
}
