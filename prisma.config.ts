import path from 'node:path';
import { defineConfig } from 'prisma/config';
import 'dotenv/config';

export default defineConfig({
  schema: path.join('apps', 'api', 'prisma', 'schema.prisma'),
  migrations: {
    path: path.join('apps', 'api', 'prisma', 'migrations'),
    seed: 'tsx --transpile-only apps/api/prisma/seed.ts',
  },
});
