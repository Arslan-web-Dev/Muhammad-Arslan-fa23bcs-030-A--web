'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/components/providers/auth-provider'
import {
  BarChart3,
  CreditCard,
  Home,
  LogOut,
  Menu,
  Settings,
  ShoppingBag,
  UserRound,
  Users,
  X,
  Plus,
  LayoutGrid,
} from 'lucide-react'

function getRole(pathname: string) {
  if (pathname.startsWith('/admin')) return 'admin'
  if (pathname.startsWith('/moderator')) return 'moderator'
  return 'client'
}

function getLinks(role: string) {
  if (role === 'admin') {
    return [
      { name: 'Home', href: '/admin', icon: Home },
      { name: 'Ads', href: '/dashboard/ads', icon: ShoppingBag },
      { name: 'Payments', href: '/admin/payments', icon: CreditCard },
      { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
      { name: 'Users', href: '/admin/users', icon: Users },
      { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ]
  }

  return [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Ads', href: '/dashboard/ads', icon: ShoppingBag },
    { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { signOut } = useAuth()
  const role = getRole(pathname)
  const links = getLinks(role)

  const sidebarContent = (
    <div className="flex h-full flex-col bg-[#182138] text-slate-200">
      <div className="border-b border-white/5 px-5 py-7">
        <Link href="/" className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#5b4df7] to-[#169cec] shadow-lg shadow-[#5b4df7]/20">
            <LayoutGrid className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-[2rem] font-extrabold leading-none tracking-tight text-white">AdFlow Pro</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Premium Tier</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-8">
        {links.map((link) => {
          const Icon = link.icon
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
          return (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
              <span
                className={cn(
                  'flex items-center gap-4 rounded-2xl px-5 py-4 text-[1.05rem] font-medium transition',
                  active ? 'bg-[#232a58] text-[#6457ff]' : 'text-slate-200 hover:bg-white/5'
                )}
              >
                <Icon className="h-6 w-6" />
                {link.name}
              </span>
            </Link>
          )
        })}
      </nav>

      <div className="px-4 pb-6">
        <Link href="/dashboard/create" onClick={() => setMobileOpen(false)}>
          <span className="af-gradient flex items-center justify-center gap-3 rounded-2xl px-5 py-4 text-xl font-semibold text-white shadow-lg shadow-cyan-500/10">
            <Plus className="h-6 w-6" />
            Create Ad
          </span>
        </Link>
      </div>

      <div className="mt-auto border-t border-white/5 px-4 py-6">
        <button
          type="button"
          onClick={() => signOut()}
          className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left text-[1.05rem] font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-6 w-6" />
          Log out
        </button>
      </div>
    </div>
  )

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-4 z-50 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-[#182138] text-white md:hidden"
        onClick={() => setMobileOpen((open) => !open)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}

      <aside className={cn('fixed inset-y-0 left-0 z-50 w-[294px] transition-transform duration-300 md:hidden', mobileOpen ? 'translate-x-0' : '-translate-x-full')}>
        {sidebarContent}
      </aside>

      <aside className="hidden w-[294px] flex-col border-r border-white/5 md:flex">
        {sidebarContent}
      </aside>
    </>
  )
}

