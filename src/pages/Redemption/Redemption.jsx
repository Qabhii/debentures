// import React, { useState, useMemo, useEffect } from "react";
// import { PageHeader } from "@/components/common/PageHeader";
// import { SectionCard } from "@/components/common/SectionCard";
// import { StatusBadge } from "@/components/common/StatusBadge";
// import { EmptyState } from "@/components/common/EmptyState";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
// import { Textarea } from "@/components/ui/textarea";
// import { SERIES, REDEMPTION_TERMS, HOLDINGS, REDEMPTION_REQUESTS, CURRENT_USER } from "@/mock/data";
// import { inr, fmtDate, num } from "@/lib/format";
// import { redemptionService } from "@/services";
// import { toast } from "sonner";
// import { Search, Undo2, ShieldCheck, ShieldAlert, ShieldOff, Send, RotateCcw, Check, Lock, CalendarClock, ArrowRight } from "lucide-react";

// const monthsBetween = (from, to) => {
//   const a = new Date(from), b = new Date(to);
//   return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
// };

// // simple "today" for demo
// const TODAY = "2026-08-15";

// function validateRedemption({ holding, terms, units, type }) {
//   const errs = [];
//   if (!holding) errs.push("Please select an investor.");
//   if (holding && holding.outstandingUnits === 0) errs.push("This investor has no outstanding units to redeem.");
//   const n = Number(units);
//   if (!n || n <= 0) errs.push("Please enter a redemption quantity.");
//   if (holding && n > holding.outstandingUnits) errs.push("Redemption quantity cannot exceed outstanding units.");
//   if (terms && !terms.allowsPartial && type === "Partial") errs.push("This series does not permit partial redemption. Choose Full Redemption.");
//   if (terms && terms.minRedemptionUnits && n < terms.minRedemptionUnits && type === "Partial") errs.push(`Minimum redemption quantity is ${terms.minRedemptionUnits} units.`);
//   if (holding && terms) {
//     const monthsHeld = monthsBetween(holding.allotmentDate, TODAY);
//     if (monthsHeld < terms.lockInMonths) errs.push(`Investor is currently within the ${terms.lockInMonths}-month lock-in period (${monthsHeld} months held).`);
//   }
//   if (type === "Full" && holding && n !== holding.outstandingUnits) errs.push("Full redemption must equal the outstanding units.");
//   return errs;
// }

// export default function Redemption() {
//   const [series, setSeries] = useState(SERIES[0].id);
//   const [tab, setTab] = useState("new");
//   const [requests, setRequests] = useState(REDEMPTION_REQUESTS);
//   const [selected, setSelected] = useState(null);

//   return (
//     <div>
//       <PageHeader
//         title="Redemption"
//         subtitle="Process full and partial redemption requests against investor holdings before scheduled maturity. Approved redemptions update outstanding holdings and future interest eligibility."
//       />

//       <SectionCard title="Select NCD Series" description="Redemption is scoped to a specific NCD Series. Series-specific eligibility, lock-in and minimum-unit rules apply.">
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           <div>
//             <Label>NCD Series</Label>
//             <Select value={series} onValueChange={setSeries}>
//               <SelectTrigger data-testid="red-series"><SelectValue /></SelectTrigger>
//               <SelectContent>{SERIES.map((s) => (<SelectItem key={s.id} value={s.id}>{s.id} · {s.name}</SelectItem>))}</SelectContent>
//             </Select>
//           </div>
//         </div>
//         <TermsPanel seriesId={series} />
//       </SectionCard>

//       <div className="mt-6">
//         <Tabs value={tab} onValueChange={setTab}>
//           <TabsList>
//             <TabsTrigger value="new" data-testid="tab-new">New Request</TabsTrigger>
//             <TabsTrigger value="history" data-testid="tab-history">Redemption History</TabsTrigger>
//           </TabsList>

//           <TabsContent value="new" className="mt-6">
//             <NewRedemption
//               seriesId={series}
//               onSubmitted={(req) => { setRequests((rs) => [req, ...rs]); setTab("history"); }}
//             />
//           </TabsContent>

