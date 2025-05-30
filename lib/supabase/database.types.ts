export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      property_listings: {
        Row: {
          id: string
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
          description: string | null
          created_at: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          id?: string
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
          description?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          id?: string
          title?: string
          property_type?: string
          ownership_status?: string
          total_floors?: number
          floor_number?: number
          total_area?: number
          living_area?: number
          kitchen_area?: number
          bedrooms?: number
          bathrooms?: number
          parking_spots?: number
          description?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string | null
        }
      }
      property_amenities: {
        Row: {
          id: string
          property_id: string
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
        Insert: {
          id?: string
          property_id: string
          tv_set?: boolean
          air_conditioning?: boolean
          drying_machine?: boolean
          fireplace?: boolean
          security_cameras?: boolean
          washing_machine?: boolean
          separate_workplace?: boolean
          closet?: boolean
          shower_cabin?: boolean
          balcony?: boolean
          kitchen?: boolean
          refrigerator?: boolean
          patio?: boolean
          whirlpool?: boolean
          bar?: boolean
        }
        Update: {
          id?: string
          property_id?: string
          tv_set?: boolean
          air_conditioning?: boolean
          drying_machine?: boolean
          fireplace?: boolean
          security_cameras?: boolean
          washing_machine?: boolean
          separate_workplace?: boolean
          closet?: boolean
          shower_cabin?: boolean
          balcony?: boolean
          kitchen?: boolean
          refrigerator?: boolean
          patio?: boolean
          whirlpool?: boolean
          bar?: boolean
        }
      }
      property_infrastructure: {
        Row: {
          id: string
          property_id: string
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
        Insert: {
          id?: string
          property_id: string
          schools?: boolean
          kindergarten?: boolean
          underground?: boolean
          cinema_theater?: boolean
          parking_lot?: boolean
          sports_center?: boolean
          beauty_salon?: boolean
          restaurant_cafe?: boolean
          shop?: boolean
          shopping_center?: boolean
          bank?: boolean
          park_green_area?: boolean
        }
        Update: {
          id?: string
          property_id?: string
          schools?: boolean
          kindergarten?: boolean
          underground?: boolean
          cinema_theater?: boolean
          parking_lot?: boolean
          sports_center?: boolean
          beauty_salon?: boolean
          restaurant_cafe?: boolean
          shop?: boolean
          shopping_center?: boolean
          bank?: boolean
          park_green_area?: boolean
        }
      }
      property_images: {
        Row: {
          id: string
          property_id: string
          image_url: string
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          image_url: string
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          image_url?: string
          is_primary?: boolean
          created_at?: string
        }
      }
    }
  }
}
