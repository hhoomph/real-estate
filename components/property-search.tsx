"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

export type PropertyFilters = {
  search?: string
  propertyType?: string[]
  bedrooms?: number[]
  bathrooms?: number[]
  minArea?: number
  maxArea?: number
  amenities?: string[]
  infrastructure?: string[]
}

interface PropertySearchProps {
  initialFilters?: PropertyFilters
  totalCount: number
}

export function PropertySearch({ initialFilters = {}, totalCount }: PropertySearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState<PropertyFilters>(initialFilters)
  const [searchTerm, setSearchTerm] = useState(initialFilters.search || "")
  const [areaRange, setAreaRange] = useState<[number, number]>([
    initialFilters.minArea || 0,
    initialFilters.maxArea || 300,
  ])
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  // Count active filters
  const activeFilterCount = Object.values(filters).reduce((count, value) => {
    if (Array.isArray(value) && value.length > 0) return count + 1
    if (value && !Array.isArray(value)) return count + 1
    return count
  }, 0)

  const propertyTypes = [
    { value: "apartment", label: "Apartment" },
    { value: "house", label: "House" },
    { value: "studio", label: "Studio" },
    { value: "penthouse", label: "Penthouse" },
    { value: "loft", label: "Loft" },
  ]

  const amenitiesList = [
    { id: "tv_set", label: "TV set" },
    { id: "air_conditioning", label: "Air conditioning" },
    { id: "drying_machine", label: "Drying machine" },
    { id: "fireplace", label: "Fireplace" },
    { id: "security_cameras", label: "Security cameras" },
    { id: "washing_machine", label: "Washing machine" },
    { id: "separate_workplace", label: "Separate workplace" },
    { id: "closet", label: "Closet" },
    { id: "shower_cabin", label: "Shower cabin" },
    { id: "balcony", label: "Balcony" },
    { id: "kitchen", label: "Kitchen" },
    { id: "refrigerator", label: "Refrigerator" },
    { id: "patio", label: "Patio" },
    { id: "whirlpool", label: "Whirlpool" },
    { id: "bar", label: "Bar" },
  ]

  const infrastructureList = [
    { id: "schools", label: "Schools" },
    { id: "kindergarten", label: "Kindergarten" },
    { id: "underground", label: "Underground" },
    { id: "cinema_theater", label: "Cinema / theater" },
    { id: "parking_lot", label: "Parking lot" },
    { id: "sports_center", label: "Sports center" },
    { id: "beauty_salon", label: "Beauty salon" },
    { id: "restaurant_cafe", label: "Restaurant / cafe" },
    { id: "shop", label: "Shop" },
    { id: "shopping_center", label: "Shopping center" },
    { id: "bank", label: "Bank" },
    { id: "park_green_area", label: "Park / green area" },
  ]

  const togglePropertyType = (type: string) => {
    setFilters((prev) => {
      const currentTypes = prev.propertyType || []
      const newTypes = currentTypes.includes(type) ? currentTypes.filter((t) => t !== type) : [...currentTypes, type]

      return {
        ...prev,
        propertyType: newTypes.length > 0 ? newTypes : undefined,
      }
    })
  }

  const toggleBedrooms = (count: number) => {
    setFilters((prev) => {
      const currentBedrooms = prev.bedrooms || []
      const newBedrooms = currentBedrooms.includes(count)
        ? currentBedrooms.filter((b) => b !== count)
        : [...currentBedrooms, count]

      return {
        ...prev,
        bedrooms: newBedrooms.length > 0 ? newBedrooms : undefined,
      }
    })
  }

  const toggleBathrooms = (count: number) => {
    setFilters((prev) => {
      const currentBathrooms = prev.bathrooms || []
      const newBathrooms = currentBathrooms.includes(count)
        ? currentBathrooms.filter((b) => b !== count)
        : [...currentBathrooms, count]

      return {
        ...prev,
        bathrooms: newBathrooms.length > 0 ? newBathrooms : undefined,
      }
    })
  }

  const toggleAmenity = (id: string) => {
    setFilters((prev) => {
      const currentAmenities = prev.amenities || []
      const newAmenities = currentAmenities.includes(id)
        ? currentAmenities.filter((a) => a !== id)
        : [...currentAmenities, id]

      return {
        ...prev,
        amenities: newAmenities.length > 0 ? newAmenities : undefined,
      }
    })
  }

  const toggleInfrastructure = (id: string) => {
    setFilters((prev) => {
      const currentInfrastructure = prev.infrastructure || []
      const newInfrastructure = currentInfrastructure.includes(id)
        ? currentInfrastructure.filter((i) => i !== id)
        : [...currentInfrastructure, id]

      return {
        ...prev,
        infrastructure: newInfrastructure.length > 0 ? newInfrastructure : undefined,
      }
    })
  }

  const handleSearch = () => {
    // Update filters with search term
    const updatedFilters = {
      ...filters,
      search: searchTerm || undefined,
      minArea: areaRange[0] > 0 ? areaRange[0] : undefined,
      maxArea: areaRange[1] < 300 ? areaRange[1] : undefined,
    }

    // Build query string
    const params = new URLSearchParams()

    if (updatedFilters.search) {
      params.set("search", updatedFilters.search)
    }

    if (updatedFilters.propertyType?.length) {
      params.set("propertyType", updatedFilters.propertyType.join(","))
    }

    if (updatedFilters.bedrooms?.length) {
      params.set("bedrooms", updatedFilters.bedrooms.join(","))
    }

    if (updatedFilters.bathrooms?.length) {
      params.set("bathrooms", updatedFilters.bathrooms.join(","))
    }

    if (updatedFilters.minArea) {
      params.set("minArea", updatedFilters.minArea.toString())
    }

    if (updatedFilters.maxArea) {
      params.set("maxArea", updatedFilters.maxArea.toString())
    }

    if (updatedFilters.amenities?.length) {
      params.set("amenities", updatedFilters.amenities.join(","))
    }

    if (updatedFilters.infrastructure?.length) {
      params.set("infrastructure", updatedFilters.infrastructure.join(","))
    }

    // Navigate to the filtered results
    router.push(`/properties?${params.toString()}`)
    setIsFiltersOpen(false)
  }

  const clearFilters = () => {
    setFilters({})
    setSearchTerm("")
    setAreaRange([0, 300])
  }

  const removeFilter = (key: keyof PropertyFilters, value?: string) => {
    setFilters((prev) => {
      const updated = { ...prev }

      if (value && Array.isArray(updated[key])) {
        updated[key] = (updated[key] as string[]).filter((v) => v !== value)
        if ((updated[key] as string[]).length === 0) {
          delete updated[key]
        }
      } else {
        delete updated[key]
      }

      return updated
    })
  }

  // Apply filters when they change
  useEffect(() => {
    // Don't apply filters on initial load
    if (Object.keys(initialFilters).length > 0) return

    const timer = setTimeout(() => {
      handleSearch()
    }, 500)

    return () => clearTimeout(timer)
  }, [filters, searchTerm, areaRange])

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6c727f]" size={18} />
          <Input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-[#cad0d9]"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border-[#cad0d9]">
              <SlidersHorizontal size={18} />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 bg-[#d85151] text-white">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter Properties</SheetTitle>
              <SheetDescription>Narrow down your search with specific filters</SheetDescription>
            </SheetHeader>

            <div className="py-6 space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Property Type</h3>
                <div className="flex flex-wrap gap-2">
                  {propertyTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => togglePropertyType(type.value)}
                      className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${
                        filters.propertyType?.includes(type.value)
                          ? "bg-white border-[#d85151] text-[#d85151]"
                          : "bg-[#f5f7fa] border-[#e0e5eb] text-[#6c727f]"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Bedrooms</h3>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={`bed-${num}`}
                      type="button"
                      onClick={() => toggleBedrooms(num)}
                      className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${
                        filters.bedrooms?.includes(num)
                          ? "bg-white border-[#d85151] text-[#d85151]"
                          : "bg-[#f5f7fa] border-[#e0e5eb] text-[#6c727f]"
                      }`}
                    >
                      {num}+
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Bathrooms</h3>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={`bath-${num}`}
                      type="button"
                      onClick={() => toggleBathrooms(num)}
                      className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${
                        filters.bathrooms?.includes(num)
                          ? "bg-white border-[#d85151] text-[#d85151]"
                          : "bg-[#f5f7fa] border-[#e0e5eb] text-[#6c727f]"
                      }`}
                    >
                      {num}+
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">
                  Area Range: {areaRange[0]} - {areaRange[1]} m²
                </h3>
                <Slider
                  defaultValue={areaRange}
                  min={0}
                  max={300}
                  step={5}
                  value={areaRange}
                  onValueChange={(value) => setAreaRange(value as [number, number])}
                  className="my-6"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Amenities</h3>
                <div className="grid grid-cols-2 gap-y-2">
                  {amenitiesList.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <button type="button" onClick={() => toggleAmenity(item.id)} className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center ${
                            filters.amenities?.includes(item.id) ? "bg-[#d85151] border-[#d85151]" : "border-[#cad0d9]"
                          }`}
                        >
                          {filters.amenities?.includes(item.id) && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className="text-[#111827]">{item.label}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Infrastructure</h3>
                <div className="grid grid-cols-2 gap-y-2">
                  {infrastructureList.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleInfrastructure(item.id)}
                        className="flex items-center gap-2"
                      >
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center ${
                            filters.infrastructure?.includes(item.id)
                              ? "bg-[#d85151] border-[#d85151]"
                              : "border-[#cad0d9]"
                          }`}
                        >
                          {filters.infrastructure?.includes(item.id) && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className="text-[#111827]">{item.label}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <SheetFooter className="flex flex-row justify-between sm:justify-between gap-2">
              <Button type="button" variant="outline" onClick={clearFilters}>
                Clear All
              </Button>
              <SheetClose asChild>
                <Button onClick={handleSearch}>Apply Filters</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active filters display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.search && (
            <Badge variant="outline" className="flex items-center gap-1 bg-white">
              Search: {filters.search}
              <button onClick={() => removeFilter("search")} className="ml-1">
                <X size={14} />
              </button>
            </Badge>
          )}

          {filters.propertyType?.map((type) => (
            <Badge key={type} variant="outline" className="flex items-center gap-1 bg-white">
              Type: {propertyTypes.find((t) => t.value === type)?.label}
              <button onClick={() => removeFilter("propertyType", type)} className="ml-1">
                <X size={14} />
              </button>
            </Badge>
          ))}

          {filters.bedrooms?.map((count) => (
            <Badge key={`bed-${count}`} variant="outline" className="flex items-center gap-1 bg-white">
              {count}+ Bedrooms
              <button onClick={() => removeFilter("bedrooms", count.toString())} className="ml-1">
                <X size={14} />
              </button>
            </Badge>
          ))}

          {filters.bathrooms?.map((count) => (
            <Badge key={`bath-${count}`} variant="outline" className="flex items-center gap-1 bg-white">
              {count}+ Bathrooms
              <button onClick={() => removeFilter("bathrooms", count.toString())} className="ml-1">
                <X size={14} />
              </button>
            </Badge>
          ))}

          {(filters.minArea || filters.maxArea) && (
            <Badge variant="outline" className="flex items-center gap-1 bg-white">
              Area: {filters.minArea || 0} - {filters.maxArea || 300} m²
              <button
                onClick={() => {
                  removeFilter("minArea")
                  removeFilter("maxArea")
                }}
                className="ml-1"
              >
                <X size={14} />
              </button>
            </Badge>
          )}

          {filters.amenities?.map((amenity) => (
            <Badge key={amenity} variant="outline" className="flex items-center gap-1 bg-white">
              {amenitiesList.find((a) => a.id === amenity)?.label}
              <button onClick={() => removeFilter("amenities", amenity)} className="ml-1">
                <X size={14} />
              </button>
            </Badge>
          ))}

          {filters.infrastructure?.map((item) => (
            <Badge key={item} variant="outline" className="flex items-center gap-1 bg-white">
              {infrastructureList.find((i) => i.id === item)?.label}
              <button onClick={() => removeFilter("infrastructure", item)} className="ml-1">
                <X size={14} />
              </button>
            </Badge>
          ))}

          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-[#6c727f] h-7">
            Clear All
          </Button>
        </div>
      )}

      <div className="text-sm text-[#6c727f]">
        {totalCount} {totalCount === 1 ? "property" : "properties"} found
      </div>
    </div>
  )
}
