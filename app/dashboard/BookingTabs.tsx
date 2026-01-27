"use client"

import { useState } from "react"
import { Button } from "../_components/ui/button"
import { Prisma } from "@prisma/client"
import { deleteBooking } from "../_actions/delete-booking"
import { formatDate } from "../_lib/utils"

export const dynamic = "force-dynamic"

const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

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
  const now = new Date()
  now.setSeconds(0, 0)

  // HOJE (somente horários futuros do mesmo dia)
  const filteredToday = today.filter((b) => {
    const d = new Date(b.date)
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate() &&
      d.getTime() >= now.getTime()
    )
  })

  // PRÓXIMOS (somente dias futuros)
  const filteredUpcoming = upcoming.filter((b) => {
    const d = new Date(b.date)

    const isSameDay =
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()

    // só entra aqui se for outro dia futuro
    return !isSameDay && d.getTime() > now.getTime()
  })

  // FINALIZADOS (já passaram)
  // FINALIZADOS (somente agendamentos passados, sem repetir hoje/upcoming)
  const filteredRecent = [
    ...recent.filter((b) => new Date(b.date).getTime() < now.getTime()),
  ]

  const [activeTab, setActiveTab] = useState<"today" | "upcoming" | "recent">(
    "today",
  )

  const data =
    activeTab === "today"
      ? filteredToday
      : activeTab === "upcoming"
        ? filteredUpcoming
        : filteredRecent

  const isMonth = activeTab === "recent"

  return (
    <div className="space-y-6">
      {/* CARD DE FATURAMENTO */}
      <div className="rounded-2xl bg-black p-6 text-white shadow-lg">
        <p className="text-sm opacity-80">Faturamento do mês</p>

        <p className="mt-2 text-3xl font-bold">
          R$ {totalRevenue.toLocaleString("pt-BR")}
        </p>

        <p className="mt-1 text-sm opacity-80">
          {totalBookings} agendamentos total
        </p>
      </div>

      {/* BOTÕES */}
      <div className="flex gap-2">
        <TabButton
          label="Hoje"
          active={activeTab === "today"}
          count={filteredToday.length}
          onClick={() => setActiveTab("today")}
        />

        <TabButton
          label="Próximos"
          active={activeTab === "upcoming"}
          count={filteredUpcoming.length}
          onClick={() => setActiveTab("upcoming")}
        />

        <TabButton
          label="Finalizados"
          active={activeTab === "recent"}
          count={filteredRecent.length}
          variant="finished"
          onClick={() => setActiveTab("recent")}
        />
      </div>

      {/* LISTA */}
      {data.length === 0 && (
        <p className="text-sm text-gray-500">Nenhum agendamento encontrado</p>
      )}

      <div className="space-y-4">
        {data.map((booking) => (
          <div
            key={booking.id}
            className="rounded-2xl bg-zinc-800 p-4 text-sm shadow transition hover:bg-zinc-800"
          >
            {/* TOPO */}
            <div className="flex items-center justify-between">
              <p className="font-medium text-white">{booking.service.name}</p>

              {isMonth ? (
                <span className="rounded-full bg-gray-500/20 px-3 py-1 text-xs font-semibold text-gray-300">
                  Finalizado
                </span>
              ) : (
                <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                  Pendente
                </span>
              )}
            </div>

            {/* INFO */}
            <div className="mt-3 space-y-1 text-zinc-300">
              <p>{booking.user.name ?? "Cliente"}</p>
              <p className="text-xs">
                {formatDate(booking.date)} • {formatTime(booking.date)}
              </p>
            </div>

            {/* STATUS SECUNDÁRIO */}
            {!isMonth && (
              <div className="mt-3 inline-block rounded-md bg-yellow-500/20 px-2 py-1 text-xs font-medium text-yellow-400">
                Em breve
              </div>
            )}

            {/* AÇÕES */}
            <div className="mt-4 flex items-center justify-between border-t border-gray-700 pt-3">
              <p className="font-semibold text-white">
                R$ {Number(booking.service.price)}
              </p>

              {isMonth ? (
                <button
                  className="text-sm text-red-400 hover:underline"
                  onClick={async () => {
                    const ok = confirm(
                      `Remover o agendamento de ${booking.user.name ?? "Cliente"}?`,
                    )
                    if (!ok) return
                    await deleteBooking(booking.id)
                  }}
                >
                  🗑 Remover
                </button>
              ) : (
                <button
                  className="text-sm text-red-400 hover:underline"
                  onClick={async () => {
                    const ok = confirm(
                      `Cancelar o agendamento de ${booking.user.name ?? "Cliente"}?`,
                    )
                    if (!ok) return
                    await deleteBooking(booking.id)
                  }}
                >
                  ❌ Cancelar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* BOTÃO DE ABA */
function TabButton({
  label,
  active,
  count,
  onClick,
  variant = "default",
}: {
  label: string
  active: boolean
  count?: number
  onClick: () => void
  variant?: "default" | "finished"
}) {
  const base = "relative w-full rounded-lg px-3 py-2 text-sm transition"

  const styles = active
    ? "bg-black text-white"
    : "border border-zinc-700 bg-zinc-800 text-zinc-300"

  const badgeColor =
    variant === "finished"
      ? "bg-gray-400 text-black"
      : "bg-green-500 text-white"

  return (
    <Button onClick={onClick} className={`${base} ${styles}`}>
      {label}

      {count !== undefined && count > 0 && (
        <span
          className={`absolute -right-2 -top-2 flex h-[20px] min-w-[20px] items-center justify-center rounded-full px-1 text-xs font-bold ${badgeColor}`}
        >
          {count}
        </span>
      )}
    </Button>
  )
}
