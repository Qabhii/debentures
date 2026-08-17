import React, { useState, useMemo } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AUDIT_LOG } from "@/mock/data";
import { fmtDate } from "@/lib/format";
import { Search, Download, Lock } from "lucide-react";
import { auditService } from "@/services";
import { toast } from "sonner";

const ACTIONS = ["all", ...Array.from(new Set(AUDIT_LOG.map((a) => a.action)))];

export default function AuditLog() {
  const [q, setQ] = useState("");
  const [action, setAction] = useState("all");
  const [selected, setSelected] = useState(null);

  const rows = useMemo(() => AUDIT_LOG.filter((a) =>
    (action === "all" || a.action === action) &&
    `${a.user} ${a.entity} ${a.description}`.toLowerCase().includes(q.toLowerCase())
  ), [q, action]);

  return (
    <div>
      <PageHeader
        title="Audit & Historical Records"
        subtitle="Immutable, append-only log of every action performed in the system."
        meta={<><Lock className="h-3.5 w-3.5" /><span>Records cannot be edited or deleted</span></>}
        actions={<Button variant="outline" onClick={() => auditService.exportAuditLog().then(() => toast.success("Audit export requested."))}><Download className="mr-2 h-4 w-4" />Export</Button>}
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input data-testid="audit-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search user, entity, description" className="w-80 bg-white pl-8" />
        </div>
        <Select value={action} onValueChange={setAction}>
          <SelectTrigger data-testid="audit-action-filter" className="w-56 bg-white"><SelectValue placeholder="All actions" /></SelectTrigger>
          <SelectContent>{ACTIONS.map((a) => (<SelectItem key={a} value={a}>{a === "all" ? "All actions" : a}</SelectItem>))}</SelectContent>
        </Select>
      </div>

      <SectionCard padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-3">Timestamp</th><th className="px-4 py-3">User</th><th className="px-4 py-3">Action</th><th className="px-4 py-3">Entity</th><th className="px-4 py-3">Series</th><th className="px-4 py-3">Description</th><th className="px-4 py-3">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((a) => (
                <tr key={a.id} className="row-hover cursor-pointer" onClick={() => setSelected(a)} data-testid={`audit-row-${a.id}`}>
                  <td className="px-4 py-3 num text-xs">{fmtDate(a.ts)}</td>
                  <td className="px-4 py-3 text-xs font-medium">{a.user}</td>
                  <td className="px-4 py-3 text-xs">{a.action}</td>
                  <td className="px-4 py-3 num text-xs">{a.entity}</td>
                  <td className="px-4 py-3 num text-xs">{a.series}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground truncate max-w-md">{a.description}</td>
                  <td className="px-4 py-3"><StatusBadge>{a.status}</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{selected?.action}</SheetTitle>
            <SheetDescription>Immutable audit entry · {selected?.id}</SheetDescription>
          </SheetHeader>
          {selected && (
            <div className="mt-6 space-y-4 text-sm">
              <Row k="Who" v={selected.user} />
              <Row k="When" v={fmtDate(selected.ts)} mono />
              <Row k="What" v={selected.action} />
              <Row k="Entity" v={selected.entity} mono />
              <Row k="Series" v={selected.series} mono />
              {selected.before && <Row k="Before" v={selected.before} mono />}
              {selected.after && <Row k="After" v={selected.after} mono />}
              {selected.reason && <Row k="Reason" v={selected.reason} />}
              <div className="rounded-md border border-border bg-secondary/40 p-3 text-xs">
                <div className="mb-1 font-medium">Description</div>
                <div className="text-muted-foreground">{selected.description}</div>
              </div>
              <div className="flex items-center gap-2 rounded-md border border-indigo-200 bg-indigo-50 p-3 text-xs text-indigo-900">
                <Lock className="h-3.5 w-3.5" /><span>Immutable record · cannot be edited or deleted.</span>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
const Row = ({ k, v, mono }) => (
  <div className="grid grid-cols-3 items-start gap-3 border-b border-border pb-3">
    <div className="text-xs uppercase tracking-widest text-muted-foreground">{k}</div>
    <div className={`col-span-2 ${mono ? "num" : ""} text-sm`}>{v}</div>
  </div>
);