//           <TabsContent value="history" className="mt-6">
//             <HistoryTable
//               rows={requests.filter((r) => r.series === series)}
//               onOpen={(r) => setSelected(r)}
//               onApprove={(id) => {
//                 setRequests((rs) => rs.map((r) => r.id === id ? { ...r, status: "Approved", approvedBy: "Rohan Menon", approvedAt: TODAY } : r));
//                 toast.success(`${id} approved · outstanding holding and future interest eligibility updated.`);
//               }}
//               onReturn={(id, reason) => {
//                 setRequests((rs) => rs.map((r) => r.id === id ? { ...r, status: "Returned", returnedBy: "Rohan Menon", returnComment: reason } : r));
//                 toast.success(`${id} returned to maker.`);
//               }}
//             />
//           </TabsContent>
//         </Tabs>
//       </div>

//       <DetailDrawer request={selected} onClose={() => setSelected(null)} />
//     </div>
//   );
// }

// // ---------- Terms panel ----------
// function TermsPanel({ seriesId }) {
//   const terms = REDEMPTION_TERMS[seriesId];
//   if (!terms) return null;
//   const t = terms;
//   return (
//     <div className="mt-5 grid grid-cols-2 gap-3 rounded-md border border-border bg-secondary/30 p-4 md:grid-cols-5">
//       <Cell label="Maturity" value={fmtDate(t.maturityDate)} />
//       <Cell label="Lock-in" value={t.lockInMonths ? `${t.lockInMonths} months` : "None"} />
//       <Cell label="Min. Redemption" value={`${t.minRedemptionUnits} units`} />
//       <Cell label="Partial Redemption" value={t.allowsPartial ? "Allowed" : "Not allowed"} />
//       <Cell label="Face Value / Unit" value={inr(t.faceValue, { decimals: 0 })} />
//     </div>
//   );
// }
// const Cell = ({ label, value }) => (
//   <div><div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div><div className="mt-0.5 text-sm font-medium">{value}</div></div>
// );

// // ---------- New Redemption workflow ----------
// function NewRedemption({ seriesId, onSubmitted }) {
//   const terms = REDEMPTION_TERMS[seriesId];
//   const eligibleHoldings = useMemo(() => HOLDINGS.filter((h) => h.series === seriesId), [seriesId]);
//   const [q, setQ] = useState("");
//   const [holding, setHolding] = useState(null);
//   const [type, setType] = useState("Partial");
//   const [units, setUnits] = useState("");

//   useEffect(() => { setHolding(null); setQ(""); setUnits(""); setType("Partial"); }, [seriesId]);
//   useEffect(() => {
//     if (type === "Full" && holding) setUnits(String(holding.outstandingUnits));
//     if (type === "Partial") setUnits("");
//   }, [type, holding]);

//   const filtered = useMemo(() => eligibleHoldings.filter((h) =>
//     `${h.name} ${h.pan} ${h.folio}`.toLowerCase().includes(q.toLowerCase())
//   ), [eligibleHoldings, q]);

//   const nUnits = Number(units) || 0;
//   const remaining = holding ? holding.outstandingUnits - nUnits : 0;
//   const principal = terms ? terms.faceValue * nUnits : 0;

//   const errors = validateRedemption({ holding, terms, units, type });
//   const eligible = holding && errors.length === 0;

//   const submit = async () => {
//     if (!eligible) return;
//     const req = await redemptionService.createRedemptionRequest({
//       series: seriesId, investorId: holding.investorId, investor: holding.name, folio: holding.folio, pan: holding.pan,
//       type, requestDate: TODAY, redemptionDate: TODAY,
//       units: nUnits, faceValue: terms.faceValue, principal,
//       holdingBefore: holding.outstandingUnits, holdingAfter: remaining,
//       requestedBy: CURRENT_USER.name,
//     });
//     toast.success(`${req.id} submitted — pending approval.`);
//     onSubmitted(req);
//   };

//   return (
//     <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
//       <SectionCard className="lg:col-span-2" title="Select investor" description={`${eligibleHoldings.length} holding(s) in ${seriesId}`}>
//         <div className="relative mb-3">
//           <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//           <Input data-testid="red-search" className="pl-8" placeholder="Search name, PAN or folio…" value={q} onChange={(e) => setQ(e.target.value)} />
//         </div>
//         <ul className="max-h-96 space-y-1.5 overflow-y-auto pr-1">
//           {filtered.length === 0 && <li className="rounded-md border border-dashed border-border bg-secondary/40 p-4 text-center text-xs text-muted-foreground">No matching investors.</li>}
//           {filtered.map((h) => {
//             const active = holding?.id === h.id;
//             return (
//               <li key={h.id}>
//                 <button
//                   data-testid={`h-${h.id}`}
//                   onClick={() => setHolding(h)}
//                   className={`w-full rounded-md border p-3 text-left transition-colors ${active ? "border-primary bg-accent" : "border-border bg-white hover:border-slate-300"} ${h.outstandingUnits === 0 ? "opacity-60" : ""}`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="text-sm font-medium">{h.name}</div>
//                     <div className="num text-xs text-muted-foreground">{h.folio}</div>
//                   </div>
//                   <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
//                     <span className="num">{h.pan}</span>
//                     <span>Outstanding: <span className="num font-medium text-foreground">{num(h.outstandingUnits)}</span> / {num(h.originalUnits)}</span>
//                   </div>
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       </SectionCard>

