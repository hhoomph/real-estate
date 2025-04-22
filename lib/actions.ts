"use server"

import { createActionClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { PropertyFilters } from "@/components/property-search"

export type PropertyFormData = {
  title: string
  property_type: string
  ownership_status: string
  total_floors: number
  floor_number: number
  total_area: number
  living_area: number
  kitchen_area: number
  bedrooms: number
  bathrooms: number
  parking_spots: number
  description: string
  amenities: {
    tv_set: boolean
    air_conditioning: boolean
    drying_machine: boolean
    fireplace: boolean
    security_cameras: boolean
    washing_machine: boolean
    separate_workplace: boolean
    closet: boolean
    shower_cabin: boolean
    balcony: boolean
    kitchen: boolean
    refrigerator: boolean
    patio: boolean
    whirlpool: boolean
    bar: boolean
  }
  infrastructure: {
    schools: boolean
    kindergarten: boolean
    underground: boolean
    cinema_theater: boolean
    parking_lot: boolean
    sports_center: boolean
    beauty_salon: boolean
    restaurant_cafe: boolean
    shop: boolean
    shopping_center: boolean
    bank: boolean
    park_green_area: boolean
  }
}

export async function createProperty(formData: PropertyFormData) {
  const supabase = createActionClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to create a property listing" }
  }

  // Start a transaction by inserting the property listing
  const { data: property, error: propertyError } = await supabase
    .from("property_listings")
    .insert({
      title: formData.title,
      property_type: formData.property_type,
      ownership_status: formData.ownership_status,
      total_floors: formData.total_floors,
      floor_number: formData.floor_number,
      total_area: formData.total_area,
      living_area: formData.living_area,
      kitchen_area: formData.kitchen_area,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      parking_spots: formData.parking_spots,
      description: formData.description,
      user_id: user.id,
    })
    .select()
    .single()

  if (propertyError || !property) {
    return { error: propertyError?.message || "Failed to create property listing" }
  }

  // Insert amenities
  const { error: amenitiesError } = await supabase.from("property_amenities").insert({
    property_id: property.id,
    ...formData.amenities,
  })

  if (amenitiesError) {
    return { error: amenitiesError.message }
  }

  // Insert infrastructure
  const { error: infrastructureError } = await supabase.from("property_infrastructure").insert({
    property_id: property.id,
    ...formData.infrastructure,
  })

  if (infrastructureError) {
    return { error: infrastructureError.message }
  }

  revalidatePath("/properties")
  return { success: true, propertyId: property.id }
}

export async function getProperties(filters?: PropertyFilters) {
  const supabase = createActionClient()

  // Start building the query
  let query = supabase.from("property_listings").select(`
      *,
      property_amenities(*),
      property_infrastructure(*),
      property_images(*)
    `)

  // Apply text search filter
  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  // Apply property type filter
  if (filters?.propertyType && filters.propertyType.length > 0) {
    query = query.in("property_type", filters.propertyType)
  }

  // Apply bedrooms filter
  if (filters?.bedrooms && filters.bedrooms.length > 0) {
    // Find the minimum value to filter "at least X bedrooms"
    const minBedrooms = Math.min(...filters.bedrooms)
    query = query.gte("bedrooms", minBedrooms)
  }

  // Apply bathrooms filter
  if (filters?.bathrooms && filters.bathrooms.length > 0) {
    // Find the minimum value to filter "at least X bathrooms"
    const minBathrooms = Math.min(...filters.bathrooms)
    query = query.gte("bathrooms", minBathrooms)
  }

  // Apply area range filters
  if (filters?.minArea) {
    query = query.gte("total_area", filters.minArea)
  }

  if (filters?.maxArea) {
    query = query.lte("total_area", filters.maxArea)
  }

  // Apply amenities filters
  if (filters?.amenities && filters.amenities.length > 0) {
    // We need to join with property_amenities and add conditions
    // This is handled by the nested select above, but we'll filter after fetching
  }

  // Apply infrastructure filters
  if (filters?.infrastructure && filters.infrastructure.length > 0) {
    // Similar to amenities, we'll filter after fetching
  }

  // Execute the query
  const { data: properties, error, count } = await query.order("created_at", { ascending: false })

  if (error) {
    return { error: error.message }
  }

  // Post-process to filter by amenities and infrastructure
  let filteredProperties = properties

  if (filters?.amenities && filters.amenities.length > 0) {
    filteredProperties = filteredProperties.filter((property) => {
      const amenities = property.property_amenities[0]
      return filters.amenities!.every((amenity) => amenities && amenities[amenity as keyof typeof amenities])
    })
  }

  if (filters?.infrastructure && filters.infrastructure.length > 0) {
    filteredProperties = filteredProperties.filter((property) => {
      const infrastructure = property.property_infrastructure[0]
      return filters.infrastructure!.every(
        (item) => infrastructure && infrastructure[item as keyof typeof infrastructure],
      )
    })
  }

  return { properties: filteredProperties, count: filteredProperties.length }
}

export async function getPropertyById(id: string) {
  const supabase = createActionClient()

  const { data: property, error } = await supabase
    .from("property_listings")
    .select(`
      *,
      property_amenities(*),
      property_infrastructure(*),
      property_images(*)
    `)
    .eq("id", id)
    .single()

  if (error) {
    return { error: error.message }
  }

  return { property }
}

export async function deleteProperty(id: string) {
  const supabase = createActionClient()

  // Property amenities, infrastructure, and images will be deleted automatically
  // due to the ON DELETE CASCADE constraint
  const { error } = await supabase.from("property_listings").delete().eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/properties")
  return { success: true }
}

export async function parseSearchParams(searchParams: {
  [key: string]: string | string[] | undefined
}): Promise<PropertyFilters> {
  const filters: PropertyFilters = {}

  if (searchParams.search) {
    filters.search = searchParams.search as string
  }

  if (searchParams.propertyType) {
    filters.propertyType = (searchParams.propertyType as string).split(",")
  }

  if (searchParams.bedrooms) {
    filters.bedrooms = (searchParams.bedrooms as string).split(",").map(Number)
  }

  if (searchParams.bathrooms) {
    filters.bathrooms = (searchParams.bathrooms as string).split(",").map(Number)
  }

  if (searchParams.minArea) {
    filters.minArea = Number(searchParams.minArea)
  }

  if (searchParams.maxArea) {
    filters.maxArea = Number(searchParams.maxArea)
  }

  if (searchParams.amenities) {
    filters.amenities = (searchParams.amenities as string).split(",")
  }

  if (searchParams.infrastructure) {
    filters.infrastructure = (searchParams.infrastructure as string).split(",")
  }

  return filters
}
