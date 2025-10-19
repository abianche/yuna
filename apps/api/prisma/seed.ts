import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create a few users
  const users = await Promise.all(
    Array.from({ length: 3 }).map(() =>
      prisma.user.create({
        data: {
          email: faker.internet.email().toLowerCase(),
          name: faker.person.fullName(),
        },
      }),
    ),
  );

  // Each user owns a project
  for (const user of users) {
    const project = await prisma.project.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        ownerId: user.id,
      },
    });

    // Each project gets 2–3 issues
    const issues = await Promise.all(
      Array.from({ length: faker.number.int({ min: 2, max: 3 }) }).map(() =>
        prisma.issue.create({
          data: {
            title: faker.lorem.words(4),
            description: faker.lorem.sentence(),
            projectId: project.id,
            authorId: user.id,
            custom: {
              priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
              status: faker.helpers.arrayElement(['open', 'in-progress', 'closed']),
            },
          },
        }),
      ),
    );

    // Each issue gets 1–2 comments
    for (const issue of issues) {
      await Promise.all(
        Array.from({ length: faker.number.int({ min: 1, max: 2 }) }).map(() =>
          prisma.comment.create({
            data: {
              content: faker.lorem.sentence(),
              issueId: issue.id,
              authorId: user.id,
            },
          }),
        ),
      );
    }
  }

  console.log('✅ Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
