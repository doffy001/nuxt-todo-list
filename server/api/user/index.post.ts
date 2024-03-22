import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: 'tet@gmail.com'
  //   }
  // });
  return { body };
});