//       <div className="lg:col-span-3 space-y-6">
//         {!holding ? (
//           <SectionCard title="Redemption request"><EmptyState icon={Undo2} title="Select an investor to begin." description="Only holdings from the selected series are shown." /></SectionCard>
//         ) : (
//           <>
//             <SectionCard title="Holding summary">
//               <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//                 <Cell label="Investor" value={holding.name} />
//                 <Cell label="Folio" value={holding.folio} />
//                 <Cell label="Allotment" value={fmtDate(holding.allotmentDate)} />
//                 <Cell label="PAN" value={holding.pan} />
//                 <Cell label="Original Units" value={num(holding.originalUnits)} />
//                 <Cell label="Outstanding Units" value={num(holding.outstandingUnits)} />
//                 <Cell label="Face Value" value={inr(terms.faceValue, { decimals: 0 })} />
//                 <Cell label="Outstanding Value" value={inr(terms.faceValue * holding.outstandingUnits, { compact: true })} />
//               </div>
//             </SectionCard>

//             <SectionCard title="Redemption type & quantity">
//               <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//                 {["Full", "Partial"].map((t) => (
//                   <button
//                     key={t}
//                     data-testid={`type-${t.toLowerCase()}`}
//                     disabled={t === "Partial" && !terms.allowsPartial}
//                     onClick={() => setType(t)}
//                     className={`rounded-md border p-4 text-left transition-colors ${type === t ? "border-primary bg-accent" : "border-border bg-white hover:border-slate-300"} disabled:cursor-not-allowed disabled:opacity-50`}
//                   >
//                     <div className="text-sm font-semibold">{t} Redemption</div>
//                     <div className="mt-1 text-xs text-muted-foreground">
//                       {t === "Full" ? "Redeem the entire outstanding holding." : "Redeem a specified number of units from the outstanding holding."}
//                     </div>
//                   </button>
//                 ))}
//               </div>

//               <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
//                 <div>
//                   <Label>Redemption Units</Label>
//                   <Input data-testid="red-units" className="num" type="number" min="0" value={units} onChange={(e) => setUnits(e.target.value)} disabled={type === "Full"} />
//                 </div>
//                 <div className="rounded-md border border-border bg-secondary/40 p-3 text-xs">
//                   <div className="text-muted-foreground">Outstanding → Remaining</div>
//                   <div className="mt-1 flex items-center gap-2 text-sm">
//                     <span className="num font-semibold">{num(holding.outstandingUnits)}</span>
//                     <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
//                     <span className="num font-semibold text-primary">{num(remaining)}</span>
//                   </div>
//                 </div>
//                 <div className="rounded-md border border-border bg-secondary/40 p-3 text-xs">
//                   <div className="text-muted-foreground">Redemption Principal</div>
//                   <div className="num mt-1 text-sm font-semibold">{inr(principal)}</div>
//                   <div className="mt-0.5 text-[11px] text-muted-foreground">Face Value × Units (preview)</div>
//                 </div>
//               </div>

//               {/* Validation & Eligibility */}
//               <div className={`mt-5 rounded-md border p-3 text-sm ${eligible ? "border-emerald-200 bg-emerald-50 text-emerald-900" : errors.length ? "border-rose-200 bg-rose-50 text-rose-900" : "border-border bg-secondary/40"}`}>
//                 <div className="flex items-center gap-2 font-medium">
//                   {eligible ? <ShieldCheck className="h-4 w-4" /> : errors.length ? <ShieldOff className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />}
//                   {eligible ? "Eligible for Redemption" : errors.length ? "Redemption Not Eligible" : "Enter redemption details"}
//                   {monthsBetween(holding.allotmentDate, TODAY) < terms.lockInMonths && (
//                     <span className="ml-2 inline-flex items-center gap-1 rounded bg-white px-1.5 py-0.5 text-[10px] font-semibold uppercase text-rose-700 ring-1 ring-inset ring-rose-200"><Lock className="h-3 w-3" />Lock-in</span>
//                   )}
//                   {new Date(TODAY) < new Date(terms.maturityDate) && eligible && (
//                     <span className="ml-2 inline-flex items-center gap-1 rounded bg-white px-1.5 py-0.5 text-[10px] font-semibold uppercase text-indigo-700 ring-1 ring-inset ring-indigo-200"><CalendarClock className="h-3 w-3" />Pre-Maturity Redemption</span>
//                   )}
//                 </div>
//                 {errors.length > 0 && (<ul className="mt-2 list-disc pl-5 text-xs">{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>)}
//               </div>
//             </SectionCard>

