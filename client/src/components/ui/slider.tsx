import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { romanize } from "romans";

import { cn } from "@/lib/utils";

function Numbers({ start, end }: { start: number; end: number }) {
  return (
    <div className="w-full text-gray-400 text-md flex font-bold flex-row justify-between px-1">
      {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((i) => {
        console.log(Math.abs(i));
        return (
          <div key={i} className="text-center">
            {i < 1 ? "-" + romanize(Math.abs(i - 1)) : romanize(i)}
          </div>
        );
      })}
    </div>
  );
}

// <div className="w-full rounded-full bg-white shadow-2xl p-8">
//   <div className="h-4 bg-blue-300 rounded-full"></div>
// </div>
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <div className="px-8 bg-white rounded-full">
    <div className="relative">
      <div className="pt-8 pb-4 px-1">
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex w-full touch-none select-none items-center shadow-2xl ",
            className,
          )}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
            <SliderPrimitive.Range className="absolute h-full bg-gray-500" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
        </SliderPrimitive.Root>
      </div>

      <div className="absolute select-none top-1 w-full">
        <Numbers start={props.min || 0} end={props.max || 20} />
      </div>
    </div>
  </div>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
