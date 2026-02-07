import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 min-h-[44px]",
  {
    variants: {
      variant: {
        default: "bg-neutral-900 text-white hover:bg-neutral-800 shadow-md shadow-neutral-900/20",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/20",
        outline: "border-2 border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300",
        secondary: "bg-neutral-100 text-neutral-800 hover:bg-neutral-200/80",
        ghost: "text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900",
        link: "text-neutral-900 underline-offset-4 hover:underline min-h-0",
      },
      size: {
        default: "h-11 px-6 py-2 rounded-2xl",
        sm: "h-9 px-4 rounded-xl min-h-[36px]",
        lg: "h-14 px-8 text-[16px] rounded-2xl min-h-[52px]",
        icon: "h-11 w-11 rounded-2xl min-h-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const mergedClassName = cn(buttonVariants({ variant, size, className }));
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: cn((children as React.ReactElement<{ className?: string }>).props.className, mergedClassName),
      });
    }
    return (
      <button
        className={mergedClassName}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