//             <SectionCard title="Review & submit">
//               <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//                 <Cell label="Series" value={seriesId} />
//                 <Cell label="Type" value={<TypePill type={type} />} />
//                 <Cell label="Redemption Units" value={num(nUnits)} />
//                 <Cell label="Remaining Units" value={num(remaining)} />
//                 <Cell label="Face Value" value={inr(terms.faceValue, { decimals: 0 })} />
//                 <Cell label="Principal" value={inr(principal)} />
//                 <Cell label="Redemption Date" value={fmtDate(TODAY)} />
//                 <Cell label="Eligibility" value={eligible ? <span className="text-emerald-700">Eligible</span> : <span className="text-rose-700">Not eligible</span>} />
//               </div>
//               <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
//                 <div className="text-xs text-muted-foreground">On approval, outstanding units become <span className="num font-medium text-foreground">{num(remaining)}</span> and future interest eligibility is updated.</div>
//                 <Button data-testid="btn-submit-redemption" onClick={submit} disabled={!eligible} className="bg-primary hover:bg-primary/90"><Send className="mr-2 h-4 w-4" />Submit Redemption Request</Button>
//               </div>
//             </SectionCard>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// const TypePill = ({ type }) => (
//   <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase ring-1 ring-inset ${type === "Full" ? "bg-indigo-50 text-indigo-700 ring-indigo-200" : "bg-amber-50 text-amber-800 ring-amber-200"}`}>{type}</span>
// );

// // ---------- History table ----------
// function HistoryTable({ rows, onOpen, onApprove, onReturn }) {
//   const [returnFor, setReturnFor] = useState(null);
//   const [reason, setReason] = useState("");

//   return (
//     <SectionCard title="Redemption history" description="Every request and its lifecycle event. Click any row for full details.">
//       {rows.length === 0 ? (
//         <EmptyState icon={Undo2} title="No redemption requests for this series yet." description="Create a new request from the New Request tab." />
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
//               <tr>
//                 <th className="px-4 py-3">Redemption ID</th>
//                 <th className="px-4 py-3">Investor</th>
//                 <th className="px-4 py-3">Type</th>
//                 <th className="px-4 py-3">Request Date</th>
//                 <th className="px-4 py-3">Redemption Date</th>
//                 <th className="px-4 py-3 text-right">Units</th>
//                 <th className="px-4 py-3 text-right">Principal</th>
//                 <th className="px-4 py-3">Requested By</th>
//                 <th className="px-4 py-3">Status</th>
//                 <th className="px-4 py-3"></th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-border">
//               {rows.map((r) => {
//                 const isMaker = r.requestedBy === CURRENT_USER.name;
//                 const pending = r.status === "Pending Approval";
//                 return (
//                   <tr key={r.id} className="row-hover cursor-pointer" data-testid={`red-row-${r.id}`} onClick={() => onOpen(r)}>
//                     <td className="px-4 py-3 num font-medium text-primary hover:underline">{r.id}</td>
//                     <td className="px-4 py-3"><div className="font-medium">{r.investor}</div><div className="num text-[11px] text-muted-foreground">{r.folio} · {r.pan}</div></td>
//                     <td className="px-4 py-3"><TypePill type={r.type} /></td>
//                     <td className="px-4 py-3 num text-xs">{fmtDate(r.requestDate)}</td>
//                     <td className="px-4 py-3 num text-xs">{fmtDate(r.redemptionDate)}</td>
//                     <td className="px-4 py-3 num text-right">{num(r.units)}</td>
//                     <td className="px-4 py-3 num text-right font-medium">{inr(r.principal)}</td>
//                     <td className="px-4 py-3 text-xs">{r.requestedBy}</td>
//                     <td className="px-4 py-3"><StatusBadge>{r.status}</StatusBadge></td>
//                     <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
//                       {pending && (
//                         <div className="flex gap-1.5">
//                           {isMaker ? (
//                             <span className="rounded bg-amber-50 px-2 py-1 text-[10px] font-medium text-amber-900 ring-1 ring-inset ring-amber-200">Maker-checker</span>
//                           ) : (
//                             <>
//                               <Button size="sm" variant="outline" className="h-7" data-testid={`btn-return-${r.id}`} onClick={() => setReturnFor(r)}><RotateCcw className="mr-1 h-3 w-3" />Return</Button>
//                               <Button size="sm" className="h-7 bg-primary hover:bg-primary/90" data-testid={`btn-approve-${r.id}`} onClick={() => onApprove(r.id)}><Check className="mr-1 h-3 w-3" />Approve</Button>
//                             </>
//                           )}
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <Dialog open={!!returnFor} onOpenChange={(o) => !o && setReturnFor(null)}>
//         <DialogContent>
//           <DialogHeader><DialogTitle>Return {returnFor?.id}</DialogTitle><DialogDescription>Provide a reason. The maker will be notified.</DialogDescription></DialogHeader>
//           <Textarea data-testid="red-return-reason" rows={4} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Explain what needs to change…" />
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setReturnFor(null)}>Cancel</Button>
//             <Button variant="destructive" data-testid="btn-confirm-return-red" onClick={() => { if (!reason.trim()) return toast.error("Reason is required."); onReturn(returnFor.id, reason); setReturnFor(null); setReason(""); }}>Return request</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </SectionCard>
//   );
// }

