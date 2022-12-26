import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const { user, category, product } = prisma;

export { user, category, product };
