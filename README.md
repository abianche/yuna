# yuna

Yuna is a self-hosted work management platform built with React and PostgreSQL, designed for simplicity, extensibility, and full on-premise control.

Current stack highlights:

- Frontend: React 19, React Router 7, Vite, Tailwind CSS
- Backend: TypeScript Node (apps/api)
- Data: Prisma (targeting PostgreSQL)

## Monorepo

This repository uses pnpm workspaces.

Workspace layout:

- `apps/api` – backend service
- `apps/web` – frontend app
- `prisma` – shared Prisma schema and tooling

## Getting started

Prereqs: Node.js 22+ and Corepack.

1. Enable pnpm via Corepack
2. Install dependencies

```sh
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
```

Common scripts:

- Lint all: `pnpm -w lint`
- Format all: `pnpm -w format`
- Typecheck all: `pnpm -r run typecheck`

Run a specific workspace script:

```sh
# API
pnpm --filter @yuna/api dev

# Web
pnpm --filter @yuna/web dev

# Build & start web
pnpm --filter @yuna/web build
pnpm --filter @yuna/web start
```

## Contributing

Use Prettier for formatting and ESLint for linting. See `.editorconfig` for editor defaults.
