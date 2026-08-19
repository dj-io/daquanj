# Writing

Posts live in `content/blog/<slug>/article.json`. Drop a folder, fill the document, it shows up on `/blog`.

## Add a post

1. Create `content/blog/your-slug/`.
2. Add `article.json` with `slug`, `frontmatter`, `markdown`, and `figures`.
3. `slug` must match the folder name (`lowercase-with-hyphens`).
4. `frontmatter.tag` is the topic label: `Research`, `Building`, or `Notes`.
5. `frontmatter.date` is `YYYY-MM-DD`. `draft: true` stays off production.

```json
{
  "slug": "your-slug",
  "frontmatter": {
    "title": "Your title",
    "description": "One sentence a reader can use to decide.",
    "date": "2026-08-19",
    "authors": ["daquan-johnson"],
    "tag": "Notes",
    "slug": "your-slug",
    "draft": false,
    "doi": ""
  },
  "markdown": "---\ntitle: \"Your title\"\n---\n\nBody in markdown / MDX.\n",
  "figures": {}
}
```

The `markdown` field is the source of truth for the essay. YAML at the top is stripped before render. Reading time, headings, canonical URL, and `/blog/<slug>/article.json` + `/index.md` are derived on read.

`What's on this page` uses `##` / `###` headings. If a post has no headings, pull-quotes (`> …`) become the section list.

## Authors

Authors are the catalog in `src/lib/blog-meta.ts`. A post only lists ids:

```json
"authors": ["daquan-johnson"]
```

Add a person the same way you add an id:

```ts
'new-person': {
  id: 'new-person',
  name: 'Name',
  url: 'https://x.com/...',
  initial: 'N',
  image: '/images/new-person.jpg', // optional; initials if omitted
}
```

Put the file in `public/images/`. Avatars show in the byline, cards, and archive list.

## Markdown extras

Quotes:

```md
> Less on UI and more on AI.
```

Callouts (dashed note, title only unless you wrap children in MDX):

```md
> **Tuesday morning test**
```

Asides:

```md
<Note>
Something in the margin.
</Note>
```

Tabs:

```mdx
<Tabs defaultValue="spec">
  <TabsList>
    <TabsTrigger value="spec">Spec</TabsTrigger>
    <TabsTrigger value="code">Code</TabsTrigger>
  </TabsList>
  <TabsContent value="spec">The contract.</TabsContent>
  <TabsContent value="code">The implementation.</TabsContent>
</Tabs>
```

GFM tables, lists, and links work as usual. Internal `/` links stay on-site.

## Figures

Place a line in markdown, then a matching object in `figures`. Kind in the placeholder must match JSON.

```md
> [Figure: your-slug/id — chart: Time to resume.]

*Optional italic caption on the next line.*
```

```json
"your-slug/id": {
  "kind": "chart",
  "spec": { "version": 1, "type": "bar", "title": "Time to resume", "data": [], "encoding": {} }
}
```

Ids are `your-slug/name`. Caption can also live on `spec.caption`. Compass prints its label inline, so skip the italic caption there.

### Catalog

| Kind | Use |
| --- | --- |
| `painting` | SVG studio painting (Blank Canvas hero). `animate` defaults true. |
| `compass` | Drawing-compass sign-off. D3 physics plants the needle, springs the hinge open, then swings around the point with paper friction. `animate` defaults true. `label` defaults to `Proven with Grit`; `""` is icon only. |
| `image` | Photograph. `src` under `/public`, plus `alt`. Optional `title`, `aspect`. |
| `chart` | Recharts. `type`: `bar`, `multi-line`, or `scatter`. |
| `table` | Sortable comparison table. |
| `algorithm` | Numbered procedure. `**bold**` in lines is fine. |
| `stat-grid` | A few KPIs. |

**painting**

```json
"your-slug/hero": {
  "kind": "painting",
  "spec": { "version": 1, "animate": true, "caption": "King Of Egypt II - Jean Michel Basquiat 1982" }
}
```

**compass**

```md
> [Figure: your-slug/mark — compass: Proven with Grit.]
```

```json
"your-slug/mark": {
  "kind": "compass",
  "spec": { "version": 1, "animate": true, "label": "Proven with Grit" }
}
```

**image** (also used as a raster cover if present; ids ending in `/cover` win for OG)

```json
"your-slug/cover": {
  "kind": "image",
  "spec": {
    "version": 1,
    "src": "/images/blog/your-cover.jpg",
    "alt": "What the picture shows."
  }
}
```

Cards prefer a `painting` in the essay, then `/cover`, then any `image`.

**chart**

```json
"your-slug/resume": {
  "kind": "chart",
  "spec": {
    "version": 1,
    "type": "multi-line",
    "title": "Time to resume vs hours away",
    "height": 340,
    "data": [
      { "hours": 8, "minutes": 4.5, "series": "Chat thread" },
      { "hours": 8, "minutes": 1.2, "series": "Workspace" }
    ],
    "encoding": {
      "x": { "field": "hours", "label": "Hours since last session" },
      "y": { "field": "minutes", "label": "Minutes to re-enter" },
      "series": { "field": "series" }
    },
    "style": {
      "seriesColors": { "Workspace": "#E9541D", "Chat thread": "#888888" }
    }
  }
}
```

`type: "bar"` uses categories on `x`. `type: "scatter"` uses numeric `x`/`y`. Optional `overlays` draw extra lines (`{ "type": "line", "dashed": true, "points": [{ "x": 0, "y": 1 }] }`).

**table**

```json
"your-slug/compare": {
  "kind": "table",
  "spec": {
    "version": 1,
    "title": "Chat thread vs workspace",
    "sortable": true,
    "columns": [
      { "key": "need", "label": "What you need tomorrow" },
      { "key": "chat", "label": "Chat thread" },
      { "key": "workspace", "label": "Workspace" }
    ],
    "rows": [
      {
        "cells": { "need": "The claim", "chat": "Buried in a turn", "workspace": "A named object" },
        "highlight": true
      }
    ]
  }
}
```

**algorithm**

```json
"your-slug/test": {
  "kind": "algorithm",
  "spec": {
    "version": 1,
    "title": "The tomorrow-morning test",
    "input": ["yesterday's session", "a cold tab"],
    "lines": [
      { "number": 1, "text": "Close the surface. Wait until the next day." },
      { "number": 2, "indent": 1, "text": "**if** you can point to the claim **then** pass" }
    ],
    "note": "The test is about re-entry, not generation quality."
  }
}
```

**stat-grid**

```json
"your-slug/results": {
  "kind": "stat-grid",
  "spec": {
    "version": 1,
    "title": "A week of instrumentation",
    "columns": 4,
    "stats": [
      { "label": "Resume next day", "value": "84%", "delta": "workspace sessions that reopened cleanly" }
    ]
  }
}
```

## Add a figure kind

1. Component in `src/components/blog/figures/`.
2. Add the kind string to `FIGURE_KINDS` in `src/lib/blog-figures.ts`.
3. Render it in `src/components/blog/blog-figure.tsx`.
4. Document the spec here.

No other wiring. The markdown placeholder already accepts any catalog kind.

## Routes

- `/blog` — lead card, then tiles, then filter + search once there are four posts
- `/blog/topic/<research|building|notes>`
- `/blog/<slug>`
- `/blog/rss.xml`
- `/blog/<slug>/article.json` and `/blog/<slug>/index.md`
