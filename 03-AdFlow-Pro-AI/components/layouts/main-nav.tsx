import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-8 mx-auto">
        <div className="mr-8 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent text-xl tracking-tight">
              AdFlow Pro
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/explore" className="transition-colors hover:text-foreground/80 text-foreground/60">Explore</Link>
            <Link href="/#pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">Pricing</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search can go here */}
          </div>
          <nav className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/dashboard/create">
              <Button size="sm" className="hidden sm:flex bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20">Post Ad</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
