import type { Ride } from '@/app/entities/ride';

import { formatFareAmount } from '@/app/utils/format-fare-amount';
import { formatMonthAndYear } from '@/app/utils/format-month-and-year';
import { groupRidesByMonthAndYear } from '@/app/utils/group-rides-by-month-and-year';

export function getSpendingStats(rides: Ride[] | null) {
  if (!rides?.length)
    return {
      total: 0,
      cancellationFees: 0,
      monthlyAverage: 0,
      monthWithMostSpending: 'Unknown',
      spendingByMonth: {} as Record<string, number>,
    };

  const stats = {
    total: 0,
    cancellationFees: 0,
    monthlyAverage: 0,
    monthWithMostSpending: 'Unknown',
    spendingByMonth: {} as Record<string, number>,
  };

  let maxSpending = 0;
  let monthWithMostSpending = '';

  const groupedRides = Object.entries(groupRidesByMonthAndYear(rides));

  for (let i = 0; i < groupedRides.length; i++) {
    let monthlyTotal = 0;

    const [monthAndYear, rides] = groupedRides[i];

    for (let j = 0; j < rides.length; j++) {
      const ride = rides[j];

      stats.total += ride.fare_amount;

      if (ride.status !== 'completed' && ride.fare_amount > 0) {
        stats.cancellationFees += ride.fare_amount;
      }

      monthlyTotal += ride.fare_amount;

      stats.spendingByMonth[monthAndYear] = (stats.spendingByMonth[monthAndYear] || 0) + ride.fare_amount;
    }

    if (monthlyTotal > maxSpending) {
      maxSpending = monthlyTotal;
      monthWithMostSpending = monthAndYear;
    }
  }

  stats.monthlyAverage =
    stats.total / (Object.keys(groupedRides).length || 1);

  if (monthWithMostSpending) {
    const formattedMonth = formatMonthAndYear(monthWithMostSpending);
    const formattedAmount = formatFareAmount(maxSpending, rides[0].fare_currency);
    
    stats.monthWithMostSpending = `${formattedMonth}, ${formattedAmount}`;
  }

  return stats;
}
