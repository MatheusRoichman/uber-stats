import type { Ride } from '@/app/entities/ride';

interface RideCardProps {
  ride: Ride;
}

const currencyCodeMapper: Record<string, string> = {
  'Brazilian Real': 'BRL',
  'US Dollar': 'USD',
  'Canadian Dollar': 'CAD',
  Euro: 'EUR',
};

const statusMapper: Record<string, string> = {
  rider_canceled: 'Rider canceled',
  driver_canceled: 'Driver canceled',
  completed: 'Completed',
};

export function RideCard({ ride }: RideCardProps) {
  const formattedCurrency = currencyCodeMapper[ride.fare_currency]
    ? ride.fare_amount.toLocaleString('en-US', {
        style: 'currency',
        currency: currencyCodeMapper[ride.fare_currency],
      })
    : `${ride.fare_amount} - ${ride.fare_currency}`;

  const displayedTime = ride.begin_trip_time
    ? ride.begin_trip_time.toLocaleString()
    : `Requested at ${ride.request_time.toLocaleString()}`;

  return (
    <li className="flex flex-col gap-2 rounded-md border bg-background p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground">
      <p className="text-lg font-bold font-title">
        {ride.begintrip_address || 'Unknown address'}
      </p>

      <p className="mt-auto">{displayedTime}</p>
      <p className="first-letter:capitalize">
        {ride.product_type} · {statusMapper[ride.status] || ride.status}
        {ride.distance > 0 && ` · ${ride.distance} km`}
      </p>

      <p className="font-semibold text-lg">{formattedCurrency}</p>
    </li>
  );
}
