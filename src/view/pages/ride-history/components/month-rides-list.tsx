import type { Ride } from '@/app/entities/ride';

import { formatMonthAndYear } from '@/app/utils/format-month-and-year';

import { RideCard } from './ride-card';
import { useState } from 'react';
import { Button } from '@/view/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MonthRidesListProps {
  month: string;
  rides: Ride[];
}

export function MonthRidesList({ month, rides }: MonthRidesListProps) {
  const [showFullList, setShowFullList] = useState(false);

  const list = showFullList ? rides : rides.slice(0, 6);

  return (
    <div className='w-full'>
      <h2 className="font-bold text-2xl font-title">
        {formatMonthAndYear(month)}
      </h2>

      <ul className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {list.map((ride, index) => {
          const idx = index;

          return <RideCard key={`RIDE_${idx}`} ride={ride} />;
        })}
      </ul>

      {rides.length > 6 && (
        <Button
          variant="ghost"
          className="mt-4 mx-auto"
          onClick={() => setShowFullList(!showFullList)}
        >
          {showFullList ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}

          <span>{showFullList ? 'Show less' : 'Show more'}</span>
        </Button>
      )}
    </div>
  );
}
