import React from "react";
import { Inbox } from "lucide-react";

export function EmptyState({ icon: Icon = Inbox, title, description, action }) {
  return (
    <div data-testid="empty-state" className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-secondary/40 px-6 py-16 text-center">
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-white ring-1 ring-border shadow-sm">
        <Icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
      </div>
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-xs text-muted-foreground">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
