import BookingTabs from "./BookingTabs"

import { getTodayBookings } from "./_data/get-today-bookings"
import { getUpcomingBookings } from "./_data/get-upcoming-bookings"
import { getRecentBookings } from "./_data/get-recent-bookings"
import { getMonthlyReport } from "./_data/get-monthly-report"
import Link from "next/link"
import { Button } from "../_components/ui/button"
import { ChevronLeftIcon } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const today = await getTodayBookings()
  const upcoming = await getUpcomingBookings()
  const recent = await getRecentBookings()
  const monthlyReport = await getMonthlyReport()

  return (
    <div className="space-y-7 p-4">
      <Button
        size="icon"
        variant="secondary"
        className="absolute left-4 top-4"
        asChild
      >
        <Link href="/">
          <ChevronLeftIcon />
        </Link>
      </Button>
      <div className="pt-5">
        <h1 className="text-xl font-bold">Dashboard da Barbearia</h1>
      </div>

      <BookingTabs
        today={today}
        upcoming={upcoming}
        recent={recent}
        totalRevenue={monthlyReport.totalRevenue}
        totalBookings={monthlyReport.totalBookings}
      />
    </div>
  )
}
