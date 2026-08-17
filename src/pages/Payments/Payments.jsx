import React, { useState, useMemo } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SERIES, MONTHLY_CALCS, monthLabel } from "@/mock/data";
import { inr } from "@/lib/format";
import { paymentService } from "@/services";
import { toast } from "sonner";
import { CheckCheck, Download } from "lucide-react";

export default function Payments() {
  const [series, setSeries] = useState(SERIES[0].id);
  const rows = useMemo(() =>
    MONTHLY_CALCS
      .filter((c) => c.series === series && (c.status === "Approved" || c.status === "Payment Generated" || c.status === "Closed"))
      .sort((a, b) => b.month.localeCompare(a.month)),
    [series]
  );
  const [selected, setSelected] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const toggle = (id) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  const selectableRows = rows.filter((r) => (r.paymentStatus || "Confirmation Pending") !== "All Confirmed");
  const toggleAll = () => setSelected(selected.length === selectableRows.length ? [] : selectableRows.map((r) => r.id));

  const selectedTotal = rows.filter((r) => selected.includes(r.id)).reduce((a, r) => a + r.net, 0);
  const selectedTds = rows.filter((r) => selected.includes(r.id)).reduce((a, r) => a + r.tds, 0);

  const download = async (r) => {
    await paymentService.downloadExcel("interest", r.id);
    toast.success(`${monthLabel(r.month)} · Excel download requested for review.`);
  };
  const confirmAll = async () => {
    await paymentService.markConfirmed(selected);
    toast.success(`${selected.length} month(s) marked as All Confirmed.`);
    setSelected([]); setConfirmOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Payments"
        subtitle="Track monthly interest payments per series. Download the Excel to review before confirming — this tracker does not process bank transactions."
      />
      <SectionCard title="Select NCD Series" description="Interest payment records are scoped to a series.">
        <div className="max-w-md">
          <Label>NCD Series</Label>
          <Select value={series} onValueChange={(v) => { setSeries(v); setSelected([]); }}>
            <SelectTrigger data-testid="pay-series"><SelectValue /></SelectTrigger>
            <SelectContent>{SERIES.map((s) => (<SelectItem key={s.id} value={s.id}>{s.id} · {s.name}</SelectItem>))}</SelectContent>
          </Select>
        </div>
      </SectionCard>

      <div className="mt-6">
        <SectionCard
          title="Monthly interest payment records"
          description={`${rows.length} month(s). Download the Excel to review before confirming — selection can represent a quarter (Jul + Aug + Sep = Q2).`}
          action={
            <Button data-testid="btn-mark-confirmed" disabled={selected.length === 0} className="bg-primary hover:bg-primary/90" onClick={() => setConfirmOpen(true)}>
              <CheckCheck className="mr-2 h-4 w-4" />Mark {selected.length || ""} as Confirmed
            </Button>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="w-10 px-4 py-3"><Checkbox data-testid="chk-all" checked={selectableRows.length > 0 && selected.length === selectableRows.length} onCheckedChange={toggleAll} /></th>
                  <th className="px-4 py-3">Period</th>
                  <th className="px-4 py-3">Series</th>
                  <th className="px-4 py-3 text-right">Gross Interest</th>
                  <th className="px-4 py-3 text-right">TDS</th>
                  <th className="px-4 py-3 text-right">Net Payable</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((r) => {
                  const status = r.paymentStatus === "All Confirmed" ? "All Confirmed" : "Confirmation Pending";
                  return (
                    <tr key={r.id} className="row-hover" data-testid={`pay-row-${r.id}`}>
                      <td className="px-4 py-3"><Checkbox data-testid={`chk-${r.id}`} checked={selected.includes(r.id)} onCheckedChange={() => toggle(r.id)} disabled={status === "All Confirmed"} /></td>
                      <td className="px-4 py-3 font-medium">{monthLabel(r.month)}</td>
                      <td className="px-4 py-3 num text-xs">{r.series}</td>
                      <td className="px-4 py-3 num text-right">{inr(r.gross)}</td>
                      <td className="px-4 py-3 num text-right text-muted-foreground">{inr(r.tds)}</td>
                      <td className="px-4 py-3 num text-right font-medium">{inr(r.net)}</td>
                      <td className="px-4 py-3"><StatusBadge>{status}</StatusBadge></td>
                      <td className="px-4 py-3 text-right">
                        <Button data-testid={`dl-${r.id}`} size="sm" variant="outline" className="h-7" onClick={() => download(r)}>
                          <Download className="mr-1.5 h-3.5 w-3.5" />Download Excel
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {rows.length === 0 && <div className="p-8 text-center text-sm text-muted-foreground">No payment records available for this series.</div>}
          </div>
        </SectionCard>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm {selected.length} month{selected.length !== 1 ? "s" : ""}?</DialogTitle>
            <DialogDescription>Marking a month as <span className="font-medium">All Confirmed</span> is an operational tracking action. Please review the downloaded Excel first.</DialogDescription>
          </DialogHeader>
          <div className="rounded-md border border-border p-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Net Payable</span><span className="num font-medium">{inr(selectedTotal)}</span></div>
            <div className="mt-1 flex justify-between"><span className="text-muted-foreground">TDS obligation</span><span className="num font-medium">{inr(selectedTds)}</span></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button data-testid="btn-confirm-all" onClick={confirmAll} className="bg-primary hover:bg-primary/90">Confirm as paid</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
