import Link from 'next/link'
import Image from 'next/image'
import { MainNav } from '@/components/layouts/main-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { CheckCircle2, Search, Filter } from 'lucide-react'
import { DUMMY_ADS, DUMMY_CATEGORIES, DUMMY_CITIES } from '@/lib/dummy-data'

export default function ExplorePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MainNav />
      <div className="flex-1 bg-muted/20">
        <div className="bg-card border-b shadow-sm">
          <div className="container px-4 py-8 mx-auto max-w-7xl">
            <h1 className="text-3xl font-extrabold tracking-tight mb-6">Explore Listings</h1>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search for ads, keywords, properties..." className="pl-12 h-14 text-base shadow-inner border-border/80 focus-visible:ring-indigo-500" />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="h-14 px-6 border-border/80">
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
                <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 shadow-md text-base">Search</Button>
              </div>
            </div>
            
            <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
              <Badge variant="secondary" className="px-4 py-2 text-sm cursor-pointer bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300">All Categories</Badge>
              {DUMMY_CATEGORIES.map(c => (
                <Badge key={c.id} variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-muted font-medium whitespace-nowrap">{c.name}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="container px-4 py-10 mx-auto max-w-7xl flex flex-col md:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 shrink-0 space-y-8 hidden md:block">
            <div className="p-5 bg-card rounded-xl border border-border/60 shadow-sm">
              <h3 className="font-semibold text-lg mb-4 flex items-center">Location</h3>
              <div className="space-y-3">
                {DUMMY_CITIES.map(c => (
                  <label key={c.id} className="flex items-center space-x-3 text-sm text-foreground/80 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400">
                    <input type="checkbox" className="rounded border-input text-indigo-600 focus:ring-indigo-500 w-4 h-4" />
                    <span>{c.name}, {c.state}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="p-5 bg-card rounded-xl border border-border/60 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Price Range</h3>
              <div className="flex items-center gap-2">
                <Input placeholder="Min" type="number" className="h-10 text-sm" />
                <span className="text-muted-foreground">-</span>
                <Input placeholder="Max" type="number" className="h-10 text-sm" />
              </div>
              <Button variant="outline" className="w-full mt-4 h-10">Apply</Button>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground font-medium">{DUMMY_ADS.length} results found</p>
              <select className="border border-border/80 bg-card rounded-lg text-sm px-4 py-2 font-medium focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>Most Relevant</option>
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {DUMMY_ADS.map(ad => (
                <Link href={`/ad/${ad.slug}`} key={ad.id} className="group flex h-full">
                  <Card className="overflow-hidden group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 border-border/60 group-hover:border-indigo-500/30 flex flex-col w-full bg-card/50 backdrop-blur-sm">
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                      {ad.is_featured && (
                        <div className="absolute top-3 right-3 z-10">
                          <Badge className="bg-amber-500/90 hover:bg-amber-600 backdrop-blur-md shadow-sm">Featured</Badge>
                        </div>
                      )}
                      <Image 
                        src={ad.thumbnail} 
                        alt={ad.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader className="p-5 pb-2">
                      <div className="flex justify-between items-start mb-1.5">
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{ad.category.name}</span>
                        <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-md font-medium">{ad.city.name}</span>
                      </div>
                      <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">{ad.title}</h3>
                    </CardHeader>
                    <CardContent className="p-5 pt-1 pb-4 flex-1">
                      <p className="text-2xl font-extrabold tracking-tight">${ad.price.toLocaleString()}</p>
                    </CardContent>
                    <CardFooter className="p-5 pt-0 flex justify-between items-center border-t border-border/40 py-3 bg-muted/10 mt-auto">
                      <div className="flex items-center text-xs text-foreground/80 font-medium">
                        {ad.seller.name}
                        {ad.seller.is_verified && <CheckCircle2 className="w-3.5 h-3.5 ml-1 text-green-500" />}
                      </div>
                      <span className="text-[10px] text-muted-foreground font-medium">Today</span>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <div className="flex gap-2">
                <Button variant="outline" disabled className="text-muted-foreground">Previous</Button>
                <Button variant="outline" className="bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white border-transparent shadow-sm">1</Button>
                <Button variant="outline" className="hover:text-indigo-600 hover:border-indigo-200 dark:hover:border-indigo-800">2</Button>
                <Button variant="outline" className="hover:text-indigo-600 hover:border-indigo-200 dark:hover:border-indigo-800">3</Button>
                <Button variant="outline" className="hover:text-indigo-600 hover:border-indigo-200 dark:hover:border-indigo-800">Next</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
