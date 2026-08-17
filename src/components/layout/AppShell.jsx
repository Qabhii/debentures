import React, { useState } from "react";
import { Link, NavLink, useLocation, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CURRENT_USER, NOTIFICATIONS, SERIES, INVESTORS, MONTHLY_CALCS, monthLabel } from "@/mock/data";
import {
  LayoutDashboard, Layers, Users, Calculator, ShieldCheck, Banknote,
  FileText, ScrollText, Settings, Search, Bell, ChevronDown, Command, LogOut, Undo2,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/series", label: "NCD Series", icon: Layers },
  { to: "/investors", label: "Investor Data", icon: Users },
  { to: "/calculations", label: "Calculations", icon: Calculator },
  { to: "/reviews", label: "Review & Approval", icon: ShieldCheck },
  { to: "/payments", label: "Payments", icon: Banknote },
  { to: "/redemption", label: "Redemption", icon: Undo2 },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/audit", label: "Audit & Historical", icon: ScrollText },
  { to: "/settings", label: "Settings", icon: Settings },
];

function useBreadcrumbs() {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);
  const crumbs = [{ label: "Home", to: "/" }];
  let acc = "";
  for (const p of parts) {
    acc += "/" + p;
    crumbs.push({ label: p.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), to: acc });
  }
  return crumbs;
}

function Sidebar() {
  return (
    <aside data-testid="app-sidebar" className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-white">
      <div className="flex items-center gap-2.5 px-5 pt-5 pb-4">
        <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
          <span className="text-sm font-semibold tracking-tight">N</span>
        </div>
        <div>
          <div className="text-sm font-semibold leading-tight tracking-tight">NCD Operations Hub</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Interest & Payments</div>
        </div>
      </div>

      <div className="px-3">
        <div className="rounded-md border border-border bg-secondary/40 px-3 py-2 text-[11px] text-muted-foreground">
          <div className="uppercase tracking-widest">Environment</div>
          <div className="text-foreground font-medium">Production · FY 2026-27</div>
        </div>
      </div>

      <nav className="mt-5 flex-1 overflow-y-auto px-2.5">
        <div className="mb-1 px-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Workspace</div>
        <ul className="space-y-0.5">
          {NAV.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                data-testid={`nav-${item.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                    isActive ? "bg-accent text-accent-foreground" : "text-slate-600 hover:bg-secondary hover:text-foreground",
                  )
                }
              >
                <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                <span className="truncate">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-md px-2 py-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            {CURRENT_USER.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{CURRENT_USER.name}</div>
            <div className="truncate text-[11px] text-muted-foreground">{CURRENT_USER.role}</div>
          </div>
          <LogOut className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
        </div>
      </div>
    </aside>
  );
}

function GlobalSearch() {
  const [open, setOpen] = useState(false);
  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        data-testid="global-search-trigger"
        onClick={() => setOpen(true)}
        className="group flex w-72 items-center gap-2 rounded-md border border-border bg-white px-3 py-1.5 text-left text-sm text-muted-foreground hover:border-slate-300"
      >
        <Search className="h-4 w-4" strokeWidth={1.75} />
        <span className="flex-1">Search series, investors, runs…</span>
        <kbd className="hidden items-center gap-1 rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground md:inline-flex">
          <Command className="h-3 w-3" />K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a series, ISIN, folio, PAN or run ID…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="NCD Series">
            {SERIES.map((s) => (
              <CommandItem key={s.id} onSelect={() => { setOpen(false); window.location.assign(`/series/${s.id}`); }}>
                <Layers className="mr-2 h-4 w-4" /> {s.id} · {s.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Investors">
            {INVESTORS.slice(0, 5).map((i) => (
              <CommandItem key={i.id} onSelect={() => { setOpen(false); window.location.assign(`/investors`); }}>
                <Users className="mr-2 h-4 w-4" /> {i.name} · {i.folio} · {i.panMasked}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Calculation Runs">
            {MONTHLY_CALCS.slice(0, 6).map((c) => (
              <CommandItem key={c.id} onSelect={() => { setOpen(false); window.location.assign(`/calculations/${c.id}`); }}>
                <Calculator className="mr-2 h-4 w-4" /> {c.id} · {c.series} · {monthLabel(c.month)} · {c.status}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

function Header() {
  const crumbs = useBreadcrumbs();
  return (
    <header data-testid="app-header" className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-white/80 px-6 backdrop-blur">
      <div className="flex items-center gap-2 text-sm">
        {crumbs.map((c, i) => (
          <React.Fragment key={c.to}>
            {i > 0 && <span className="text-muted-foreground">/</span>}
            <Link to={c.to} className={cn("hover:text-foreground", i === crumbs.length - 1 ? "text-foreground font-medium" : "text-muted-foreground")}>{c.label}</Link>
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <GlobalSearch />
        <Popover>
          <PopoverTrigger asChild>
            <button data-testid="notifications-trigger" className="relative grid h-9 w-9 place-items-center rounded-md border border-border bg-white hover:bg-secondary">
              <Bell className="h-4 w-4" strokeWidth={1.75} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="border-b border-border px-4 py-3">
              <div className="text-sm font-semibold">Notifications</div>
              <div className="text-xs text-muted-foreground">{NOTIFICATIONS.length} recent items</div>
            </div>
            <ul className="max-h-80 overflow-y-auto">
              {NOTIFICATIONS.map((n) => (
                <li key={n.id} className="border-b border-border px-4 py-3 last:border-b-0 hover:bg-secondary/50">
                  <div className="flex items-start gap-2.5">
                    <span className={cn("mt-1 h-2 w-2 shrink-0 rounded-full",
                      n.type === "review" && "bg-amber-500",
                      n.type === "warning" && "bg-amber-500",
                      n.type === "success" && "bg-emerald-500",
                      n.type === "info" && "bg-sky-500",
                    )} />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium">{n.title}</div>
                      <div className="text-xs text-muted-foreground">{n.desc}</div>
                      <div className="mt-0.5 text-[11px] text-muted-foreground">{n.ts}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
        <div className="flex items-center gap-2 rounded-md border border-border bg-white px-2.5 py-1.5">
          <div className="grid h-6 w-6 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">{CURRENT_USER.initials}</div>
          <div className="hidden text-xs leading-tight sm:block">
            <div className="font-medium">{CURRENT_USER.name}</div>
            <div className="text-muted-foreground">{CURRENT_USER.role}</div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}

export default function AppShell() {
  return (
    <div className="flex min-h-screen bg-[hsl(220_20%_98%)]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main data-testid="app-main" className="flex-1 overflow-x-auto px-8 py-8">
          <div className="mx-auto max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
