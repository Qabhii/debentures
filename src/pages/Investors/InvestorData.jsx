import React, { useState, useMemo } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { SERIES, INVESTORS, UPLOADS, monthLabel } from "@/mock/data";
import { investorService } from "@/services";
import { fmtDate } from "@/lib/format";
import { UploadCloud, FileSpreadsheet, Download, Plus, Search, Pencil, Users, ShieldAlert, Paperclip, CheckCircle2 } from "lucide-react";

const TDS_TYPES = ["Resident", "NRI", "Lower"];

export default function InvestorData() {
  const activeSeries = SERIES.filter((s) => s.status === "Active");
  const [series, setSeries] = useState(activeSeries[0].id);
  const [tdsType, setTdsType] = useState("Resident");
  const [tab, setTab] = useState("upload");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => INVESTORS.filter((i) =>
    i.series === series && i.tdsType === tdsType &&
    `${i.name} ${i.pan} ${i.folio} ${i.ifsc} ${i.account}`.toLowerCase().includes(q.toLowerCase())
  ), [series, tdsType, q]);

  const [editOpen, setEditOpen] = useState(null);

  return (
    <div>
      <PageHeader
        title="Investor Data"
        subtitle="Manage investor holdings by series and TDS classification. Upload or create manually — every correction is logged."
        actions={<Button variant="outline"><Download className="mr-2 h-4 w-4" />Download template</Button>}
      />

      {/* Series + TDS Category selector — no month dropdown */}
      <SectionCard title="1. Select series & TDS category" description="Investor data is scoped to a series and a TDS category. The month is inferred from the file/record content and processed by the backend.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label>NCD Series</Label>
            <Select value={series} onValueChange={setSeries}>
              <SelectTrigger data-testid="inv-series"><SelectValue /></SelectTrigger>
              <SelectContent>{activeSeries.map((s) => (<SelectItem key={s.id} value={s.id}>{s.id} · {s.name}</SelectItem>))}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>TDS Category</Label>
            <Select value={tdsType} onValueChange={setTdsType}>
              <SelectTrigger data-testid="inv-tds-type"><SelectValue /></SelectTrigger>
              <SelectContent>{TDS_TYPES.map((t) => (<SelectItem key={t} value={t}>{t} TDS</SelectItem>))}</SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-md bg-accent/50 p-3 text-xs text-primary">
          <ShieldAlert className="h-3.5 w-3.5" />
          {tdsType === "Resident" && <span>Resident TDS uses the configured standard rate (default 10%) from Settings.</span>}
          {tdsType === "NRI" && <span>NRI TDS uses the applicable period-based rate configured in Settings for the effective quarter.</span>}
          {tdsType === "Lower" && <span>Lower TDS is investor-specific. Certificate details and the certificate file are captured per investor / upload (Section 197). The rate applied is picked up from the certificate.</span>}
        </div>
      </SectionCard>

      {/* Tabs in the required order: Upload → Create → Records → Upload History */}
      <div className="mt-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="upload" data-testid="tab-upload">Upload</TabsTrigger>
            <TabsTrigger value="create" data-testid="tab-create">Create</TabsTrigger>
            <TabsTrigger value="records" data-testid="tab-records">Records</TabsTrigger>
            <TabsTrigger value="history" data-testid="tab-history">Upload History</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-6">
            <UploadTab series={series} tdsType={tdsType} />
          </TabsContent>

          <TabsContent value="create" className="mt-6">
            <CreateTab series={series} tdsType={tdsType} onCreated={() => setTab("records")} />
          </TabsContent>

          <TabsContent value="records" className="mt-6">
            <SectionCard
              title={`${tdsType} TDS · ${series}`}
              description={`${filtered.length} investor record(s)`}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="relative w-96">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input data-testid="inv-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, PAN, folio, IFSC, account…" className="pl-8" />
                </div>
              </div>
              {filtered.length === 0 ? (
                <EmptyState icon={Users} title="No investors match this combination." description="Try a different series, TDS category, or upload/create data." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3">Investor</th><th className="px-4 py-3">PAN</th><th className="px-4 py-3">Folio</th>
                        <th className="px-4 py-3">IFSC</th><th className="px-4 py-3">Bank Account</th>
                        <th className="px-4 py-3">TDS Type</th><th className="px-4 py-3">Period</th>
                        <th className="px-4 py-3">Severity</th><th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filtered.map((i) => (
                        <tr key={i.id} className="row-hover" data-testid={`inv-row-${i.id}`}>
                          <td className="px-4 py-3">
                            <div className="font-medium">{i.name}</div>
                            {i.manuallyUpdated && <span className="mt-1 inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-primary">Manually Updated</span>}
                          </td>
                          <td className="px-4 py-3 num text-xs">{i.panMasked}</td>
                          <td className="px-4 py-3 num text-xs">{i.folio}</td>
                          <td className="px-4 py-3 num text-xs">{i.ifsc}</td>
                          <td className="px-4 py-3 num text-xs">{i.accountMasked}</td>
                          <td className="px-4 py-3 text-xs">{i.tdsType}</td>
                          <td className="px-4 py-3 text-xs">{monthLabel(i.month)}</td>
                          <td className="px-4 py-3"><StatusBadge>{i.severity}</StatusBadge></td>
                          <td className="px-4 py-3">
                            <Button size="sm" variant="ghost" className="h-7" data-testid={`edit-${i.id}`} onClick={() => setEditOpen(i)}>
                              <Pencil className="mr-1.5 h-3.5 w-3.5" />Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </SectionCard>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <SectionCard title="Upload history" description="Every upload is a versioned snapshot. Prior versions are preserved and read-only.">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="px-4 py-3">Version</th><th className="px-4 py-3">File</th><th className="px-4 py-3">Series</th><th className="px-4 py-3">Period</th><th className="px-4 py-3">TDS</th><th className="px-4 py-3">Uploaded</th><th className="px-4 py-3 text-right">Rows</th><th className="px-4 py-3">Status</th></tr></thead>
                  <tbody className="divide-y divide-border">
                    {UPLOADS.map((u) => (
                      <tr key={u.id} className="row-hover">
                        <td className="px-4 py-3 num">v{u.version} {u.isLatest && <span className="ml-1 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-primary">latest</span>}</td>
                        <td className="px-4 py-3 text-xs">{u.filename}</td>
                        <td className="px-4 py-3 num text-xs">{u.series}</td>
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
        </Tabs>
      </div>

      <EditInvestorDialog open={!!editOpen} investor={editOpen} onClose={() => setEditOpen(null)} />
    </div>
  );
}

// ---------- Upload Tab ----------
function UploadTab({ series, tdsType }) {
  const [drag, setDrag] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [dataFile, setDataFile] = useState(null);
  const [certFile, setCertFile] = useState(null);

  const doUpload = () => {
    if (tdsType === "Lower" && !certFile) {
      toast.error("Please attach the Lower TDS certificate (Section 197) before uploading.");
      return;
    }
    setProgress(0); setResult(null);
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(iv); setResult({ total: 1284, valid: 1272, errors: 8, warnings: 4 }); return 100; }
        return p + 12;
      });
    }, 110);
  };

  return (
    <SectionCard title={`Upload ${tdsType} TDS investor file`} description="CSV or Excel. The system infers the applicable month per row and validates each record. Existing versions are preserved.">
      <div
        data-testid="upload-dropzone"
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files[0]) setDataFile(e.dataTransfer.files[0].name); }}
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 text-center transition-colors ${drag ? "border-primary bg-accent" : "border-border bg-secondary/40"}`}
      >
        <div className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-sm ring-1 ring-border">
          <UploadCloud className="h-5 w-5 text-primary" />
        </div>
        <div className="mt-4 text-sm font-medium">Drop CSV or Excel file here</div>
        <div className="mt-1 text-xs text-muted-foreground">{series} · {tdsType} TDS</div>
        <label className="mt-3 cursor-pointer">
          <input data-testid="upload-file" type="file" className="hidden" accept=".csv,.xlsx,.xls" onChange={(e) => setDataFile(e.target.files[0]?.name)} />
          <span className="rounded-md border border-border bg-white px-3 py-1.5 text-xs font-medium hover:bg-secondary">Or browse to select file</span>
        </label>
        {dataFile && <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-1 text-xs text-emerald-800 ring-1 ring-inset ring-emerald-200"><CheckCircle2 className="h-3.5 w-3.5" />{dataFile}</div>}
      </div>

      {tdsType === "Lower" && (
        <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4">
          <div className="mb-2 flex items-start gap-2 text-sm text-amber-900">
            <Paperclip className="mt-0.5 h-4 w-4" />
            <div>
              <div className="font-medium">Lower TDS Certificate (Section 197) — required</div>
              <div className="text-xs text-amber-800">The certificate contains the applicable Lower TDS rate. The backend picks up the rate directly from the certificate — it is not entered separately here.</div>
            </div>
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-amber-300 bg-white px-3 py-2 text-xs font-medium text-amber-900 hover:bg-amber-100">
            <input data-testid="upload-cert" type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" onChange={(e) => setCertFile(e.target.files[0]?.name)} />
            <Paperclip className="h-3.5 w-3.5" />Upload certificate (PDF / image)
          </label>
          {certFile && <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-1 text-xs text-emerald-800 ring-1 ring-inset ring-emerald-200"><CheckCircle2 className="h-3.5 w-3.5" />{certFile}</div>}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Button data-testid="btn-simulate-upload" onClick={doUpload} disabled={!dataFile} className="bg-primary hover:bg-primary/90"><FileSpreadsheet className="mr-2 h-4 w-4" />Upload & validate</Button>
      </div>

      {progress > 0 && (
        <div className="mt-4">
          <Progress value={progress} />
          <div className="mt-1.5 text-xs text-muted-foreground">{progress < 100 ? `Uploading… ${progress}%` : "Processing complete"}</div>
        </div>
      )}

      {result && (
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <ResBox label="Total Rows" value={result.total} />
          <ResBox label="Passed" value={result.valid} tone="emerald" />
          <ResBox label="Critical Errors" value={result.errors} tone="rose" />
          <ResBox label="Warnings" value={result.warnings} tone="amber" />
        </div>
      )}
    </SectionCard>
  );
}

// ---------- Create Tab ----------
function CreateTab({ series, tdsType, onCreated }) {
  const [form, setForm] = useState({ series, tdsType, lowerTds: {} });
  const [certFile, setCertFile] = useState(null);
  React.useEffect(() => setForm((f) => ({ ...f, series, tdsType })), [series, tdsType]);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setLower = (k, v) => setForm((f) => ({ ...f, lowerTds: { ...(f.lowerTds || {}), [k]: v } }));

  const save = async () => {
    if (!form.name || !form.pan || !form.folio || !form.ifsc || !form.account || !form.units)
      return toast.error("Please fill all mandatory fields.");
    if (tdsType === "Lower") {
      const l = form.lowerTds || {};
      if (!l.certificateNo || !l.validFrom || !l.validTo || !l.issuer)
        return toast.error("Lower TDS requires certificate details (No., Valid From/To, Issuer).");
      if (l.rate == null || l.rate === "" || Number(l.rate) < 0)
        return toast.error("Please enter the applicable Lower TDS rate.");
      if (!form.acquisitionDate) return toast.error("Please enter the acquisition date.");
      if (!certFile) return toast.error("Please attach the Lower TDS certificate file.");
    }
    await investorService.createInvestor({ ...form, certificateFile: certFile });
    toast.success("Investor added — visible on the Records tab.");
    setForm({ series, tdsType, lowerTds: {} });
    setCertFile(null);
    onCreated?.();
  };

  return (
    <SectionCard title={`Add ${tdsType} TDS investor`} description={`Manually create an investor for ${series}. Marked as Manually Updated in audit.`}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div><Label>Investor Name<span className="text-rose-600"> *</span></Label><Input data-testid="c-name" value={form.name || ""} onChange={(e) => set("name", e.target.value)} /></div>
        <div><Label>PAN<span className="text-rose-600"> *</span></Label><Input data-testid="c-pan" className="num" value={form.pan || ""} onChange={(e) => set("pan", e.target.value.toUpperCase())} /></div>
        <div><Label>Folio<span className="text-rose-600"> *</span></Label><Input data-testid="c-folio" className="num" value={form.folio || ""} onChange={(e) => set("folio", e.target.value)} /></div>
        <div><Label>Units<span className="text-rose-600"> *</span></Label><Input data-testid="c-units" className="num" type="number" value={form.units || ""} onChange={(e) => set("units", Number(e.target.value))} /></div>
        <div><Label>IFSC<span className="text-rose-600"> *</span></Label><Input data-testid="c-ifsc" className="num" value={form.ifsc || ""} onChange={(e) => set("ifsc", e.target.value.toUpperCase())} /></div>
        <div><Label>Bank Account<span className="text-rose-600"> *</span></Label><Input data-testid="c-account" className="num" value={form.account || ""} onChange={(e) => set("account", e.target.value)} /></div>
        {tdsType === "Lower" ? (
          <>
            <div><Label>Acquisition Date<span className="text-rose-600"> *</span></Label><Input type="date" data-testid="c-acq-date" value={form.acquisitionDate || ""} onChange={(e) => set("acquisitionDate", e.target.value)} /></div>
            <div><Label>Transfer Date</Label><Input type="date" data-testid="c-transfer-date" value={form.transferDate || ""} onChange={(e) => set("transferDate", e.target.value)} /></div>
          </>
        ) : (
          <div><Label>Allotment Date</Label><Input type="date" value={form.allotment || ""} onChange={(e) => set("allotment", e.target.value)} /></div>
        )}
        <div><Label>Category</Label><Input value={form.category || ""} onChange={(e) => set("category", e.target.value)} placeholder="Individual / Corporate / Trust / NRI" /></div>
      </div>

      {tdsType === "Lower" && (
        <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-4">
          <div className="mb-3 flex items-start gap-2 text-sm text-amber-900">
            <ShieldAlert className="mt-0.5 h-4 w-4" />
            <div>
              <div className="font-medium">Lower TDS Certificate (Section 197)</div>
              <div className="text-xs text-amber-800">Attach the certificate and fill the reference details. The applicable rate (e.g. 2% / 3% / 4%) is read from the certificate by the backend during calculation.</div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div><Label>Certificate No.<span className="text-rose-600"> *</span></Label><Input data-testid="c-cert-no" className="num" value={form.lowerTds?.certificateNo || ""} onChange={(e) => setLower("certificateNo", e.target.value)} /></div>
            <div><Label>Reference No.</Label><Input className="num" value={form.lowerTds?.refNo || ""} onChange={(e) => setLower("refNo", e.target.value)} /></div>
            <div><Label>Valid From<span className="text-rose-600"> *</span></Label><Input type="date" data-testid="c-cert-from" value={form.lowerTds?.validFrom || ""} onChange={(e) => setLower("validFrom", e.target.value)} /></div>
            <div><Label>Valid To<span className="text-rose-600"> *</span></Label><Input type="date" data-testid="c-cert-to" value={form.lowerTds?.validTo || ""} onChange={(e) => setLower("validTo", e.target.value)} /></div>
            <div><Label>TDS Rate (%)<span className="text-rose-600"> *</span></Label><Input data-testid="c-cert-rate" className="num" type="number" step="0.01" min="0" value={form.lowerTds?.rate ?? ""} onChange={(e) => setLower("rate", e.target.value)} placeholder="e.g. 2 / 3 / 4 / 5" /></div>
            <div><Label>Issuing Authority<span className="text-rose-600"> *</span></Label><Input value={form.lowerTds?.issuer || ""} onChange={(e) => setLower("issuer", e.target.value)} placeholder="e.g. Income Tax Office, Chennai" /></div>
            <div className="md:col-span-2"><Label>Remarks</Label><Input value={form.lowerTds?.remarks || ""} onChange={(e) => setLower("remarks", e.target.value)} /></div>
            <div className="md:col-span-2">
              <Label>Certificate File<span className="text-rose-600"> *</span></Label>
              <label className="mt-1 inline-flex cursor-pointer items-center gap-2 rounded-md border border-amber-300 bg-white px-3 py-2 text-xs font-medium text-amber-900 hover:bg-amber-100">
                <input data-testid="c-cert-file" type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" onChange={(e) => setCertFile(e.target.files[0]?.name)} />
                <Paperclip className="h-3.5 w-3.5" />Attach certificate (PDF / image)
              </label>
              {certFile && <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-1 text-xs text-emerald-800 ring-1 ring-inset ring-emerald-200"><CheckCircle2 className="h-3.5 w-3.5" />{certFile}</div>}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Button data-testid="btn-create-investor" onClick={save} className="bg-primary hover:bg-primary/90"><Plus className="mr-2 h-4 w-4" />Add investor</Button>
      </div>
    </SectionCard>
  );
}

// ---------- Edit Investor Dialog ----------
function EditInvestorDialog({ open, onClose, investor }) {
  const [form, setForm] = useState({});
  const [certFile, setCertFile] = useState(null);
  React.useEffect(() => { if (investor) { setForm({ ...investor, lowerTds: investor.lowerTds || {} }); setCertFile(null); } }, [investor]);
  if (!investor) return null;
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setLower = (k, v) => setForm((f) => ({ ...f, lowerTds: { ...(f.lowerTds || {}), [k]: v } }));

  const save = async () => {
    if (form.tdsType === "Lower") {
      const l = form.lowerTds || {};
      if (!l.certificateNo || !l.validFrom || !l.validTo || !l.issuer)
        return toast.error("Lower TDS requires certificate details.");
    }
    await investorService.updateInvestor(investor.id, { ...form, certificateFile: certFile || investor.lowerTds?.file });
    toast.success(`${investor.id} updated. Marked as Manually Updated.`);
    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader><DialogTitle>Edit investor · {investor.id}</DialogTitle><DialogDescription>Correct any incorrect data. Each edit is logged in the audit trail.</DialogDescription></DialogHeader>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 max-h-[60vh] overflow-y-auto pr-1">
          <div><Label>Investor Name</Label><Input data-testid="edit-name" value={form.name || ""} onChange={(e) => set("name", e.target.value)} /></div>
          <div><Label>PAN</Label><Input className="num" value={form.pan || ""} onChange={(e) => set("pan", e.target.value.toUpperCase())} /></div>
          <div><Label>Folio</Label><Input className="num" value={form.folio || ""} onChange={(e) => set("folio", e.target.value)} /></div>
          <div><Label>Units</Label><Input className="num" type="number" value={form.units ?? ""} onChange={(e) => set("units", Number(e.target.value))} /></div>
          <div><Label>IFSC</Label><Input data-testid="edit-ifsc" className="num" value={form.ifsc || ""} onChange={(e) => set("ifsc", e.target.value.toUpperCase())} /></div>
          <div><Label>Bank Account Number</Label><Input data-testid="edit-account" className="num" value={form.account || ""} onChange={(e) => set("account", e.target.value)} /></div>
          <div>
            <Label>TDS Type</Label>
            <Select value={form.tdsType} onValueChange={(v) => set("tdsType", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{TDS_TYPES.map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}</SelectContent>
            </Select>
          </div>
          <div><Label>Category</Label><Input value={form.category || ""} onChange={(e) => set("category", e.target.value)} /></div>

          {form.tdsType === "Lower" && (
            <>
              <div className="md:col-span-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">Lower TDS certificate details are required. The applicable rate is picked up from the certificate by the backend.</div>
              <div><Label>Certificate No.</Label><Input className="num" value={form.lowerTds?.certificateNo || ""} onChange={(e) => setLower("certificateNo", e.target.value)} /></div>
              <div><Label>Reference No.</Label><Input className="num" value={form.lowerTds?.refNo || ""} onChange={(e) => setLower("refNo", e.target.value)} /></div>
              <div><Label>Valid From</Label><Input type="date" value={form.lowerTds?.validFrom || ""} onChange={(e) => setLower("validFrom", e.target.value)} /></div>
              <div><Label>Valid To</Label><Input type="date" value={form.lowerTds?.validTo || ""} onChange={(e) => setLower("validTo", e.target.value)} /></div>
              <div><Label>TDS Rate (%)</Label><Input className="num" type="number" step="0.01" min="0" value={form.lowerTds?.rate ?? ""} onChange={(e) => setLower("rate", e.target.value)} placeholder="e.g. 2 / 3 / 4 / 5" /></div>
              <div><Label>Issuing Authority</Label><Input value={form.lowerTds?.issuer || ""} onChange={(e) => setLower("issuer", e.target.value)} /></div>
              <div className="md:col-span-2">
                <Label>Certificate File</Label>
                <label className="mt-1 inline-flex cursor-pointer items-center gap-2 rounded-md border border-amber-300 bg-white px-3 py-2 text-xs font-medium text-amber-900 hover:bg-amber-100">
                  <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" onChange={(e) => setCertFile(e.target.files[0]?.name)} />
                  <Paperclip className="h-3.5 w-3.5" />{certFile ? `Replace (${certFile})` : "Attach / replace certificate"}
                </label>
              </div>
            </>
          )}
        </div>
        <DialogFooter><Button variant="outline" onClick={onClose}>Cancel</Button><Button data-testid="btn-save-edit" onClick={save} className="bg-primary hover:bg-primary/90">Save changes</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const ResBox = ({ label, value, tone }) => {
  const cls = { emerald: "border-emerald-200 bg-emerald-50 text-emerald-800", rose: "border-rose-200 bg-rose-50 text-rose-800", amber: "border-amber-200 bg-amber-50 text-amber-800" }[tone] || "border-border";
  return (<div className={`rounded-md border p-4 ${cls}`}><div className="text-xs">{label}</div><div className="num mt-1 text-xl font-semibold">{value}</div></div>);
};
