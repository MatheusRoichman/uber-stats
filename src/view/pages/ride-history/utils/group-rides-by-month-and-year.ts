import type { Ride } from '@/app/entities/ride';

interface GroupRidesByMonthAndYearOptions {
  sort?: 'asc' | 'desc';
}

export function groupRidesByMonthAndYear(
  rides: Ride[],
  options: GroupRidesByMonthAndYearOptions = {},
): Record<string, Ride[]> {
  const ridesByMonth: Record<string, Ride[]> = {};
  const sort = options.sort || 'desc';

  for (const ride of rides) {
    const date = new Date(ride.request_time);
    const monthYearKey = `${String(date.getMonth() + 1)}/${date.getFullYear()}`;

    if (!ridesByMonth[monthYearKey]) {
      ridesByMonth[monthYearKey] = [];
    }
    ridesByMonth[monthYearKey].push(ride);
  }

  for (const key in ridesByMonth) {
    ridesByMonth[key].sort((a, b) => {
      const dateA = new Date(a.request_time);
      const dateB = new Date(b.request_time);

      return sort === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
  }

  return Object.keys(ridesByMonth)
    .sort((a, b) => {
      const [monthA, yearA] = a.split('/');
      const [monthB, yearB] = b.split('/');

      if (yearA === yearB) {
        return sort === 'asc'
          ? Number(monthA) - Number(monthB)
          : Number(monthB) - Number(monthA);
      }

      return sort === 'asc'
        ? Number(yearA) - Number(yearB)
        : Number(yearB) - Number(yearA);
    })
    .reduce(
      (accumulator, key) => {
        accumulator[key] = ridesByMonth[key];
        return accumulator;
      },
      {} as Record<string, Ride[]>,
    );
}
