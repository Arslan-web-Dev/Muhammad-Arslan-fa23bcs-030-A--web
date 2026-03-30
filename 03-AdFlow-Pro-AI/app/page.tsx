import Link from 'next/link'
import Image from 'next/image'
import { MainNav } from '@/components/layouts/main-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, BarChart3 } from 'lucide-react'
import { DUMMY_ADS, DUMMY_PACKAGES } from '@/lib/dummy-data'

export default function Home() {
  const featuredAds = DUMMY_ADS.filter(ad => ad.is_featured);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MainNav />
      
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-background pt-24 pb-32">
          <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20" />
          <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-6xl">
            <div className="flex flex-col items-center text-center space-y-8">
              <Badge variant="secondary" className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                🚀 The Next Generation Marketplace
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl text-foreground leading-[1.1]">
                Discover & Sell <br className="hidden sm:block"/>
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Premium Listings</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                AdFlow Pro connects top verified sellers with serious buyers. Feature your ads, boost your visibility, and manage everything from a smart unified dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                <Link href="/explore" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full text-lg h-14 px-8 bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/20">
                    Explore Listings
                  </Button>
                </Link>
                <Link href="/dashboard/create" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full text-lg h-14 px-8 border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-950/50 backdrop-blur-sm">
                    Post an Ad
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-20 bg-muted/40 border-y border-border/40">
          <div className="container px-4 mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-8 bg-background/50 backdrop-blur-sm rounded-3xl shadow-sm border border-border/50 hover:border-indigo-500/30 transition-colors">
                <div className="h-16 w-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-6 shadow-inner">
                  <ShieldCheck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Verified Sellers</h3>
                <p className="text-muted-foreground leading-relaxed">Every premium seller goes through our manual verification process to ensure trust.</p>
              </div>
              <div className="flex flex-col items-center text-center p-8 bg-background/50 backdrop-blur-sm rounded-3xl shadow-sm border border-border/50 hover:border-purple-500/30 transition-colors">
                <div className="h-16 w-16 rounded-2xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-6 shadow-inner">
                  <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Instant Visibility</h3>
                <p className="text-muted-foreground leading-relaxed">Our intelligent ranking algorithm guarantees your listings get the views they deserve.</p>
              </div>
              <div className="flex flex-col items-center text-center p-8 bg-background/50 backdrop-blur-sm rounded-3xl shadow-sm border border-border/50 hover:border-blue-500/30 transition-colors">
                <div className="h-16 w-16 rounded-2xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-6 shadow-inner">
                  <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Analytics</h3>
                <p className="text-muted-foreground leading-relaxed">Track impressions, clicks, and conversions straight from your personal dashboard.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED ADS SECTION */}
        <section className="py-24 relative">
          <div className="container px-4 mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-3">Featured Listings</h2>
                <p className="text-lg text-muted-foreground">Hand-picked premium listings available now.</p>
              </div>
              <Link href="/explore">
                <Button variant="outline" className="group border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-950/50">
                  View All <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredAds.map(ad => (
                <Link href={`/ad/${ad.slug}`} key={ad.id} className="group">
                  <Card className="overflow-hidden group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-300 border-border/60 group-hover:border-indigo-500/30 bg-card/50 backdrop-blur-sm h-full flex flex-col">
                    <div className="relative h-56 w-full overflow-hidden bg-muted">
                      {ad.is_featured && (
                        <div className="absolute top-3 right-3 z-10">
                          <Badge className="bg-amber-500/90 hover:bg-amber-600 backdrop-blur-md shadow-lg font-medium px-3 py-1">⭐ Featured</Badge>
                        </div>
                      )}
                      <Image 
                        src={ad.thumbnail} 
                        alt={ad.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader className="p-6 pb-2">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{ad.category.name}</span>
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">{ad.city.name}</span>
                      </div>
                      <h3 className="font-bold text-xl line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{ad.title}</h3>
                    </CardHeader>
                    <CardContent className="p-6 pt-2 pb-4 flex-1">
                      <p className="text-3xl font-extrabold tracking-tight">${ad.price.toLocaleString()}</p>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex justify-between items-center border-t border-border/40 mt-auto bg-muted/10 py-4">
                      <div className="flex items-center text-sm font-medium text-foreground/80">
                        {ad.seller.name}
                        {ad.seller.is_verified && <CheckCircle2 className="w-4 h-4 ml-1.5 text-green-500" />}
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">Just now</span>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-24 bg-gradient-to-b from-background to-muted/30 border-t border-border/40">
          <div className="container px-4 mx-auto max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4 text-indigo-600 border-indigo-200 dark:border-indigo-800 dark:text-indigo-300">Simple Pricing</Badge>
              <h2 className="text-4xl font-extrabold tracking-tight mb-4">Choose Your Reach</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">Boost your listings to reach more buyers faster. Only pay for what you need.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
              {DUMMY_PACKAGES.map((pkg) => (
                <Card key={pkg.id} className={`relative flex flex-col transition-all duration-300 ${pkg.is_featured ? 'border-indigo-500 shadow-2xl shadow-indigo-500/20 md:-translate-y-4 z-10 bg-card' : 'border-border/60 hover:border-indigo-500/30 hover:shadow-xl bg-card/50'}`}>
                  {pkg.is_featured && (
                    <div className="absolute top-0 inset-x-0 -translate-y-1/2 flex justify-center">
                      <Badge className="bg-indigo-600 text-white font-semibold px-4 py-1.5 rounded-full shadow-lg">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pt-10 pb-6">
                    <h3 className="text-2xl font-bold tracking-tight">{pkg.name}</h3>
                    <div className="mt-6 flex items-baseline justify-center">
                      <span className="text-5xl font-extrabold tracking-tighter">${pkg.price}</span>
                      <span className="text-muted-foreground ml-2 font-medium">/ad</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 px-8">
                    <ul className="space-y-5 py-6 border-t border-border/50">
                      <li className="flex items-center">
                        <CheckCircle2 className={`w-5 h-5 mr-3 flex-shrink-0 ${pkg.is_featured ? 'text-indigo-600 dark:text-indigo-400' : 'text-muted-foreground'}`} />
                        <span className="font-medium text-foreground/90">Active for {pkg.duration_days} days</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className={`w-5 h-5 mr-3 flex-shrink-0 ${pkg.is_featured ? 'text-indigo-600 dark:text-indigo-400' : 'text-muted-foreground'}`} />
                        <span className="font-medium text-foreground/90">Rank Multiplier: {pkg.weight}x</span>
                      </li>
                      {pkg.is_featured && (
                        <li className="flex items-center">
                          <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-3 flex-shrink-0" />
                          <span className="font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 px-2 py-0.5 rounded text-sm">Featured Badge</span>
                        </li>
                      )}
                      {pkg.name === 'Premium' && (
                        <li className="flex items-center">
                          <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-3 flex-shrink-0" />
                          <span className="font-medium text-foreground/90">Priority Approval</span>
                        </li>
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter className="px-8 pb-10">
                    <Button className={`w-full h-12 text-lg font-semibold shadow-sm transition-all ${pkg.is_featured ? 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5' : 'hover:-translate-y-0.5'}`} variant={pkg.is_featured ? 'default' : 'outline'}>
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-12 bg-background">
        <div className="container px-4 mx-auto max-w-6xl text-center text-muted-foreground font-medium">
          <p>© {new Date().getFullYear()} AdFlow Pro. All rights reserved.</p>
          <p>© Designed by Muhammad Arslan</p>
        </div>
      </footer>
    </div>
  )
}
