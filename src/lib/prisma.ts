import { PrismaClient } from "@/prisma/src/prisma/client"

const getPrismaClient = (): PrismaClient => {
  return new PrismaClient()
}

const gobalPrisma = global as unknown as {
  Prisma : PrismaClient | undefined
}

const prisma = gobalPrisma.Prisma ?? getPrismaClient()

export default prisma;

