import React from "react";
import { cn } from "@/lib/utils";

export function SectionCard({ title, description, action, children, className, padded = true }) {
  return (
    <div className={cn("rounded-lg border border-border bg-white", className)}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            {title && <h3 className="text-sm font-semibold text-foreground">{title}</h3>}
            {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={cn(padded && "p-5")}>{children}</div>
    </div>
  );
}
