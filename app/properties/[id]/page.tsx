import Link from "next/link"
import { Check, ChevronLeft, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPropertyById, deleteProperty } from "@/lib/actions"
import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

interface PropertyDetailPageProps {
  params: {
    id: string
  }
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const supabase = createServerClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth")
  }

  const { property, error } = await getPropertyById(params.id)

  if (error || !property) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg border border-[#e0e5eb] p-6">
          <h1 className="text-xl font-medium text-[#111827] mb-4">Error</h1>
          <p className="text-[#6c727f] mb-6">{error || "Property not found"}</p>
          <Link href="/properties">
            <Button variant="outline" className="flex items-center gap-1.5">
              <ChevronLeft className="w-4 h-4" />
              Back to Properties
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const amenities = [
    { id: "tv_set", label: "TV set", checked: property.property_amenities[0]?.tv_set },
    { id: "air_conditioning", label: "Air conditioning", checked: property.property_amenities[0]?.air_conditioning },
    { id: "drying_machine", label: "Drying machine", checked: property.property_amenities[0]?.drying_machine },
    { id: "fireplace", label: "Fireplace", checked: property.property_amenities[0]?.fireplace },
    { id: "security_cameras", label: "Security cameras", checked: property.property_amenities[0]?.security_cameras },
    { id: "washing_machine", label: "Washing machine", checked: property.property_amenities[0]?.washing_machine },
    {
      id: "separate_workplace",
      label: "Separate workplace",
      checked: property.property_amenities[0]?.separate_workplace,
    },
    { id: "closet", label: "Closet", checked: property.property_amenities[0]?.closet },
    { id: "shower_cabin", label: "Shower cabin", checked: property.property_amenities[0]?.shower_cabin },
    { id: "balcony", label: "Balcony", checked: property.property_amenities[0]?.balcony },
    { id: "kitchen", label: "Kitchen", checked: property.property_amenities[0]?.kitchen },
    { id: "refrigerator", label: "Refrigerator", checked: property.property_amenities[0]?.refrigerator },
    { id: "patio", label: "Patio", checked: property.property_amenities[0]?.patio },
    { id: "whirlpool", label: "Whirlpool", checked: property.property_amenities[0]?.whirlpool },
    { id: "bar", label: "Bar", checked: property.property_amenities[0]?.bar },
  ]

  const infrastructure = [
    { id: "schools", label: "Schools", checked: property.property_infrastructure[0]?.schools },
    { id: "kindergarten", label: "Kindergarten", checked: property.property_infrastructure[0]?.kindergarten },
    { id: "underground", label: "Underground", checked: property.property_infrastructure[0]?.underground },
    { id: "cinema_theater", label: "Cinema / theater", checked: property.property_infrastructure[0]?.cinema_theater },
    { id: "parking_lot", label: "Parking lot", checked: property.property_infrastructure[0]?.parking_lot },
    { id: "sports_center", label: "Sports center", checked: property.property_infrastructure[0]?.sports_center },
    { id: "beauty_salon", label: "Beauty salon", checked: property.property_infrastructure[0]?.beauty_salon },
    {
      id: "restaurant_cafe",
      label: "Restaurant / cafe",
      checked: property.property_infrastructure[0]?.restaurant_cafe,
    },
    { id: "shop", label: "Shop", checked: property.property_infrastructure[0]?.shop },
    { id: "shopping_center", label: "Shopping center", checked: property.property_infrastructure[0]?.shopping_center },
    { id: "bank", label: "Bank", checked: property.property_infrastructure[0]?.bank },
    {
      id: "park_green_area",
      label: "Park / green area",
      checked: property.property_infrastructure[0]?.park_green_area,
    },
  ]

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
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-6">
        <div className="flex justify-between items-center mb-6">
          <Link href="/properties">
            <Button variant="outline" className="flex items-center gap-1.5">
              <ChevronLeft className="w-4 h-4" />
              Back to Properties
            </Button>
          </Link>
          <div className="flex gap-2">
            <form
              action={async () => {
                "use server"
                await deleteProperty(params.id)
                redirect("/properties")
              }}
            >
              <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </form>
            <Link href={`/properties/${params.id}/edit`}>
              <Button>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#e0e5eb] overflow-hidden mb-6">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-[#111827] mb-2">{property.title}</h1>
            <div className="inline-block bg-[#f5f7fa] text-[#6c727f] text-sm px-3 py-1 rounded-full mb-4">
              {property.ownership_status === "primary" ? "Primary real estate" : "Secondary real estate"}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-[#6c727f] mb-1">Property Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#6c727f]">Total area:</span>
                    <span className="font-medium">{property.total_area} m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6c727f]">Living area:</span>
                    <span className="font-medium">{property.living_area} m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6c727f]">Kitchen area:</span>
                    <span className="font-medium">{property.kitchen_area} m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6c727f]">Floor:</span>
                    <span className="font-medium">
                      {property.floor_number} of {property.total_floors}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6c727f]">Bedrooms:</span>
                    <span className="font-medium">{property.bedrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6c727f]">Bathrooms:</span>
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6c727f]">Parking spots:</span>
                    <span className="font-medium">{property.parking_spots}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-[#6c727f] mb-3">Amenities</h3>
                <div className="grid grid-cols-1 gap-y-2">
                  {amenities
                    .filter((item) => item.checked)
                    .map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-[#d85151] flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-[#111827] text-sm">{item.label}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-[#6c727f] mb-3">Infrastructure</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2">
                {infrastructure
                  .filter((item) => item.checked)
                  .map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-[#d85151] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-[#111827] text-sm">{item.label}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#6c727f] mb-2">Description</h3>
              <p className="text-[#111827]">{property.description}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
