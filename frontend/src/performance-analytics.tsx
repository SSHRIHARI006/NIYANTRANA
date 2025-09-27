
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { useState, useEffect } from "react"
import { PageLoader } from "./ui/page-loader"

export function PerformanceAnalytics({ skipInitialLoader = false }: { skipInitialLoader?: boolean }) {
  // ===== STATIC DATA - REPLACE WITH BACKEND API CALLS =====
  const chartData = [
    { day: "Mon", service: 18, maintenance: 4, standby: 3 },
    { day: "Tue", service: 20, maintenance: 3, standby: 2 },
    { day: "Wed", service: 19, maintenance: 5, standby: 1 },
    { day: "Thu", service: 21, maintenance: 2, standby: 2 },
    { day: "Fri", service: 22, maintenance: 2, standby: 1 },
    { day: "Sat", service: 17, maintenance: 6, standby: 2 },
    { day: "Sun", service: 16, maintenance: 7, standby: 2 },
  ]

  const performanceStats = {
    averageEfficiency: 94.2,
    onTimePerformance: 97.8,
    passengerSatisfaction: 4.6,
  }
  // ===== END STATIC DATA =====

  const [isLoading, setIsLoading] = useState(() => !skipInitialLoader)

  useEffect(() => {
    if (!isLoading) return
    const t = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(t)
  }, [isLoading])

  if (isLoading) {
    return <PageLoader message="Loading performance analytics..." />
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary font-serif">Performance Analytics</h2>
        <p className="text-muted-foreground">Detailed performance metrics and trends</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Fleet Performance</CardTitle>
            <CardDescription>Service runs completed per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="service" fill="hsl(var(--primary))" />
                <Bar dataKey="maintenance" fill="hsl(var(--chart-2))" />
                <Bar dataKey="standby" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fleet Efficiency Trend</CardTitle>
            <CardDescription>Average efficiency over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="service" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Average Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{performanceStats.averageEfficiency}%</div>
            <p className="text-sm text-muted-foreground">+2.1% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>On-Time Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-4">{performanceStats.onTimePerformance}%</div>
            <p className="text-sm text-muted-foreground">Above 95% target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Passenger Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{performanceStats.passengerSatisfaction}/5</div>
            <p className="text-sm text-muted-foreground">Based on 1,247 reviews</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
