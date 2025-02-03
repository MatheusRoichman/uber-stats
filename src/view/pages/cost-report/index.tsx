import { Fragment, useMemo, useRef } from 'react';
import { Info, Loader2, Upload } from 'lucide-react';

import { formatFareAmount } from '@/app/utils/format-fare-amount';
import { formatMonthAndYear } from '@/app/utils/format-month-and-year';

import { useUploadRides } from '@/view/hooks/use-upload-rides';

import { Button } from '@/view/components/ui/button';

import { DataRetrievalInstructionsTooltip } from '@/view/components/data-retrieval-instructions-tooltip';

import { getSpendingStats } from './utils/get-spending-stats';

import { StatsCard } from './components/stats-card';

export function CostReport() {
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const { rides, isLoading, handleFileUpload } = useUploadRides();

  const spendingStats = useMemo(() => getSpendingStats(rides), [rides]);

  return (
    <section className="p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-bold text-4xl font-title">Cost Report</h1>

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

          {rides && rides.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <StatsCard
                  title="Total Spending"
                  value={formatFareAmount(
                    spendingStats.total,
                    rides[0].fare_currency,
                  )}
                />

                <StatsCard
                  title="Total Cancellation Fees"
                  value={formatFareAmount(
                    spendingStats.cancellationFees,
                    rides[0].fare_currency,
                  )}
                />

                <StatsCard
                  title="Monthly Average"
                  value={formatFareAmount(
                    spendingStats.monthlyAverage,
                    rides[0].fare_currency,
                  )}
                />

                <StatsCard
                  title="Month With Most Spending"
                  value={spendingStats.monthWithMostSpending}
                />
              </div>

              <div className="mt-8">
                <h2 className="font-bold text-2xl font-title">
                  Total by Month
                </h2>

                <ul className="mt-4 space-y-4">
                  {Object.entries(spendingStats.spendingByMonth).map(
                    ([monthAndYear, totalSpending], i, arr) => {
                      return (
                        <Fragment key={monthAndYear}>
                          <li className="flex items-center justify-between">
                            <span>{formatMonthAndYear(monthAndYear)}</span>
                            <span>
                              {formatFareAmount(
                                totalSpending,
                                rides[0].fare_currency,
                              )}
                            </span>
                          </li>

                          {i !== arr.length - 1 && (
                            <hr className="border-gray-300" />
                          )}
                        </Fragment>
                      );
                    },
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
