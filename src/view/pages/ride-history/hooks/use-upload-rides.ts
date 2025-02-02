import { type ChangeEventHandler, useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import type { Ride } from '@/app/entities/ride';

import { listRides } from '@/app/services/rides/list-rides';

import { toast } from '@/view/hooks/use-toast';

interface RidesState {
  rides: Ride[] | null;
  isLoading: boolean;
}

export function useUploadRides() {
  const [ridesState, setRidesState] = useState<RidesState>({
    rides: null,
    isLoading: false,
  });

  const queryClient = useQueryClient();

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setRidesState(prev => ({ ...prev, isLoading: true }));

      const file = e.target.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const content = e.target?.result;

          if (!content || typeof content !== 'string') {
            setRidesState(prev => ({ ...prev, isLoading: false }));

            return;
          }

          try {
            const rides = await listRides({
              csvContent: content,
              queryClient,
            });

            setRidesState(prev => ({ ...prev, rides, isLoading: false }));
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

            setRidesState(prev => ({ ...prev, rides: null, isLoading: false }));
          }
        };

        reader.readAsText(file);
      }
    },
    [queryClient],
  );

  return {
    rides: ridesState.rides,
    isLoading: ridesState.isLoading,
    handleFileUpload,
  };
}
