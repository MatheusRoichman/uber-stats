import { useRef } from 'react';
import { Info, Loader2, Upload } from 'lucide-react';

import { Button } from '@/view/components/ui/button';

import { DataRetrievalInstructionsTooltip } from '@/view/components/data-retrieval-instructions-tooltip';

import { useUploadRides } from '../../hooks/use-upload-rides';

import { RidesList } from './components/rides-list';

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

              <div className="flex items-center gap-4">
                <Button onClick={() => uploadInputRef.current?.click()}>
                  {!isLoading && <Upload className="size-4" />}
                  {isLoading && <Loader2 className="animate-spin size-4" />}
                  <span className="ml-2 font-medium">Upload CSV</span>
                </Button>

                <DataRetrievalInstructionsTooltip>
                  <Info className="size-5 text-blue-700 cursor-pointer" />
                </DataRetrievalInstructionsTooltip>
              </div>
            </>
          )}

          {rides && <RidesList rides={rides} />}
        </div>
      </div>
    </section>
  );
}
