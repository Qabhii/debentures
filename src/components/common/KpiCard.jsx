import React from "react";
import { cn } from "@/lib/utils";

export function KpiCard({ label, value, sub, icon: Icon, tone = "default", testId }) {
  const toneCls = {
    default: "text-primary bg-accent",
    warning: "text-amber-700 bg-amber-50",
    danger: "text-rose-700 bg-rose-50",
    success: "text-emerald-700 bg-emerald-50",
  }[tone];
  return (
    <div data-testid={testId} className="card-lift rounded-lg border border-border bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
        {Icon && (
          <div className={cn("grid h-8 w-8 place-items-center rounded-md", toneCls)}>
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </div>
        )}
      </div>
      <div className="mt-4 num text-2xl font-semibold tracking-tight text-foreground">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}
