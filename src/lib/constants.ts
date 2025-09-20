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
				model: 'Frontier Model',
				icon: SparklesIcon,
				shortcut: '⌘A',
			},
		],
	},
]

	export const COPY: Copy[] = [
	{
		heading: 'The AI Note Editor',
		body: `Take notes, create docs, and build your knowledge base with agents that know your work, and work everywhere you do.`,
	},
	{
		heading: 'The AI Note Editor',
		body: `Take Notes, Create Docs, and Build your Knowledge Base in a simple Workspace with AI that knows your work and works everywhere you do.`,
	},
	{
		heading: 'From prompt to team',
		body: `The best way to work with AI agents, everywhere that work happens.`,
	},
	{
		heading: 'Your Knowledge + AI',
		body: `Grit is an AI Note Editor that integrates frontier models like Claude and GPT-5 so you can write, edit and explore ideas with AI all in one place.

Get answers from your notes or pull in sources from the web to make sure your work is relevant, with models that know your knowledge base.

Grit is a simple, yet powerful tool built to help you work faster.`,
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
	{
		heading: 'From Prompt to Team',
		body: `All you'll need is your Knowledge + AI.`,
	},
	{
		heading: 'AI That Works Where You Work',
		body: `Simple, powerful AI that connects to your actual work—no setup, no bottlenecks.`,
	},
	{
		heading: 'Your Knowledge + AI',
		body: `A knowledge base and AI agents that know your work and work everywhere you do.`,
	},
	{
		heading: 'Capture anything. Remember everything.',
		body: `Save notes, ideas, and research. Then put your knowledge base to work with AI agents that know your operations.`,
	},
	{
		heading: 'Write anything. Connect everything.',
		body: `From quick notes to deep research—AI agents that work across your tools and know your knowledge base.`,
	},
	{
		heading: 'Think faster. Work smarter.',
		body: `AI coworkers that handle operations while you focus on what matters. Simple, powerful, everywhere you work.`,
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
