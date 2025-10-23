FROM node:24-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.18.3 --activate
WORKDIR /app

# Install dependencies for the @yuna/api workspace package
FROM base AS deps
WORKDIR /app
# Copy minimal workspace metadata
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
# Copy the package manifest so pnpm can filter correctly
COPY apps/api/package.json apps/api/package.json
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
  pnpm -w install --frozen-lockfile --filter @yuna/api...

# Generate Prisma Client
FROM deps AS prisma
WORKDIR /app/apps/api
COPY apps/api/prisma.config.ts ./prisma.config.ts
COPY apps/api/prisma ./prisma
RUN pnpm exec prisma generate

# Build the app
FROM prisma AS build
WORKDIR /app
COPY apps/api/ apps/api/
RUN pnpm -C apps/api build

# Runtime image
FROM build AS runner
WORKDIR /app/apps/api
ENV NODE_ENV=production
ENV API_PORT=8080

# Production deps (includes @prisma/client and engines)
COPY --from=build /app/apps/api/node_modules ./node_modules
COPY --from=build /app/apps/api/package.json ./package.json
# Built output
COPY --from=build /app/apps/api/dist ./dist

EXPOSE 8080
CMD ["node", "dist/main.js"]
