"use client"

import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { FileText, Wrench } from "lucide-react"
import { useState, useEffect } from "react"
import { PageLoader } from "./ui/page-loader"

export function MaintenanceLogs({ skipInitialLoader = false }: { skipInitialLoader?: boolean }) {
  // ===== STATIC DATA - REPLACE WITH BACKEND API CALLS =====
  const maintenanceActivities = [
    { train: "KM-001", type: "Scheduled", date: "2024-01-15", status: "Completed" },
    { train: "KM-003", type: "Emergency", date: "2024-01-14", status: "In Progress" },
    { train: "KM-005", type: "Preventive", date: "2024-01-13", status: "Scheduled" },
  ]
  // ===== END STATIC DATA =====

  const [isLoading, setIsLoading] = useState(() => !skipInitialLoader)

  useEffect(() => {
    if (!isLoading) return
    const t = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(t)
  }, [isLoading])

  if (isLoading) {
    return <PageLoader message="Loading maintenance logs..." />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground font-serif">Maintenance Logs</h2>
          <p className="text-muted-foreground mt-1">Track maintenance activities and schedules</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Maintenance Activities</h3>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
          <div className="space-y-4">
            {maintenanceActivities.map((log, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Wrench className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{log.train}</p>
                    <p className="text-sm text-muted-foreground">{log.type} Maintenance</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{log.date}</p>
                  <Badge
                    variant={
                      log.status === "Completed" ? "default" : log.status === "In Progress" ? "secondary" : "outline"
                    }
                  >
                    {log.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
