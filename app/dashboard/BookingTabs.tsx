"use client"

import { useState } from "react"
import { formatTime } from "@/app/_lib/utils"
import { Button } from "../_components/ui/button"

import { Prisma } from "@prisma/client"

type Booking = {
  id: string
  date: Date
  user: { name: string | null }
  service: {
    name: string
    price: Prisma.Decimal
  }
}

export default function BookingTabs({
  today,
  upcoming,
  recent,
  totalRevenue,
  totalBookings,
}: {
  today: Booking[]
  upcoming: Booking[]
  recent: Booking[]
  totalRevenue: number
  totalBookings: number
}) {
  const [activeTab, setActiveTab] = useState<"today" | "upcoming" | "recent">(
    "today",
  )

  const data =
    activeTab === "today" ? today : activeTab === "upcoming" ? upcoming : recent

  return (
    <div className="space-y-6">
      {/* 🔥 CARD DE FATURAMENTO */}
      <div className="rounded-2xl bg-black p-6 text-white shadow-lg">
        <p className="text-sm opacity-80">Faturamento do mês</p>

        <p className="mt-2 text-3xl font-bold">
          R$ {totalRevenue.toLocaleString("pt-BR")}
        </p>

        <p className="mt-1 text-sm opacity-80">
          {totalBookings} agendamentos no mês
        </p>
      </div>

      {/* 🔘 BOTÕES */}
      <div className="flex gap-2">
        <Button
          onClick={() => setActiveTab("today")}
          className={`relative w-full rounded-lg px-3 py-2 text-sm transition ${
            activeTab === "today"
              ? "bg-black text-white"
              : "border border-zinc-700 bg-zinc-800 text-zinc-300"
          }`}
        >
          Hoje
          {today.length > 0 && (
            <span className="absolute -right-2 -top-2 flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-green-500 px-1 text-xs font-bold text-white">
              {today.length}
            </span>
          )}
        </Button>

        <Button
          onClick={() => setActiveTab("upcoming")}
          className={`relative w-full rounded-lg px-3 py-2 text-sm transition ${
            activeTab === "upcoming"
              ? "bg-black text-white"
              : "border border-zinc-700 bg-zinc-800 text-zinc-300"
          }`}
        >
          Próximos
          {upcoming.length > 0 && (
            <span className="absolute -right-2 -top-2 flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-green-500 px-1 text-xs font-bold text-white">
              {upcoming.length}
            </span>
          )}
        </Button>

        <Button
          onClick={() => setActiveTab("recent")}
          className={`w-full rounded-lg px-3 py-2 text-sm transition ${
            activeTab === "recent"
              ? "bg-black text-white"
              : "border border-zinc-700 bg-zinc-800 text-zinc-300"
          }`}
        >
          MÊS ({recent.length})
        </Button>
      </div>

      {/* 📋 LISTA */}
      {data.length === 0 && (
        <p className="text-sm text-gray-500">Nenhum agendamento encontrado</p>
      )}

      {data.map((booking) => (
        <div
          key={booking.id}
          className="flex items-center justify-between border-b py-3 text-sm"
        >
          <div>
            <p className="font-medium">{booking.user.name ?? "Cliente"}</p>
            <p className="text-gray-500">{booking.service.name}</p>
          </div>

          <div className="text-right">
            <p className="font-semibold">R$ {Number(booking.service.price)}</p>
            <p className="text-xs text-gray-500">{formatTime(booking.date)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
