[![Docs](https://github.com/abianche/yuna/actions/workflows/docs.yml/badge.svg)](https://github.com/abianche/yuna/actions/workflows/docs.yml)

# Yuna Docs

Simple Docusaurus site for the Yuna project.

## Branding

- UnDraw illustration accent color: `#fe5a4d`

## Requirements

- Node.js 22+
- pnpm 10+

## Quick Start

```bash
pnpm install
pnpm start
```

This starts the dev server and opens the site. Edits hot‑reload.

## Build

```bash
pnpm build
```

Outputs static files to `build/`.

## Preview Production Build

```bash
pnpm serve
```

Serves the contents of `build/` locally.

## Scripts

- `pnpm start`: Run dev server
- `pnpm build`: Generate static site
- `pnpm serve`: Preview the production build
- `pnpm clear`: Clear Docusaurus cache

## Troubleshooting

- Stale build: run `pnpm clear` then `pnpm start`
- Port in use: set `PORT=3001 pnpm start`
