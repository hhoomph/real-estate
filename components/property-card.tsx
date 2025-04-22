"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Bed, Bath, Car, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PropertyCardProps {
  property: any
  onDelete?: (id: string) => void
}

export function PropertyCard({ property, onDelete }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-lg border border-[#e0e5eb] overflow-hidden">
      <div className="aspect-video bg-[#f5f7fa] relative">
        <div className="absolute top-2 right-2 bg-[#d85151] text-white text-xs font-medium px-2 py-1 rounded">
          {property.ownership_status === "primary" ? "Primary" : "Secondary"}
        </div>
        <div className="w-full h-full flex items-center justify-center text-[#6c727f]">
          <Home className="w-12 h-12 opacity-30" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2 line-clamp-1">{property.title}</h3>
        <div className="flex items-center gap-4 text-sm text-[#6c727f] mb-3">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Car className="w-4 h-4" />
            <span>{property.parking_spots}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-[#6c727f]">
            Floor {property.floor_number} of {property.total_floors}
          </div>
          <div className="text-sm font-medium">{property.total_area} m²</div>
        </div>
        <div className="text-xs text-[#9ca3af] mb-4">
          Added {formatDistanceToNow(new Date(property.created_at), { addSuffix: true })}
        </div>
        <div className="flex gap-2">
          <Link href={`/properties/${property.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          {onDelete && (
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 border-red-200 hover:bg-red-50"
              onClick={() => onDelete(property.id)}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
