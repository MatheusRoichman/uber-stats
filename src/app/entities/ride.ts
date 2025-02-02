export interface Ride {
  begin_trip_time?: Date
  begintrip_address?: string
  begintrip_lat: number
  begintrip_lng: number
  city: string
  distance: number
  dropoff_address: string
  dropoff_lat: number
  dropoff_lng: number
  dropoff_time?: Date
  fare_amount: number
  fare_currency: string
  product_type: string
  request_time: Date
  status: string
}