import { LucideIcon } from "lucide-react"

export interface ChatMode {
	title: string
	placeholder: string
	icon: LucideIcon
	shortcut: string
	separate?: boolean
}

export interface ModelItem {
	title: string
	model: string
	icon: LucideIcon | React.ComponentType<{ className?: string }>
	shortcut: string
}

export interface ModelGroup {
	title: string
	url: string
	icon: LucideIcon
	shortcut: string
	separate?: boolean
	submenu: ModelItem[]
}

export interface Copy {
	heading: string
	body: string
}
