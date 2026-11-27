# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Build for production:

```
npx astro build
```

Format code (Prettier with Astro plugin):

```
npx prettier --write .
```

There are no tests in this project.

## Architecture

### How pages and layouts compose

Every page uses `BaseLayout.astro`, which provides the `<html>` shell, imports `global.css`, renders `Header` and `Footer`, and exposes a `<slot />` for page-specific content. The `pageTitle` prop drives the `<h1>` on every page.

Markdown blog posts use `MarkdownPostLayout.astro`, which wraps `BaseLayout` and receives the post's `frontmatter` object (title, pubDate, description, author, image, tags). The layout renders post metadata above the `<slot />` where the Markdown body lands.

### Blog posts and routing

Posts live in `src/pages/posts/*.md` as plain Markdown with frontmatter. Astro's file-based router turns each file into a route automatically. The `blog.astro` page and the tag pages collect all posts using `import.meta.glob("./posts/*.md", { eager: true })` — add a new `.md` file and it appears everywhere automatically.

Required frontmatter fields per post:
```
title, pubDate, description, author, image (url + alt), tags (array)
```

### Tag system

Tags flow from post frontmatter through two pages:
- `src/pages/tags/index.astro` — collects all unique tags across all posts and renders links
- `src/pages/tags/[tag].astro` — uses `getStaticPaths()` to generate one page per tag at build time, filtering posts by that tag

### Interactive components (Preact)

The only interactive component is `Greeting.jsx` (Preact). It is used with `client:load` in `index.astro` so it hydrates immediately in the browser. Any future interactive components should also be Preact (`.jsx`) and must use a `client:*` directive to hydrate; without one, they render as static HTML only.

### Dark mode

Dark mode is toggled by `ThemeIcon.astro` via a class on `<html>`: `document.documentElement.classList.toggle("dark")`. The theme is persisted in `localStorage`. CSS dark-mode overrides are written in `global.css` under the `html.dark` and `.dark *` selectors. Component-scoped dark styles use `:global(.dark)`.

### Navigation (hamburger menu)

`Menu.astro` renders a `<button aria-expanded="false">` that is hidden on wide screens. `src/scripts/menu.js` toggles `aria-expanded` on click. The CSS in `global.css` uses `:has(.menu[aria-expanded="true"]) .nav-links` to show/hide the nav links — no JavaScript class toggling needed. The script is imported in `BaseLayout.astro` via `<script>` (bundled by Vite).

### RSS feed

`src/pages/rss.xml.js` exports a `GET` handler that uses `@astrojs/rss`. It globs all `.md` files under `src/pages/`. The feed `site` URL comes from `astro.config.mjs` → `site`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues on `fabiofortkamp/fabiofortkamps-website`, using the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: each of the five triage roles uses a label of the same name. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
