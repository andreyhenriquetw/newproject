"use server"

import { prisma } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"

export async function clearMonthBookings() {
  const start = new Date()
  start.setDate(1)
  start.setHours(0, 0, 0, 0)

  const end = new Date()
  end.setMonth(end.getMonth() + 1)
  end.setDate(0)
  end.setHours(23, 59, 59, 999)

  await prisma.booking.deleteMany({
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
  })

  revalidatePath("/dashboard")
}

export async function clearTodayBookings() {
  const start = new Date()
  start.setHours(0, 0, 0, 0)

  const end = new Date()
  end.setHours(23, 59, 59, 999)

  await prisma.booking.deleteMany({
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
  })

  revalidatePath("/dashboard")
}

export async function clearUpcomingBookings() {
  const now = new Date()

  await prisma.booking.deleteMany({
    where: {
      date: {
        gt: now,
      },
    },
  })

  revalidatePath("/dashboard")
}
