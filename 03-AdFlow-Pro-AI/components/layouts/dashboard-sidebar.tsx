'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard, PlusCircle, List, CreditCard, ShieldAlert,
  Settings, LogOut, User, BarChart2, Users, CheckSquare, Home,
  ChevronLeft, ChevronRight, Menu, X, Sun, Moon
} from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useAuth } from '@/components/providers/auth-provider'

// TODO: Replace with real user role from Supabase auth
const role = 'client'

const allLinks = [
  { name: 'Overview',        href: '/dashboard',          icon: LayoutDashboard, roles: ['client', 'moderator', 'admin', 'super_admin'], exact: true },
  { name: 'My Ads',          href: '/dashboard/ads',       icon: List,            roles: ['client'] },
  { name: 'Post Ad',         href: '/dashboard/create',    icon: PlusCircle,      roles: ['client'] },
  { name: 'Payments',        href: '/dashboard/payments',  icon: CreditCard,      roles: ['client'] },
  { name: 'Profile',         href: '/dashboard/profile',   icon: User,            roles: ['client', 'moderator', 'admin', 'super_admin'] },
  { name: 'Settings',        href: '/dashboard/settings',  icon: Settings,        roles: ['client', 'moderator', 'admin', 'super_admin'] },

  { name: 'Mod Overview',    href: '/moderator',           icon: ShieldAlert,     roles: ['moderator', 'admin', 'super_admin'], section: 'Moderation' },
  { name: 'Review Queue',    href: '/moderator/queue',     icon: CheckSquare,     roles: ['moderator', 'admin', 'super_admin'] },

  { name: 'Admin Panel',     href: '/admin',               icon: BarChart2,       roles: ['admin', 'super_admin'], section: 'Administration' },
  { name: 'Verify Payments', href: '/admin/payments',      icon: CreditCard,      roles: ['admin', 'super_admin'] },
  { name: 'Analytics',       href: '/admin/analytics',     icon: BarChart2,       roles: ['admin', 'super_admin'] },
  { name: 'Manage Users',    href: '/admin/users',         icon: Users,           roles: ['super_admin'] },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, signOut } = useAuth()

  const fullName = user?.user_metadata?.full_name || 'User'
  const email = user?.email || 'user@example.com'
  const initial = fullName.charAt(0).toUpperCase()

  const filteredLinks = allLinks.filter(l => l.roles.includes(role))
  const mainLinks = filteredLinks.filter(l => !l.section)
  const sections: Record<string, typeof filteredLinks> = {}
  filteredLinks.filter(l => l.section).forEach(l => {
    if (!sections[l.section!]) sections[l.section!] = []
    sections[l.section!].push(l)
  })

  const isActive = (link: typeof allLinks[0]) =>
    link.exact ? pathname === link.href : (pathname === link.href || pathname.startsWith(link.href + '/'))

  const renderLink = (link: typeof allLinks[0]) => {
    const Icon = link.icon
    const active = isActive(link)
    return (
      <Link key={link.name} href={link.href} onClick={() => setMobileOpen(false)}>
        <span
          title={collapsed ? link.name : undefined}
          className={cn(
            'group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 overflow-hidden',
            collapsed ? 'justify-center' : 'gap-3',
            active
              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/25 dark:text-indigo-300 shadow-sm'
              : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
          )}
        >
          <Icon className={cn(
            'h-5 w-5 flex-shrink-0 transition-colors',
            active ? 'text-indigo-600 dark:text-indigo-400' : 'text-muted-foreground group-hover:text-foreground'
          )} />
          <span className={cn(
            'transition-all duration-200 whitespace-nowrap',
            collapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'
          )}>
            {link.name}
          </span>
          {active && !collapsed && (
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 flex-shrink-0" />
          )}
        </span>
      </Link>
    )
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Top: Logo + Toggle */}
      <div className={cn(
        'flex items-center border-b border-border/50 h-16 px-3 flex-shrink-0',
        collapsed ? 'justify-center' : 'justify-between'
      )}>
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2 font-black text-lg text-indigo-600 tracking-tight">
            <span className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-black">AF</span>
            AdFlow Pro
          </Link>
        )}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg hover:bg-muted flex-shrink-0"
            onClick={() => setCollapsed(prev => !prev)}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-0.5">
        {/* Home */}
        <Link href="/" onClick={() => setMobileOpen(false)}>
          <span className={cn(
            'group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 text-muted-foreground hover:bg-muted/70 hover:text-foreground mb-1',
            collapsed ? 'justify-center' : 'gap-3'
          )}>
            <Home className="h-5 w-5 flex-shrink-0 text-muted-foreground group-hover:text-foreground" />
            <span className={cn(
              'transition-all duration-200 whitespace-nowrap',
              collapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'
            )}>
              Back to Home
            </span>
          </span>
        </Link>

        {mainLinks.map(renderLink)}

        {Object.entries(sections).map(([sectionName, sectionLinks]) => (
          <div key={sectionName} className="pt-3">
            {!collapsed && (
              <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/50 mb-1.5">
                {sectionName}
              </p>
            )}
            {collapsed && <div className="mx-3 my-1 border-t border-border/40" />}
            {sectionLinks.map(renderLink)}
          </div>
        ))}
      </nav>

      {/* Bottom: User + Logout */}
      <div className="border-t border-border/50 p-3 flex-shrink-0 space-y-1">
        {!collapsed && user && (
          <div className="flex items-center gap-3 px-2 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
              {initial}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold leading-tight truncate">{fullName}</p>
              <p className="text-xs text-muted-foreground truncate">{email}</p>
            </div>
          </div>
        )}
        {collapsed && user && (
          <div className="flex justify-center mb-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-black">{initial}</div>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={() => signOut()}
          className={cn(
            'w-full text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 font-medium transition-all',
            collapsed ? 'justify-center px-0' : 'justify-start gap-3'
          )}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          <span className={cn(
            'transition-all duration-200 whitespace-nowrap',
            collapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'
          )}>
            Logout
          </span>
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-card border border-border/80 shadow-md rounded-lg p-2"
        onClick={() => setMobileOpen(prev => !prev)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar (drawer) */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border/70 shadow-xl transition-transform duration-300 ease-in-out md:hidden',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden md:flex flex-col border-r border-border/70 bg-card shadow-sm flex-shrink-0 transition-all duration-300 ease-in-out min-h-[calc(100vh-0px)]',
        collapsed ? 'w-[68px]' : 'w-64'
      )}>
        {sidebarContent}
      </aside>
    </>
  )
}
