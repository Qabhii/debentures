import React from "react";
import { useParams, Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { MONTHLY_CALCS, CALCULATION_LINES, monthLabel } from "@/mock/data";
import { inr, fmtDate } from "@/lib/format";
import { Lock } from "lucide-react";

export default function CalculationDetail() {
  const { id } = useParams();
  const c = MONTHLY_CALCS.find((x) => x.id === id) || MONTHLY_CALCS[0];
  const isPending = c.status === "Pending Review";

  return (
    <div>
      <PageHeader
        title={c.id}
        subtitle={`${c.series} · ${monthLabel(c.month)}`}
        meta={<><span>Run by {c.runBy}</span><span className="h-1 w-1 rounded-full bg-muted-foreground/50" /><span className="num">{fmtDate(c.runAt)}</span><span className="h-1 w-1 rounded-full bg-muted-foreground/50" /><StatusBadge>{c.status}</StatusBadge></>}
        actions={isPending ? <Link to={`/reviews/${c.id}`}><Button variant="outline">Open in Review</Button></Link> : null}
      />

      {c.locked && (
        <div className="mb-6 flex items-start gap-3 rounded-md border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-900">
          <Lock className="mt-0.5 h-4 w-4 shrink-0" />
          <div><div className="font-medium">Approved calculation — read-only snapshot</div><div className="text-indigo-800/80">This snapshot is immutable. {c.approvedBy && `Approved by ${c.approvedBy} on ${fmtDate(c.approvedAt)}.`}</div></div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Kpi label="Total Investors" value={c.investors} />
        <Kpi label="Gross Interest" value={inr(c.gross)} />
        <Kpi label="TDS (Monthly)" value={inr(c.tds)} highlight />
        <Kpi label="Net Payable" value={inr(c.net)} />
      </div>

      <div className="mt-8">
        <SectionCard title="Investor-level results" description="Per-investor computation for this month including edge-case classification.">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Investor</th><th className="px-4 py-3">PAN</th><th className="px-4 py-3">Folio</th>
                  <th className="px-4 py-3 text-right">Units</th><th className="px-4 py-3 text-right">Rate</th>
                  <th className="px-4 py-3 text-right">Days</th><th className="px-4 py-3 text-right">Gross</th>
                  <th className="px-4 py-3 text-right">TDS</th><th className="px-4 py-3 text-right">Net</th>
                  <th className="px-4 py-3">TDS Type</th><th className="px-4 py-3">Edge Case</th><th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {CALCULATION_LINES.map((l, i) => (
                  <tr key={i} className="row-hover">
                    <td className="px-4 py-3 font-medium">{l.investor}</td>
                    <td className="px-4 py-3 num text-xs">{l.pan}</td>
                    <td className="px-4 py-3 num text-xs">{l.folio}</td>
                    <td className="px-4 py-3 num text-right">{l.units}</td>
                    <td className="px-4 py-3 num text-right">{l.rate}%</td>
                    <td className="px-4 py-3 num text-right">{l.days}</td>
                    <td className="px-4 py-3 num text-right">{inr(l.gross)}</td>
                    <td className="px-4 py-3 num text-right text-muted-foreground">{inr(l.tds)}</td>
                    <td className="px-4 py-3 num text-right font-medium">{inr(l.net)}</td>
                    <td className="px-4 py-3 text-xs">{l.tdsType}</td>
                    <td className="px-4 py-3 text-xs">{l.edgeCase !== "Normal" ? <span className="rounded bg-amber-50 px-2 py-0.5 text-amber-800 ring-1 ring-inset ring-amber-200">{l.edgeCase}</span> : <span className="text-muted-foreground">{l.edgeCase}</span>}</td>
                    <td className="px-4 py-3"><StatusBadge>{l.status}</StatusBadge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

const Kpi = ({ label, value, highlight }) => (
  <div className={`rounded-lg border p-5 ${highlight ? "border-primary/20 bg-accent" : "border-border bg-white"}`}>
    <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
    <div className={`num mt-2 text-2xl font-semibold ${highlight ? "text-primary" : ""}`}>{value}</div>
  </div>
);
