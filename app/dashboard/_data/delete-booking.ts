"use server"

import { prisma } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteBooking(bookingId: string) {
  await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  })

  // 🔄 Revalida TODAS as telas que usam agendamentos
  revalidatePath("/")
  revalidatePath("/bookings")
  revalidatePath("/dashboard")
}
