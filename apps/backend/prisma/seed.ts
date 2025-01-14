import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function seed() {
  await prisma.roles.create({
    data: {
      id: 'a84b4259-2471-43e2-af3a-d4b535de97e2',
      name: 'default',
      permissions: []
    }
  })
}

seed()