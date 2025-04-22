"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Check, ChevronRight, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createProperty, type PropertyFormData } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"

export default function PropertyForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedBedrooms, setSelectedBedrooms] = useState<number>(3)
  const [selectedBathrooms, setSelectedBathrooms] = useState<number>(2)
  const [selectedParking, setSelectedParking] = useState<number>(1)
  const [ownershipStatus, setOwnershipStatus] = useState<string>("secondary")
  const [formError, setFormError] = useState<string | null>(null)

  const [formData, setFormData] = useState<Partial<PropertyFormData>>({
    title: "",
    property_type: "apartment",
    ownership_status: "secondary",
    total_floors: 16,
    floor_number: 12,
    total_area: 120,
    living_area: 86,
    kitchen_area: 25,
    bedrooms: 3,
    bathrooms: 2,
    parking_spots: 1,
    description: "",
    amenities: {
      tv_set: true,
      air_conditioning: true,
      drying_machine: true,
      fireplace: false,
      security_cameras: false,
      washing_machine: true,
      separate_workplace: true,
      closet: false,
      shower_cabin: true,
      balcony: true,
      kitchen: false,
      refrigerator: false,
      patio: false,
      whirlpool: false,
      bar: false,
    },
    infrastructure: {
      schools: true,
      kindergarten: true,
      underground: false,
      cinema_theater: false,
      parking_lot: true,
      sports_center: false,
      beauty_salon: true,
      restaurant_cafe: false,
      shop: false,
      shopping_center: true,
      bank: false,
      park_green_area: true,
    },
  })

  const amenities = [
    { id: "tv_set", label: "TV set", checked: formData.amenities?.tv_set },
    { id: "air_conditioning", label: "Air conditioning", checked: formData.amenities?.air_conditioning },
    { id: "drying_machine", label: "Drying machine", checked: formData.amenities?.drying_machine },
    { id: "fireplace", label: "Fireplace", checked: formData.amenities?.fireplace },
    { id: "security_cameras", label: "Security cameras", checked: formData.amenities?.security_cameras },
    { id: "washing_machine", label: "Washing machine", checked: formData.amenities?.washing_machine },
    { id: "separate_workplace", label: "Separate workplace", checked: formData.amenities?.separate_workplace },
    { id: "closet", label: "Closet", checked: formData.amenities?.closet },
    { id: "shower_cabin", label: "Shower cabin", checked: formData.amenities?.shower_cabin },
    { id: "balcony", label: "Balcony", checked: formData.amenities?.balcony },
    { id: "kitchen", label: "Kitchen", checked: formData.amenities?.kitchen },
    { id: "refrigerator", label: "Refrigerator", checked: formData.amenities?.refrigerator },
    { id: "patio", label: "Patio", checked: formData.amenities?.patio },
    { id: "whirlpool", label: "Whirlpool", checked: formData.amenities?.whirlpool },
    { id: "bar", label: "Bar", checked: formData.amenities?.bar },
  ]

  const infrastructure = [
    { id: "schools", label: "Schools", checked: formData.infrastructure?.schools },
    { id: "kindergarten", label: "Kindergarten", checked: formData.infrastructure?.kindergarten },
    { id: "underground", label: "Underground", checked: formData.infrastructure?.underground },
    { id: "cinema_theater", label: "Cinema / theater", checked: formData.infrastructure?.cinema_theater },
    { id: "parking_lot", label: "Parking lot", checked: formData.infrastructure?.parking_lot },
    { id: "sports_center", label: "Sports center", checked: formData.infrastructure?.sports_center },
    { id: "beauty_salon", label: "Beauty salon", checked: formData.infrastructure?.beauty_salon },
    { id: "restaurant_cafe", label: "Restaurant / cafe", checked: formData.infrastructure?.restaurant_cafe },
    { id: "shop", label: "Shop", checked: formData.infrastructure?.shop },
    { id: "shopping_center", label: "Shopping center", checked: formData.infrastructure?.shopping_center },
    { id: "bank", label: "Bank", checked: formData.infrastructure?.bank },
    { id: "park_green_area", label: "Park / green area", checked: formData.infrastructure?.park_green_area },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement

    if (type === "number") {
      setFormData({
        ...formData,
        [name]: Number.parseFloat(value) || 0,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleCheckboxChange = (category: "amenities" | "infrastructure", id: string, checked: boolean) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [id]: checked,
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError(null)

    try {
      // Update form data with selected values
      const completeFormData = {
        ...formData,
        bedrooms: selectedBedrooms,
        bathrooms: selectedBathrooms,
        parking_spots: selectedParking,
        ownership_status: ownershipStatus,
      } as PropertyFormData

      const result = await createProperty(completeFormData)

      if (result.error) {
        setFormError(result.error)
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Property listing created successfully!",
        })
        router.push("/properties")
      }
    } catch (error) {
      setFormError("An unexpected error occurred")
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
              <Link href="/properties" className="text-[#333d4c] hover:text-[#111827]">
                Properties
              </Link>
              <Link href="/properties/new" className="text-[#d85151] font-medium">
                Add Property
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-[#f5f7fa]">
              <Sun className="w-5 h-5 text-[#6c727f]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#cad0d9] overflow-hidden">
              <img src="/placeholder.svg?height=32&width=32" alt="User profile" width={32} height={32} />
            </div>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="max-w-7xl mx-auto py-8 px-6 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#111827]">
              <div className="w-5 h-5 rounded-full border border-[#d85151] flex items-center justify-center bg-[#d85151]">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span>Property type</span>
            </div>
            <div className="flex items-center gap-3 text-[#111827]">
              <div className="w-5 h-5 rounded-full border border-[#d85151] flex items-center justify-center bg-[#d85151]">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span>Location</span>
            </div>
            <div className="flex items-center gap-3 text-[#111827]">
              <div className="w-5 h-5 rounded-full border border-[#d85151] flex items-center justify-center bg-[#d85151]">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span>Photos and videos</span>
            </div>
            <div className="flex items-center gap-3 text-[#111827] font-medium">
              <div className="w-5 h-5 rounded-full border border-[#d85151] flex items-center justify-center bg-[#d85151]">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span>Property details</span>
            </div>
            <div className="flex items-center gap-3 text-[#6c727f]">
              <div className="w-5 h-5 rounded-full border border-[#cad0d9]"></div>
              <span>Price</span>
            </div>
            <div className="flex items-center gap-3 text-[#6c727f]">
              <div className="w-5 h-5 rounded-full border border-[#cad0d9]"></div>
              <span>Contact info</span>
            </div>
            <div className="flex items-center gap-3 text-[#6c727f]">
              <div className="w-5 h-5 rounded-full border border-[#cad0d9]"></div>
              <span>Ad promotion</span>
            </div>
          </div>

          <div className="space-y-8">
            <h1 className="text-2xl font-semibold text-[#111827]">Property details</h1>

            <div>
              <label className="block text-[#111827] text-sm font-medium mb-2">Property Title *</label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Modern Apartment in City Center"
                className="border-[#cad0d9]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`border rounded-lg p-4 bg-white cursor-pointer ${
                  ownershipStatus === "secondary" ? "border-[#d85151]" : "border-[#cad0d9]"
                }`}
                onClick={() => setOwnershipStatus("secondary")}
              >
                <div className="text-[#111827] font-medium mb-1">Secondary real estate</div>
                <div className="text-[#6c727f] text-sm">Ownership is already registered</div>
              </div>
              <div
                className={`border rounded-lg p-4 bg-white cursor-pointer ${
                  ownershipStatus === "primary" ? "border-[#d85151]" : "border-[#cad0d9]"
                }`}
                onClick={() => setOwnershipStatus("primary")}
              >
                <div className="text-[#111827] font-medium mb-1">Primary real estate</div>
                <div className="text-[#6c727f] text-sm">Ownership has not yet been formalized</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#111827] text-sm font-medium mb-2">Total floors *</label>
                <Input
                  type="number"
                  name="total_floors"
                  value={formData.total_floors}
                  onChange={handleInputChange}
                  placeholder="16"
                  className="border-[#cad0d9]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#111827] text-sm font-medium mb-2">Floor *</label>
                <Input
                  type="number"
                  name="floor_number"
                  value={formData.floor_number}
                  onChange={handleInputChange}
                  placeholder="12"
                  className="border-[#cad0d9]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[#111827] text-sm font-medium mb-2">Total area (sq.m) *</label>
                <Input
                  type="number"
                  name="total_area"
                  value={formData.total_area}
                  onChange={handleInputChange}
                  placeholder="120"
                  className="border-[#cad0d9]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#111827] text-sm font-medium mb-2">Living area (sq.m) *</label>
                <Input
                  type="number"
                  name="living_area"
                  value={formData.living_area}
                  onChange={handleInputChange}
                  placeholder="86"
                  className="border-[#cad0d9]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#111827] text-sm font-medium mb-2">Kitchen area (sq.m) *</label>
                <Input
                  type="number"
                  name="kitchen_area"
                  value={formData.kitchen_area}
                  onChange={handleInputChange}
                  placeholder="25"
                  className="border-[#cad0d9]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[#111827] text-sm font-medium mb-3">Bedrooms *</label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={`bed-${num}`}
                    type="button"
                    className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${
                      selectedBedrooms === num
                        ? "bg-white border-[#cad0d9] text-[#111827]"
                        : "bg-[#f5f7fa] border-[#e0e5eb] text-[#6c727f]"
                    }`}
                    onClick={() => setSelectedBedrooms(num)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-[#6c727f]"
                    >
                      <path
                        d="M3 21V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 11H21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 21H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[#111827] text-sm font-medium mb-3">Bathrooms *</label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={`bath-${num}`}
                    type="button"
                    className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${
                      selectedBathrooms === num
                        ? "bg-white border-[#cad0d9] text-[#111827]"
                        : "bg-[#f5f7fa] border-[#e0e5eb] text-[#6c727f]"
                    }`}
                    onClick={() => setSelectedBathrooms(num)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-[#6c727f]"
                    >
                      <path
                        d="M4 12H20C20.5523 12 21 12.4477 21 13V14C21 15.6569 19.6569 17 18 17H6C4.34315 17 3 15.6569 3 14V13C3 12.4477 3.44772 12 4 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 17V20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18 17V20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 12V4C17 3.44772 16.5523 3 16 3H14C13.4477 3 13 3.44772 13 4V12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[#111827] text-sm font-medium mb-3">Parking spots *</label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={`park-${num}`}
                    type="button"
                    className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${
                      selectedParking === num
                        ? "bg-white border-[#cad0d9] text-[#111827]"
                        : "bg-[#f5f7fa] border-[#e0e5eb] text-[#6c727f]"
                    }`}
                    onClick={() => setSelectedParking(num)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-[#6c727f]"
                    >
                      <path
                        d="M19 17H5V19H19V17Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 11H7L5 17H19L17 11Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 11L10 5H14L17 11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[#111827] font-medium mb-4">Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3">
                {amenities.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={item.id}
                      checked={item.checked}
                      onChange={(e) => handleCheckboxChange("amenities", item.id, e.target.checked)}
                      className="hidden"
                    />
                    <label htmlFor={item.id} className="flex items-center gap-2 cursor-pointer">
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center ${
                          item.checked ? "bg-[#d85151] border-[#d85151]" : "border-[#cad0d9]"
                        }`}
                      >
                        {item.checked && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-[#111827]">{item.label}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[#111827] font-medium mb-1">
                Infrastructure <span className="text-[#6c727f] font-normal text-sm">(up to 500 meters)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 mt-3">
                {infrastructure.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={item.id}
                      checked={item.checked}
                      onChange={(e) => handleCheckboxChange("infrastructure", item.id, e.target.checked)}
                      className="hidden"
                    />
                    <label htmlFor={item.id} className="flex items-center gap-2 cursor-pointer">
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center ${
                          item.checked ? "bg-[#d85151] border-[#d85151]" : "border-[#cad0d9]"
                        }`}
                      >
                        {item.checked && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-[#111827]">{item.label}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[#111827] text-sm font-medium mb-2">Description *</label>
              <p className="text-[#6c727f] text-sm mb-3">
                Here you can let your imagination run wild and describe the property in the best possible way!
              </p>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your property"
                className="min-h-[120px] border-[#cad0d9]"
                required
              />
            </div>

            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{formError}</div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6 border-t border-[#e0e5eb] flex justify-between">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-1.5 border-[#cad0d9] text-[#333d4c]"
            onClick={() => router.push("/properties")}
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-1.5 bg-[#111827] hover:bg-[#1d2735] text-white"
          >
            {isSubmitting ? "Saving..." : "Save Property"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
