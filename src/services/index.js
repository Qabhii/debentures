// // Frontend service abstractions – month-wise operational model.
// import * as mock from "@/mock/data";

// const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));
// const wrap = async (data, ms) => { await delay(ms); return data; };

// // -------- Series --------
// export const seriesService = {
//   getSeries: () => wrap(mock.SERIES),
//   getSeriesById: (id) => wrap(mock.SERIES.find((s) => s.id === id)),
//   createSeries: (data) => wrap({ ...data, id: `NCD-2026-${Math.floor(Math.random() * 900 + 100)}`, status: "Draft" }, 500),
// };

// // -------- Investor Data --------
// export const investorService = {
//   getUploads: () => wrap(mock.UPLOADS),
//   getInvestors: (series, month, tdsType) => wrap(mock.INVESTORS.filter((i) =>
//     (!series || i.series === series) && (!month || i.month === month) && (!tdsType || i.tdsType === tdsType)
//   )),
//   getInvestorById: (id) => wrap(mock.INVESTORS.find((i) => i.id === id)),
//   updateInvestor: (id, payload) => wrap({ id, ...payload, manuallyUpdated: true }, 400),
//   createInvestor: (payload) => wrap({ id: `INV-0${Math.floor(Math.random()*900+100)}`, ...payload, manuallyUpdated: true }, 400),
//   uploadInvestorFile: async () => { await delay(1400); return { id: `UPL-00${Math.floor(Math.random() * 90 + 10)}`, total: 1284, valid: 1272, errors: 8, warnings: 4 }; },
// };

// // -------- Calculations --------
// export const calculationService = {
//   getRuns: () => wrap(mock.MONTHLY_CALCS),
//   getRunById: (id) => wrap(mock.MONTHLY_CALCS.find((c) => c.id === id)),
//   getMonthlyCalculations: (series, month) => wrap(mock.MONTHLY_CALCS.filter((c) =>
//     (!series || c.series === series) && (!month || c.month === month)
//   )),
//   getLines: () => wrap(mock.CALCULATION_LINES),
//   runCalculation: (payload) => wrap({ id: `CR-2026-0${Math.floor(Math.random() * 900 + 100)}`, ...payload, status: "Pending Review" }, 1200),
// };

// // -------- Approvals --------
// export const approvalService = {
//   getPendingReviews: () => wrap(mock.MONTHLY_CALCS.filter((c) => c.status === "Pending Review" || c.status === "Returned")),
//   approveCalculation: (id) => wrap({ id, status: "Approved" }, 500),
//   returnCalculation: (id, reason) => wrap({ id, status: "Returned", reason }, 500),
//   overrideAmount: (calcId, folio, newValue, reason) => wrap({ calcId, folio, newValue, reason }, 400),
// };

// // -------- Payments (tracking only, no auto-processing) --------
// export const paymentService = {
//   getMonthlyPayments: (series) => wrap(mock.MONTHLY_CALCS.filter((c) =>
//     (!series || c.series === series) && (c.status === "Approved" || c.status === "Payment Generated" || c.status === "Closed")
//   )),
//   markConfirmed: (ids) => wrap({ ok: true, count: ids.length, status: "All Confirmed" }, 500),
//   downloadExcel: async (kind, id) => { await delay(500); return { ok: true, kind, id }; },
// };

// // -------- Redemption --------
// export const redemptionService = {
//   getRedemptionTerms: (seriesId) => wrap(mock.REDEMPTION_TERMS[seriesId]),
//   getEligibleInvestors: (seriesId) => wrap(mock.HOLDINGS.filter((h) => h.series === seriesId && h.outstandingUnits > 0)),
//   getInvestorHolding: (seriesId, investorId) => wrap(mock.HOLDINGS.find((h) => h.series === seriesId && h.investorId === investorId)),
//   getRedemptionRequests: (seriesId) => wrap(seriesId ? mock.REDEMPTION_REQUESTS.filter((r) => r.series === seriesId) : mock.REDEMPTION_REQUESTS),
//   getRedemptionById: (id) => wrap(mock.REDEMPTION_REQUESTS.find((r) => r.id === id)),
//   createRedemptionRequest: (payload) => wrap({ id: `RD-2026-0${Math.floor(Math.random()*900+100)}`, ...payload, status: "Pending Approval" }, 700),
//   approveRedemption: (id) => wrap({ id, status: "Approved" }, 500),
//   returnRedemption: (id, reason) => wrap({ id, status: "Returned", reason }, 500),
// };

