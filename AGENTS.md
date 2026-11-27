# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

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

Run the tests (Vitest):

```
npm test
```

So far the only tests are for the colour palette's contrast, in `src/styles/`. The rest of the test setup (Container API render tests, `astro check`, CI) comes with issue #2.

## Architecture

### How pages and layouts compose

Every page uses `BaseLayout.astro`, which provides the `<html>` shell, imports `global.css`, renders `Header` and `Footer`, and exposes a `<slot />` for page-specific content. The `pageTitle` prop drives the `<h1>` on every page.

Markdown blog posts use `MarkdownPostLayout.astro`, which wraps `BaseLayout` and receives the post's `frontmatter` object (title, pubDate, description, author, image, tags). The layout renders post metadata above the `<slot />` where the Markdown body lands.

### Blog posts and routing

Posts live in `src/pages/posts/*.md` as plain Markdown with frontmatter. There are none yet, so the folder doesn't exist until the first Post. Astro's file-based router turns each file into a route automatically. The `blog.astro` page and the tag pages collect all posts using `import.meta.glob("./posts/*.md", { eager: true })` — add a new `.md` file and it appears everywhere automatically.

Required frontmatter fields per post:
```
title, pubDate, description, author, image (url + alt), tags (array)
```

### Tag system

Tags flow from post frontmatter through two pages:
- `src/pages/tags/index.astro` — collects all unique tags across all posts and renders links
- `src/pages/tags/[tag].astro` — uses `getStaticPaths()` to generate one page per tag at build time, filtering posts by that tag

### Client-side scripts (no UI framework)

The site has no UI framework integration. The only browser code is plain `<script>` tags: the inline theme script in the `<head>` of `BaseLayout.astro`, the toggle's click handler in `ThemeIcon.astro`, and `src/scripts/menu.js`. If a future component needs framework-level interactivity, add an integration with `npx astro add` and hydrate the component with a `client:*` directive; without one, it renders as static HTML only.

### Styling: colour and type tokens

The design rules are in `spec.md` → "Design". Colours are tokens defined once in `global.css`: `:root` holds the light theme and `html.dark` the dark one. Tailwind exposes them through `@theme inline` as `bg-page`, `bg-surface`, `text-ink`, `text-muted`, `text-accent`, `text-ok` and `border-rule`; scoped `<style>` blocks use `var(--ink)` and the like. Use the tokens, never raw colours, so both themes keep working without dark-mode overrides.

`src/styles/palette.test.ts` reads `global.css` (through `theme-colors.ts`) and checks that every text colour (`ink`, `muted`, `accent`, `ok`) reaches WCAG AA on both backgrounds (`page`, `surface`) in both themes. If you add a text or background token, add it to that test.

Fonts are IBM Plex Sans (`font-sans`, the default) and IBM Plex Mono (`font-mono`), configured in `astro.config.mjs` and loaded with `<Font>` in `BaseLayout.astro`. The type tokens `text-body` and `text-label` sit in `global.css` beside the colours, and the `mono-label` utility is the small uppercase mono style for navigation, profile links and captions.

### Dark mode

The theme is a `dark` class on `<html>`. An inline script in the `<head>` of `BaseLayout.astro` applies the saved theme from `localStorage` (or the system preference) before the first paint. `ThemeIcon.astro` toggles the class on click and saves the choice.

### Navigation (hamburger menu)

`Menu.astro` renders a `<button aria-expanded="false">` that is hidden on wide screens. `Navigation.astro` holds the links, marks the current one with `aria-current="page"`, and renders the theme toggle that `Header.astro` passes through its slot, so the toggle follows the links in both the visual and the keyboard order. `src/scripts/menu.js` toggles `aria-expanded` on click. The CSS in `global.css` uses `:has(.menu[aria-expanded="true"]) .nav-links` to show/hide the nav links — no JavaScript class toggling needed. The script is imported in `BaseLayout.astro` via `<script>` (bundled by Vite).

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
