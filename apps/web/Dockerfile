FROM node:24-alpine AS base
RUN npm i -g pnpm@10.18.3
WORKDIR /app

# Install only the web workspace deps
FROM base AS deps
COPY .npmrc pnpm-workspace.yaml package.json pnpm-lock.yaml prisma.config.ts ./
COPY apps/web/package.json apps/web/package.json
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --filter @yuna/web...

# Build the web app
FROM deps AS build
COPY tsconfig.json ./tsconfig.json
COPY apps/web ./apps/web
RUN pnpm -C apps/web build

# Runtime image
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
# Use hoisted node_modules produced by pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/apps/web/build ./apps/web/build
EXPOSE 3000
CMD ["node", "apps/web/build/server/index.js"]