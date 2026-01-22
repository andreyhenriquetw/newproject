// app/dashboard/_data/get-monthly-report.ts

import { prisma } from "@/app/_lib/prisma"

export async function getMonthlyReport() {
  const now = new Date()

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
  )

  const bookings = await prisma.booking.findMany({
    where: {
      date: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    include: {
      service: {
        select: {
          name: true,
          price: true,
        },
      },
    },
  })

  // Total de agendamentos
  const totalBookings = bookings.length

  // Faturamento do mês
  const totalRevenue = bookings.reduce((total, booking) => {
    return total + Number(booking.service.price)
  }, 0)

  return {
    totalBookings,
    totalRevenue,
    bookings,
  }
}
