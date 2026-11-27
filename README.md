# Fábio Pinto Fortkamp's website

Source for Fabio's personal website and blog, built with
[Astro](https://astro.build) and Tailwind CSS as a static site.

## Requirements

- Node.js 22.12 or newer (see `engines` in `package.json`)
- npm

## Install

```sh
npm install
```

## Run the dev server

```sh
npm run dev
```

The site is served at http://localhost:4321 and reloads as you edit.

## Build

```sh
npm run build
```

The static site is written to `dist/`.

## Preview the build

```sh
npm run build
npm run preview
```

This serves `dist/` at http://localhost:4321, as it will be deployed.

## Format

```sh
npx prettier --write .
```

## More docs

- `spec.md`: what's built, the v1 launch plan and the changelog
- `AGENTS.md`: code structure and notes for coding agents
- `GLOSSARY.md`: the site's domain terms
- `docs/adr/`: architecture decision records
