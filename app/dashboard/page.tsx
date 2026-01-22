"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

const DashboardServer = dynamic(() => import("./DashboardServer"), {
  ssr: false,
})

export default function DashboardPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const isAuthorized = localStorage.getItem("dashboard_auth")

    if (isAuthorized === "true") {
      setAuthorized(true)
    } else {
      router.replace("/")
    }
  }, [router])

  if (!authorized) return null

  return <DashboardServer />
}
