'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { DUMMY_PACKAGES } from '@/lib/dummy-data'

export default function SelectPackagePage() {
  const router = useRouter()
  const [selectedPkg, setSelectedPkg] = useState<number | null>(null)

  const handleContinue = () => {
    if (selectedPkg === null) return
    router.push('/dashboard/create/payment')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Select a Package</h1>
        <p className="text-muted-foreground text-lg">Choose a promotion package to reach buyers faster.</p>
      </div>

      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="flex-1 h-2.5 rounded-full shadow-inner bg-indigo-600" />
        <div className="flex-1 h-2.5 rounded-full shadow-inner bg-gradient-to-r from-indigo-500 to-purple-500" />
        <div className="flex-1 h-2.5 rounded-full shadow-inner bg-muted" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DUMMY_PACKAGES.map((pkg) => (
          <Card 
            key={pkg.id} 
            className={`relative flex flex-col cursor-pointer transition-all duration-200 border-2 ${selectedPkg === pkg.id ? 'border-indigo-600 shadow-xl shadow-indigo-500/10 ring-4 ring-indigo-600/10' : 'border-border/60 hover:border-indigo-400/50 hover:shadow-md'}`}
            onClick={() => setSelectedPkg(pkg.id)}
          >
            {pkg.is_featured && (
              <div className="absolute top-0 inset-x-0 -translate-y-1/2 flex justify-center">
                <Badge className="bg-amber-500 hover:bg-amber-600 text-amber-950 px-3 py-1 text-xs font-bold shadow-md">RECOMMENDED</Badge>
              </div>
            )}
            
            {selectedPkg === pkg.id && (
              <div className="absolute top-4 right-4">
                <CheckCircle2 className="h-6 w-6 text-indigo-600 animate-in zoom-in" />
              </div>
            )}

            <CardHeader className="text-center pt-8 pb-4">
              <CardTitle className="text-xl">{pkg.name}</CardTitle>
              <div className="mt-4 flex items-baseline justify-center">
                <span className="text-4xl font-extrabold tracking-tight">${pkg.price}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-4 py-4 border-t border-border/50">
                <li className="flex items-center text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 mr-3 text-indigo-500" />
                  Active for {pkg.duration_days} days
                </li>
                <li className="flex items-center text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 mr-3 text-indigo-500" />
                  Rank Weight: {pkg.weight}x
                </li>
                {pkg.is_featured && (
                  <li className="flex items-center text-sm font-bold">
                    <CheckCircle2 className="w-5 h-5 mr-3 text-indigo-500" />
                    Featured placement
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-8 flex justify-between items-center border-t border-border/60 mt-4">
        <Button variant="ghost" onClick={() => router.back()} className="h-12 px-6 font-medium">Back</Button>
        <Button 
          size="lg" 
          onClick={handleContinue} 
          disabled={selectedPkg === null}
          className="bg-indigo-600 hover:bg-indigo-700 h-14 px-8 font-bold text-base shadow-md shadow-indigo-500/20"
        >
          Continue to Payment <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
