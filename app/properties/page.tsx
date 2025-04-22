import Link from "next/link"
import { Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "@/components/property-card"
import { PropertySearch } from "@/components/property-search"
import { getProperties, parseSearchParams } from "@/lib/actions"
import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

interface PropertiesPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const supabase = createServerClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth")
  }

  // Parse search params into filters
  const filters = await parseSearchParams(searchParams)

  // Get filtered properties
  const { properties, error, count } = await getProperties(filters)

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <header className="bg-white border-b border-[#e0e5eb] py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-1.5">
              <div className="w-8 h-8 bg-[#d85151] rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">Finder</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/properties" className="text-[#d85151] font-medium">
                Properties
              </Link>
              <Link href="/properties/new" className="text-[#333d4c] hover:text-[#111827]">
                Add Property
              </Link>
            </nav>
          </div>
          <form action="/auth/signout" method="post">
            <Button variant="outline" size="sm">
              Sign Out
            </Button>
          </form>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-[#111827]">Your Properties</h1>
          <Link href="/properties/new">
            <Button className="bg-[#d85151] hover:bg-[#c04545]">
              <Plus className="w-4 h-4 mr-2" />
              Add New Property
            </Button>
          </Link>
        </div>

        {/* Search and filter component */}
        <PropertySearch initialFilters={filters} totalCount={count || 0} />

        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            Failed to load properties: {error}
          </div>
        ) : properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property: any) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-[#111827] mb-2">No properties found</h3>
            <p className="text-[#6c727f] mb-6">
              {Object.keys(filters).length > 0
                ? "Try adjusting your filters to see more results"
                : "Get started by adding your first property listing"}
            </p>
            {Object.keys(filters).length > 0 ? (
              <Link href="/properties">
                <Button variant="outline">Clear All Filters</Button>
              </Link>
            ) : (
              <Link href="/properties/new">
                <Button className="bg-[#d85151] hover:bg-[#c04545]">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Property
                </Button>
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
