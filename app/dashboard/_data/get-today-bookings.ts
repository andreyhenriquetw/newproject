export const dynamic = "force-dynamic"

import { db } from "@/app/_lib/prisma"

export async function getTodayBookings() {
  const now = new Date()

  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date()
  endOfDay.setHours(23, 59, 59, 999)

  return db.booking.findMany({
    where: {
      date: {
        gte: now, // 👈 só FUTUROS
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
