import { prisma } from "@/app/_lib/prisma"

export async function getUpcomingBookings() {
  const now = new Date()

  const bookings = await prisma.booking.findMany({
    where: {
      date: {
        gt: now,
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      user: {
        select: { name: true },
      },
      service: {
        select: {
          name: true,
          price: true,
        },
      },
    },
  })

  return bookings
}
