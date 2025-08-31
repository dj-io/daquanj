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
				title: 'Grit-1',
				model: 'grit-v1',
				icon: GritIcon,
				shortcut: '⌘G',
			},
			{
				title: 'Grit Large',
				model: 'grit-large',
				icon: GritIcon,
				shortcut: '⌘L',
			},
			{
				title: 'Any Model',
				model: 'any-model',
				icon: SparklesIcon,
				shortcut: '⌘A',
			},
		],
	},
]

	export const COPY: Copy[] = [
	{
		heading: 'The AI Note Editor that Writes, Edits and Explores Ideas with you',
		body: `A simple, powerful tool built to help you work faster. Grit lets you use any AI Model you want to find answers, resources, or the next spark of inspiration—all in one unified notespace.

From capturing quick ideas to working with others—Grit adapts so that you can write and collaborate without breaking your flow.`,
	},
	{
		heading: 'A simple, powerful note editor built to help you work faster',
		body: 'Grit is the AI Note Editor that Writes, Edits and Explores Ideas with you. Use any AI Model you want to find answers, resources, or the next spark of inspiration—all in one unified notespace.',
	},
]

// Copy selection constants
export const COPY_STORAGE_KEY = 'grit.copy.choice'
export const COPY_TTL_MS = 86_400_000 // 24 hours
