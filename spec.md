# Website Spec

Fabio's personal website and blog. Code structure and commands live in
`AGENTS.md`; this file tracks what's been built and logs changes.

## Stack

- Astro 7 static site, with Preact for interactive components.
- Tailwind CSS 4 (via `@tailwindcss/vite`) with a Catppuccin theme.
- `@astrojs/rss` for the feed.
- Prettier with `prettier-plugin-astro` for formatting.
- Site URL (`astro.config.mjs`): https://fabiofortkamp-website.netlify.app/

## Features

- Pages: home (with a random greeting, the only Preact component), about,
  blog.
- Blog: Markdown posts in `src/pages/posts/` (four so far), listed on the
  blog page.
- Tags: an index of all tags, plus one generated page per tag.
- RSS feed at `/rss.xml`.
- Dark mode toggle, saved in `localStorage`.
- Hamburger menu on narrow screens.

## Agent setup

- Shared house rules live in the home repo's `CLAUDE.md`. `AGENTS.md` holds
  the repo-specific instructions, and `CLAUDE.md` imports it.
- Engineering-skills config lives in `docs/agents/`: issues on GitHub
  Issues, default triage labels, single-context domain docs (`GLOSSARY.md`
  and `docs/adr/`, created when first needed).

## Known gaps

- No tests.
- `README.md` is still the Astro starter text.
- `AGENTS.md` still opens with a `# CLAUDE.md` heading.

## Changelog

- 2026-11-27: Set up the engineering-skills config with
  `setup-matt-pocock-skills`: `docs/agents/issue-tracker.md` (GitHub Issues
  via `gh`), `docs/agents/domain.md` (single-context) and an "Agent skills"
  section in `AGENTS.md`. Replaced the `CLAUDE.md` symlink with a file that
  imports `AGENTS.md`.
- 2026-11-27: Created this spec. Earlier history (the Astro tutorial
  build-out from 2026-06-23, the Tailwind/Catppuccin restyle on 2026-08-02,
  shared rules moved to the home repo on 2026-11-20) is in `git log`.
- 2026-11-27: Added triage labels after `triage` was installed in the home
  repo: `docs/agents/triage-labels.md` (default vocabulary) and an "Agent
  skills" subsection in `AGENTS.md`. Created the `needs-triage`,
  `needs-info`, `ready-for-agent` and `ready-for-human` labels on GitHub;
  `wontfix` already existed.
