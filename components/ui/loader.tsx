import { cn } from "@/lib/utils";
import { Loader2 as Loader } from "lucide-react";

export const Spinner = ({
  className,
  size,
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}) => {
  return (
    <div className="m-auto">
      <Loader
        className={cn("animate-loader h-10 w-10 text-foreground", className, {
          "h-4 w-4": size === "sm",
          "h-8 w-8": size === "md",
          "h-12 w-12": size === "lg",
          "h-16 w-16": size === "xl",
          "h-20 w-20": size === "2xl",
        })}
      />
    </div>
  );
};
