import { useMemo } from 'react';

import type { Ride } from '@/app/entities/ride';

import { groupRidesByMonthAndYear } from '@/app/utils/group-rides-by-month-and-year';

import { MonthRidesList } from './month-rides-list';

interface RidesListProps {
  rides: Ride[];
}

export function RidesList({ rides }: RidesListProps) {
  const ridesByMonthAndYear = useMemo(
    () => groupRidesByMonthAndYear(rides),
    [rides],
  );

  return (
    <div className="space-y-4">
      {Object.entries(ridesByMonthAndYear).map(([monthAndYear, rides]) => (
        <MonthRidesList key={monthAndYear} month={monthAndYear} rides={rides} />
      ))}
    </div>
  );
}
