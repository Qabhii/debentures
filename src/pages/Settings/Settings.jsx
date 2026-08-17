import React, { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TDS_CONFIGS } from "@/mock/data";
import { fmtDate } from "@/lib/format";
import { toast } from "sonner";
import { Plus } from "lucide-react";

const FYs = ["FY 2026-27", "FY 2025-26", "FY 2027-28"];
const QLIST = ["Q1", "Q2", "Q3", "Q4"];

export default function Settings() {
  const [singleUser, setSingleUser] = useState(false);
  const [retention, setRetention] = useState("7");
  const [configs, setConfigs] = useState(TDS_CONFIGS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ fy: "FY 2026-27", quarter: "Q3", from: "", to: "", resident: "10", nri: "20" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.from || !form.to || !form.resident || !form.nri) return toast.error("Please fill all mandatory fields.");
    setConfigs((c) => [{ id: `TDS-${Math.floor(Math.random()*900+100)}`, ...form, resident: Number(form.resident), nri: Number(form.nri), status: "Active" }, ...c]);
    toast.success("TDS configuration saved.");
    setOpen(false);
  };

  return (
    <div>
      <PageHeader title="Settings" subtitle="Configuration for TDS, approval policy and data retention." />

      <div className="grid grid-cols-1 gap-6">
        <SectionCard
          title="TDS Configuration"
          description="Resident TDS (default 10%) and NRI TDS are configured per Financial Year and Quarter. The applicable configuration is determined by the calculation period."
          action={<Button data-testid="btn-new-tds" onClick={() => setOpen(true)} className="bg-primary hover:bg-primary/90"><Plus className="mr-2 h-4 w-4" />New Configuration</Button>}
          padded={false}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Financial Year</th>
                  <th className="px-4 py-3">Quarter</th>
                  <th className="px-4 py-3">From</th>
                  <th className="px-4 py-3">To</th>
                  <th className="px-4 py-3 text-right">Resident TDS</th>
                  <th className="px-4 py-3 text-right">NRI TDS</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {configs.map((c) => (
                  <tr key={c.id} className="row-hover" data-testid={`tds-row-${c.id}`}>
                    <td className="px-4 py-3 text-xs">{c.fy}</td>
                    <td className="px-4 py-3 text-xs">{c.quarter}</td>
                    <td className="px-4 py-3 num text-xs">{fmtDate(c.from)}</td>
                    <td className="px-4 py-3 num text-xs">{fmtDate(c.to)}</td>
                    <td className="px-4 py-3 num text-right">{c.resident}%</td>
                    <td className="px-4 py-3 num text-right">{c.nri}%</td>
                    <td className="px-4 py-3"><StatusBadge>{c.status === "Superseded" ? "Closed" : "Active"}</StatusBadge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border p-4 text-xs text-muted-foreground">
            Lower TDS is investor-specific and captured on the investor record with certificate details (Section 197). It is not configured here.
          </div>
        </SectionCard>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SectionCard title="Approval Configuration" description="Maker-checker policy for calculation approval.">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4 rounded-md border border-border p-4">
                <div>
                  <div className="text-sm font-medium">Enforce maker-checker</div>
                  <div className="mt-1 text-xs text-muted-foreground">A user who submits a calculation cannot also approve it.</div>
                </div>
                <Switch data-testid="mc-toggle" checked={!singleUser} onCheckedChange={(v) => setSingleUser(!v)} />
              </div>
              {singleUser && (<div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">Single-user approval enabled. This relaxation is logged in the audit trail.</div>)}
            </div>
          </SectionCard>

          <SectionCard title="Data Retention" description="Minimum audit retention as required by compliance.">
            <div className="space-y-4">
              <div><Label>Retention period (years)</Label><Input data-testid="retention" className="num w-32" value={retention} onChange={(e) => setRetention(e.target.value)} /></div>
              <div className="text-xs text-muted-foreground">Approved calculation snapshots and audit entries are retained indefinitely by default.</div>
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button data-testid="settings-save" className="bg-primary hover:bg-primary/90" onClick={() => toast.success("Settings saved.")}>Save changes</Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New TDS Configuration</DialogTitle>
            <DialogDescription>Define Resident and NRI TDS rates for the effective period.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Financial Year</Label>
              <Select value={form.fy} onValueChange={(v) => set("fy", v)}>
                <SelectTrigger data-testid="new-tds-fy"><SelectValue /></SelectTrigger>
                <SelectContent>{FYs.map((f) => (<SelectItem key={f} value={f}>{f}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Quarter</Label>
              <Select value={form.quarter} onValueChange={(v) => set("quarter", v)}>
                <SelectTrigger data-testid="new-tds-q"><SelectValue /></SelectTrigger>
                <SelectContent>{QLIST.map((q) => (<SelectItem key={q} value={q}>{q}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div><Label>From Date</Label><Input type="date" data-testid="new-tds-from" value={form.from} onChange={(e) => set("from", e.target.value)} /></div>
            <div><Label>To Date</Label><Input type="date" data-testid="new-tds-to" value={form.to} onChange={(e) => set("to", e.target.value)} /></div>
            <div><Label>Resident TDS (%)</Label><Input className="num" data-testid="new-tds-resident" value={form.resident} onChange={(e) => set("resident", e.target.value)} /></div>
            <div><Label>NRI TDS (%)</Label><Input className="num" data-testid="new-tds-nri" value={form.nri} onChange={(e) => set("nri", e.target.value)} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button data-testid="btn-save-tds" onClick={save} className="bg-primary hover:bg-primary/90">Save configuration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
