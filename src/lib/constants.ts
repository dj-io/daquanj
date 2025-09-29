import { Brain, InfinityIcon, MessageCircle, FileText, Globe, FolderClosed } from "lucide-react";
import { ChatMode, Copy, ModelGroup, ContextItem } from "./types";
import OpenAI from "@/app/svg/OpenAI";
import ClaudeAI from "@/app/svg/Claude";

export const CHAT_MODES: ChatMode[] = [
	{
		title: 'Agent',
		placeholder: 'get assistance from',
		icon: InfinityIcon,
		shortcut: '⌘A',
		separate: true,
	},
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
]

export const MODEL_GROUPS: ModelGroup[] = [
	{
		title: 'Grit Models',
		url: '',
		icon: Brain,
		shortcut: '⌘M',
		submenu: [
			{
				title: 'GPT 5',
				model: 'GPT 5',
				icon: OpenAI,
				shortcut: '⌘A',
			},
			{
				title: 'Claude Opus 4.1',
				model: 'Claude Opus 4.1',
				icon: ClaudeAI,
				shortcut: '⌘G',
			},
		],
	},
]

export const CONTEXT_ITEMS: ContextItem[] = [
	{
		title: 'Pages',
		description: 'Search through your personal pages',
		icon: FileText,
		value: 'pages',
		shortcut: '⌘P',
	},
	{
		title: 'Web',
		description: 'Search the web for current information',
		icon: Globe,
		value: 'web',
		shortcut: '⌘R',
	},
	{
		title: 'Files',
		description: 'Access your team\'s files',
		icon: FolderClosed,
		value: 'files',
		shortcut: '⌘F',
	},
]

	export const COPY: Copy[] = [
	{
		heading: 'What if agents were capable of automating knowledge work beyond just code?',
		body: 'Become orders of magnitude more effective than anyone working alone.',
	},
	{
		heading: 'Automate knowledge work, beyond code.',
		body: 'Become orders of magnitude more effective than anyone working alone.',
	},
	{
		heading: 'Become orders of magnitude more effective than anyone working alone.',
		body: `Grit lets you automate knowledge work beyond code, all from one unified workspace`,
	},
	{
		heading: 'What if the most powerful coding agents were built for operational work and could help us write, update spreadsheets, conduct deep research and complex business workflows.',
		body: `Imagine automating knowledge work beyond code, all from one unified workspace`,
	},
	{
		heading: 'Imagine a tool that leveraged AI agents this way to 10x your productivity?',
		body: `What if you could automate knowledge work beyond code, across all your tools. Updating spreadsheets, conducting deep research, copywriting, and other operational taks. From one platform.`,
	},
	{
		heading: 'Your Knowledge + AI',
		body: `Take notes, create docs, and build your knowledge base with a privacy-focused AI Copilot.`,
	},
	{
		heading: 'The AI Note Editor',
		body: `Take notes, create docs, and build your knowledge base with agents that know your work, and work everywhere you do.`,
	},
	{
		heading: 'The AI Note Editor',
		body: `Create tasks, manage projects, and use databases with agents that know your work, and work everywhere you do.`,
	},
	{
		heading: 'The AI Note Editor',
		body: `Send emails, manage your calendar, and connect to your tools with agents that know your work, and work everywhere you do.`,
	},
	{
		heading: 'From prompt to team',
		body: `The best way to work with AI agents, everywhere that work happens.`,
	},
	{
		heading: 'Your Knowledge + AI',
		body: `Grit is an AI Note Editor that integrates the latest frontier models so you can write, edit and explore ideas with AI all in one place. A simple, yet powerful tool built to help you work faster.
`,
	},
	{
		heading: 'The AI Workspace',
		body: `A simple, yet powerful tool built to help you work faster.`,
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
