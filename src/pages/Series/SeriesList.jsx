import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SERIES } from "@/mock/data";
import { inr, fmtDate } from "@/lib/format";
import { Plus, Search } from "lucide-react";

export default function SeriesList() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const rows = useMemo(() => SERIES.filter((s) =>
    (status === "all" || s.status === status) &&
    (`${s.id} ${s.name} ${s.isin}`.toLowerCase().includes(q.toLowerCase()))
  ), [q, status]);

  return (
    <div>
      <PageHeader
        title="NCD Series"
        subtitle="Anchor records for every downstream calculation and payment. Once a calculation is approved, the series becomes locked."
        actions={<Link to="/series/new"><Button data-testid="btn-create-series" className="bg-primary hover:bg-primary/90"><Plus className="mr-2 h-4 w-4" />Create Series</Button></Link>}
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input data-testid="series-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by ID, name or ISIN" className="w-80 pl-8 bg-white" />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger data-testid="series-status-filter" className="w-40 bg-white"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Locked">Locked</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <div className="ml-auto text-xs text-muted-foreground">{rows.length} of {SERIES.length}</div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Series</th>
              <th className="px-4 py-3">ISIN</th>
              <th className="px-4 py-3">Interest</th>
              <th className="px-4 py-3">Frequency</th>
              <th className="px-4 py-3">Maturity</th>
              <th className="px-4 py-3 text-right">Face Value</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((s) => (
              <tr key={s.id} className="row-hover" data-testid={`series-row-${s.id}`}>
                <td className="px-4 py-3">
                  <Link to={`/series/${s.id}`} className="font-medium text-primary hover:underline">{s.id}</Link>
                  <div className="text-xs text-muted-foreground">{s.name}</div>
                </td>
                <td className="px-4 py-3 num text-xs">{s.isin}</td>
                <td className="px-4 py-3 num">
                  {s.interestType === "Floating" ? `${s.baseRate}+${s.spread.toFixed(2)}%` : `${s.interestRate.toFixed(2)}%`}
                </td>
                <td className="px-4 py-3">{s.frequency}</td>
                <td className="px-4 py-3 num text-xs">{fmtDate(s.maturityDate)}</td>
                <td className="px-4 py-3 num text-right">{inr(s.faceValue, { decimals: 0 })}</td>
                <td className="px-4 py-3"><StatusBadge>{s.status}</StatusBadge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
