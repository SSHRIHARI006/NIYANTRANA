
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { PageLoader } from "./ui/page-loader"
import { Train, Search, Plus, AlertTriangle, TrendingUp, Activity, Wrench } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie } from "recharts"

interface DashboardOverviewProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export function DashboardOverview({ searchTerm, setSearchTerm }: DashboardOverviewProps) {
  const [isLoading, setIsLoading] = useState(true)

  // ===== STATIC DATA - REPLACE WITH BACKEND API CALLS =====
  const dashboardStats = {
    trainsDeployed: 18,
    maintenanceCycles: 7,
    brandingMissions: 12,
    fleetStatus: {
      standby: 3,
      backlog: 2,
      active: 18,
      sla: 95,
    },
  }

  const chartData = [
    { day: "Mon", service: 18, maintenance: 4, standby: 3 },
    { day: "Tue", service: 20, maintenance: 3, standby: 2 },
    { day: "Wed", service: 19, maintenance: 5, standby: 1 },
    { day: "Thu", service: 21, maintenance: 2, standby: 2 },
    { day: "Fri", service: 22, maintenance: 2, standby: 1 },
    { day: "Sat", service: 17, maintenance: 6, standby: 2 },
    { day: "Sun", service: 16, maintenance: 7, standby: 2 },
  ]

  const pieChartData = [
    { name: "Service", value: 18, fill: "hsl(var(--primary))" },
    { name: "Standby", value: 3, fill: "hsl(var(--accent))" },
    { name: "Maintenance", value: 4, fill: "hsl(var(--chart-2))" },
  ]

  const rosterData = [
    {
      rank: 1,
      trainId: "KM-301",
      status: "Service",
      jobCardStatus: "Closed",
      certificateStatus: "Valid",
      mileage: 45234,
      route: "Aluva - Pettah",
      branding: "Coca-Cola / 3 hours remaining",
      aiReason: "Optimal for peak hour service on Blue Line.",
      conflict: null,
      efficiency: 98.2,
      lastMaintenance: "2025-09-10",
      nextMaintenance: "2025-09-25",
      passengerLoad: "High",
    },
    {
      rank: 2,
      trainId: "KM-205",
      status: "Service",
      jobCardStatus: "Closed",
      certificateStatus: "Valid",
      mileage: 38890,
      route: "Palarivattom - Ernakulam South",
      branding: null,
      aiReason: "High efficiency, balanced mileage distribution.",
      conflict: null,
      efficiency: 97.8,
      lastMaintenance: "2025-09-12",
      nextMaintenance: "2025-09-27",
      passengerLoad: "Medium",
    },
    {
      rank: 16,
      trainId: "KM-108",
      status: "Standby",
      jobCardStatus: "Open",
      certificateStatus: "Valid",
      mileage: 52500,
      route: "Depot Standby",
      branding: null,
      aiReason: "Pending non-critical brake inspection.",
      conflict: {
        type: "MAINTENANCE_WARNING",
        details: "Job card J-5892 (Brake System Check) is open.",
      },
      efficiency: 89.4,
      lastMaintenance: "2025-08-28",
      nextMaintenance: "2025-09-20",
      passengerLoad: "N/A",
    },
    {
      rank: 25,
      trainId: "KM-403",
      status: "Maintenance",
      jobCardStatus: "Open",
      certificateStatus: "Expiring",
      mileage: 48750,
      route: "Maintenance Bay",
      branding: null,
      aiReason: "Critical HVAC system maintenance required.",
      conflict: {
        type: "MAINTENANCE_CRITICAL",
        details: "Safety certificate expires in 2 days.",
      },
      efficiency: 76.2,
      lastMaintenance: "2025-08-15",
      nextMaintenance: "2025-09-18",
      passengerLoad: "N/A",
    },
  ]
  // ===== END STATIC DATA =====

  const filteredRosterData = rosterData.filter(
    (train) =>
      train.trainId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      train.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (train.conflict?.details || "").toLowerCase().includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    const loadData = async () => {
      // TODO: Replace with actual API calls
      // const [stats, chartData, rosterData] = await Promise.all([
      //   fetchDashboardStats(),
      //   fetchChartData(),
      //   fetchRosterData()
      // ])

      // Simulate loading time
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsLoading(false)
    }

    loadData()
  }, [])

  if (isLoading) {
    return <PageLoader message="Loading dashboard data..." />
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Metro Trains Deployed</CardTitle>
            <Train className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold text-primary">{dashboardStats.trainsDeployed}</div>
            <p className="text-xs text-muted-foreground">Currently in service</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Cycles</CardTitle>
            <Wrench className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold text-accent">{dashboardStats.maintenanceCycles}</div>
            <p className="text-xs text-muted-foreground">Completed today</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-chart-2/10 to-chart-2/5 border-chart-2/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Branding Missions</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold text-chart-2">{dashboardStats.brandingMissions}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fleet Status</CardTitle>
            <Activity className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Standby: {dashboardStats.fleetStatus.standby}</span>
                <span>Backlog: {dashboardStats.fleetStatus.backlog}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Active: {dashboardStats.fleetStatus.active}</span>
                <span>SLA: {dashboardStats.fleetStatus.sla}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Daily Fleet Performance</CardTitle>
            <CardDescription>Metro service runs completed per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250} className="lg:h-[300px]">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="service" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Fleet Status Breakdown</CardTitle>
            <CardDescription>Current distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250} className="lg:h-[300px]">
              <PieChart>
                <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Roster Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg lg:text-xl">Today's Operational Roster</CardTitle>
              <CardDescription>Real-time metro train assignments and status</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search trains..."
                  className="pl-8 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Manual Intervention</span>
                <span className="sm:hidden">Override</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="service" className="w-full">
            <div className="overflow-x-auto">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 min-w-max">
                <TabsTrigger value="service" className="text-xs lg:text-sm">
                  Service Roster
                </TabsTrigger>
                <TabsTrigger value="branding" className="text-xs lg:text-sm">
                  Branding Schedule
                </TabsTrigger>
                <TabsTrigger value="entering" className="text-xs lg:text-sm">
                  Entering Maintenance
                </TabsTrigger>
                <TabsTrigger value="exiting" className="text-xs lg:text-sm">
                  Exiting Maintenance
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="service" className="mt-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[80px]">Train ID</TableHead>
                      <TableHead className="min-w-[100px]">Status</TableHead>
                      <TableHead className="min-w-[120px] hidden sm:table-cell">Job Card</TableHead>
                      <TableHead className="min-w-[120px] hidden md:table-cell">Certificate</TableHead>
                      <TableHead className="min-w-[100px] hidden lg:table-cell">Mileage</TableHead>
                      <TableHead className="min-w-[150px] hidden xl:table-cell">Branding</TableHead>
                      <TableHead className="min-w-[200px]">AI Reason</TableHead>
                      <TableHead className="min-w-[100px]">Alerts</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRosterData.map((train) => (
                      <TableRow key={train.trainId} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{train.trainId}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              train.status === "Service"
                                ? "default"
                                : train.status === "Standby"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {train.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant={train.jobCardStatus === "Closed" ? "outline" : "destructive"}>
                            {train.jobCardStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant={train.certificateStatus === "Valid" ? "outline" : "destructive"}>
                            {train.certificateStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm">
                          {train.mileage.toLocaleString()} km
                        </TableCell>
                        <TableCell className="hidden xl:table-cell text-sm">{train.branding || "None"}</TableCell>
                        <TableCell className="text-sm max-w-[200px] truncate">{train.aiReason}</TableCell>
                        <TableCell>
                          {train.conflict && (
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Alert
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
