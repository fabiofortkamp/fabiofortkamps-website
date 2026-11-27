# Website Spec

Fabio's personal website and blog. Code structure and commands live in
`AGENTS.md`; this file tracks what's been built and logs changes.

## Stack

- Astro 7 static site, with no UI framework: the theme toggle and menu are
  plain `<script>` tags.
- Tailwind CSS 4 (via `@tailwindcss/vite`), with the site's own colour
  tokens in `src/styles/global.css`.
- IBM Plex Sans and IBM Plex Mono, downloaded at build time by Astro's fonts
  API and served from the site itself.
- Vitest for unit tests (`npm test`).
- `@astrojs/rss` for the feed.
- Prettier with `prettier-plugin-astro` for formatting.
- Site URL (`astro.config.mjs`): https://fabiofortkamp-website.netlify.app/

## Features

- Pages: home (a heading only, for now), about, blog.
- Blog: Markdown posts in `src/pages/posts/`, listed on the blog page. There
  are none yet.
- Tags: an index of all tags, plus one generated page per tag.
- RSS feed at `/rss.xml`.
- Light and dark themes, with a toggle saved in `localStorage`.
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

## Design

Chosen on 2026-11-27 (issue #4) from three throwaway prototypes of the home
page, kept on the `prototype/visual-direction` branch:

- A, "Paper and figures": the page reads like a paper. The pitch is set as
  an abstract, Featured Projects are figures with "Fig. 1." captions, other
  projects sit in a ruled "Table 1", and Posts form a numbered reference
  list. Newsreader serif, warm paper colours with a brick-red accent.
- B, "Data sheet": an engineering spec sheet. Project cards with key/value
  data labels and status lights, section rules with axis ticks, a dated
  Post log. IBM Plex Sans and Mono, cool greys with a teal accent.
- C, "Field lines": editorial. A large serif name over faint dipole
  magnetic field lines, Featured Projects as a big-type index, a bar-magnet
  mark. Instrument Serif and Sans, off-white with a magnet-blue accent.

**Decision:** A's structure with B's palette and type.

**Why A's structure:** its devices (captions, ruled tables, a reference
list) come from Fabio's research background, so the signature touch is his
own rather than decoration. They also carry over to the later pages:
Outputs as captioned figures, the Projects list as a table, and the About
page's publications as references. It was the most restrained of the three.

**Why B's palette and type:** Fabio's pick over A's warm serif look. Plex is
an engineering typeface, and the cool palette keeps the paper conventions
from feeling old-fashioned.

### Design rules

- Colour tokens are defined once in `src/styles/global.css`: `:root` holds
  the light theme and `html.dark` the dark one. Backgrounds: `page`,
  `surface`. Text: `ink`, `muted`, `accent`, `ok` (for an Active status).
  Lines: `rule` for hairlines, `ink` for the header and footer rules.
  Tailwind exposes them as `bg-page`, `text-ink`, `border-rule` and so on.
- Every text colour reaches WCAG AA (4.5:1) on both backgrounds in both
  themes; `src/styles/palette.test.ts` fails the tests otherwise.
- Type: IBM Plex Sans for text (`text-body`, 17px), IBM Plex Mono in small
  uppercase (`mono-label`, `text-label`) for navigation, profile links and
  labels such as "Fig. 1.". The type tokens sit in `global.css` beside the
  colours.
- Layout: one 46rem column. The header has the name on the left, the
  navigation links and then the theme toggle on the right, and an ink rule
  below. On narrow screens the links and the toggle sit behind the Menu
  button. The footer has an ink rule above. Links in text are ink with an
  accent underline; navigation and profile links are muted labels that turn
  accent on hover.
- Captioned figures, the table and the reference list arrive with the
  pages in step 5.

## Agent setup

- Shared house rules live in the home repo's `CLAUDE.md`. `AGENTS.md` holds
  the repo-specific instructions, and `CLAUDE.md` imports it.
- Engineering-skills config lives in `docs/agents/`: issues on GitHub
  Issues, default triage labels, single-context domain docs (`GLOSSARY.md`
  and `docs/adr/`).

## Known gaps

- Tests cover only the palette's contrast. The rest of step 2 (Container
  API render tests, `astro check`, CI and a test-gated Netlify build) is
  still to come in issue #2.
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
- 2026-11-27: Chose and built the visual direction (step 4, issue #4); see
  "Design" above. Built three home-page prototypes, kept on the
  `prototype/visual-direction` branch. Replaced the Catppuccin theme with
  the site's own colour tokens for light and dark, and added IBM Plex Sans
  and Mono through Astro's fonts API, with colour and type tokens in
  `global.css`. Restyled the base layout, header, footer, menu and theme
  toggle: the header now shows the name and marks the current page, the
  theme toggle follows the links (inside the menu on narrow screens), and
  the saved theme is applied in `<head>` before the first paint. Added
  Vitest (`npm test`) with unit tests for the WCAG contrast maths
  (`contrast.ts`) and the token reader (`theme-colors.ts`), and a test that
  checks the palette in `src/styles/global.css` reaches AA in both
  themes.
