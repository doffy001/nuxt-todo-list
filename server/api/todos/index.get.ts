import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  const todoList = await prisma.todo.findMany({
    where: { authorId: 2 }
  }).catch((error) => {
    console.error(error);
  });
  return todoList;
});