// // -------- Reports --------
// export const reportService = {
//   getReports: (fy, quarter) => wrap(mock.REPORTS.filter((r) => (!fy || r.fy === fy) && (!quarter || r.quarter === quarter))),
//   downloadPaymentSummary: async (id) => { await delay(500); return { ok: true, id }; },
//   downloadTDSReport: async (id) => { await delay(500); return { ok: true, id }; },
// };

// // -------- Audit --------
// export const auditService = {
//   getAuditLogs: () => wrap(mock.AUDIT_LOG),
//   exportAuditLog: async () => { await delay(500); return { ok: true }; },
// };

// // -------- TDS Config --------
// export const tdsService = {
//   getConfigs: () => wrap(mock.TDS_CONFIGS),
//   saveConfig: (payload) => wrap({ id: `TDS-${Math.floor(Math.random()*900+100)}`, ...payload }, 500),
// };

// // -------- Notifications --------
// export const notificationService = {
//   getNotifications: () => wrap(mock.NOTIFICATIONS, 200),
// };



// Frontend service abstractions – month-wise operational model.
//frontend/src/services/index.js
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

// -------- Redemption (series-level, scheduled maturity) --------
export const redemptionService = {
  getRedemptionTerms: (seriesId) => wrap(mock.REDEMPTION_TERMS[seriesId]),
  getRedemptionSeriesSummary: (seriesId) => {
    const t = mock.REDEMPTION_TERMS[seriesId];
    if (!t) return wrap(null);
    const totalFaceValue = t.totalUnits * t.faceValue;
    return wrap({ ...t, totalFaceValue, netPayable: totalFaceValue + t.grossInterest - t.tds });
  },
  getRedemptionHistory: (seriesId) => wrap(seriesId ? mock.REDEMPTION_REQUESTS.filter((r) => r.series === seriesId) : mock.REDEMPTION_REQUESTS),
  getRedemptionById: (id) => wrap(mock.REDEMPTION_REQUESTS.find((r) => r.id === id)),
  submitForApproval: (payload) => wrap({ id: `RD-2027-0${Math.floor(Math.random()*900+100)}`, ...payload, status: "Pending Approval" }, 600),
  downloadRedemptionFile: async (seriesId) => { await delay(500); return { ok: true, seriesId }; },
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

// -------- TDS Config (effective-date model, no FY/Quarter) --------
const dayBeforeISO = (iso) => {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
};
export const tdsService = {
  getConfigs: () => wrap(mock.TDS_CONFIGS),
  getActive: (type) => wrap(mock.TDS_CONFIGS.find((c) => c.type === type && c.toDate === null) || null),
  getApplicableRate: (type, isoDate) => wrap(
    mock.TDS_CONFIGS.find((c) => c.type === type && c.fromDate <= isoDate && (c.toDate === null || isoDate <= c.toDate)) || null
  ),
  // Auto-close previous active configuration and open the new one.
  createTDSConfiguration: async ({ type, rate, fromDate }) => {
    await delay(400);
    const active = mock.TDS_CONFIGS.find((c) => c.type === type && c.toDate === null);
    if (active && fromDate <= active.fromDate) {
      throw new Error("From Date cannot overlap an existing TDS configuration.");
    }
    if (active) { active.toDate = dayBeforeISO(fromDate); active.status = "Closed"; }
    const newCfg = { id: `TDS-${Math.floor(Math.random() * 900 + 100)}`, type, rate: Number(rate), fromDate, toDate: null, status: "Active" };
    mock.TDS_CONFIGS.push(newCfg);
    return newCfg;
  },
};

// -------- Notifications --------
export const notificationService = {
  getNotifications: () => wrap(mock.NOTIFICATIONS, 200),
};
