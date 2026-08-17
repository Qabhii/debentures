import React, { useMemo, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { REPORTS, MONTHLY_CALCS, monthLabel } from "@/mock/data";
import { Download, Wallet, Receipt, TrendingUp, ChevronRight, ChevronDown, FileSpreadsheet } from "lucide-react";
import { reportService } from "@/services";
import { toast } from "sonner";
import { inr } from "@/lib/format";

const FYs = ["FY 2026-27", "FY 2025-26"];
const QUARTER_OPTS = ["ALL", "Q1", "Q2", "Q3", "Q4"];

// --- Helpers -----------------------------------------------
const parseMonthKey = (key) => {
  const [y, m] = key.split("-").map(Number);
  return { year: y, month: m };
};
const monthToQuarter = (m) => (m >= 4 && m <= 6 ? "Q1" : m >= 7 && m <= 9 ? "Q2" : m >= 10 && m <= 12 ? "Q3" : "Q4");
const monthFY = (y, m) => {
  const start = m >= 4 ? y : y - 1;
  return `FY ${start}-${String(start + 1).slice(2)}`;
};
const quarterMonths = (fy, q) => {
  // fy like "FY 2026-27" -> startYear 2026
  const start = Number(fy.match(/(\d{4})/)[1]);
  const map = {
    Q1: [[start, 4], [start, 5], [start, 6]],
    Q2: [[start, 7], [start, 8], [start, 9]],
    Q3: [[start, 10], [start, 11], [start, 12]],
    Q4: [[start + 1, 1], [start + 1, 2], [start + 1, 3]],
  };
  return (map[q] || []).map(([y, m]) => `${y}-${String(m).padStart(2, "0")}`);
};
const aggregate = (rows) => rows.reduce((a, r) => ({ gross: a.gross + r.gross, tds: a.tds + r.tds, net: a.net + r.net, runs: a.runs + 1 }), { gross: 0, tds: 0, net: 0, runs: 0 });

export default function Reports() {
  const [fy, setFy] = useState("FY 2026-27");
  const [quarter, setQuarter] = useState("ALL");
  const [type, setType] = useState("all");

  // FY-level rows across MONTHLY_CALCS
  const fyRows = useMemo(() => MONTHLY_CALCS.filter((c) => {
    const { year, month } = parseMonthKey(c.month);
    return monthFY(year, month) === fy;
  }), [fy]);

  const quarterBreakdown = useMemo(() => {
    return ["Q1", "Q2", "Q3", "Q4"].map((q) => {
      const months = quarterMonths(fy, q);
      const rows = fyRows.filter((r) => months.includes(r.month));
      return { quarter: q, months, ...aggregate(rows) };
    });
  }, [fyRows, fy]);

  const fyTotals = useMemo(() => aggregate(fyRows), [fyRows]);

  const selectedQuarterRows = useMemo(() => {
    if (quarter === "ALL") return fyRows;
    const months = quarterMonths(fy, quarter);
    return fyRows.filter((r) => months.includes(r.month));
  }, [quarter, fy, fyRows]);
  const selectedTotals = useMemo(() => aggregate(selectedQuarterRows), [selectedQuarterRows]);

  const filteredReports = useMemo(() =>
    REPORTS.filter((r) => (fy === "all" || r.fy === fy) && (quarter === "ALL" || r.quarter === quarter) && (type === "all" || r.name === type)),
    [fy, quarter, type]
  );

  const [expanded, setExpanded] = useState({});
  const toggleExpanded = (id) => setExpanded((e) => ({ ...e, [id]: !e[id] }));

  const download = async (r) => {
    if (r.name.includes("Payment")) await reportService.downloadPaymentSummary(r.id);
    else await reportService.downloadTDSReport(r.id);
    toast.success(`${r.id} download requested.`);
  };

  const downloadMonth = async (r, monthKey) => {
    const id = `${r.id}/${monthKey}`;
    if (r.name.includes("Payment")) await reportService.downloadPaymentSummary(id);
    else await reportService.downloadTDSReport(id);
    toast.success(`${monthLabel(monthKey)} · ${r.name} requested.`);
  };

  return (
    <div>
      <PageHeader title="Reports" subtitle="Quarterly Payment Summary and TDS reports. Choose 'All Quarters' to see the full financial-year total with a quarter-wise breakdown." />

      <SectionCard title="Filters">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <Label>Financial Year</Label>
            <Select value={fy} onValueChange={setFy}>
              <SelectTrigger data-testid="rpt-fy"><SelectValue /></SelectTrigger>
              <SelectContent>{FYs.map((f) => (<SelectItem key={f} value={f}>{f}</SelectItem>))}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>Quarter</Label>
            <Select value={quarter} onValueChange={setQuarter}>
              <SelectTrigger data-testid="rpt-quarter"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Quarters · Full FY view</SelectItem>
                <SelectItem value="Q1">Q1 · Apr – Jun</SelectItem>
                <SelectItem value="Q2">Q2 · Jul – Sep</SelectItem>
                <SelectItem value="Q3">Q3 · Oct – Dec</SelectItem>
                <SelectItem value="Q4">Q4 · Jan – Mar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Report Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger data-testid="rpt-type"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All report types</SelectItem>
                <SelectItem value="Payment Summary Report">Payment Summary Report</SelectItem>
                <SelectItem value="TDS Report">TDS Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SectionCard>

      {/* Full-FY view */}
      {quarter === "ALL" && (
        <>
          <div className="mt-6">
            <SectionCard title={`${fy} · Full year totals`} description="Aggregate across Q1–Q4 of the selected financial year.">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <BigTile icon={TrendingUp} label="Gross Interest (FY)" value={inr(fyTotals.gross, { compact: true })} />
                <BigTile icon={Receipt} label="Total TDS (FY)" value={inr(fyTotals.tds, { compact: true })} highlight />
                <BigTile icon={Wallet} label="Net Payable (FY)" value={inr(fyTotals.net, { compact: true })} />
                <BigTile label="Total Runs" value={fyTotals.runs} plain />
              </div>
            </SectionCard>
          </div>

          <div className="mt-6">
            <SectionCard title="Quarter-wise breakdown" description="Each quarter aggregates its 3 monthly runs.">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                {quarterBreakdown.map((q) => (
                  <div key={q.quarter} className={`rounded-lg border p-4 card-lift cursor-pointer ${q.runs > 0 ? "border-border bg-white" : "border-dashed border-border bg-secondary/40"}`}
                       onClick={() => q.runs > 0 && setQuarter(q.quarter)} data-testid={`q-card-${q.quarter}`}>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-foreground">{q.quarter}</div>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{q.runs} run{q.runs !== 1 ? "s" : ""}</span>
                    </div>
                    <div className="mt-3 space-y-1.5">
                      <Line label="Gross" value={inr(q.gross)} />
                      <Line label="TDS" value={inr(q.tds)} strong />
                      <Line label="Net" value={inr(q.net)} muted />
                    </div>
                    <div className="mt-3 text-[11px] text-muted-foreground">
                      {q.months.map((m) => monthLabel(m)).join(" · ")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Compact table view */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3">Quarter</th>
                      <th className="px-4 py-3">Months</th>
                      <th className="px-4 py-3 text-right">Gross Interest</th>
                      <th className="px-4 py-3 text-right">TDS</th>
                      <th className="px-4 py-3 text-right">Net Payable</th>
                      <th className="px-4 py-3 text-right">Runs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {quarterBreakdown.map((q) => (
                      <tr key={q.quarter} className="row-hover">
                        <td className="px-4 py-3 font-medium">{q.quarter}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{q.months.map(monthLabel).join(", ")}</td>
                        <td className="px-4 py-3 num text-right">{inr(q.gross)}</td>
                        <td className="px-4 py-3 num text-right font-semibold text-primary">{inr(q.tds)}</td>
                        <td className="px-4 py-3 num text-right">{inr(q.net)}</td>
                        <td className="px-4 py-3 num text-right">{q.runs}</td>
                      </tr>
                    ))}
                    <tr className="bg-accent/50">
                      <td className="px-4 py-3 font-semibold text-primary">FY Total</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{fy}</td>
                      <td className="px-4 py-3 num text-right font-semibold">{inr(fyTotals.gross)}</td>
                      <td className="px-4 py-3 num text-right font-semibold text-primary">{inr(fyTotals.tds)}</td>
                      <td className="px-4 py-3 num text-right font-semibold">{inr(fyTotals.net)}</td>
                      <td className="px-4 py-3 num text-right font-semibold">{fyTotals.runs}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">Tip: click a quarter card to drill in.</div>
            </SectionCard>
          </div>
        </>
      )}

      {/* Specific quarter view */}
      {quarter !== "ALL" && (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SectionCard title="Payment Summary Report" description={`${fy} · ${quarter} · aggregate view`}>
            <div className="grid grid-cols-3 gap-3">
              <Tile label="Gross Interest" value={inr(selectedTotals.gross, { compact: true })} />
              <Tile label="Net Payable" value={inr(selectedTotals.net, { compact: true })} />
              <Tile label="Months" value={quarterMonths(fy, quarter).length} />
            </div>
            <div className="mt-4 text-xs text-muted-foreground">Includes: {quarterMonths(fy, quarter).map(monthLabel).join(", ")}</div>
          </SectionCard>

          <SectionCard title="TDS Report" description={`${fy} · ${quarter} · monthly TDS obligation`}>
            <div className="grid grid-cols-3 gap-3">
              <Tile label="Total TDS" value={inr(selectedTotals.tds, { compact: true })} highlight />
              <Tile label="Months" value={quarterMonths(fy, quarter).length} />
              <Tile label="Runs" value={selectedTotals.runs} />
            </div>
            <div className="mt-4 text-xs text-muted-foreground">Aggregated per PAN across all folios for the same series.</div>
          </SectionCard>
        </div>
      )}

      <div className="mt-6">
        <SectionCard title="Available reports" description="Each quarterly report expands into its 3 monthly downloads — grouped by series, financial year and quarter.">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="w-10 px-2 py-3"></th>
                  <th className="px-4 py-3">Report</th>
                  <th className="px-4 py-3">Series</th>
                  <th className="px-4 py-3">FY</th>
                  <th className="px-4 py-3">Quarter</th>
                  <th className="px-4 py-3">Generated</th>
                  <th className="px-4 py-3">Format</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredReports.map((r) => {
                  const months = quarterMonths(r.fy, r.quarter);
                  const isOpen = !!expanded[r.id];
                  return (
                    <React.Fragment key={r.id}>
                      <tr className="row-hover" data-testid={`report-row-${r.id}`}>
                        <td className="px-2 py-3">
                          <button
                            data-testid={`report-toggle-${r.id}`}
                            onClick={() => toggleExpanded(r.id)}
                            className="grid h-7 w-7 place-items-center rounded-md border border-border bg-white hover:bg-secondary"
                            aria-label={isOpen ? "Collapse" : "Expand"}
                          >
                            {isOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => toggleExpanded(r.id)} className="text-left">
                            <div className="font-medium hover:text-primary">{r.name}</div>
                            <div className="text-xs text-muted-foreground num">{r.id}</div>
                          </button>
                        </td>
                        <td className="px-4 py-3 num text-xs">{r.series}</td>
                        <td className="px-4 py-3 text-xs">{r.fy}</td>
                        <td className="px-4 py-3 text-xs">{r.quarter}</td>
                        <td className="px-4 py-3 num text-xs text-muted-foreground">{r.generatedAt}</td>
                        <td className="px-4 py-3 text-xs">{r.format}</td>
                        <td className="px-4 py-3"><StatusBadge>{r.status}</StatusBadge></td>
                        <td className="px-4 py-3 text-right">
                          <Button data-testid={`dl-quarter-${r.id}`} size="sm" variant="outline" className="h-7" onClick={() => download(r)}>
                            <Download className="mr-1.5 h-3.5 w-3.5" />Quarter
                          </Button>
                        </td>
                      </tr>
                      {isOpen && (
                        <tr className="bg-secondary/30">
                          <td></td>
                          <td colSpan={8} className="px-4 pb-4 pt-2">
                            <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                              <FileSpreadsheet className="h-3 w-3" />
                              Monthly breakdown — {r.series} · {r.fy} · {r.quarter}
                            </div>
                            <ul className="divide-y divide-border rounded-md border border-border bg-white">
                              {months.map((m) => (
                                <li key={m} className="flex items-center justify-between px-4 py-2.5 text-sm">
                                  <div className="flex items-center gap-3">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                                    <span className="font-medium">{monthLabel(m)}</span>
                                    <span className="num text-[11px] text-muted-foreground">{r.series}</span>
                                  </div>
                                  <button
                                    data-testid={`dl-month-${r.id}-${m}`}
                                    onClick={() => downloadMonth(r, m)}
                                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                                  >
                                    <Download className="h-3.5 w-3.5" />Download {monthLabel(m)}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
                {filteredReports.length === 0 && <tr><td colSpan={9} className="px-4 py-8 text-center text-sm text-muted-foreground">No reports match the selected filters.</td></tr>}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

const Tile = ({ label, value, highlight }) => (
  <div className={`rounded-md border p-4 ${highlight ? "border-primary/20 bg-accent" : "border-border bg-white"}`}>
    <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
    <div className={`num mt-1 text-lg font-semibold ${highlight ? "text-primary" : ""}`}>{value}</div>
  </div>
);

const BigTile = ({ icon: Icon, label, value, highlight, plain }) => (
  <div className={`rounded-lg border p-5 ${highlight ? "border-primary/30 bg-accent" : plain ? "border-dashed border-border bg-secondary/40" : "border-border bg-white"}`}>
    <div className="flex items-center justify-between">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      {Icon && <div className={`grid h-8 w-8 place-items-center rounded-md ${highlight ? "bg-primary text-primary-foreground" : "bg-accent text-primary"}`}><Icon className="h-4 w-4" strokeWidth={1.75} /></div>}
    </div>
    <div className={`num mt-3 text-2xl font-semibold ${highlight ? "text-primary" : ""}`}>{value}</div>
  </div>
);

const Line = ({ label, value, strong, muted }) => (
  <div className="flex items-center justify-between text-xs">
    <span className="text-muted-foreground">{label}</span>
    <span className={`num ${strong ? "font-semibold text-primary" : muted ? "text-muted-foreground" : "font-medium text-foreground"}`}>{value}</span>
  </div>
);
