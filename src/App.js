import React from "react";
import "@/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import AppShell from "@/components/layout/AppShell";
import Dashboard from "@/pages/Dashboard";
import SeriesList from "@/pages/Series/SeriesList";
import SeriesDetail from "@/pages/Series/SeriesDetail";
import CreateSeries from "@/pages/Series/CreateSeries";
import InvestorData from "@/pages/Investors/InvestorData";
import Calculations from "@/pages/Calculations/Calculations";
import CalculationDetail from "@/pages/Calculations/CalculationDetail";
import CreateCalculation from "@/pages/Calculations/CreateCalculation";
import Reviews from "@/pages/Reviews/Reviews";
import ReviewDetail from "@/pages/Reviews/ReviewDetail";
import Payments from "@/pages/Payments/Payments";
import Redemption from "@/pages/Redemption/Redemption";
import Reports from "@/pages/Reports/Reports";
import AuditLog from "@/pages/Audit/AuditLog";
import Settings from "@/pages/Settings/Settings";

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="series" element={<SeriesList />} />
          <Route path="series/new" element={<CreateSeries />} />
          <Route path="series/:id" element={<SeriesDetail />} />
          <Route path="investors" element={<InvestorData />} />
          <Route path="calculations" element={<Calculations />} />
          <Route path="calculations/new" element={<CreateCalculation />} />
          <Route path="calculations/:id" element={<CalculationDetail />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="reviews/:id" element={<ReviewDetail />} />
          <Route path="payments" element={<Payments />} />
          <Route path="redemption" element={<Redemption />} />
          <Route path="reports" element={<Reports />} />
          <Route path="audit" element={<AuditLog />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
