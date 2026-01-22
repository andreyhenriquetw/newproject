import { db } from "@/app/_lib/prisma"

export async function getRecentBookings() {
  const now = new Date()

  return db.booking.findMany({
    where: {
      date: {
        lt: now, // 👈 tudo que já aconteceu
      },
    },
    include: {
      user: true,
      service: true,
    },
    orderBy: {
      date: "desc",
    },
    take: 20, // últimos 20 (dashboard limpo)
  })
}
