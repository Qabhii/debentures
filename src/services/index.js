// Frontend service abstractions – month-wise operational model.
import * as mock from "@/mock/data";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));
const wrap = async (data, ms) => { await delay(ms); return data; };

// -------- Series --------
export const seriesService = {
  getSeries: () => wrap(mock.SERIES),
  getSeriesById: (id) => wrap(mock.SERIES.find((s) => s.id === id)),
  createSeries: (data) => wrap({ ...data, id: `NCD-2026-${Math.floor(Math.random() * 900 + 100)}`, status: "Draft" }, 500),
};

// -------- Investor Data --------
export const investorService = {
  getUploads: () => wrap(mock.UPLOADS),
  getInvestors: (series, month, tdsType) => wrap(mock.INVESTORS.filter((i) =>
    (!series || i.series === series) && (!month || i.month === month) && (!tdsType || i.tdsType === tdsType)
  )),
  getInvestorById: (id) => wrap(mock.INVESTORS.find((i) => i.id === id)),
  updateInvestor: (id, payload) => wrap({ id, ...payload, manuallyUpdated: true }, 400),
  createInvestor: (payload) => wrap({ id: `INV-0${Math.floor(Math.random()*900+100)}`, ...payload, manuallyUpdated: true }, 400),
  uploadInvestorFile: async () => { await delay(1400); return { id: `UPL-00${Math.floor(Math.random() * 90 + 10)}`, total: 1284, valid: 1272, errors: 8, warnings: 4 }; },
};

// -------- Calculations --------
export const calculationService = {
  getRuns: () => wrap(mock.MONTHLY_CALCS),
  getRunById: (id) => wrap(mock.MONTHLY_CALCS.find((c) => c.id === id)),
  getMonthlyCalculations: (series, month) => wrap(mock.MONTHLY_CALCS.filter((c) =>
    (!series || c.series === series) && (!month || c.month === month)
  )),
  getLines: () => wrap(mock.CALCULATION_LINES),
  runCalculation: (payload) => wrap({ id: `CR-2026-0${Math.floor(Math.random() * 900 + 100)}`, ...payload, status: "Pending Review" }, 1200),
};

// -------- Approvals --------
export const approvalService = {
  getPendingReviews: () => wrap(mock.MONTHLY_CALCS.filter((c) => c.status === "Pending Review" || c.status === "Returned")),
  approveCalculation: (id) => wrap({ id, status: "Approved" }, 500),
  returnCalculation: (id, reason) => wrap({ id, status: "Returned", reason }, 500),
  overrideAmount: (calcId, folio, newValue, reason) => wrap({ calcId, folio, newValue, reason }, 400),
};

// -------- Payments (tracking only, no auto-processing) --------
export const paymentService = {
  getMonthlyPayments: (series) => wrap(mock.MONTHLY_CALCS.filter((c) =>
    (!series || c.series === series) && (c.status === "Approved" || c.status === "Payment Generated" || c.status === "Closed")
  )),
  markConfirmed: (ids) => wrap({ ok: true, count: ids.length, status: "All Confirmed" }, 500),
  downloadExcel: async (kind, id) => { await delay(500); return { ok: true, kind, id }; },
};

// -------- Redemption --------
export const redemptionService = {
  getRedemptionTerms: (seriesId) => wrap(mock.REDEMPTION_TERMS[seriesId]),
  getEligibleInvestors: (seriesId) => wrap(mock.HOLDINGS.filter((h) => h.series === seriesId && h.outstandingUnits > 0)),
  getInvestorHolding: (seriesId, investorId) => wrap(mock.HOLDINGS.find((h) => h.series === seriesId && h.investorId === investorId)),
  getRedemptionRequests: (seriesId) => wrap(seriesId ? mock.REDEMPTION_REQUESTS.filter((r) => r.series === seriesId) : mock.REDEMPTION_REQUESTS),
  getRedemptionById: (id) => wrap(mock.REDEMPTION_REQUESTS.find((r) => r.id === id)),
  createRedemptionRequest: (payload) => wrap({ id: `RD-2026-0${Math.floor(Math.random()*900+100)}`, ...payload, status: "Pending Approval" }, 700),
  approveRedemption: (id) => wrap({ id, status: "Approved" }, 500),
  returnRedemption: (id, reason) => wrap({ id, status: "Returned", reason }, 500),
};

// -------- Reports --------
export const reportService = {
  getReports: (fy, quarter) => wrap(mock.REPORTS.filter((r) => (!fy || r.fy === fy) && (!quarter || r.quarter === quarter))),
  downloadPaymentSummary: async (id) => { await delay(500); return { ok: true, id }; },
  downloadTDSReport: async (id) => { await delay(500); return { ok: true, id }; },
};

// -------- Audit --------
export const auditService = {
  getAuditLogs: () => wrap(mock.AUDIT_LOG),
  exportAuditLog: async () => { await delay(500); return { ok: true }; },
};

// -------- TDS Config --------
export const tdsService = {
  getConfigs: () => wrap(mock.TDS_CONFIGS),
  saveConfig: (payload) => wrap({ id: `TDS-${Math.floor(Math.random()*900+100)}`, ...payload }, 500),
};

// -------- Notifications --------
export const notificationService = {
  getNotifications: () => wrap(mock.NOTIFICATIONS, 200),
};
