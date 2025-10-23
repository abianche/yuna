import path from 'node:path';
import { defineConfig } from 'prisma/config';
import 'dotenv/config';

const prismaDir = path.join('prisma');

export default defineConfig({
  schema: path.join(prismaDir, 'schema.prisma'),
  migrations: {
    path: path.join(prismaDir, 'migrations'),
    seed: 'ts-node --transpile-only prisma/seed.ts',
  },
});
