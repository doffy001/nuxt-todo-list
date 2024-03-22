import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const user = await prisma.user.findFirst({
    where: { email, password },
  });
  return user?.name;
});