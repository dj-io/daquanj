'use client'

import {
	createContext,
	useContext,
	useId,
	useState,
	type ReactNode,
} from 'react'
import { cn } from '@/lib/utils'

type TabsContextValue = {
	value: string
	setValue: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabs() {
	const context = useContext(TabsContext)
	if (!context) {
		throw new Error('Tabs components must be used inside <Tabs>')
	}
	return context
}

export function Tabs({
	defaultValue,
	children,
}: {
	defaultValue: string
	children: ReactNode
}) {
	const [value, setValue] = useState(defaultValue)
	return (
		<TabsContext.Provider value={{ value, setValue }}>
			<div className="my-8">{children}</div>
		</TabsContext.Provider>
	)
}

export function TabsList({ children }: { children: ReactNode }) {
	return (
		<div className="mb-4 flex gap-6 border-b border-border text-sm">
			{children}
		</div>
	)
}

export function TabsTrigger({
	value,
	children,
}: {
	value: string
	children: ReactNode
}) {
	const tabs = useTabs()
	const selected = tabs.value === value

	return (
		<button
			type="button"
			onClick={() => tabs.setValue(value)}
			className={cn(
				'-mb-px border-b-2 pb-2 transition-colors',
				selected
					? 'border-blog-accent text-foreground'
					: 'border-transparent text-muted-foreground hover:text-foreground',
			)}
		>
			{children}
		</button>
	)
}

export function TabsContent({
	value,
	children,
}: {
	value: string
	children: ReactNode
}) {
	const tabs = useTabs()
	const labelledBy = useId()
	if (tabs.value !== value) return null
	return (
		<div id={labelledBy} className="min-w-0">
			{children}
		</div>
	)
}
