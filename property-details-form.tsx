"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Check, ChevronDown, ChevronRight, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function PropertyDetailsForm() {
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(3)
  const [selectedBathrooms, setSelectedBathrooms] = useState<number | null>(2)
  const [selectedParking, setSelectedParking] = useState<number | null>(1)

  const amenities = [
    { id: "tv", label: "TV set", checked: true },
    { id: "air", label: "Air conditioning", checked: true },
    { id: "drying", label: "Drying machine", checked: true },
    { id: "fireplace", label: "Fireplace", checked: false },
    { id: "security", label: "Security cameras", checked: false },
    { id: "washing", label: "Washing machine", checked: true },
    { id: "workplace", label: "Separate workplace", checked: true },
    { id: "closet", label: "Closet", checked: false },
    { id: "shower", label: "Shower cabin", checked: true },
    { id: "balcony", label: "Balcony", checked: true },
    { id: "kitchen", label: "Kitchen", checked: false },
    { id: "refrigerator", label: "Refrigerator", checked: false },
    { id: "patio", label: "Patio", checked: false },
    { id: "whirlpool", label: "Whirlpool", checked: false },
    { id: "bar", label: "Bar", checked: false },
  ]

  const infrastructure = [
    { id: "schools", label: "Schools", checked: true },
    { id: "kindergarten", label: "Kindergarten", checked: true },
    { id: "underground", label: "Underground", checked: false },
    { id: "cinema", label: "Cinema / theater", checked: false },
    { id: "parking", label: "Parking lot", checked: true },
    { id: "sports", label: "Sports center", checked: false },
    { id: "beauty", label: "Beauty salon", checked: true },
    { id: "restaurant", label: "Restaurant / cafe", checked: false },
    { id: "shop", label: "Shop", checked: false },
    { id: "shopping", label: "Shopping center", checked: true },
    { id: "bank", label: "Bank", checked: false },
    { id: "park", label: "Park / green area", checked: true },
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
              <Link href="#" className="text-[#333d4c] hover:text-[#111827]">
                Buy
              </Link>
              <Link href="#" className="text-[#333d4c] hover:text-[#111827]">
                Sell
              </Link>
              <Link href="#" className="text-[#333d4c] hover:text-[#111827]">
                Rent
              </Link>
              <div className="flex items-center gap-1">
                <Link href="#" className="text-[#333d4c] hover:text-[#111827]">
                  New buildings
                </Link>
                <ChevronDown className="w-4 h-4 text-[#6c727f]" />
              </div>
              <Link href="#" className="text-[#333d4c] hover:text-[#111827]">
                Top agents
              </Link>
              <Link href="#" className="text-[#333d4c] hover:text-[#111827]">
                Help center
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-[#f5f7fa]">
              <Sun className="w-5 h-5 text-[#6c727f]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#cad0d9] overflow-hidden">
              <Image src="/placeholder.svg?height=32&width=32" alt="User profile" width={32} height={32} />
            </div>
          </div>
        </div>
      </header>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[#cad0d9] rounded-lg p-4 bg-white">
              <div className="text-[#111827] font-medium mb-1">Secondary real estate</div>
              <div className="text-[#6c727f] text-sm">Ownership is already registered</div>
            </div>
            <div className="border border-[#e0e5eb] rounded-lg p-4 bg-white">
              <div className="text-[#111827] font-medium mb-1">Primary real estate</div>
              <div className="text-[#6c727f] text-sm">Ownership has not yet been formalized</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#111827] text-sm font-medium mb-2">Total floors *</label>
              <Input type="number" placeholder="16" defaultValue="16" className="border-[#cad0d9]" />
            </div>
            <div>
              <label className="block text-[#111827] text-sm font-medium mb-2">Floor *</label>
              <Input type="number" placeholder="12" defaultValue="12" className="border-[#cad0d9]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[#111827] text-sm font-medium mb-2">Total area *</label>
              <Input type="text" placeholder="120 sq.m" defaultValue="120 sq.m" className="border-[#cad0d9]" />
            </div>
            <div>
              <label className="block text-[#111827] text-sm font-medium mb-2">Living area *</label>
              <Input type="text" placeholder="86 sq.m" defaultValue="86 sq.m" className="border-[#cad0d9]" />
            </div>
            <div>
              <label className="block text-[#111827] text-sm font-medium mb-2">Kitchen area *</label>
              <Input type="text" placeholder="25 sq.m" defaultValue="25 sq.m" className="border-[#cad0d9]" />
            </div>
          </div>

          <div>
            <label className="block text-[#111827] text-sm font-medium mb-3">Bedrooms *</label>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${
                  selectedBedrooms === null
                    ? "bg-white border-[#cad0d9] text-[#111827]"
                    : "bg-[#f5f7fa] border-[#e0e5eb] text-[#6c727f]"
                }`}
                onClick={() => setSelectedBedrooms(null)}
              >
                Any
              </button>
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={`bed-${num}`}
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
              <button
                className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${
                  selectedBathrooms === null
                    ? "bg-white border-[#cad0d9] text-[#111827]"
                    : "bg-[#f5f7fa] border-[#e0e5eb] text-[#6c727f]"
                }`}
                onClick={() => setSelectedBathrooms(null)}
              >
                Any
              </button>
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={`bath-${num}`}
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
              <button
                className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${
                  selectedParking === null
                    ? "bg-white border-[#cad0d9] text-[#111827]"
                    : "bg-[#f5f7fa] border-[#e0e5eb] text-[#6c727f]"
                }`}
                onClick={() => setSelectedParking(null)}
              >
                Any
              </button>
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={`park-${num}`}
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
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center ${
                      item.checked ? "bg-[#d85151] border-[#d85151]" : "border-[#cad0d9]"
                    }`}
                  >
                    {item.checked && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-[#111827]">{item.label}</span>
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
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center ${
                      item.checked ? "bg-[#d85151] border-[#d85151]" : "border-[#cad0d9]"
                    }`}
                  >
                    {item.checked && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-[#111827]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[#111827] text-sm font-medium mb-2">Description *</label>
            <p className="text-[#6c727f] text-sm mb-3">
              Here you can let your imagination run wild and describe the property in the best possible way!
            </p>
            <Textarea placeholder="Describe your property" className="min-h-[120px] border-[#cad0d9]" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-[#e0e5eb] flex justify-between">
        <Button variant="outline" className="flex items-center gap-1.5 border-[#cad0d9] text-[#333d4c]">
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back
        </Button>
        <Button className="flex items-center gap-1.5 bg-[#111827] hover:bg-[#1d2735] text-white">
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
