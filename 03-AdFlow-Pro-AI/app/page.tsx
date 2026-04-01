import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BadgeCheck, Rocket, Sparkles, Star } from 'lucide-react'
import { MainNav } from '@/components/layouts/main-nav'
import { Button } from '@/components/ui/button'
import { DUMMY_ADS } from '@/lib/dummy-data'

const featuredListings = [
  {
    tier: 'Premium Tier',
    category: 'Analytics Platform',
    title: 'Sidebar Banner - 7M Views',
    price: '$1,200',
    meta: '30 Day Placement',
    image: DUMMY_ADS[0].thumbnail,
  },
  {
    tier: 'Standard Tier',
    category: 'Curated Newsletter',
    title: 'Main Slot - Dev Digest',
    price: '$450',
    meta: 'Per Issue',
    image: DUMMY_ADS[2].thumbnail,
  },
  {
    tier: 'Premium Tier',
    category: 'Product Search',
    title: 'Search Top Result',
    price: '$2,800',
    meta: '14 Day Exclusive',
    image: DUMMY_ADS[1].thumbnail,
  },
  {
    tier: 'Basic Tier',
    category: 'Blog Network',
    title: 'Native Text Placement',
    price: '$150',
    meta: '7 Day Slot',
    image: DUMMY_ADS[2].thumbnail,
  },
]

const packages = [
  {
    name: 'Basic',
    price: '$49',
    period: '/week',
    features: ['Single Listing Placement', 'Standard Analytics', 'Community Support'],
  },
  {
    name: 'Standard',
    price: '$149',
    period: '/month',
    features: ['3 Concurrent Listings', 'Advanced Audience Insights', 'Priority Review', 'Ad Optimization AI'],
    featured: true,
  },
  {
    name: 'Premium',
    price: '$499',
    period: '/quarter',
    features: ['Unlimited Listings', 'Full API Access', 'Custom White-labelling', 'Dedicated Account Lead'],
  },
]

export default function Home() {
  return (
    <div className="af-shell">
      <MainNav />
      <main>
        <section className="relative overflow-hidden px-4 pb-24 pt-16 sm:px-6 lg:px-10 lg:pt-24">
          <div className="mx-auto max-w-[1280px]">
            <div className="relative overflow-hidden rounded-[36px] border border-white/5 bg-[#0d1530] px-6 py-16 shadow-[0_35px_120px_rgba(2,7,25,0.45)] sm:px-10 lg:px-20 lg:py-28">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(93,77,247,0.18),transparent_30%),radial-gradient(circle_at_65%_55%,rgba(21,153,236,0.18),transparent_28%)]" />
              <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
                <span className="af-pill mb-8 gap-2 bg-[#1b2146] text-[#dce2ff]"><Sparkles className="h-3.5 w-3.5 text-[#6c6cff]" /> New. AI-Powered Targeting</span>
                <h1 className="text-balance text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Launch Your Ads
                  <br />
                  <span className="af-gradient-text">Like a Pro</span>
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                  Access high-traffic sponsorship opportunities and premium placements across the digital curator network. Precision data meets editorial excellence.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link href="/dashboard/create">
                    <Button className="af-gradient h-14 rounded-2xl px-8 text-base font-semibold text-white shadow-lg shadow-[#5b4df7]/20 hover:opacity-95">
                      Post Ad <Rocket className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/explore">
                    <Button variant="secondary" className="h-14 rounded-2xl border border-white/5 bg-white/10 px-8 text-base font-semibold text-white hover:bg-white/15">
                      Explore Ads
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-white/[0.02] px-4 py-8 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[1280px] text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Trusted by Industry Leaders</p>
            <div className="mt-6 grid grid-cols-4 gap-6 text-slate-500 sm:grid-cols-6">
              {['MetaFlow', 'Curio', 'Pulse', 'Apex', 'Signal', 'Arc'].map((name) => (
                <div key={name} className="rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-4 text-sm font-semibold">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Featured Listings</h2>
                <p className="mt-2 text-slate-400">Top performing placements currently available.</p>
              </div>
              <Link href="/explore" className="inline-flex items-center gap-2 text-sm font-semibold text-[#6d7bff] transition hover:text-[#8ea4ff]">
                View Marketplace <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {featuredListings.map((listing) => (
                <article key={listing.title} className="overflow-hidden rounded-[22px] border border-white/5 bg-[#1a223b] shadow-[0_20px_50px_rgba(2,7,25,0.28)]">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={listing.image} alt={listing.title} fill className="object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101728] via-transparent to-transparent" />
                    <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-[#1c2145]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                      {listing.tier}
                    </div>
                  </div>
                  <div className="space-y-3 px-4 py-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{listing.category}</p>
                    <h3 className="text-2xl font-bold text-white">{listing.title}</h3>
                    <div className="flex items-end justify-between gap-3">
                      <p className="text-3xl font-extrabold text-white">{listing.price}</p>
                      <p className="text-xs font-medium text-slate-400">{listing.meta}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Marketplace Packages</h2>
              <p className="mt-3 text-slate-400">Flexible plans designed for publishers and advertisers of all sizes.</p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`relative rounded-[28px] border bg-[#1a223b] p-8 shadow-[0_20px_50px_rgba(2,7,25,0.28)] ${pkg.featured ? 'border-[#5b4df7] bg-[#2a3152] shadow-[0_24px_70px_rgba(91,77,247,0.18)]' : 'border-white/5'}`}
                >
                  {pkg.featured && (
                    <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#6255ff] to-[#189ced] px-4 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-white">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-3xl font-bold text-white">{pkg.name}</h3>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-5xl font-extrabold text-white">{pkg.price}</span>
                    <span className="pb-2 text-sm text-slate-400">{pkg.period}</span>
                  </div>
                  <ul className="mt-8 space-y-4 text-sm text-slate-300">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <BadgeCheck className="mt-0.5 h-4.5 w-4.5 text-[#b7b8ff]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`mt-10 h-12 w-full rounded-2xl text-base font-semibold ${pkg.featured ? 'af-gradient text-white' : 'border border-white/10 bg-transparent text-white hover:bg-white/5'}`} variant={pkg.featured ? 'default' : 'outline'}>
                    {pkg.featured ? 'Choose Plan' : pkg.name === 'Premium' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-10 lg:pb-20">
          <div className="mx-auto max-w-[1280px] rounded-[28px] border border-cyan-400/10 bg-gradient-to-r from-[#4f4cf4] to-[#149de9] px-6 py-14 text-center shadow-[0_25px_80px_rgba(20,157,233,0.2)] sm:px-10">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl">Ready to Scale Your Reach?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-blue-50/90 sm:text-lg">
              Join over 2,500+ advertisers who are already leveraging AdFlow Pro to find premium sponsorship opportunities.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button className="h-12 rounded-2xl bg-black px-8 text-base font-semibold text-white hover:bg-black/90">Start Posting Now</Button>
              <Button variant="outline" className="h-12 rounded-2xl border-white/20 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10">Schedule a Demo</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 text-sm text-slate-400 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-lg font-extrabold uppercase text-white">AdFlow Pro</p>
            <p className="mt-2">© 2024 AdFlow Pro. The Digital Curator.</p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.18em]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Policy</span>
            <span className="inline-flex items-center gap-2"><Star className="h-3.5 w-3.5" /> Global</span>
          </div>
        </div>
      </footer>
    </div>
  )
}


