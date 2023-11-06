import { PrismaClient } from "@prisma/client";
import { generateSlug } from "random-word-slugs";

const prisma = new PrismaClient();

const password = "$2b$10$ck.xQlc64Y/w/8oCvjSrb.9yLn80emhW/9FUAHFf3Hay3lnlNtTs.";

async function createUsers() {
  [...Array(4).keys()].forEach(async () => {
    const username = generateSlug(1, {
      format: "camel",
    });

    await prisma.user.upsert({
      where: { username },
      update: {},
      create: {
        username,
        password,
      },
    });
  });
}

async function createChannels(userId) {
  [...Array(4).keys()].forEach(async () => {
    const name = generateSlug(1, {
      format: "camel",
    });

    await prisma.channel.upsert({
      where: { name },
      update: {},
      create: {
        name,
        userId,
      },
    });
  });
}

async function main() {
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password,
    },
  });

  await prisma.channel.upsert({
    where: { name: "general" },
    update: {},
    create: {
      name: "general",
      userId: admin.id,
    },
  });

  createUsers();
  createChannels(admin.id);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
