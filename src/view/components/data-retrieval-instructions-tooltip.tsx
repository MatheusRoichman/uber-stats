import { useState } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface DataRetrievalInstructionsTooltipProps {
  children: React.ReactNode;
}

export function DataRetrievalInstructionsTooltip({
  children,
}: DataRetrievalInstructionsTooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild onClick={() => setOpen((prev) => !prev)}>
        {children}
      </TooltipTrigger>

      <TooltipContent
        onPointerDownOutside={() => setOpen(false)}
        side="bottom"
        className="max-w-[100vw]"
      >
        <p>
          You need to request a copy of all your data via the Uber website or
          mobile app.
        </p>
        <p>Then you will receive on your e-mail a zipped file.</p>
        <p>Unzip it and look for something like this:</p>
        <code>
          "Uber Data Request XXXXXXX / Uber Data / Rider / trips_data-0.csv".
        </code>
        <p>This is the file that you will upload here!</p>
      </TooltipContent>
    </Tooltip>
  );
}
