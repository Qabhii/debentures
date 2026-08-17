import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { SERIES, MONTHLY_CALCS, monthLabel } from "@/mock/data";
import { calculationService } from "@/services";
import { toast } from "sonner";
import { CheckCircle2, CalendarClock } from "lucide-react";

const STEPS = ["Series", "Upcoming Months", "Review & Run"];

// "Now" reference for the demo — the latest month with data.
// A real backend will drive this from the current system date.
const CURRENT_MONTH = "2026-08"; // August 2026

// ---- helpers -----------------------------------------------
const parse = (key) => { const [y, m] = key.split("-").map(Number); return { y, m }; };
const keyOf = (y, m) => `${y}-${String(m).padStart(2, "0")}`;
const quarterOf = (m) => (m >= 4 && m <= 6 ? 1 : m >= 7 && m <= 9 ? 2 : m >= 10 && m <= 12 ? 3 : 4);
const fyStartOf = (y, m) => (m >= 4 ? y : y - 1);
const fyLabel = (fyStart) => `FY ${fyStart}-${String(fyStart + 1).slice(2)}`;
const monthsOfQuarter = (fyStart, q) => {
  const map = {
    1: [[fyStart, 4], [fyStart, 5], [fyStart, 6]],
    2: [[fyStart, 7], [fyStart, 8], [fyStart, 9]],
    3: [[fyStart, 10], [fyStart, 11], [fyStart, 12]],
    4: [[fyStart + 1, 1], [fyStart + 1, 2], [fyStart + 1, 3]],
  };
  return map[q].map(([y, m]) => keyOf(y, m));
};

// Compute the visible upcoming months for a series:
//  - current quarter's months + next quarter's months (2 quarters total)
//  - only months >= CURRENT_MONTH
//  - never cross into next Financial Year
//  - skip months that already have a calc run for this series
const computeUpcoming = (seriesId) => {
  const { y, m } = parse(CURRENT_MONTH);
  const fyStart = fyStartOf(y, m);
  const curQ = quarterOf(m);
  const currentFy = fyLabel(fyStart);

  const currentQMonths = monthsOfQuarter(fyStart, curQ);
  const nextQMonths = curQ < 4 ? monthsOfQuarter(fyStart, curQ + 1) : []; // cap at FY end

  const processed = new Set(MONTHLY_CALCS.filter((c) => c.series === seriesId).map((c) => c.month));

  const visible = [...currentQMonths, ...nextQMonths]
    .filter((k) => k >= CURRENT_MONTH)         // exclude past months
    .filter((k) => !processed.has(k));         // exclude already-processed months

  return {
    fy: currentFy,
    currentQ: `Q${curQ}`,
    nextQ: curQ < 4 ? `Q${curQ + 1}` : null,
    currentQMonths: currentQMonths.filter((k) => k >= CURRENT_MONTH && !processed.has(k)),
    nextQMonths: nextQMonths.filter((k) => !processed.has(k)),
    visible,
  };
};

