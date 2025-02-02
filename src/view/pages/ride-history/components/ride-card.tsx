import type { Ride } from '@/app/entities/ride';

import { formatFareAmount } from '@/app/utils/format-fare-amount';

interface RideCardProps {
  ride: Ride;
}

const statusMapper: Record<string, string> = {
  rider_canceled: 'Rider canceled',
  driver_canceled: 'Driver canceled',
  completed: 'Completed',
};

export function RideCard({ ride }: RideCardProps) {
  const formattedFareAmount = formatFareAmount(ride.fare_amount, ride.fare_currency);

  const displayedStartTime = ride.begin_trip_time
    ? ride.begin_trip_time.toLocaleString()
    : `Requested at ${ride.request_time.toLocaleString()}`;

  return (
    <li className="flex flex-col gap-2 rounded-md border bg-background p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground">
      <p className="text-lg font-bold font-title">
        {ride.begintrip_address || 'Unknown address'}
      </p>

      <p className="mt-auto">{displayedStartTime}</p>
      <p className="first-letter:capitalize">
        {ride.product_type} · {statusMapper[ride.status] || ride.status}
        {ride.distance > 0 && ` · ${ride.distance} km`}
      </p>

      <p className="font-semibold text-lg">{formattedFareAmount}</p>
    </li>
  );
}
