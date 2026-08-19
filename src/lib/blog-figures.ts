export const FIGURE_KINDS = ['image', 'chart', 'table', 'algorithm', 'stat-grid'] as const

export type FigureKind = (typeof FIGURE_KINDS)[number]

export type FigureRecord = {
	kind: string
	spec: Record<string, unknown>
}

export type BlogFigures = Record<string, FigureRecord>

export type FigurePlaceholder = {
	id: string
	kind: string
	title: string
}

const FIGURE_LINE =
	/^>\s*\[Figure:\s*(\S+)\s+[—–-]\s+([a-z0-9-]+):\s+([^\]]+)\]\s*$/
const ITALIC_CAPTION = /^\*(.+)\*$/

export function isRenderableFigureKind(value: string): value is FigureKind {
	return (FIGURE_KINDS as readonly string[]).includes(value)
}

export function matchFigureLine(line: string): FigurePlaceholder | null {
	const match = FIGURE_LINE.exec(line)
	if (!match) return null
	return { id: match[1], kind: match[2], title: match[3] }
}

export function extractFigurePlaceholders(markdown: string): FigurePlaceholder[] {
	return markdown.split('\n').flatMap((line) => {
		const match = matchFigureLine(line)
		return match ? [match] : []
	})
}

export function adaptFigurePlaceholders(markdown: string) {
	const lines = markdown.split('\n')
	const output: string[] = []

	for (let index = 0; index < lines.length; index += 1) {
		const placeholder = matchFigureLine(lines[index])
		if (!placeholder) {
			output.push(lines[index])
			continue
		}

		let cursor = index + 1
		while (cursor < lines.length && lines[cursor].trim() === '') cursor += 1

		const italic = cursor < lines.length ? ITALIC_CAPTION.exec(lines[cursor].trim()) : null
		if (italic) {
			output.push(`<BlogFigure id="${placeholder.id}">`)
			output.push(italic[1])
			output.push('</BlogFigure>')
			index = cursor
			continue
		}

		output.push(`<BlogFigure id="${placeholder.id}" />`)
	}

	return output.join('\n')
}

const CALLOUT_TITLE = /^>\s*\*\*(.+)\*\*\s*$/

export function adaptCalloutPlaceholders(markdown: string) {
	return markdown
		.split('\n')
		.map((line) => {
			const title = CALLOUT_TITLE.exec(line)
			if (!title) return line
			return `<Callout title=${JSON.stringify(title[1])} />`
		})
		.join('\n')
}

export function adaptArticleMarkdown(markdown: string) {
	return adaptFigurePlaceholders(adaptCalloutPlaceholders(markdown))
}

export function coverImageFromFigures(figureIds: string[], figures: BlogFigures) {
	const ordered = [
		...figureIds,
		...Object.keys(figures).filter((id) => !figureIds.includes(id)),
	]

	for (const id of ordered) {
		const figure = figures[id]
		if (figure?.kind === 'image' && typeof figure.spec.src === 'string') {
			return figure.spec.src
		}
	}

	return undefined
}

export function parseFiguresFile(slug: string, data: unknown): BlogFigures {
	if (data == null) return {}
	if (typeof data !== 'object') {
		throw new Error(`Post "${slug}" figure JSON must be an object`)
	}

	const record = data as { figures?: unknown }
	if (record.figures == null) return {}
	if (typeof record.figures !== 'object' || Array.isArray(record.figures)) {
		throw new Error(`Post "${slug}" figure JSON must have a figures object`)
	}

	const figures: BlogFigures = {}
	for (const [id, value] of Object.entries(record.figures as Record<string, unknown>)) {
		if (!value || typeof value !== 'object') {
			throw new Error(`Post "${slug}" figure "${id}" must be an object`)
		}

		const { kind, spec } = value as { kind?: unknown; spec?: unknown }
		if (typeof kind !== 'string' || !kind.trim()) {
			throw new Error(`Post "${slug}" figure "${id}" is missing a kind`)
		}
		if (!spec || typeof spec !== 'object' || Array.isArray(spec)) {
			throw new Error(`Post "${slug}" figure "${id}" is missing a spec object`)
		}

		figures[id] = { kind, spec: spec as Record<string, unknown> }
	}

	return figures
}

export function validateFigurePlaceholders(
	slug: string,
	placeholders: FigurePlaceholder[],
	figures: BlogFigures,
) {
	for (const placeholder of placeholders) {
		const figure = figures[placeholder.id]
		if (!figure) {
			throw new Error(`Post "${slug}" references missing figure "${placeholder.id}"`)
		}
		if (figure.kind !== placeholder.kind) {
			throw new Error(
				`Post "${slug}" figure "${placeholder.id}" kind mismatch: placeholder "${placeholder.kind}" vs json "${figure.kind}"`,
			)
		}
	}
}

export function asString(value: unknown) {
	return typeof value === 'string' ? value : undefined
}

export function asNumber(value: unknown) {
	return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

export function asBoolean(value: unknown) {
	return typeof value === 'boolean' ? value : undefined
}

export function asStringArray(value: unknown) {
	if (!Array.isArray(value)) return []
	return value.filter((item): item is string => typeof item === 'string')
}