export default function CreateCalculation() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [series, setSeries] = useState(SERIES.find((s) => s.status === "Active").id);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("");

  const upcoming = useMemo(() => computeUpcoming(series), [series]);

  // Reset selection whenever the series changes
  React.useEffect(() => { setSelectedMonths([]); }, [series]);

  const toggle = (k) => setSelectedMonths((cur) => cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]);

  const run = async () => {
    setRunning(true);
    const phases = ["Preparing dataset", "Validating inputs", "Processing monthly calculations", "Preparing snapshots"];
    for (let i = 0; i < phases.length; i++) {
      setPhase(phases[i]);
      for (let p = 0; p <= 100; p += 12) { await new Promise((r) => setTimeout(r, 55)); setProgress((i * 100 + p) / phases.length); }
    }
    await calculationService.runCalculation({ series, months: selectedMonths });
    toast.success(`${selectedMonths.length} monthly run(s) submitted for review.`);
    nav(`/calculations`);
  };

  return (
    <div>
      <PageHeader
        title="Run Calculation"
        subtitle="Pick a series and one or more upcoming months. Only unprocessed months from the current and next quarter (within the same financial year) are shown."
      />

      <div className="mb-6 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 ${i <= step ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-semibold ${i < step ? "bg-primary text-primary-foreground" : i === step ? "border border-primary bg-white text-primary" : "border border-border bg-white"}`}>
                {i < step ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className="text-xs font-medium">{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`h-px w-8 ${i < step ? "bg-primary" : "bg-border"}`} />}
          </React.Fragment>
        ))}
      </div>

      <SectionCard>
        {step === 0 && (
          <div className="max-w-xl space-y-4">
            <Label>Select Active NCD Series</Label>
            <Select value={series} onValueChange={setSeries}>
              <SelectTrigger data-testid="calc-series"><SelectValue /></SelectTrigger>
              <SelectContent>{SERIES.filter((s) => s.status === "Active").map((s) => (<SelectItem key={s.id} value={s.id}>{s.id} · {s.name}</SelectItem>))}</SelectContent>
            </Select>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div className="flex items-start gap-3 rounded-md border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
              <CalendarClock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <div>
                Showing unprocessed months for <span className="font-medium text-foreground">{series}</span> · {upcoming.fy} · {upcoming.currentQ}{upcoming.nextQ ? ` + ${upcoming.nextQ}` : ""}.
                Months already run for this series are hidden.
              </div>
            </div>

            {upcoming.visible.length === 0 ? (
              <div className="rounded-md border border-dashed border-border bg-secondary/40 p-8 text-center text-sm text-muted-foreground">
                All months in the current & next quarter have already been processed for this series.
              </div>
            ) : (
              <div className="space-y-5">
                <QuarterGroup title={`${upcoming.currentQ} · Current Quarter`} months={upcoming.currentQMonths} selected={selectedMonths} onToggle={toggle} />
                {upcoming.nextQ && <QuarterGroup title={`${upcoming.nextQ} · Next Quarter`} months={upcoming.nextQMonths} selected={selectedMonths} onToggle={toggle} />}
              </div>
            )}
          </div>
        )}

        {step === 2 && !running && (
          <div className="max-w-xl space-y-3">
            <div className="rounded-md border border-border bg-secondary/30 p-4">
              <div className="text-sm font-semibold">You are about to run {selectedMonths.length} monthly calculation{selectedMonths.length !== 1 ? "s" : ""}.</div>
              <div className="mt-1 text-xs text-muted-foreground">Each month will produce its own immutable snapshot and route to a reviewer.</div>
            </div>
            <div className="rounded-md border border-border">
              <Row k="Series" v={series} />
              <Row k="Financial Year" v={upcoming.fy} />
              <Row k="Months to run" v={[...selectedMonths].sort().map(monthLabel).join(", ")} />
            </div>
          </div>
        )}

        {running && (
          <div className="max-w-lg py-4">
            <div className="text-sm font-medium">{phase}…</div>
            <Progress value={progress} className="mt-3" />
            <div className="mt-1 text-xs text-muted-foreground">{Math.round(progress)}%</div>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-2 border-t border-border pt-5">
          <Button variant="outline" onClick={() => step === 0 ? nav("/calculations") : setStep(step - 1)}>Back</Button>
          {step < STEPS.length - 1 ? (
            <Button
              data-testid="calc-next"
              disabled={step === 1 && selectedMonths.length === 0}
              onClick={() => setStep(step + 1)}
              className="bg-primary hover:bg-primary/90"
            >Continue</Button>
          ) : (
            <Button data-testid="calc-run" onClick={run} disabled={running || selectedMonths.length === 0} className="bg-primary hover:bg-primary/90">
              Run {selectedMonths.length} monthly calculation{selectedMonths.length !== 1 ? "s" : ""}
            </Button>
          )}
        </div>
      </SectionCard>
    </div>
  );
}

function QuarterGroup({ title, months, selected, onToggle }) {
  if (!months || months.length === 0) {
    return (
      <div>
        <div className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">{title}</div>
        <div className="rounded-md border border-dashed border-border bg-secondary/30 p-4 text-xs text-muted-foreground">No unprocessed months.</div>
      </div>
    );
  }
  return (
    <div>
      <div className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">{title}</div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {months.map((k) => {
          const active = selected.includes(k);
          return (
            <label
              key={k}
              data-testid={`m-${k}`}
              className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors ${active ? "border-primary bg-accent" : "border-border bg-white hover:border-slate-300"}`}
            >
              <Checkbox checked={active} onCheckedChange={() => onToggle(k)} />
              <div>
                <div className="text-sm font-medium">{monthLabel(k)}</div>
                <div className="text-[11px] text-muted-foreground">Unprocessed</div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

const Row = ({ k, v }) => (
  <div className="flex justify-between border-b border-border px-4 py-2.5 last:border-b-0 text-sm">
    <span className="text-muted-foreground">{k}</span>
    <span className="num text-right font-medium max-w-md">{v}</span>
  </div>
);
