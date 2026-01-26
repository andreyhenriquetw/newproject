export const dynamic = "force-dynamic"

import { prisma } from "@/app/_lib/prisma"

export async function getTodayBookings() {
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date()
  endOfDay.setHours(23, 59, 59, 999)

  return prisma.booking.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      user: true,
      service: true,
    },
    orderBy: {
      date: "asc",
    },
  })
}
