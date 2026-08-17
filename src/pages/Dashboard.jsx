import React from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { KpiCard } from "@/components/common/KpiCard";
import { SectionCard } from "@/components/common/SectionCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { inr, num } from "@/lib/format";
import { KPIS, MONTHLY_CALCS, AUDIT_LOG, monthLabel } from "@/mock/data";
import { Layers, Users, Calculator, ShieldCheck, Banknote, Wallet, ClipboardList, Upload, FileSpreadsheet, Plus, ArrowUpRight } from "lucide-react";

const QuickAction = ({ icon: Icon, title, to, desc }) => (
  <Link to={to} data-testid={`quick-${title.toLowerCase().replace(/\s+/g,"-")}`} className="group flex items-start gap-3 rounded-lg border border-border bg-white p-4 card-lift">
    <div className="grid h-9 w-9 place-items-center rounded-md bg-accent text-accent-foreground"><Icon className="h-4 w-4" strokeWidth={1.75} /></div>
    <div className="flex-1">
      <div className="flex items-center gap-1 text-sm font-medium">{title} <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" /></div>
      <div className="mt-0.5 text-xs text-muted-foreground">{desc}</div>
    </div>
  </Link>
);

export default function Dashboard() {
  const pendingReviews = MONTHLY_CALCS.filter((c) => c.status === "Pending Review");
  const recent = MONTHLY_CALCS.slice(0, 6);
  const pendingTdsMonths = MONTHLY_CALCS.filter((c) => c.status === "Approved" && c.paymentStatus === "Confirmation Pending");

  return (
    <div>
      <PageHeader
        title="Operations Dashboard"
        subtitle="Track monthly interest, TDS obligations and payment confirmations across every NCD series."
        meta={<><span>FY 2026-27</span><span className="h-1 w-1 rounded-full bg-muted-foreground/50" /><span>Updated moments ago</span></>}
        actions={<Link to="/calculations/new"><Button data-testid="dash-run-calc" className="bg-primary hover:bg-primary/90"><Calculator className="mr-2 h-4 w-4" />Run Calculation</Button></Link>}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <KpiCard testId="kpi-active-series" label="Active Series" value={num(KPIS.activeSeries)} icon={Layers} sub="2 in Draft" />
        <KpiCard testId="kpi-investors" label="Total Investors" value={num(KPIS.totalInvestors)} icon={Users} sub="Across active series" />
        <KpiCard testId="kpi-pending-calcs" label="Pending Calcs" value={num(KPIS.pendingCalcs)} icon={Calculator} tone="warning" sub="Awaiting reviewer" />
        <KpiCard testId="kpi-pending-reviews" label="Pending Reviews" value={num(KPIS.pendingReviews)} icon={ShieldCheck} tone="warning" sub="Maker-checker" />
        <KpiCard testId="kpi-monthly-tds" label="Monthly TDS Due" value={inr(KPIS.monthlyTdsDue, { compact: true })} icon={Wallet} sub="Approved & pending confirm" />
        <KpiCard testId="kpi-pending-pay" label="Pending Confirmations" value={num(KPIS.pendingPayments)} icon={Banknote} tone="warning" sub="Payment months to confirm" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <SectionCard className="lg:col-span-2" title="Recent Calculation Runs" description="Monthly TDS obligation per series." action={<Link to="/calculations" className="text-xs font-medium text-primary hover:underline">View all</Link>}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="pb-3 pr-4">Run ID</th>
                  <th className="pb-3 pr-4">Series</th>
                  <th className="pb-3 pr-4">Period</th>
                  <th className="pb-3 pr-4 text-right">Net TDS</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recent.map((c) => (
                  <tr key={c.id} className="row-hover">
                    <td className="py-3 pr-4"><Link to={`/calculations/${c.id}`} className="font-medium text-primary hover:underline">{c.id}</Link></td>
                    <td className="py-3 pr-4 text-muted-foreground num text-xs">{c.series}</td>
                    <td className="py-3 pr-4 text-xs">{monthLabel(c.month)}</td>
                    <td className="py-3 pr-4 num text-right font-medium">{inr(c.tds)}</td>
                    <td className="py-3"><StatusBadge>{c.status}</StatusBadge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Pending Reviews" description="Monthly runs awaiting reviewer sign-off." action={<Link to="/reviews" className="text-xs font-medium text-primary hover:underline">Open queue</Link>}>
          {pendingReviews.length === 0 ? (
            <div className="text-sm text-muted-foreground">No calculations are currently pending review.</div>
          ) : (
            <ul className="space-y-3">
              {pendingReviews.map((c) => (
                <li key={c.id} className="rounded-md border border-border p-3">
                  <div className="flex items-center justify-between">
                    <Link to={`/reviews/${c.id}`} className="text-sm font-medium text-primary hover:underline">{c.id}</Link>
                    <StatusBadge>{c.status}</StatusBadge>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{c.series} · {monthLabel(c.month)}</div>
                  <div className="mt-2 flex justify-between text-xs"><span className="text-muted-foreground">Net TDS</span><span className="num font-medium">{inr(c.tds)}</span></div>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>

      <div className="mt-8">
        <SectionCard title="Quick actions" description="Jump directly into a workflow." padded={false}>
          <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">
            <QuickAction icon={Plus} title="Create NCD Series" to="/series/new" desc="Define a new series with rate & schedule." />
            <QuickAction icon={Upload} title="Upload Investor Data" to="/investors" desc="Ingest holders by series & month." />
            <QuickAction icon={Calculator} title="Run Calculation" to="/calculations/new" desc="Monthly interest, TDS and net payable." />
            <QuickAction icon={ShieldCheck} title="Review Calculation" to="/reviews" desc="Approve or return submitted runs." />
            <QuickAction icon={FileSpreadsheet} title="Payment Tracking" to="/payments" desc="Track monthly payment confirmations." />
            <QuickAction icon={ClipboardList} title="Reports" to="/reports" desc="Quarterly Payment Summary & TDS." />
          </div>
        </SectionCard>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard title="Monthly TDS obligations" description="Approved months awaiting confirmation." action={<Link to="/payments" className="text-xs font-medium text-primary hover:underline">Open tracker</Link>}>
          {pendingTdsMonths.length === 0 ? (
            <div className="text-sm text-muted-foreground">All monthly TDS confirmations are up to date.</div>
          ) : (
            <ul className="space-y-3">
              {pendingTdsMonths.map((c) => (
                <li key={c.id} className="flex items-start justify-between rounded-md border border-border p-3">
                  <div>
                    <div className="text-sm font-medium">{monthLabel(c.month)}</div>
                    <div className="text-xs text-muted-foreground">{c.series} · Approved {c.approvedBy ? `by ${c.approvedBy}` : ""}</div>
                  </div>
                  <div className="text-right"><div className="num text-sm font-medium">{inr(c.tds)}</div><div className="text-[11px] text-muted-foreground">TDS · pending</div></div>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard title="Recent Audit Activity" description="Every action is logged, immutable." action={<Link to="/audit" className="text-xs font-medium text-primary hover:underline">Open audit log</Link>}>
          <ul className="space-y-3">
            {AUDIT_LOG.slice(0, 5).map((a) => (
              <li key={a.id} className="flex items-start justify-between border-b border-border pb-3 last:border-b-0 last:pb-0">
                <div className="min-w-0">
                  <div className="text-sm"><span className="font-medium">{a.user}</span> · <span className="text-muted-foreground">{a.action}</span></div>
                  <div className="mt-0.5 truncate text-xs text-muted-foreground">{a.description}</div>
                </div>
                <div className="shrink-0 text-right text-[11px] text-muted-foreground">{a.ts}</div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
