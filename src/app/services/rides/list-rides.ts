import type { QueryClient } from '@tanstack/react-query';

import { parse } from 'papaparse';

import type { Ride } from '@/app/entities/ride';

import { getAddressFromCoords } from '../address/get-address-from-coords';

interface ListRidesParams {
  csvContent: string;
  queryClient: QueryClient;
}

type RawCsvRow = Record<string, string | number | boolean | null>;

function mapCsvRowToRide(row: RawCsvRow): Ride {
  return {
    city: (row.city_name ?? row.city) as string,
    fare_currency: (row.currency_code ?? row.fare_currency) as string,
    request_time: new Date((row.request_timestamp_local ?? row.request_time) as string),
    begin_trip_time: (row.begintrip_timestamp_local ?? row.begin_trip_time)
      ? new Date((row.begintrip_timestamp_local ?? row.begin_trip_time) as string)
      : undefined,
    dropoff_time: (row.dropoff_timestamp_local ?? row.dropoff_time)
      ? new Date((row.dropoff_timestamp_local ?? row.dropoff_time) as string)
      : undefined,
    distance: Math.round(((row.trip_distance_miles ?? row.distance) as number) * 1.60934 * 100) / 100,
    product_type: (row.product_type_name ?? row.product_type) as string,
    status: row.status as string,
    fare_amount: row.fare_amount as number,
    begintrip_address: undefined,
    dropoff_address: row.dropoff_address as string,
    begintrip_lat: row.begintrip_lat as number,
    begintrip_lng: row.begintrip_lng as number,
    dropoff_lat: row.dropoff_lat as number,
    dropoff_lng: row.dropoff_lng as number,
  };
}

export async function listRides({ csvContent, queryClient }: ListRidesParams) {
  try {
    const parseResult = parse<RawCsvRow>(csvContent, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });

    const rides = parseResult.data.map(mapCsvRowToRide);

    const addressPromises = rides.map(async (ride) => {
      try {
        return await queryClient.fetchQuery({
          queryKey: ['get-address', ride.begintrip_lat, ride.begintrip_lng],
          queryFn: () =>
            getAddressFromCoords({
              lat: ride.begintrip_lat,
              lng: ride.begintrip_lng,
            }),
          staleTime: 1000 * 60 * 60 * 24 * 14, // 2 weeks
        });
      } catch {
        return ride.dropoff_address || 'Unknown address';
      }
    });

    const addresses = await Promise.all(addressPromises);

    for (let i = 0; i < rides.length; i++) {
      rides[i].begintrip_address = addresses[i];
    }

    return rides;
  } catch {
    throw new Error(
      'Failed to read the rides from the CSV file. Please try again.',
    );
  }
}
