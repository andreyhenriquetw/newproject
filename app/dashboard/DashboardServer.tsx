import BookingTabs from "./BookingTabs"
import { getTodayBookings } from "./_data/get-today-bookings"
import { getUpcomingBookings } from "./_data/get-upcoming-bookings"
import { getRecentBookings } from "./_data/get-recent-bookings"
import { getMonthlyReport } from "./_data/get-monthly-report"

export default async function DashboardServer() {
  const today = await getTodayBookings()
  const upcoming = await getUpcomingBookings()
  const recent = await getRecentBookings()
  const monthlyReport = await getMonthlyReport()

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-xl font-bold">Dashboard da Barbearia</h1>

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
