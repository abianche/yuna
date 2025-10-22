FROM node:24-alpine AS base
RUN npm i -g pnpm@10.18.3
WORKDIR /app

# Install minimal deps for the API (plus root if needed)
FROM base AS deps
COPY .npmrc pnpm-workspace.yaml package.json pnpm-lock.yaml prisma.config.ts ./
COPY apps/api/package.json apps/api/package.json
COPY apps/api/prisma ./apps/api/prisma
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --filter @yuna/api...

# Generate Prisma Client for the API package (explicit schema)
# Uses the installed dependencies; no need for a script in apps/api
RUN pnpm dlx prisma generate --schema apps/api/prisma/schema.prisma

# Build the API
FROM deps AS build
COPY tsconfig.json ./tsconfig.json
COPY apps/api/ ./apps/api/
RUN pnpm -C apps/api build

# Runtime image
FROM base AS runner
ENV NODE_ENV=production
ENV API_PORT=8080

# Only root node_modules is required (contains @prisma/client and engines)
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/apps/api/dist ./apps/api/dist

EXPOSE 8080
CMD ["node", "apps/api/dist/main.js"]
