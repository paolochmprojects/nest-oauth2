import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  console.log('Seeding...');

  const tables: { table_name: string }[] =
    await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`;

  const permissionsToCreate = tables
    .filter(({ table_name }) => !table_name.startsWith('_'))
    .flatMap(({ table_name }) => [
      { name: `create_${table_name}`.toUpperCase() },
      { name: `read_${table_name}`.toUpperCase() },
      { name: `update_${table_name}`.toUpperCase() },
      { name: `delete_${table_name}`.toUpperCase() },
    ]);

  await prisma.$transaction(
    permissionsToCreate.map((permission) =>
      prisma.permission.upsert({
        where: { name: permission.name },
        update: {},
        create: permission,
      }),
    ),
  );

  const rolesToCreate = [
    { name: 'ADMIN', description: 'Role for admins' },
    { name: 'USER', description: 'Role for normal users' },
  ];

  await prisma.$transaction(
    rolesToCreate.map((role) =>
      prisma.role.upsert({
        where: { name: role.name },
        update: {},
        create: role,
      }),
    ),
  );
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
