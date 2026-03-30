import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MainNav } from '@/components/layouts/main-nav'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, MapPin, Calendar, Share2, Heart, Flag, ShieldCheck } from 'lucide-react'
import { DUMMY_ADS } from '@/lib/dummy-data'

export default function AdDetailPage({ params }: { params: { slug: string } }) {
  const ad = DUMMY_ADS.find(a => a.slug === params.slug)

  if (!ad) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MainNav />
      <div className="bg-muted/20 pb-20">
        <div className="bg-card border-b shadow-sm mb-8 pt-6 pb-2">
          <div className="container px-4 mx-auto max-w-6xl">
            {/* Breadcrumbs */}
            <div className="text-sm text-muted-foreground flex items-center gap-2 font-medium">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span className="text-border">/</span>
              <Link href="/explore" className="hover:text-foreground transition-colors">Explore</Link>
              <span className="text-border">/</span>
              <span className="text-foreground">{ad.category.name}</span>
            </div>
          </div>
        </div>

        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card rounded-3xl overflow-hidden border border-border/60 shadow-sm">
                <div className="relative aspect-[16/9] w-full bg-muted">
                  <Image 
                    src={ad.thumbnail} 
                    alt={ad.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {ad.is_featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-amber-500/90 hover:bg-amber-600 backdrop-blur-md shadow-lg text-sm px-4 py-1.5 font-medium rounded-full text-amber-950">Featured</Badge>
                    </div>
                  )}
                </div>
                
                <div className="p-8 md:p-10">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 leading-tight">{ad.title}</h1>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium">
                        <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5 text-indigo-500" /> {ad.city.name}, {ad.city.state}</span>
                        <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5 text-indigo-500" /> Posted 2 days ago</span>
                        <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 px-2 py-1 rounded uppercase tracking-widest">{ad.category.name}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="rounded-full shadow-sm hover:text-indigo-600 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"><Share2 className="w-4 h-4" /></Button>
                      <Button variant="outline" size="icon" className="rounded-full shadow-sm hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 hover:border-red-200 dark:hover:border-red-900 transition-colors"><Heart className="w-4 h-4" /></Button>
                    </div>
                  </div>

                  <div className="text-5xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter mb-10">
                    ${ad.price.toLocaleString()}
                  </div>

                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <h3 className="text-xl font-bold mb-4 tracking-tight">Description</h3>
                    <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap text-lg">{ad.description}</p>
                    <p className="text-foreground/80 leading-relaxed mt-4 text-lg">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-border/60 shadow-sm sticky top-24 rounded-3xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
                <CardContent className="p-8">
                  <h3 className="text-lg font-bold mb-6 tracking-tight">Seller Information</h3>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center text-2xl font-bold text-indigo-700 dark:text-indigo-300 shadow-inner">
                      {ad.seller.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-lg flex items-center">
                        {ad.seller.name}
                        {ad.seller.is_verified && (
                          <span title="Verified Seller" className="flex items-center">
                            <CheckCircle2 className="w-5 h-5 ml-1.5 text-green-500" />
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">Member since 2023</p>
                    </div>
                  </div>

                  {ad.seller.is_verified && (
                    <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-xl p-4 mb-8 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-green-800 dark:text-green-400">Verified Premium Seller</p>
                        <p className="text-xs text-green-700/80 dark:text-green-500/80 font-medium mt-1 leading-relaxed">This seller has completed our strict identity and quality verification process. Deal with confidence.</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Button className="w-full h-14 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all rounded-xl">
                      Contact Seller
                    </Button>
                    <Button variant="outline" className="w-full h-14 text-base font-semibold border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-950/50 rounded-xl">
                      Show Phone Number
                    </Button>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/50 text-center">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs font-semibold px-4 h-8 rounded-full transition-colors">
                      <Flag className="w-3 h-3 mr-1.5" /> Report this ad
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
