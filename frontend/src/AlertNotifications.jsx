

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { PageLoader } from "./ui/page-loader"
import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"

export function AlertsNotifications() {
  const [isLoading, setIsLoading] = useState(true)

  // ===== STATIC DATA - REPLACE WITH BACKEND API CALLS =====
  const alertStats = {
    criticalAlerts: 2,
    warnings: 5,
    info: 12,
  }

  const metroAlerts = [
    {
      type: "Critical",
      message: "HVAC system failure detected on Metro KM-403",
      time: "15 minutes ago",
      train: "KM-403",
      route: "Blue Line",
    },
    {
      type: "Warning",
      message: "High passenger load detected at Ernakulam South",
      time: "1 hour ago",
      train: "KM-205",
      route: "Blue Line",
    },
    {
      type: "Warning",
      message: "Branding SLA deadline approaching for Coca-Cola",
      time: "2 hours ago",
      train: "KM-301",
      route: "Blue Line",
    },
    {
      type: "Info",
      message: "Scheduled maintenance completed successfully",
      time: "3 hours ago",
      train: "KM-107",
      route: "Blue Line",
    },
  ]
  // ===== END STATIC DATA =====

  useEffect(() => {
    const loadData = async () => {
      // TODO: Replace with actual API calls
      // const [stats, alerts] = await Promise.all([
      //   fetchAlertStats(),
      //   fetchRecentAlerts()
      // ])

      // Simulate loading time
      await new Promise((resolve) => setTimeout(resolve, 800))
      setIsLoading(false)
    }

    loadData()
  }, [])

  if (isLoading) {
    return <PageLoader message="Loading alerts and notifications..." />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary font-serif">Alerts & Notifications</h2>
          <p className="text-muted-foreground">Real-time system alerts and notifications</p>
        </div>
        <Button variant="outline">
          <CheckCircle className="h-4 w-4 mr-2" />
          Mark All Read
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
          <CardHeader>
            <CardTitle className="text-lg text-destructive">Critical Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{alertStats.criticalAlerts}</div>
            <p className="text-sm text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="text-lg text-accent">Warnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{alertStats.warnings}</div>
            <p className="text-sm text-muted-foreground">Monitor closely</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20">
          <CardHeader>
            <CardTitle className="text-lg text-chart-4">Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-4">{alertStats.info}</div>
            <p className="text-sm text-muted-foreground">General notifications</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Latest system notifications and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metroAlerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="mt-1">
                  {alert.type === "Critical" ? (
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  ) : alert.type === "Warning" ? (
                    <AlertCircle className="h-5 w-5 text-accent" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-chart-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        alert.type === "Critical" ? "destructive" : alert.type === "Warning" ? "secondary" : "outline"
                      }
                    >
                      {alert.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{alert.time}</span>
                  </div>
                  <div className="mt-2">
                    <div className="font-semibold">{alert.message}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Train: {alert.train} • Route: {alert.route}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
