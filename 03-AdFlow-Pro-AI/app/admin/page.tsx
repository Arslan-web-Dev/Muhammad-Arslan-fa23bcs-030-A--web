'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { label: 'Total Revenue', value: '$45,231', change: '+20.1%', icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/30' },
  { label: 'Active Ads', value: '3,482', change: '+12.5%', icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/30' },
  { label: 'Total Users', value: '12,088', change: '+8.2%', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
  { label: 'Pending Payments', value: '23', change: 'Needs review', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/30' },
]

const quickLinks = [
  { label: 'Payment Verifications', href: '/admin/payments', description: '23 payments awaiting review', urgent: true },
  { label: 'Analytics Dashboard', href: '/admin/analytics', description: 'Revenue & ad performance', urgent: false },
  { label: 'User Management', href: '/admin/users', description: 'Manage roles & permissions', urgent: false },
  { label: 'Moderator Queue', href: '/moderator/queue', description: '12 ads pending moderation', urgent: true },
]

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Admin Control Center</h1>
        <p className="text-muted-foreground text-lg">Manage the entire AdFlow Pro platform from here.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/80 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">{stat.label}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">{stat.value}</div>
              <p className="text-xs text-emerald-600 font-bold mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="border-border/80 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 cursor-pointer group">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-base group-hover:text-indigo-600 transition-colors">{link.label}</p>
                      {link.urgent && (
                        <Badge className="bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-400 dark:border-red-800 text-[10px] font-bold px-2">URGENT</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">{link.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
