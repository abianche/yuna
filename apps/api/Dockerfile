# syntax=docker/dockerfile:1.6

FROM node:24-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@10.18.3 --activate

WORKDIR /app

# Install workspace dependencies (only what's needed)
FROM base AS deps
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY prisma/package.json prisma/package.json
COPY apps/web/package.json apps/web/package.json
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --filter @yuna/api... --ignore-scripts

# Build the API
FROM deps AS build
COPY tsconfig.json ./tsconfig.json
COPY apps/api/ ./apps/api/
RUN pnpm -C apps/api build

# Runtime image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV API_PORT=8080

# Only copy the built artifacts and node_modules for the api
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/apps/api/dist ./apps/api/dist

EXPOSE 8080
CMD ["node", "apps/api/dist/index.js"]
