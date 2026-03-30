import { DashboardSidebar } from './dashboard-sidebar'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-muted/10 pt-16 md:pt-8">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
        <footer className="mt-12 py-8 border-bg border-t border-border/40 text-center text-xs font-medium text-muted-foreground">
          <p>© {new Date().getFullYear()} AdFlow Pro. Designed by Muhammad Arslan</p>
        </footer>
      </main>
    </div>
  )
}
