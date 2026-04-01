import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { QueryProvider } from '@/components/providers/query-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/components/providers/auth-provider'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'AdFlow Pro - Sponsored Listing Marketplace',
  description: 'The premier platform for high-quality sponsored listings.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased selection:bg-primary/30 flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <QueryProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
            <Toaster position="top-right" richColors />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
