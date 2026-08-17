import React from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { MONTHLY_CALCS, monthLabel } from "@/mock/data";
import { inr } from "@/lib/format";
import { Plus } from "lucide-react";

export default function Calculations() {
  return (
    <div>
      <PageHeader
        title="Interest Calculations"
        subtitle="Every calculation run is a monthly, immutable snapshot linked to the investor dataset version and series configuration used."
        actions={<Link to="/calculations/new"><Button data-testid="btn-new-calc" className="bg-primary hover:bg-primary/90"><Plus className="mr-2 h-4 w-4" />New Calculation</Button></Link>}
      />
      <div className="overflow-hidden rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Run ID</th>
              <th className="px-4 py-3">Series</th>
              <th className="px-4 py-3">Period</th>
              <th className="px-4 py-3">Data v.</th>
              <th className="px-4 py-3 text-right">Investors</th>
              <th className="px-4 py-3 text-right">Gross Interest</th>
              <th className="px-4 py-3 text-right">TDS</th>
              <th className="px-4 py-3 text-right">Net Payable</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {MONTHLY_CALCS.map((c) => (
              <tr key={c.id} className="row-hover" data-testid={`calc-row-${c.id}`}>
                <td className="px-4 py-3">
                  <Link to={`/calculations/${c.id}`} className="font-medium text-primary hover:underline">{c.id}</Link>
                  <div className="text-xs text-muted-foreground num">{c.runAt}</div>
                </td>
                <td className="px-4 py-3 num text-xs">{c.series}</td>
                <td className="px-4 py-3 text-xs">{monthLabel(c.month)}</td>
                <td className="px-4 py-3 num">v{c.uploadVersion}</td>
                <td className="px-4 py-3 num text-right">{c.investors}</td>
                <td className="px-4 py-3 num text-right">{inr(c.gross)}</td>
                <td className="px-4 py-3 num text-right text-muted-foreground">{inr(c.tds)}</td>
                <td className="px-4 py-3 num text-right font-medium">{inr(c.net)}</td>
                <td className="px-4 py-3"><StatusBadge>{c.status}</StatusBadge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
