import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  const todoList = await prisma.todo.findMany({
    where: { authorId: 2 }
  });
  return todoList;
});