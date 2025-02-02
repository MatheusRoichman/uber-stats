import { useRef } from 'react';
import { Loader2, Upload } from 'lucide-react';

import { Button } from '@/view/components/ui/button';

import { RidesList } from './components/rides-list';
import { useUploadRides } from './hooks/use-upload-rides';

export function RideHistory() {
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const { rides, isLoading, handleFileUpload } = useUploadRides();

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
