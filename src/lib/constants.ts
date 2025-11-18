import { Brain, InfinityIcon, MessageCircle, FileText, Globe, FolderClosed } from "lucide-react";
import { ChatMode, Copy, ModelGroup, ContextItem } from "./types";
import OpenAI from "@/app/svg/OpenAI";
import ClaudeAI from "@/app/svg/Claude";
import Grok from "@/app/svg/Grok";
import Google from "@/app/svg/Google";

export const CHAT_MODES: ChatMode[] = [
	{
		title: 'Agent',
		placeholder: 'get assistance from',
		icon: InfinityIcon,
		shortcut: '⌘A',
		separate: true,
	},
	{
		title: 'Research',
		placeholder: 'research with',
		icon: Brain,
		shortcut: '⌘R',
	},
	{
		title: 'Ask',
		placeholder: 'ask',
		icon: MessageCircle,
		shortcut: '⌘Q',
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
				title: 'GPT 5.1',
				model: 'GPT 5.1',
				icon: OpenAI,
				shortcut: '⌘A',
			},
			{
				title: 'Claude Sonnet 4.5',
				model: 'Claude Sonnet 4.5',
				icon: ClaudeAI,
				shortcut: '⌘G',
			},
			{
				title: 'Gemini 2.5 pro',
				model: 'Gemini 2.5 pro',
				icon: Google,
				shortcut: '⌘G',
			},
			{
				title: 'Grok 4',
				model: 'Grok 4',
				icon: Grok,
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
		heading: 'Go from prompt to conclusion faster with AI grounded in your data.',
		body: 'Surface insights across PDFs, audio, images, spreadsheets, and your notes in seconds. Your sources. Your workspace. Your research, advancing at the speed of AI.',
	},
	{
		heading: 'A minimal, context aware workspace for all of your writing, learning, and research.',
		body: 'Go from prompt to conclusion faster than ever.',
	},
	{
		heading: 'The AI Workspace that lets you automate knowledge work beyond code.',
		body: 'Become orders of magnitude more effective than anyone working alone.',
	},
	{
		heading: 'Become orders of magnitude more effective than anyone working alone.',
		body: `Grit lets you automate knowledge work beyond code, all from one unified workspace`,
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
