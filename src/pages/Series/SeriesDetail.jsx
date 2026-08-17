import React from "react";
import { useParams, Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SERIES, UPLOADS, MONTHLY_CALCS, AUDIT_LOG, monthLabel } from "@/mock/data";
import { inr, fmtDate } from "@/lib/format";
import { Lock, Calculator } from "lucide-react";

const Field = ({ label, value, mono }) => (
  <div>
    <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{label}</div>
    <div className={`mt-1 text-sm ${mono ? "num" : ""}`}>{value ?? "—"}</div>
  </div>
);

export default function SeriesDetail() {
  const { id } = useParams();
  const s = SERIES.find((x) => x.id === id) || SERIES[0];
  const uploads = UPLOADS.filter((u) => u.series === s.id);
  const calcs = MONTHLY_CALCS.filter((c) => c.series === s.id);
  const pays = MONTHLY_CALCS.filter((c) => c.series === s.id && (c.status === "Approved" || c.status === "Payment Generated" || c.status === "Closed"));
  const audits = AUDIT_LOG.filter((a) => a.series === s.id);
  const isLocked = s.status === "Locked" || s.status === "Closed";

  return (
    <div>
      <PageHeader
        title={s.id}
        subtitle={s.name}
        meta={<><span className="num">{s.isin}</span><span className="h-1 w-1 rounded-full bg-muted-foreground/50" /><StatusBadge>{s.status}</StatusBadge></>}
        actions={<Link to="/calculations/new"><Button className="bg-primary hover:bg-primary/90" disabled={s.status !== "Active"}><Calculator className="mr-2 h-4 w-4" />Run Calculation</Button></Link>}
      />

      {isLocked && (
        <div className="mb-6 flex items-start gap-3 rounded-md border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-900">
          <Lock className="mt-0.5 h-4 w-4 shrink-0" />
          <div><div className="font-medium">Series is Locked</div><div className="text-indigo-800/80">Editing is disabled because an approved calculation exists.</div></div>
        </div>
      )}

      <Tabs defaultValue="overview">
        <TabsList data-testid="series-tabs">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="investors">Investor Data</TabsTrigger>
          <TabsTrigger value="calculations">Calculations</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="audit">Audit History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <SectionCard title="Series configuration">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <Field label="Series ID" value={s.id} mono />
              <Field label="ISIN" value={s.isin} mono />
              <Field label="Issue Date" value={fmtDate(s.issueDate)} mono />
              <Field label="Maturity Date" value={fmtDate(s.maturityDate)} mono />
              <Field label="Interest Type" value={s.interestType} />
              <Field label="Interest Rate" value={s.interestType === "Floating" ? `${s.baseRate} + ${s.spread}%` : `${s.interestRate}%`} mono />
              <Field label="Frequency" value={s.frequency} />
              <Field label="Day Count" value={s.dayCount} />
              <Field label="Redemption" value={s.redemptionType} />
              <Field label="Face Value / Unit" value={inr(s.faceValue, { decimals: 0 })} mono />
              <Field label="Status" value={<StatusBadge>{s.status}</StatusBadge>} />
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="investors" className="mt-6">
          <SectionCard title="Investor uploads">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="px-4 py-3">Version</th><th className="px-4 py-3">File</th><th className="px-4 py-3">Period</th><th className="px-4 py-3">TDS Type</th><th className="px-4 py-3">Uploaded</th><th className="px-4 py-3 text-right">Rows</th><th className="px-4 py-3">Status</th></tr></thead>
                <tbody className="divide-y divide-border">
                  {uploads.map((u) => (
                    <tr key={u.id} className="row-hover">
                      <td className="px-4 py-3 num">v{u.version}</td>
                      <td className="px-4 py-3 text-xs">{u.filename}</td>
                      <td className="px-4 py-3 text-xs">{monthLabel(u.month)}</td>
                      <td className="px-4 py-3 text-xs">{u.tdsType}</td>
                      <td className="px-4 py-3 num text-xs text-muted-foreground">{fmtDate(u.uploadedAt)}</td>
                      <td className="px-4 py-3 num text-right">{u.valid}/{u.total}</td>
                      <td className="px-4 py-3"><StatusBadge>{u.status}</StatusBadge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="calculations" className="mt-6">
          <SectionCard title="Monthly calculation runs">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="px-4 py-3">Run</th><th className="px-4 py-3">Period</th><th className="px-4 py-3 text-right">Gross</th><th className="px-4 py-3 text-right">TDS</th><th className="px-4 py-3 text-right">Net Payable</th><th className="px-4 py-3">Status</th></tr></thead>
                <tbody className="divide-y divide-border">
                  {calcs.map((c) => (
                    <tr key={c.id} className="row-hover">
                      <td className="px-4 py-3"><Link to={`/calculations/${c.id}`} className="font-medium text-primary hover:underline">{c.id}</Link></td>
                      <td className="px-4 py-3 text-xs">{monthLabel(c.month)}</td>
                      <td className="px-4 py-3 num text-right">{inr(c.gross)}</td>
                      <td className="px-4 py-3 num text-right text-muted-foreground">{inr(c.tds)}</td>
                      <td className="px-4 py-3 num text-right font-medium">{inr(c.net)}</td>
                      <td className="px-4 py-3"><StatusBadge>{c.status}</StatusBadge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <SectionCard title="Monthly payment tracking">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="px-4 py-3">Period</th><th className="px-4 py-3 text-right">Net Payable</th><th className="px-4 py-3 text-right">TDS</th><th className="px-4 py-3">Status</th></tr></thead>
                <tbody className="divide-y divide-border">
                  {pays.map((p) => (
                    <tr key={p.id} className="row-hover">
                      <td className="px-4 py-3">{monthLabel(p.month)}</td>
                      <td className="px-4 py-3 num text-right font-medium">{inr(p.net)}</td>
                      <td className="px-4 py-3 num text-right text-muted-foreground">{inr(p.tds)}</td>
                      <td className="px-4 py-3"><StatusBadge>{p.paymentStatus === "All Confirmed" ? "All Confirmed" : "Confirmation Pending"}</StatusBadge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="audit" className="mt-6">
          <SectionCard title="Audit history">
            <ul className="divide-y divide-border">
              {audits.map((a) => (
                <li key={a.id} className="flex items-start justify-between py-3">
                  <div><div className="text-sm"><span className="font-medium">{a.user}</span> · <span className="text-muted-foreground">{a.action}</span></div><div className="text-xs text-muted-foreground">{a.description}</div></div>
                  <div className="num text-[11px] text-muted-foreground">{a.ts}</div>
                </li>
              ))}
            </ul>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
