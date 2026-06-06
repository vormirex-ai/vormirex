import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        `
        peer group/switch relative inline-flex shrink-0 items-center
        rounded-full border border-transparent transition-all outline-none
        cursor-pointer

        data-[size=default]:h-[20px]
        data-[size=default]:w-[36px]

        data-[size=sm]:h-[16px]
        data-[size=sm]:w-[28px]

        data-[state=checked]:bg-primary
        data-[state=unchecked]:bg-input

        dark:data-[state=unchecked]:bg-input/80

        disabled:cursor-not-allowed
        disabled:opacity-50
        `,
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          `
          pointer-events-none block rounded-full
          bg-white shadow-sm ring-0 transition-transform

          group-data-[size=default]/switch:h-4
          group-data-[size=default]/switch:w-4

          group-data-[size=sm]/switch:h-3
          group-data-[size=sm]/switch:w-3

          data-[state=unchecked]:translate-x-[2px]
          data-[state=checked]:translate-x-[18px]

          group-data-[size=sm]/switch:data-[state=checked]:translate-x-[12px]

          dark:bg-background
          `
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };