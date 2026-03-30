import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Activity, ShoppingBag, Eye, TrendingUp } from 'lucide-react'

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Overview</h1>
        <p className="text-muted-foreground text-lg">Monitor your ads performance and account metrics.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-border/80 bg-gradient-to-br from-card to-card hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Total Active Ads</CardTitle>
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
              <ShoppingBag className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground">12</div>
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-500 mt-2 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-border/80 bg-gradient-to-br from-card to-card hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Total Views</CardTitle>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <Eye className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">4,320</div>
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-500 mt-2 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +18% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-border/80 bg-gradient-to-br from-card to-card hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Click-Through Rate</CardTitle>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">12.5%</div>
            <p className="text-xs text-muted-foreground mt-2 font-medium">
              Average across all active ads
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-border/80 bg-gradient-to-br from-card to-card hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Spent on Packages</CardTitle>
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <BarChart className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">$340</div>
            <p className="text-xs text-muted-foreground mt-2 font-medium">
              Lifetime ad spend
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 shadow-sm border-border/80">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Views Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center text-muted-foreground rounded-b-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <div className="flex flex-col items-center gap-3 z-20">
              <div className="p-4 bg-muted/50 rounded-full border border-border/50">
                <BarChart className="h-8 w-8 text-foreground/40" />
              </div>
              <p className="font-medium">Chart data will be available soon.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3 shadow-sm border-border/80 overflow-hidden">
          <CardHeader className="bg-muted/10 border-b border-border/40">
            <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-8">
              {[
                { title: 'Ad Approved', desc: 'Your ad "MacBook Pro" is now live.', time: '2h ago', color: 'bg-green-500' },
                { title: 'Payment Confirmed', desc: 'Premium Package active for 30 days.', time: '5h ago', color: 'bg-indigo-500' },
                { title: 'Ad Expired', desc: 'Your ad "Honda Civic" has expired.', time: '1d ago', color: 'bg-orange-500' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`w-2.5 h-2.5 mt-1.5 rounded-full ${activity.color} shadow-sm ring-4 ring-background`} />
                  <div className="space-y-1">
                    <p className="text-sm font-bold leading-none">{activity.title}</p>
                    <p className="text-sm text-muted-foreground/90">{activity.desc}</p>
                    <p className="text-xs font-semibold text-muted-foreground/50">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
