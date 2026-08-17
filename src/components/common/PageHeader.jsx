import React from "react";

export function PageHeader({ title, subtitle, actions, meta }) {
  return (
    <div data-testid="page-header" className="flex items-start justify-between gap-6 border-b border-border pb-6 mb-8 fade-up">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">{subtitle}</p>}
        {meta && <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">{meta}</div>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}