// // ---------- Detail drawer ----------
// function DetailDrawer({ request, onClose }) {
//   if (!request) return null;
//   const terms = REDEMPTION_TERMS[request.series];
//   return (
//     <Sheet open={!!request} onOpenChange={(o) => !o && onClose()}>
//       <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
//         <SheetHeader>
//           <SheetTitle>{request.id}</SheetTitle>
//           <SheetDescription>{request.investor} · {request.series} · <StatusBadge>{request.status}</StatusBadge></SheetDescription>
//         </SheetHeader>

//         <div className="mt-6 space-y-5 text-sm">
//           <Group title="Request Information">
//             <Row k="Type" v={<TypePill type={request.type} />} />
//             <Row k="Request Date" v={fmtDate(request.requestDate)} />
//             <Row k="Redemption Date" v={fmtDate(request.redemptionDate)} />
//             <Row k="Requested By" v={request.requestedBy} />
//           </Group>
//           <Group title="Investor Information">
//             <Row k="Investor" v={request.investor} />
//             <Row k="Folio" v={request.folio} />
//             <Row k="PAN" v={request.pan} />
//           </Group>
//           <Group title="Series Information">
//             <Row k="Series" v={request.series} />
//             <Row k="Maturity" v={fmtDate(terms?.maturityDate)} />
//             <Row k="Face Value" v={inr(request.faceValue, { decimals: 0 })} />
//             <Row k="Lock-in" v={terms?.lockInMonths ? `${terms.lockInMonths} months` : "None"} />
//           </Group>
//           <Group title="Redemption Request">
//             <Row k="Redemption Units" v={num(request.units)} />
//             <Row k="Redemption Principal" v={inr(request.principal)} />
//           </Group>
//           <Group title="Holding Impact">
//             <Row k="Holding Before" v={`${num(request.holdingBefore)} units`} />
//             <Row k="Holding After" v={`${num(request.holdingAfter)} units`} />
//             <Row k="Future Interest Eligibility" v={`${num(request.holdingAfter)} units`} />
//             <Row k="Future Payment Impact" v={`Monthly calc will use ${num(request.holdingAfter)} units`} />
//           </Group>
//           {request.status === "Approved" && (
//             <Group title="Approval Information">
//               <Row k="Approved By" v={request.approvedBy} />
//               <Row k="Approved At" v={fmtDate(request.approvedAt)} />
//             </Group>
//           )}
//           {request.status === "Returned" && (
//             <Group title="Return Information">
//               <Row k="Returned By" v={request.returnedBy} />
//               <Row k="Reason" v={request.returnComment} />
//             </Group>
//           )}
//           <Group title="Audit Trail">
//             <div className="text-xs text-muted-foreground">All lifecycle events on this redemption also appear under Audit & Historical, linked by the redemption ID.</div>
//           </Group>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }
// const Group = ({ title, children }) => (
//   <div>
//     <div className="mb-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{title}</div>
//     <div className="rounded-md border border-border">{children}</div>
//   </div>
// );
// const Row = ({ k, v }) => (
//   <div className="flex items-center justify-between border-b border-border px-3 py-2 text-sm last:border-b-0">
//     <span className="text-muted-foreground">{k}</span>
//     <span className="num text-right font-medium">{v}</span>
//   </div>
// );



