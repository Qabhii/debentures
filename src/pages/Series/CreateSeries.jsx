import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { seriesService } from "@/services";

export default function CreateSeries() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "", isin: "", issueDate: "", maturityDate: "", interestType: "Fixed",
    interestRate: "", baseRate: "MIBOR", spread: "", frequency: "Monthly",
    dayCount: "Actual/365", redemptionType: "Bullet", faceValue: "",
  });
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.name || !form.isin || !form.issueDate || !form.maturityDate || !form.faceValue) {
      toast.error("Please fill all mandatory fields (including face value).");
      return;
    }
    if (form.isin.length !== 12) return toast.error("ISIN must be 12 characters.");
    if (new Date(form.maturityDate) <= new Date(form.issueDate)) return toast.error("Maturity date must be after issue date.");
    setSaving(true);
    const res = await seriesService.createSeries(form);
    setSaving(false);
    toast.success(`Series ${res.id} created in Draft.`);
    nav(`/series/${res.id}`);
  };

  const isFloating = form.interestType === "Floating";

  return (
    <div>
      <PageHeader title="Create NCD Series" subtitle="Define the anchor record. All downstream calculations and payments reference this series." />
      <SectionCard title="Series configuration">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div><Label>Series Name<span className="text-rose-600"> *</span></Label><Input data-testid="input-name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Series F6 – 8.75% Sec NCD 2029" /></div>
          <div><Label>ISIN<span className="text-rose-600"> *</span></Label><Input data-testid="input-isin" className="num" value={form.isin} onChange={(e) => set("isin", e.target.value.toUpperCase())} placeholder="12-character ISIN" maxLength={12} /></div>
          <div><Label>Issue Date<span className="text-rose-600"> *</span></Label><Input type="date" data-testid="input-issue" value={form.issueDate} onChange={(e) => set("issueDate", e.target.value)} /></div>
          <div><Label>Maturity Date<span className="text-rose-600"> *</span></Label><Input type="date" data-testid="input-maturity" value={form.maturityDate} onChange={(e) => set("maturityDate", e.target.value)} /></div>
          <div>
            <Label>Interest Type</Label>
            <Select value={form.interestType} onValueChange={(v) => set("interestType", v)}>
              <SelectTrigger data-testid="select-int-type"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="Fixed">Fixed</SelectItem><SelectItem value="Floating">Floating</SelectItem></SelectContent>
            </Select>
          </div>
          {!isFloating ? (
            <div><Label>Interest Rate (%)</Label><Input type="number" step="0.0001" value={form.interestRate} onChange={(e) => set("interestRate", e.target.value)} placeholder="e.g. 8.75" /></div>
          ) : (
            <div className="grid grid-cols-2 gap-3"><div><Label>Base Rate</Label><Input value={form.baseRate} onChange={(e) => set("baseRate", e.target.value)} /></div><div><Label>Spread (%)</Label><Input type="number" step="0.01" value={form.spread} onChange={(e) => set("spread", e.target.value)} placeholder="e.g. 2.50" /></div></div>
          )}
          <div><Label>Frequency</Label><Select value={form.frequency} onValueChange={(v) => set("frequency", v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Monthly">Monthly</SelectItem><SelectItem value="Quarterly">Quarterly</SelectItem><SelectItem value="Half-Yearly">Half-Yearly</SelectItem><SelectItem value="Annually">Annually</SelectItem><SelectItem value="Cumulative">Cumulative</SelectItem></SelectContent></Select></div>
          <div><Label>Day Count Convention</Label><Select value={form.dayCount} onValueChange={(v) => set("dayCount", v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Actual/365">Actual/365</SelectItem><SelectItem value="Actual/360">Actual/360</SelectItem><SelectItem value="30/360">30/360</SelectItem><SelectItem value="Actual/Actual">Actual/Actual</SelectItem></SelectContent></Select></div>
          <div><Label>Redemption Type</Label><Select value={form.redemptionType} onValueChange={(v) => set("redemptionType", v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Bullet">Bullet</SelectItem><SelectItem value="Amortising">Amortising</SelectItem></SelectContent></Select></div>
          <div><Label>Face Value per Unit (₹)<span className="text-rose-600"> *</span></Label><Input className="num" type="number" value={form.faceValue} onChange={(e) => set("faceValue", e.target.value)} placeholder="e.g. 1000 / 10000 / 100000" /></div>
        </div>
        <div className="mt-6 flex justify-end gap-2 border-t border-border pt-5">
          <Button variant="outline" onClick={() => nav("/series")}>Cancel</Button>
          <Button data-testid="btn-submit-series" disabled={saving} className="bg-primary hover:bg-primary/90" onClick={submit}>{saving ? "Saving…" : "Create Series"}</Button>
        </div>
      </SectionCard>
    </div>
  );
}
