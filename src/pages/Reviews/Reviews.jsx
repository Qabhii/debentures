import React from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { MONTHLY_CALCS, monthLabel } from "@/mock/data";
import { inr, fmtDate } from "@/lib/format";
import { ShieldCheck } from "lucide-react";

export default function Reviews() {
  const pending = MONTHLY_CALCS.filter((c) => c.status === "Pending Review" || c.status === "Returned");

  return (
    <div>
      <PageHeader title="Review & Approval" subtitle="Reviewer queue — monthly runs awaiting sign-off. Maker-checker policy prevents self-approval." />
      {pending.length === 0 ? (
        <EmptyState icon={ShieldCheck} title="No calculations are currently pending review." description="Submitted monthly runs will appear here." />
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Run</th>
                <th className="px-4 py-3">Series</th>
                <th className="px-4 py-3">Period</th>
                <th className="px-4 py-3 text-right">Investors</th>
                <th className="px-4 py-3 text-right">Gross Interest</th>
                <th className="px-4 py-3 text-right">TDS</th>
                <th className="px-4 py-3 text-right">Net Payable</th>
                <th className="px-4 py-3">Run by</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pending.map((c) => (
                <tr key={c.id} className="row-hover" data-testid={`review-row-${c.id}`}>
                  <td className="px-4 py-3"><Link to={`/reviews/${c.id}`} className="font-medium text-primary hover:underline">{c.id}</Link><div className="text-xs text-muted-foreground num">{fmtDate(c.runAt)}</div></td>
                  <td className="px-4 py-3 num text-xs">{c.series}</td>
                  <td className="px-4 py-3 text-xs">{monthLabel(c.month)}</td>
                  <td className="px-4 py-3 num text-right">{c.investors}</td>
                  <td className="px-4 py-3 num text-right">{inr(c.gross)}</td>
                  <td className="px-4 py-3 num text-right">{inr(c.tds)}</td>
                  <td className="px-4 py-3 num text-right font-medium">{inr(c.net)}</td>
                  <td className="px-4 py-3 text-xs">{c.runBy}</td>
                  <td className="px-4 py-3"><StatusBadge>{c.status}</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