//frontend/src/pages/Redemption/Redemption.jsx
import React, { useState, useMemo } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { SERIES, REDEMPTION_TERMS, REDEMPTION_REQUESTS, CURRENT_USER } from "@/mock/data";
import { inr, fmtDate, num } from "@/lib/format";
import { redemptionService } from "@/services";
import { toast } from "sonner";
import { CalendarClock, Download, Send, RotateCcw, Check, Undo2, ShieldAlert } from "lucide-react";

const TODAY = "2027-05-01"; // demo "now" — A1 (matures 2027-04-15) is eligible

export default function Redemption() {
  const [series, setSeries] = useState(SERIES[0].id);
  const [tab, setTab] = useState("new");
  const [requests, setRequests] = useState(REDEMPTION_REQUESTS);
  const [selected, setSelected] = useState(null);

  const terms = REDEMPTION_TERMS[series];
  const isMatured = terms && TODAY >= terms.maturityDate;
  const totalFaceValue = terms ? terms.totalUnits * terms.faceValue : 0;
  const netPayable = terms ? totalFaceValue + terms.grossInterest - terms.tds : 0;

  const submit = async () => {
    const req = await redemptionService.submitForApproval({
      series, maturityDate: terms.maturityDate, totalUnits: terms.totalUnits, faceValue: terms.faceValue,
      totalFaceValue, grossInterest: terms.grossInterest, tds: terms.tds, netPayable,
      requestDate: TODAY, requestedBy: CURRENT_USER.name,
    });
    setRequests((rs) => [req, ...rs]);
    toast.success("Redemption request submitted for approval.");
    setTab("history");
  };
  const download = async () => { await redemptionService.downloadRedemptionFile(series); toast.success(`${series} · redemption file requested.`); };

  return (
    <div>
      <PageHeader title="Redemption" subtitle="Process scheduled maturity redemption for an NCD Series and submit the redemption amount for approval." />

      <SectionCard title="Select NCD Series" description="Redemption is scoped to a specific NCD Series and is triggered by the scheduled maturity date.">
        <div className="max-w-md">
          <Label>NCD Series</Label>
          <Select value={series} onValueChange={setSeries}>
            <SelectTrigger data-testid="red-series"><SelectValue /></SelectTrigger>
            <SelectContent>{SERIES.map((s) => (<SelectItem key={s.id} value={s.id}>{s.id} · {s.name}</SelectItem>))}</SelectContent>
          </Select>
        </div>
        {terms && (
          <div className="mt-5 grid grid-cols-3 gap-3 rounded-md border border-border bg-secondary/30 p-4">
            <Cell label="Maturity" value={fmtDate(terms.maturityDate)} />
            <Cell label="Lock-in" value={terms.lockInMonths ? `${terms.lockInMonths} months` : "None"} />
            <Cell label="Face Value / Unit" value={inr(terms.faceValue, { decimals: 0 })} />
          </div>
        )}
      </SectionCard>

      <div className="mt-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="new" data-testid="tab-new">New Redemption</TabsTrigger>
            <TabsTrigger value="history" data-testid="tab-history">Redemption History</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="mt-6">
            {!terms ? (
              <SectionCard><EmptyState icon={Undo2} title="Select an NCD Series to begin." /></SectionCard>
            ) : !isMatured ? (
              <SectionCard title="Scheduled maturity redemption">
                <div className="flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  <CalendarClock className="mt-0.5 h-4 w-4 shrink-0" />
                  <div>
                    <div className="font-medium">Redemption will be available on the scheduled maturity date.</div>
                    <div className="text-xs">Maturity date: <span className="num font-medium">{fmtDate(terms.maturityDate)}</span></div>
                  </div>
                </div>
              </SectionCard>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                <SectionCard className="lg:col-span-3" title="Series Redemption Summary" description="Applies to the entire outstanding series at scheduled maturity.">
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    <Cell label="Series" value={series} />
                    <Cell label="Maturity Date" value={fmtDate(terms.maturityDate)} />
                    <Cell label="Total Outstanding Units" value={num(terms.totalUnits)} />
                    <Cell label="Face Value / Unit" value={inr(terms.faceValue, { decimals: 0 })} />
                    <Cell label="Total Face Value" value={inr(totalFaceValue)} />
                    <Cell label="Net Redemption Payable" value={<span className="text-primary">{inr(netPayable, { compact: true })}</span>} />
                  </div>
                </SectionCard>

                <SectionCard className="lg:col-span-2" title="Financial breakdown">
                  <ul className="space-y-2 text-sm">
                    <Line label="Total Face Value" value={inr(totalFaceValue)} />
                    <Line label="+ Gross Interest" value={inr(terms.grossInterest)} tone="pos" />
                    <Line label="− TDS" value={inr(terms.tds)} tone="neg" />
                  </ul>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Net Redemption Payable</div>
                    <div className="num text-2xl font-semibold text-primary">{inr(netPayable)}</div>
                  </div>
                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <Button data-testid="btn-download-red" variant="outline" onClick={download}><Download className="mr-2 h-4 w-4" />Download Redemption File</Button>
                    <Button data-testid="btn-submit-red" onClick={submit} disabled={!isMatured} className="bg-primary hover:bg-primary/90"><Send className="mr-2 h-4 w-4" />Submit for Approval</Button>
                  </div>
                  <div className="mt-3 flex items-start gap-2 rounded-md border border-border bg-secondary/40 p-3 text-[11px] text-muted-foreground">
                    <ShieldAlert className="mt-0.5 h-3 w-3 shrink-0" />
                    <span>Download the redemption file to verify the amount before submitting. Submission routes the request through the maker-checker approval workflow.</span>
                  </div>
                </SectionCard>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <HistoryTable
              rows={requests.filter((r) => r.series === series)}
              onOpen={(r) => setSelected(r)}
              onApprove={(id) => { setRequests((rs) => rs.map((r) => r.id === id ? { ...r, status: "Approved", approvedBy: "Rohan Menon", approvedAt: TODAY } : r)); toast.success(`${id} approved.`); }}
              onReturn={(id, reason) => { setRequests((rs) => rs.map((r) => r.id === id ? { ...r, status: "Returned", returnedBy: "Rohan Menon", returnComment: reason } : r)); toast.success(`${id} returned to maker.`); }}
            />
          </TabsContent>
        </Tabs>
      </div>

      <DetailDrawer request={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

const Cell = ({ label, value }) => (
  <div><div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div><div className="num mt-1 text-sm font-medium">{value}</div></div>
);
const Line = ({ label, value, tone }) => (
  <li className="flex items-center justify-between">
    <span className={`text-xs ${tone === "pos" ? "text-emerald-700" : tone === "neg" ? "text-rose-700" : "text-muted-foreground"}`}>{label}</span>
    <span className="num text-sm font-medium">{value}</span>
  </li>
);

function HistoryTable({ rows, onOpen, onApprove, onReturn }) {
  const [returnFor, setReturnFor] = useState(null);
  const [reason, setReason] = useState("");
  return (
    <SectionCard title="Redemption history" description="Series-level history. Click any row for full details.">
      {rows.length === 0 ? (
        <EmptyState icon={Undo2} title="No redemption requests for this series yet." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Redemption ID</th>
                <th className="px-4 py-3">Series</th>
                <th className="px-4 py-3">Maturity</th>
                <th className="px-4 py-3 text-right">Total Units</th>
                <th className="px-4 py-3 text-right">Total Face Value</th>
                <th className="px-4 py-3 text-right">Gross Interest</th>
                <th className="px-4 py-3 text-right">TDS</th>
                <th className="px-4 py-3 text-right">Net Payable</th>
                <th className="px-4 py-3">Request Date</th>
                <th className="px-4 py-3">Submitted By</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => {
                const isMaker = r.requestedBy === CURRENT_USER.name;
                const pending = r.status === "Pending Approval";
                return (
                  <tr key={r.id} className="row-hover cursor-pointer" data-testid={`red-row-${r.id}`} onClick={() => onOpen(r)}>
                    <td className="px-4 py-3 num font-medium text-primary hover:underline">{r.id}</td>
                    <td className="px-4 py-3 num text-xs">{r.series}</td>
                    <td className="px-4 py-3 num text-xs">{fmtDate(r.maturityDate)}</td>
                    <td className="px-4 py-3 num text-right">{num(r.totalUnits)}</td>
                    <td className="px-4 py-3 num text-right">{inr(r.totalFaceValue)}</td>
                    <td className="px-4 py-3 num text-right">{inr(r.grossInterest)}</td>
                    <td className="px-4 py-3 num text-right text-muted-foreground">{inr(r.tds)}</td>
                    <td className="px-4 py-3 num text-right font-medium">{inr(r.netPayable)}</td>
                    <td className="px-4 py-3 num text-xs">{fmtDate(r.requestDate)}</td>
                    <td className="px-4 py-3 text-xs">{r.requestedBy}</td>
                    <td className="px-4 py-3"><StatusBadge>{r.status}</StatusBadge></td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      {pending && (isMaker ? (
                        <span className="rounded bg-amber-50 px-2 py-1 text-[10px] font-medium text-amber-900 ring-1 ring-inset ring-amber-200">Maker-checker</span>
                      ) : (
                        <div className="flex gap-1.5">
                          <Button size="sm" variant="outline" className="h-7" data-testid={`btn-return-${r.id}`} onClick={() => setReturnFor(r)}><RotateCcw className="mr-1 h-3 w-3" />Return</Button>
                          <Button size="sm" className="h-7 bg-primary hover:bg-primary/90" data-testid={`btn-approve-${r.id}`} onClick={() => onApprove(r.id)}><Check className="mr-1 h-3 w-3" />Approve</Button>
                        </div>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <Dialog open={!!returnFor} onOpenChange={(o) => !o && setReturnFor(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Return {returnFor?.id}</DialogTitle><DialogDescription>Provide a reason. The maker will be notified.</DialogDescription></DialogHeader>
          <Textarea data-testid="red-return-reason" rows={4} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Explain what needs to change…" />
          <DialogFooter>
            <Button variant="outline" onClick={() => setReturnFor(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => { if (!reason.trim()) return toast.error("Reason is required."); onReturn(returnFor.id, reason); setReturnFor(null); setReason(""); }}>Return request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SectionCard>
  );
}

function DetailDrawer({ request, onClose }) {
  if (!request) return null;
  const terms = REDEMPTION_TERMS[request.series];
  return (
    <Sheet open={!!request} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{request.id}</SheetTitle>
          <SheetDescription>{request.series} · <StatusBadge>{request.status}</StatusBadge></SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-5 text-sm">
          <Group title="Request Information">
            <Row k="Request Date" v={fmtDate(request.requestDate)} />
            <Row k="Status" v={<StatusBadge>{request.status}</StatusBadge>} />
            <Row k="Requested By" v={request.requestedBy} />
          </Group>
          <Group title="Series Information">
            <Row k="Series" v={request.series} />
            <Row k="Maturity" v={fmtDate(request.maturityDate)} />
            <Row k="Lock-in" v={terms?.lockInMonths ? `${terms.lockInMonths} months` : "None"} />
            <Row k="Face Value / Unit" v={inr(request.faceValue, { decimals: 0 })} />
          </Group>
          <Group title="Redemption Summary">
            <Row k="Total Outstanding Units" v={num(request.totalUnits)} />
            <Row k="Total Face Value" v={inr(request.totalFaceValue)} />
          </Group>
          <Group title="Financial Breakdown">
            <Row k="Gross Interest" v={inr(request.grossInterest)} />
            <Row k="TDS" v={inr(request.tds)} />
            <Row k="Net Redemption Payable" v={<span className="text-primary">{inr(request.netPayable)}</span>} />
          </Group>
          {request.status === "Approved" && (
            <Group title="Approval Information">
              <Row k="Approved By" v={request.approvedBy} />
              <Row k="Approved At" v={fmtDate(request.approvedAt)} />
            </Group>
          )}
          {request.status === "Returned" && (
            <Group title="Return Information">
              <Row k="Returned By" v={request.returnedBy} />
              <Row k="Reason" v={request.returnComment} />
            </Group>
          )}
          <Group title="Audit Trail">
            <div className="px-3 py-2 text-xs text-muted-foreground">All lifecycle events for this redemption also appear under Audit &amp; Historical, linked by the redemption ID.</div>
          </Group>
        </div>
      </SheetContent>
    </Sheet>
  );
}
const Group = ({ title, children }) => (
  <div>
    <div className="mb-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{title}</div>
    <div className="rounded-md border border-border">{children}</div>
  </div>
);
const Row = ({ k, v }) => (
  <div className="flex items-center justify-between border-b border-border px-3 py-2 text-sm last:border-b-0">
    <span className="text-muted-foreground">{k}</span>
    <span className="num text-right font-medium">{v}</span>
  </div>
);

  

