import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl border-2 border-neutral-200 bg-neutral-50/80 px-5 py-3 text-[16px] transition-all duration-200 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:border-neutral-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
