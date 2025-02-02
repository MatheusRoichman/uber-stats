import { type ChangeEventHandler, useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import type { Ride } from '@/app/entities/ride';

import { listRides } from '@/app/services/rides/list-rides';

import { toast } from '@/view/hooks/use-toast';

export function useUploadRides() {
  const [rides, setRides] = useState<Ride[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

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
            if (error instanceof Error) {
              toast({
                variant: 'destructive',
                title: error.message,
              });
            } else {
              toast({
                variant: 'destructive',
                title: 'An unexpected error occurred. Please try again.',
              });
            }

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

  return {
    rides,
    isLoading,
    handleFileUpload,
  };
}
