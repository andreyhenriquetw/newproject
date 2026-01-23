import { PrismaClient } from "@prisma/client"
export const dynamic = "force-dynamic"
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["error"],
  })

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma
}

// 🔹 Alias para código antigo
export const db = prisma
