import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
      <header className="bg-white border-b border-[#e0e5eb] py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-1.5">
              <div className="w-8 h-8 bg-[#d85151] rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">Finder</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-[#111827] mb-4">Real Estate Property Listings</h1>
          <p className="text-[#6c727f] mb-8">
            Create and manage your real estate property listings with our Supabase-powered application.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button className="w-full sm:w-auto bg-[#d85151] hover:bg-[#c04545]">Sign In / Sign Up</Button>
            </Link>
            <Link href="/properties">
              <Button variant="outline" className="w-full sm:w-auto">
                View Properties
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
