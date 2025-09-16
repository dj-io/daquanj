import { Brain, InfinityIcon, MessageCircle, SparklesIcon } from "lucide-react";
import { ChatMode, Copy, ModelGroup } from "./types";
import { GritIcon } from "@/components/ui/grit-icon";

export const CHAT_MODES: ChatMode[] = [
	{
		title: 'Ask',
		placeholder: 'ask',
		icon: MessageCircle,
		shortcut: '⌘Q',
	},
	{
		title: 'Research',
		placeholder: 'research with',
		icon: Brain,
		shortcut: '⌘R',
	},
	{
		title: 'Agent',
		placeholder: 'get assistance from',
		icon: InfinityIcon,
		shortcut: '⌘A',
		separate: true,
	},
]

export const MODEL_GROUPS: ModelGroup[] = [
	{
		title: 'Grit Models',
		url: '',
		icon: Brain,
		shortcut: '⌘M',
		submenu: [
			{
				title: 'Grit',
				model: 'Grit',
				icon: GritIcon,
				shortcut: '⌘G',
			},
			{
				title: 'AI',
				model: 'Any Model',
				icon: SparklesIcon,
				shortcut: '⌘A',
			},
		],
	},
]

	export const COPY: Copy[] = [
	{
		heading: 'Your Knowledge + AI',
		body: `Grit is an AI Note Editor that integrates frontier models like Claude and GPT-5 so you can write, edit and explore ideas with AI all in one place.

Get answers from your notes or pull in sources from the web to make sure your work is relevant, with models that know your workspace.

Grit is a simple, yet powerful tool built to help you work faster.`,
	},
	{
		heading: 'Your Knowledge + AI',
		body: `Grit is an AI Note Editor that integrates the latest frontier models so you can write, edit and explore ideas with AI all in one place. A simple, yet powerful tool built to help you work faster.
`,
	},
]

// Copy selection constants
export const COPY_STORAGE_KEY = 'grit.copy.choice'
export const COPY_TTL_MS = 86_400_000 // 24 hours

// Social links
export const SOCIAL_LINKS = [
	{
		name: 'X',
		url: 'https://x.com/gritxai',
		handle: '@gritxai'
	},
	{
		name: 'Substack',
		url: 'https://stratumlabs.substack.com',
		handle: 'stratumlabs.substack.com'
	}
]
