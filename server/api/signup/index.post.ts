import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { email, name, password } = await readBody(event);
  let newUser = await prisma.user.findUnique({
    where: { email },
  });
  if (newUser) return createError({ statusCode: 406, message: 'Email exist!' });
  newUser = await prisma.user.create({
    data: { email, name, password },
  });
  return newUser?.name;
});