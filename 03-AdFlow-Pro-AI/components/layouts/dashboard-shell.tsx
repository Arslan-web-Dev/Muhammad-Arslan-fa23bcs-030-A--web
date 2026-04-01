import Link from 'next/link'
import { Bell, Search, UserCircle2 } from 'lucide-react'
import { DashboardSidebar } from './dashboard-sidebar'

const links = [
  { label: 'Marketplace', href: '/explore' },
  { label: 'Help', href: '/dashboard/settings' },
  { label: 'Support', href: '/auth/login' },
]

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="af-shell flex min-h-screen">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-white/5 bg-[#161f37]/95 backdrop-blur-xl">
          <div className="flex h-[72px] items-center gap-4 px-4 sm:px-6 lg:px-8">
            <div className="hidden max-w-xl flex-1 items-center md:flex">
              <div className="flex w-full max-w-md items-center gap-3 rounded-full border border-white/5 bg-[#0a1228] px-5 py-3 text-slate-400">
                <Search className="h-4 w-4" />
                <span className="text-sm">Search marketplace...</span>
              </div>
            </div>

            <nav className="ml-auto hidden items-center gap-8 text-sm font-medium text-slate-300 lg:flex">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className="relative grid h-10 w-10 place-items-center rounded-full border border-white/5 bg-white/5 text-slate-200"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-cyan-400" />
              </button>
              <div className="hidden border-l border-white/10 pl-4 text-right sm:block">
                <p className="text-sm font-bold text-white">Alex Sterling</p>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Advertiser</p>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-full border border-cyan-400/40 bg-[#1a223b] text-slate-100 shadow-[0_0_0_3px_rgba(21,153,236,0.1)]">
                <UserCircle2 className="h-6 w-6" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px]">{children}</div>
        </main>
      </div>
    </div>
  )
}

