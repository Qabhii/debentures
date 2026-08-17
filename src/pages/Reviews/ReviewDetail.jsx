import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, RotateCcw, Check, Pencil, ShieldAlert } from "lucide-react";
import { MONTHLY_CALCS, CALCULATION_LINES, CURRENT_USER, monthLabel } from "@/mock/data";
import { inr } from "@/lib/format";
import { toast } from "sonner";
import { approvalService } from "@/services";

export default function ReviewDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const c = MONTHLY_CALCS.find((x) => x.id === id) || MONTHLY_CALCS[0];
  const [returnComment, setReturnComment] = useState("");
  const [overrides, setOverrides] = useState({});
  const [overrideOpen, setOverrideOpen] = useState(null);
  const [overrideVal, setOverrideVal] = useState("");
  const [overrideReason, setOverrideReason] = useState("");

  const selfSubmitted = c.runBy === CURRENT_USER.name;

  const approve = async () => {
    await approvalService.approveCalculation(c.id);
    toast.success(`${c.id} approved. Payment tracking will now show this month.`);
    nav("/reviews");
  };
  const doReturn = async () => {
    if (!returnComment.trim()) return toast.error("Please provide a reason to return.");
    await approvalService.returnCalculation(c.id, returnComment);
    toast.success(`${c.id} returned to maker.`);
    nav("/reviews");
  };
  const saveOverride = () => {
    if (!overrideVal || !overrideReason.trim()) return toast.error("Value and reason are required.");
    setOverrides((o) => ({ ...o, [overrideOpen]: { value: parseFloat(overrideVal), reason: overrideReason } }));
    toast.success("Override logged.");
    setOverrideOpen(null); setOverrideVal(""); setOverrideReason("");
  };

  return (
    <div>
      <PageHeader
        title={`Review · ${c.id}`}
        subtitle={`${c.series} · ${monthLabel(c.month)} · Submitted by ${c.runBy}`}
        meta={<StatusBadge>{c.status}</StatusBadge>}
        actions={
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild><Button data-testid="btn-return" variant="outline"><RotateCcw className="mr-2 h-4 w-4" />Return</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Return for recalculation</DialogTitle><DialogDescription>The maker will be notified. A comment is required.</DialogDescription></DialogHeader>
                <Textarea data-testid="return-comment" value={returnComment} onChange={(e) => setReturnComment(e.target.value)} placeholder="Explain what needs to change…" rows={4} />
                <DialogFooter><Button data-testid="btn-confirm-return" onClick={doReturn} variant="destructive">Return calculation</Button></DialogFooter>
              </DialogContent>
            </Dialog>
            {selfSubmitted ? (
              <div className="flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900" data-testid="maker-checker-block">
                <ShieldAlert className="h-4 w-4" />
                <div><div className="font-medium">Approval unavailable</div><div>Maker-checker policy requires a different reviewer.</div></div>
              </div>
            ) : (
              <Dialog>
                <DialogTrigger asChild><Button data-testid="btn-approve" className="bg-primary hover:bg-primary/90"><Check className="mr-2 h-4 w-4" />Approve</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Approve calculation?</DialogTitle><DialogDescription>Once approved, this monthly calculation will be locked and the payment obligation will appear in the payment tracker.</DialogDescription></DialogHeader>
                  <DialogFooter><Button data-testid="btn-confirm-approve" onClick={approve} className="bg-primary hover:bg-primary/90">Confirm approve</Button></DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Kpi label="Total Investors" value={c.investors} />
        <Kpi label="Gross Interest" value={inr(c.gross)} />
        <Kpi label="TDS (Monthly)" value={inr(c.tds)} highlight />
        <Kpi label="Net Payable" value={inr(c.net)} />
      </div>

      <div className="mt-8">
        <SectionCard title="Investor-wise breakdown" description="Override an investor amount if required. All overrides are logged with reason.">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr><th className="px-4 py-3">Investor</th><th className="px-4 py-3">Folio</th><th className="px-4 py-3">TDS Type</th><th className="px-4 py-3 text-right">Gross</th><th className="px-4 py-3 text-right">TDS</th><th className="px-4 py-3 text-right">Net</th><th className="px-4 py-3">Edge Case</th><th className="px-4 py-3">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {CALCULATION_LINES.map((l, i) => {
                  const ov = overrides[i];
                  return (
                    <tr key={i} className="row-hover">
                      <td className="px-4 py-3 font-medium">{l.investor}</td>
                      <td className="px-4 py-3 num text-xs">{l.folio}</td>
                      <td className="px-4 py-3 text-xs">{l.tdsType}</td>
                      <td className="px-4 py-3 num text-right">{inr(l.gross)}</td>
                      <td className="px-4 py-3 num text-right text-muted-foreground">{inr(l.tds)}</td>
                      <td className="px-4 py-3 num text-right">
                        {ov ? (<span className="inline-flex items-center gap-1.5"><span className="text-muted-foreground line-through">{inr(l.net)}</span><span className="font-semibold text-primary">{inr(ov.value)}</span></span>) : inr(l.net)}
                      </td>
                      <td className="px-4 py-3 text-xs">{l.edgeCase}</td>
                      <td className="px-4 py-3">
                        <Button data-testid={`override-${i}`} size="sm" variant="ghost" className="h-7" onClick={() => { setOverrideOpen(i); setOverrideVal(String(l.net)); }}><Pencil className="mr-1.5 h-3.5 w-3.5" />Override</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      <Dialog open={overrideOpen !== null} onOpenChange={(o) => !o && setOverrideOpen(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Override net payable</DialogTitle><DialogDescription>Overrides are logged with original value, new value, reason and user.</DialogDescription></DialogHeader>
          <div className="space-y-3">
            <div><div className="mb-1.5 text-xs font-medium">New net payable (₹)</div><Input data-testid="override-value" className="num" value={overrideVal} onChange={(e) => setOverrideVal(e.target.value)} /></div>
            <div><div className="mb-1.5 text-xs font-medium">Reason (mandatory)</div><Textarea data-testid="override-reason" rows={3} value={overrideReason} onChange={(e) => setOverrideReason(e.target.value)} placeholder="e.g. TDS re-adjustment on Form 15G" /></div>
            <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900"><AlertTriangle className="h-4 w-4 shrink-0" /><span>Overrides remain visible on the approved snapshot and appear in the audit trail.</span></div>
          </div>
          <DialogFooter><Button data-testid="btn-save-override" onClick={saveOverride} className="bg-primary hover:bg-primary/90">Save override</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const Kpi = ({ label, value, highlight }) => (
  <div className={`rounded-lg border p-5 ${highlight ? "border-primary/20 bg-accent" : "border-border bg-white"}`}>
    <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
    <div className={`num mt-2 text-2xl font-semibold ${highlight ? "text-primary" : ""}`}>{value}</div>
  </div>
);
