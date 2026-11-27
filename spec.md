# Website Spec

Fabio's personal website and blog. Code structure and commands live in
`AGENTS.md`; this file tracks what's been built and logs changes.

## Stack

- Astro 7 static site, with no UI framework: the theme toggle and menu are
  plain `<script>` tags.
- Tailwind CSS 4 (via `@tailwindcss/vite`) with a Catppuccin theme.
- `@astrojs/rss` for the feed.
- Prettier with `prettier-plugin-astro` for formatting.
- Site URL (`astro.config.mjs`): https://fabiofortkamp-website.netlify.app/

## Features

- Pages: home (a heading only, for now), about, blog.
- Blog: Markdown posts in `src/pages/posts/`, listed on the blog page. There
  are none yet.
- Tags: an index of all tags, plus one generated page per tag.
- RSS feed at `/rss.xml`.
- Dark mode toggle, saved in `localStorage`.
- Hamburger menu on narrow screens.

## v1 launch plan

Agreed in a planning session on 2026-11-27 and tracked as GitHub issues in
the **v1 launch** milestone. Domain terms are defined in `GLOSSARY.md`.

### Goal

fabiofortkamp.com becomes Fabio's home on the internet: a hub that opens for
hiring managers, with his pitch, then Featured Projects, then the latest
Posts, then profile links. English only. The site is itself a Project and
proof of AI-assisted web development.

### Decisions

- Workflow: one trunk (`main`), with short-lived branches merged through PRs
  that get Netlify deploy previews.
- Tests: Vitest unit tests for logic kept in plain TypeScript modules, Astro
  Container API render tests, and `astro check`. GitHub Actions runs them on
  every push and PR, and `netlify.toml` runs them in the build, so a failure
  aborts the deploy.
- Content: Markdown in the repo, edited in VS Code, as Astro content
  collections. The build rejects unknown references, parent loops, a pair
  linked as both parent and related, duplicate Series positions, and a
  missing end date on a Project that isn't Active. Drafts never reach
  production.
- Projects: software and research. Book or course exercises, plain forks and
  private work are left out.
- Pages: Home, Projects, Writing and About in the menu; the Colophon in the
  footer; Topic and Series pages reached from links; RSS; a 404 page.
- About: a first-person story, a hand-written experience and education list,
  publications built from Outputs, and a link to a CV PDF Fabio maintains.
- Profiles: GitHub, LinkedIn, ORCID, RSS, and a `fabio@` email link
  assembled in the browser.
- Authorship: Posts, the pitch and the story are Fabio's own words. An agent
  drafts factual pages from checkable sources, and Fabio approves them before
  they ship. The Colophon says so.
- Look: Fabio's own restrained design, chosen from 2–3 prototypes, in light
  and dark. Catppuccin is removed.
- Launch content: eight Projects (Nereid, My DTU Postdoc, this website and My
  PhD featured; packgen, stlextractor, the MagTense contribution and
  dotfiles) and one Post, Part 1 of the Series _Building this website_.
- Quality: an accessibility, sharing/search and performance checklist, then a
  manual Lighthouse audit aiming for 95+ in all four categories.
- Domain: fabiofortkamp.com on Netlify, with DNS and email forwarding at
  Namecheap. The old WordPress blog stays at fabiofortkamp.wordpress.com and
  its old links redirect there
  (`docs/adr/0001-old-blog-stays-on-wordpress-com.md`).
- Analytics: none at launch.

### Steps

1. Housekeeping
2. Tests and CI
3. Content model
4. Design
5. Pages
6. Content: agent drafts, then Fabio's own words and review
7. Quality
8. Launch: redirects and site URL, then the domain and email switch-over

Deferred ideas are collected in the "Later" issue.

## Agent setup

- Shared house rules live in the home repo's `CLAUDE.md`. `AGENTS.md` holds
  the repo-specific instructions, and `CLAUDE.md` imports it.
- Engineering-skills config lives in `docs/agents/`: issues on GitHub
  Issues, default triage labels, single-context domain docs (`GLOSSARY.md`
  and `docs/adr/`).

## Known gaps

- No tests.
- No Posts, so the blog page, the tag index and the RSS feed are empty and
  `MarkdownPostLayout.astro` is unused until the first Post.
- The home page has no content below its heading until the pitch is written.

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
- 2026-11-27: Planned the v1 launch in a grilling session: added the plan
  above, `GLOSSARY.md` and ADR 0001. Collapsed all branches into `main` and
  deleted `develop`, `feature/styling`, `home-repo/move-shared-rules` and
  `agents/skills-setup`.
- 2026-11-27: Cleaned out the Astro tutorial leftovers (step 1, issue #1).
  Deleted the four "Astro Learner" posts and `Greeting.jsx`; removed the
  tutorial text and flags from the About page, the placeholder headings
  from the home page, the tutorial title and intro from the blog page, and
  the tutorial title and description from the RSS feed.
  Removed Preact: the integration, the `preact` and `@astrojs/preact`
  dependencies, and its JSX settings in `tsconfig.json`. Replaced the
  starter `README.md` with install, dev, build and preview instructions, and
  fixed the `AGENTS.md` heading.
