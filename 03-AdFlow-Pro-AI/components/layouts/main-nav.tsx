import Link from 'next/link'
import { Bell, CircleUserRound } from 'lucide-react'

const navItems = [
  { label: 'Marketplace', href: '/explore' },
  { label: 'Help', href: '/dashboard/settings' },
  { label: 'Support', href: '/auth/login' },
]

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#161f37]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-white">
            AdFlow Pro
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/5 bg-white/5 text-slate-200 transition hover:bg-white/10"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </button>
          <Link
            href="/dashboard"
            className="grid h-10 w-10 place-items-center rounded-full border border-cyan-400/40 bg-gradient-to-br from-[#26314f] to-[#1b2442] text-slate-100 shadow-[0_0_0_3px_rgba(21,153,236,0.1)]"
          >
            <CircleUserRound className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  )
}
