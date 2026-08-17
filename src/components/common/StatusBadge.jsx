import React from "react";
import { cn } from "@/lib/utils";

const MAP = {
  // Series
  Draft: "bg-slate-100 text-slate-700 ring-slate-200",
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Locked: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  Closed: "bg-zinc-100 text-zinc-600 ring-zinc-200",
  // Calc
  "Pending Review": "bg-amber-50 text-amber-800 ring-amber-200",
  Returned: "bg-rose-50 text-rose-700 ring-rose-200",
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Payment Generated": "bg-indigo-50 text-indigo-700 ring-indigo-200",
  // Payment
  Paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Failed: "bg-rose-50 text-rose-700 ring-rose-200",
  Pending: "bg-amber-50 text-amber-800 ring-amber-200",
  "Confirmation Pending": "bg-amber-50 text-amber-800 ring-amber-200",
  "Partially Confirmed": "bg-sky-50 text-sky-700 ring-sky-200",
  "All Confirmed": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  // Upload
  Processing: "bg-sky-50 text-sky-700 ring-sky-200",
  Completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Completed with Errors": "bg-amber-50 text-amber-800 ring-amber-200",
  // Validation
  Passed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Critical: "bg-rose-50 text-rose-700 ring-rose-200",
  Warning: "bg-amber-50 text-amber-800 ring-amber-200",
  Included: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Excluded: "bg-zinc-100 text-zinc-600 ring-zinc-200",
  Ready: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export function StatusBadge({ children, tone, className }) {
  const cls = MAP[tone || children] || "bg-slate-100 text-slate-700 ring-slate-200";
  return (
    <span
      data-testid={`status-badge-${String(children).toLowerCase().replace(/\s+/g, "-")}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        cls,
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {children}
    </span>
  );
}
