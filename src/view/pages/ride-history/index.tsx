import { type ChangeEventHandler, useCallback, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, Upload } from 'lucide-react';

import type { Ride } from '@/app/entities/ride';

import { listRides } from '@/app/services/rides/list-rides';

import { Button } from '@/view/components/button';

import { RidesList } from './components/rides-list';

export function RideHistory() {
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const [rides, setRides] = useState<Ride[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setIsLoading(true);

      const file = e.target.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const content = e.target?.result;

          if (!content || typeof content !== 'string') {
            setIsLoading(false);

            return;
          }

          try {
            const rides = await listRides({
              csvContent: content,
              queryClient,
            });

            setRides(rides);
          } catch (error) {
            console.error(error);

            setRides(null);
          } finally {
            setIsLoading(false);
          }
        };

        reader.readAsText(file);
      }
    },
    [queryClient],
  );

  return (
    <section className="p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-bold text-4xl font-title">Ride History</h1>

        <div className="mt-4">
          {!rides?.length && (
            <>
              <input
                ref={uploadInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileUpload}
              />

              <Button onClick={() => uploadInputRef.current?.click()}>
                {!isLoading && <Upload className="size-4" />}
                {isLoading && <Loader2 className="animate-spin size-4" />}
                <span className="ml-2 font-medium">Upload CSV</span>
              </Button>
            </>
          )}

          {rides && <RidesList rides={rides} />}
        </div>
      </div>
    </section>
  );
}
