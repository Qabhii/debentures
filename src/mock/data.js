// // Realistic fictional mock data for NCD Operations Hub — MONTH-WISE model

// export const CURRENT_USER = {
//   id: "U-1001",
//   name: "Ananya Desai",
//   email: "ananya.desai@ncdhub.in",
//   role: "Finance User / Admin",
//   initials: "AD",
// };

// export const REVIEWER_USER = {
//   id: "U-2001",
//   name: "Rohan Menon",
//   email: "rohan.menon@ncdhub.in",
//   role: "Reviewer",
//   initials: "RM",
// };

// // ISO date -> DD-MM-YY handled in lib/format.js

// export const SERIES = [
//   { id: "NCD-2024-A1", name: "Series A1 – 8.65% Sec NCD 2027", isin: "INE528M07B12", issueDate: "2024-04-15", maturityDate: "2027-04-15", interestType: "Fixed", interestRate: 8.65, baseRate: null, spread: null, frequency: "Monthly", dayCount: "Actual/365", redemptionType: "Bullet", faceValue: 1000, status: "Active" },
//   { id: "NCD-2024-B2", name: "Series B2 – Floating MIBOR+250 2028", isin: "INE528M07C09", issueDate: "2024-06-20", maturityDate: "2028-06-20", interestType: "Floating", interestRate: 9.10, baseRate: "MIBOR", spread: 2.50, frequency: "Quarterly", dayCount: "Actual/360", redemptionType: "Bullet", faceValue: 10000, status: "Active" },
//   { id: "NCD-2023-C3", name: "Series C3 – 9.25% Sec NCD 2026", isin: "INE528M07A45", issueDate: "2023-11-08", maturityDate: "2026-11-08", interestType: "Fixed", interestRate: 9.25, baseRate: null, spread: null, frequency: "Half-Yearly", dayCount: "30/360", redemptionType: "Bullet", faceValue: 50000, status: "Locked" },
//   { id: "NCD-2025-D4", name: "Series D4 – 8.90% Cum. NCD 2030", isin: "INE528M07D33", issueDate: "2025-01-10", maturityDate: "2030-01-10", interestType: "Fixed", interestRate: 8.90, baseRate: null, spread: null, frequency: "Annually", dayCount: "Actual/Actual", redemptionType: "Bullet", faceValue: 100000, status: "Draft" },
//   { id: "NCD-2022-E5", name: "Series E5 – 8.20% Sec NCD 2025", isin: "INE528M07E88", issueDate: "2022-05-02", maturityDate: "2025-05-02", interestType: "Fixed", interestRate: 8.20, baseRate: null, spread: null, frequency: "Quarterly", dayCount: "Actual/365", redemptionType: "Bullet", faceValue: 75000, status: "Closed" },
// ];

// export const MONTHS_META = [
//   { key: "2026-08", label: "August 2026", short: "Aug 2026", fy: "FY 2026-27", quarter: "Q2" },
//   { key: "2026-07", label: "July 2026", short: "Jul 2026", fy: "FY 2026-27", quarter: "Q2" },
//   { key: "2026-06", label: "June 2026", short: "Jun 2026", fy: "FY 2026-27", quarter: "Q1" },
//   { key: "2026-05", label: "May 2026", short: "May 2026", fy: "FY 2026-27", quarter: "Q1" },
//   { key: "2026-04", label: "April 2026", short: "Apr 2026", fy: "FY 2026-27", quarter: "Q1" },
//   { key: "2026-03", label: "March 2026", short: "Mar 2026", fy: "FY 2025-26", quarter: "Q4" },
//   { key: "2026-02", label: "February 2026", short: "Feb 2026", fy: "FY 2025-26", quarter: "Q4" },
//   { key: "2026-01", label: "January 2026", short: "Jan 2026", fy: "FY 2025-26", quarter: "Q4" },
// ];

// // Quarters helper (for selection dropdowns)
// export const QUARTERS = [
//   { key: "FY2026-27_Q2", label: "Q2 FY 2026-27", months: ["2026-07", "2026-08", "2026-09"] },
//   { key: "FY2026-27_Q1", label: "Q1 FY 2026-27", months: ["2026-04", "2026-05", "2026-06"] },
//   { key: "FY2025-26_Q4", label: "Q4 FY 2025-26", months: ["2026-01", "2026-02", "2026-03"] },
//   { key: "FY2025-26_Q3", label: "Q3 FY 2025-26", months: ["2025-10", "2025-11", "2025-12"] },
// ];

// // Monthly calculation records (primary operational data)
// // status values: Pending Review | Returned | Approved | Payment Generated | Closed
// // paymentStatus: Confirmation Pending | All Confirmed | -
// export const MONTHLY_CALCS = [
//   { id: "CR-2026-0142", series: "NCD-2024-A1", month: "2026-08", investors: 1272, gross: 2745820.50, tds: 274582.05, net: 2471238.45, runBy: "Ananya Desai", runAt: "2026-09-06 14:22", status: "Pending Review", paymentStatus: "-", uploadVersion: 4, locked: false },
//   { id: "CR-2026-0141", series: "NCD-2024-A1", month: "2026-07", investors: 1272, gross: 2712305.00, tds: 271230.50, net: 2441074.50, runBy: "Ananya Desai", runAt: "2026-08-05 11:10", status: "Approved", paymentStatus: "Confirmation Pending", uploadVersion: 4, locked: true, approvedBy: "Rohan Menon", approvedAt: "2026-08-06 09:41" },
//   { id: "CR-2026-0140", series: "NCD-2024-A1", month: "2026-06", investors: 1268, gross: 2698112.30, tds: 269811.23, net: 2428301.07, runBy: "Ananya Desai", runAt: "2026-07-05 10:05", status: "Payment Generated", paymentStatus: "All Confirmed", uploadVersion: 3, locked: true, approvedBy: "Rohan Menon", approvedAt: "2026-07-06 10:22" },
//   { id: "CR-2026-0139", series: "NCD-2024-A1", month: "2026-05", investors: 1268, gross: 2685400.00, tds: 268540.00, net: 2416860.00, runBy: "Ananya Desai", runAt: "2026-06-05 09:30", status: "Closed", paymentStatus: "All Confirmed", uploadVersion: 3, locked: true },
//   { id: "CR-2026-0138", series: "NCD-2024-A1", month: "2026-04", investors: 1265, gross: 2672300.00, tds: 267230.00, net: 2405070.00, runBy: "Ananya Desai", runAt: "2026-05-05 09:30", status: "Closed", paymentStatus: "All Confirmed", uploadVersion: 3, locked: true },

//   { id: "CR-2026-0132", series: "NCD-2024-B2", month: "2026-08", investors: 860, gross: 1962400.00, tds: 196240.00, net: 1766160.00, runBy: "Ananya Desai", runAt: "2026-09-04 11:08", status: "Approved", paymentStatus: "Confirmation Pending", uploadVersion: 2, locked: true, approvedBy: "Rohan Menon", approvedAt: "2026-09-05 09:41" },
//   { id: "CR-2026-0131", series: "NCD-2024-B2", month: "2026-07", investors: 858, gross: 1940820.00, tds: 194082.00, net: 1746738.00, runBy: "Ananya Desai", runAt: "2026-08-04 11:20", status: "Payment Generated", paymentStatus: "All Confirmed", uploadVersion: 2, locked: true, approvedBy: "Rohan Menon", approvedAt: "2026-08-05 10:12" },
//   { id: "CR-2026-0130", series: "NCD-2024-B2", month: "2026-06", investors: 858, gross: 1925000.00, tds: 192500.00, net: 1732500.00, runBy: "Ananya Desai", runAt: "2026-07-04 10:00", status: "Closed", paymentStatus: "All Confirmed", uploadVersion: 2, locked: true },

//   { id: "CR-2026-0128", series: "NCD-2024-A1", month: "2026-08", investors: 1272, gross: 2745820.50, tds: 274582.05, net: 2471238.45, runBy: "Ananya Desai", runAt: "2026-09-06 12:10", status: "Returned", paymentStatus: "-", uploadVersion: 4, locked: false, returnedBy: "Rohan Menon", returnComment: "Please recheck partial redemption for folio F-000117." },
// ];

// // Upload history (versioned)
// export const UPLOADS = [
//   { id: "UPL-0042", version: 4, filename: "series_A1_holders_v4.xlsx", series: "NCD-2024-A1", month: "2026-08", uploadedAt: "2026-08-05 10:24", uploadedBy: "Ananya Desai", total: 1284, valid: 1272, errors: 8, warnings: 4, status: "Completed with Errors", isLatest: true, tdsType: "Resident" },
//   { id: "UPL-0041", version: 3, filename: "series_A1_holders_v3.xlsx", series: "NCD-2024-A1", month: "2026-05", uploadedAt: "2026-05-14 16:02", uploadedBy: "Ananya Desai", total: 1270, valid: 1268, errors: 2, warnings: 3, status: "Completed", isLatest: false, tdsType: "Resident" },
//   { id: "UPL-0039", version: 2, filename: "series_B2_holders_v2.csv", series: "NCD-2024-B2", month: "2026-07", uploadedAt: "2026-07-22 11:47", uploadedBy: "Ananya Desai", total: 862, valid: 860, errors: 2, warnings: 5, status: "Completed with Errors", isLatest: true, tdsType: "Resident" },
//   { id: "UPL-0038", version: 1, filename: "series_A1_nri_holders_v1.xlsx", series: "NCD-2024-A1", month: "2026-08", uploadedAt: "2026-08-05 10:38", uploadedBy: "Ananya Desai", total: 62, valid: 62, errors: 0, warnings: 0, status: "Completed", isLatest: true, tdsType: "NRI" },
//   { id: "UPL-0037", version: 1, filename: "series_A1_lower_v1.xlsx", series: "NCD-2024-A1", month: "2026-08", uploadedAt: "2026-08-05 10:52", uploadedBy: "Ananya Desai", total: 12, valid: 12, errors: 0, warnings: 0, status: "Completed", isLatest: true, tdsType: "Lower" },
// ];

// // Investor records — with TDS type, ready for edit
// export const INVESTORS = [
//   { id: "INV-0112", name: "Vikram Rao", pan: "AABCV1234E", panMasked: "AABCV****E", folio: "F-000112", series: "NCD-2024-A1", month: "2026-08", units: 250, allotment: "2024-04-15", ifsc: "HDFC0000123", account: "0056******7823", accountMasked: "******7823", category: "Individual", tdsType: "Resident", severity: "Passed", manuallyUpdated: false },
//   { id: "INV-0113", name: "Meera Iyer", pan: "AKPPI4459F", panMasked: "AKPPI****F", folio: "F-000113", series: "NCD-2024-A1", month: "2026-08", units: 500, allotment: "2024-04-15", ifsc: "ICIC0001987", account: "0089******4411", accountMasked: "******4411", category: "Individual", tdsType: "Resident", severity: "Passed", manuallyUpdated: false },
//   { id: "INV-0114", name: "Sundaram Capital LLP", pan: "AAECS9902K", panMasked: "AAECS****K", folio: "F-000114", series: "NCD-2024-A1", month: "2026-08", units: 4500, allotment: "2024-04-15", ifsc: "KKBK0000456", account: "1122******9821", accountMasked: "******9821", category: "Corporate", tdsType: "Resident", severity: "Passed", manuallyUpdated: false },
//   { id: "INV-0115", name: "Ritika Shah", pan: "-", panMasked: "-", folio: "F-000115", series: "NCD-2024-A1", month: "2026-08", units: 100, allotment: "2024-06-01", ifsc: "SBIN0009823", account: "3344******1120", accountMasked: "******1120", category: "Individual", tdsType: "Resident", severity: "Critical", issue: "Missing PAN", manuallyUpdated: false },
//   { id: "INV-0116", name: "Aarav Malhotra", pan: "BCPPM8871L", panMasked: "BCPPM****L", folio: "F-000116", series: "NCD-2024-A1", month: "2026-08", units: 200, allotment: "2024-04-15", ifsc: "YESB0000112", account: "5566******2245", accountMasked: "******2245", category: "Individual", tdsType: "Resident", severity: "Passed", manuallyUpdated: true },
//   { id: "INV-0119", name: "Sneha Kapoor", pan: "EDPPK2201S", panMasked: "EDPPK****S", folio: "F-000119", series: "NCD-2024-A1", month: "2026-08", units: 300, allotment: "2024-04-15", ifsc: "UTIB0000234", account: "7788******8811", accountMasked: "******8811", category: "Individual", tdsType: "Resident", severity: "Warning", issue: "Missing Last Interest Paid Date", manuallyUpdated: false },
//   // NRI
//   { id: "INV-0201", name: "Anand Krishnan (NRI)", pan: "AAKPK7712R", panMasked: "AAKPK****R", folio: "F-000201", series: "NCD-2024-A1", month: "2026-08", units: 1200, allotment: "2024-04-15", ifsc: "HDFC0000923", account: "9900******1178", accountMasked: "******1178", category: "NRI", tdsType: "NRI", severity: "Passed", country: "Singapore", manuallyUpdated: false },
//   { id: "INV-0202", name: "Priya Menon (NRI)", pan: "AKMPM2201N", panMasked: "AKMPM****N", folio: "F-000202", series: "NCD-2024-A1", month: "2026-08", units: 800, allotment: "2024-04-15", ifsc: "ICIC0009123", account: "1010******4432", accountMasked: "******4432", category: "NRI", tdsType: "NRI", severity: "Passed", country: "USA", manuallyUpdated: false },
//   // Lower TDS
//   { id: "INV-0301", name: "Kavery Enterprises Pvt Ltd", pan: "AAECK9012P", panMasked: "AAECK****P", folio: "F-000301", series: "NCD-2024-A1", month: "2026-08", units: 3000, allotment: "2024-04-15", ifsc: "AXIS0000778", account: "1212******6612", accountMasked: "******6612", category: "Corporate", tdsType: "Lower", severity: "Passed", lowerTds: { certificateNo: "LTC/2026/00891", refNo: "REF/PAN/A9012", validFrom: "2026-04-01", validTo: "2027-03-31", rate: 2.0, issuer: "Income Tax Office, Chennai", remarks: "197 certificate — TDS @ 2%" }, manuallyUpdated: false },
// ];

// // Calculation line items (used by detail / review — reuse across runs)
// export const CALCULATION_LINES = [
//   { investor: "Vikram Rao", pan: "AABCV****E", folio: "F-000112", units: 250, rate: 8.65, days: 31, gross: 1836.30, tds: 183.63, net: 1652.67, tdsType: "Resident", edgeCase: "Normal", status: "Included" },
//   { investor: "Meera Iyer", pan: "AKPPI****F", folio: "F-000113", units: 500, rate: 8.65, days: 31, gross: 3672.60, tds: 367.26, net: 3305.34, tdsType: "Resident", edgeCase: "Normal", status: "Included" },
//   { investor: "Sundaram Capital LLP", pan: "AAECS****K", folio: "F-000114", units: 4500, rate: 8.65, days: 31, gross: 33053.42, tds: 3305.34, net: 29748.08, tdsType: "Resident", edgeCase: "Normal", status: "Included" },
//   { investor: "Aarav Malhotra (Mid-Period)", pan: "BCPPM****L", folio: "F-000116", units: 200, rate: 8.65, days: 15, gross: 710.96, tds: 71.10, net: 639.86, tdsType: "Resident", edgeCase: "Mid-Period Allotment", status: "Included" },
//   { investor: "Anand Krishnan (NRI)", pan: "AAKPK****R", folio: "F-000201", units: 1200, rate: 8.65, days: 31, gross: 8813.71, tds: 1762.74, net: 7050.97, tdsType: "NRI", edgeCase: "Normal", status: "Included" },
//   { investor: "Kavery Enterprises Pvt Ltd", pan: "AAECK****P", folio: "F-000301", units: 3000, rate: 8.65, days: 31, gross: 22035.62, tds: 440.71, net: 21594.91, tdsType: "Lower", edgeCase: "Lower TDS Certificate", status: "Included" },
//   { investor: "Nikhil Bhatt", pan: "CDPPB****N", folio: "F-000118", units: 0, rate: 8.65, days: 31, gross: 0, tds: 0, net: 0, tdsType: "Resident", edgeCase: "Zero Units", status: "Excluded" },
// ];

// // Reports (quarterly)
// export const REPORTS = [
//   { id: "RPT-000121", name: "Payment Summary Report", series: "NCD-2024-B2", fy: "FY 2026-27", quarter: "Q2", generatedAt: "2026-10-01 10:14", generatedBy: "Ananya Desai", format: "XLSX", status: "Ready" },
//   { id: "RPT-000120", name: "TDS Report", series: "NCD-2024-B2", fy: "FY 2026-27", quarter: "Q2", generatedAt: "2026-10-01 10:14", generatedBy: "Ananya Desai", format: "XLSX", status: "Ready" },
//   { id: "RPT-000112", name: "Payment Summary Report", series: "NCD-2024-A1", fy: "FY 2026-27", quarter: "Q1", generatedAt: "2026-07-01 12:02", generatedBy: "Ananya Desai", format: "XLSX", status: "Ready" },
//   { id: "RPT-000111", name: "TDS Report", series: "NCD-2024-A1", fy: "FY 2026-27", quarter: "Q1", generatedAt: "2026-07-01 12:02", generatedBy: "Ananya Desai", format: "XLSX", status: "Ready" },
//   { id: "RPT-000105", name: "Payment Summary Report", series: "NCD-2024-A1", fy: "FY 2025-26", quarter: "Q4", generatedAt: "2026-04-01 09:10", generatedBy: "Ananya Desai", format: "XLSX", status: "Ready" },
//   { id: "RPT-000104", name: "TDS Report", series: "NCD-2024-A1", fy: "FY 2025-26", quarter: "Q4", generatedAt: "2026-04-01 09:10", generatedBy: "Ananya Desai", format: "XLSX", status: "Ready" },
// ];

// export const AUDIT_LOG = [
//   { id: "A-9821", ts: "2026-09-06 14:22", user: "Ananya Desai", action: "Calculation Run", entity: "CR-2026-0142", series: "NCD-2024-A1", description: "August 2026 · Submitted for review", status: "Success" },
//   { id: "A-9820", ts: "2026-09-06 12:10", user: "Rohan Menon", action: "Return Calculation", entity: "CR-2026-0128", series: "NCD-2024-A1", description: "Please recheck partial redemption for folio F-000117.", status: "Success" },
//   { id: "A-9819", ts: "2026-09-05 10:14", user: "Ananya Desai", action: "Payment Confirmed", entity: "NCD-2024-B2 / Jul 2026", series: "NCD-2024-B2", description: "Marked all July 2026 payments as confirmed", status: "Success" },
//   { id: "A-9818", ts: "2026-09-05 09:41", user: "Rohan Menon", action: "Approve Calculation", entity: "CR-2026-0132", series: "NCD-2024-B2", description: "Approved after override on folio F-000188", status: "Success" },
//   { id: "A-9817", ts: "2026-09-05 09:38", user: "Rohan Menon", action: "Override Net Payable", entity: "CR-2026-0132 / F-000188", series: "NCD-2024-B2", description: "Override 942.10 → 921.00 (reason: TDS re-adjustment on Form 15G)", status: "Success", before: "942.10", after: "921.00", reason: "TDS re-adjustment on Form 15G" },
//   { id: "A-9816", ts: "2026-08-05 08:20", user: "Ananya Desai", action: "Investor Upload", entity: "UPL-0042", series: "NCD-2024-A1", description: "Aug 2026 · Resident · v4, 1284 rows, 12 exceptions", status: "Success" },
//   { id: "A-9815", ts: "2026-08-04 11:08", user: "Ananya Desai", action: "Investor Edit", entity: "INV-0116", series: "NCD-2024-A1", description: "IFSC corrected: INVALID0X → YESB0000112", status: "Success", before: "INVALID0X", after: "YESB0000112", reason: "Bank returned invalid IFSC — corrected manually." },
//   { id: "A-9814", ts: "2026-08-03 15:41", user: "Ananya Desai", action: "TDS Config Update", entity: "TDS/FY2026-27/Q2", series: "-", description: "NRI rate updated 20% → 20% (retained). Resident 10%.", status: "Success" },
// ];

// export const NOTIFICATIONS = [
//   { id: "N-01", type: "review", title: "CR-2026-0142 awaiting review", desc: "NCD-2024-A1 · August 2026 · TDS ₹2.74L", ts: "2 min ago" },
//   { id: "N-02", type: "warning", title: "Upload UPL-0042 has 8 exceptions", desc: "NCD-2024-A1 · Aug 2026", ts: "6 hr ago" },
//   { id: "N-03", type: "success", title: "Calculation CR-2026-0132 approved", desc: "By Rohan Menon", ts: "yesterday" },
//   { id: "N-04", type: "info", title: "3 payment months awaiting confirmation", desc: "Across A1 & B2", ts: "2 days ago" },
// ];

// // TDS configurations by FY + Quarter (Resident + NRI)
// export const TDS_CONFIGS = [
//   { id: "TDS-01", fy: "FY 2026-27", quarter: "Q2", from: "2026-07-01", to: "2026-09-30", resident: 10.0, nri: 20.0, status: "Active" },
//   { id: "TDS-02", fy: "FY 2026-27", quarter: "Q1", from: "2026-04-01", to: "2026-06-30", resident: 10.0, nri: 20.0, status: "Active" },
//   { id: "TDS-03", fy: "FY 2025-26", quarter: "Q4", from: "2026-01-01", to: "2026-03-31", resident: 10.0, nri: 20.0, status: "Superseded" },
//   { id: "TDS-04", fy: "FY 2025-26", quarter: "Q3", from: "2025-10-01", to: "2025-12-31", resident: 10.0, nri: 20.0, status: "Superseded" },
// ];

// // ---- Redemption terms per series ---------------------------
// export const REDEMPTION_TERMS = {
//   "NCD-2024-A1": { lockInMonths: 12, minRedemptionUnits: 100, allowsPartial: true, allowsFull: true, maturityDate: "2027-04-15", faceValue: 1000 },
//   "NCD-2024-B2": { lockInMonths: 18, minRedemptionUnits: 50, allowsPartial: true, allowsFull: true, maturityDate: "2028-06-20", faceValue: 10000 },
//   "NCD-2023-C3": { lockInMonths: 6, minRedemptionUnits: 20, allowsPartial: false, allowsFull: true, maturityDate: "2026-11-08", faceValue: 50000 },
//   "NCD-2025-D4": { lockInMonths: 24, minRedemptionUnits: 10, allowsPartial: true, allowsFull: true, maturityDate: "2030-01-10", faceValue: 100000 },
//   "NCD-2022-E5": { lockInMonths: 0, minRedemptionUnits: 25, allowsPartial: true, allowsFull: true, maturityDate: "2025-05-02", faceValue: 75000 },
// };

// // Investor holdings for redemption (independent of monthly INVESTORS list)
// export const HOLDINGS = [
//   { id: "H-01", series: "NCD-2024-A1", investorId: "INV-0112", name: "Vikram Rao", pan: "AABCV****E", folio: "F-000112", allotmentDate: "2024-04-15", originalUnits: 250, outstandingUnits: 250 },
//   { id: "H-02", series: "NCD-2024-A1", investorId: "INV-0113", name: "Meera Iyer", pan: "AKPPI****F", folio: "F-000113", allotmentDate: "2024-04-15", originalUnits: 500, outstandingUnits: 500 },
//   { id: "H-03", series: "NCD-2024-A1", investorId: "INV-0114", name: "Sundaram Capital LLP", pan: "AAECS****K", folio: "F-000114", allotmentDate: "2024-04-15", originalUnits: 4500, outstandingUnits: 4500 },
//   { id: "H-04", series: "NCD-2024-A1", investorId: "INV-0201", name: "Anand Krishnan (NRI)", pan: "AAKPK****R", folio: "F-000201", allotmentDate: "2024-04-15", originalUnits: 1200, outstandingUnits: 0 },
//   { id: "H-05", series: "NCD-2024-A1", investorId: "INV-0301", name: "Kavery Enterprises Pvt Ltd", pan: "AAECK****P", folio: "F-000301", allotmentDate: "2024-04-15", originalUnits: 3000, outstandingUnits: 2000 },
//   { id: "H-06", series: "NCD-2024-B2", investorId: "INV-B01", name: "Zenith Family Trust", pan: "AAATZ****M", folio: "F-000117", allotmentDate: "2025-11-05", originalUnits: 300, outstandingUnits: 300 },
//   { id: "H-07", series: "NCD-2024-B2", investorId: "INV-B02", name: "Rahul Bhatia", pan: "AXHPB****L", folio: "F-000131", allotmentDate: "2025-08-11", originalUnits: 800, outstandingUnits: 800 },
//   { id: "H-08", series: "NCD-2023-C3", investorId: "INV-C01", name: "Priya Nambiar", pan: "AZAPN****Q", folio: "F-000401", allotmentDate: "2024-01-10", originalUnits: 120, outstandingUnits: 120 },
// ];

// // Redemption requests
// export const REDEMPTION_REQUESTS = [
//   { id: "RD-2026-014", series: "NCD-2024-A1", investorId: "INV-0113", investor: "Meera Iyer", folio: "F-000113", pan: "AKPPI****F", type: "Partial", requestDate: "2026-08-10", redemptionDate: "2026-08-15", units: 200, faceValue: 1000, principal: 200000, interest: 4325.75, tds: 432.58, net: 203893.17, status: "Pending Approval", requestedBy: "Ananya Desai", holdingBefore: 500, holdingAfter: 300 },
//   { id: "RD-2026-013", series: "NCD-2024-A1", investorId: "INV-0114", investor: "Sundaram Capital LLP", folio: "F-000114", pan: "AAECS****K", type: "Partial", requestDate: "2026-07-18", redemptionDate: "2026-07-22", units: 500, faceValue: 1000, principal: 500000, interest: 10812.30, tds: 1081.23, net: 509731.07, status: "Pending Approval", requestedBy: "Ananya Desai", holdingBefore: 4500, holdingAfter: 4000 },
//   { id: "RD-2026-011", series: "NCD-2024-A1", investorId: "INV-0201", investor: "Anand Krishnan (NRI)", folio: "F-000201", pan: "AAKPK****R", type: "Full", requestDate: "2026-06-25", redemptionDate: "2026-06-30", units: 1200, faceValue: 1000, principal: 1200000, interest: 26235.62, tds: 5247.12, net: 1220988.50, status: "Approved", requestedBy: "Ananya Desai", approvedBy: "Rohan Menon", approvedAt: "2026-06-27", holdingBefore: 1200, holdingAfter: 0 },
//   { id: "RD-2026-009", series: "NCD-2024-A1", investorId: "INV-0301", investor: "Kavery Enterprises Pvt Ltd", folio: "F-000301", pan: "AAECK****P", type: "Partial", requestDate: "2026-05-14", redemptionDate: "2026-05-18", units: 1000, faceValue: 1000, principal: 1000000, interest: 21883.56, tds: 437.67, net: 1021445.89, status: "Approved", requestedBy: "Ananya Desai", approvedBy: "Rohan Menon", approvedAt: "2026-05-16", holdingBefore: 3000, holdingAfter: 2000 },
//   { id: "RD-2026-008", series: "NCD-2024-B2", investorId: "INV-B01", investor: "Zenith Family Trust", folio: "F-000117", pan: "AAATZ****M", type: "Partial", requestDate: "2026-08-01", redemptionDate: "2026-08-05", units: 100, faceValue: 10000, principal: 1000000, interest: 22945.20, tds: 2294.52, net: 1020650.68, status: "Returned", requestedBy: "Ananya Desai", returnedBy: "Rohan Menon", returnComment: "Please attach the bank mandate for the trust before resubmitting.", holdingBefore: 300, holdingAfter: 300 },
// ];

// // Dashboard KPIs
// export const KPIS = {
//   activeSeries: 2,
//   totalInvestors: 2132,
//   pendingCalcs: 1,
//   pendingReviews: 1,
//   monthlyTdsDue: 470822.05, // Sum of pending months' TDS
//   pendingPayments: 2,
// };

// // Helpers
// const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// export const monthLabel = (key) => {
//   const meta = MONTHS_META.find((m) => m.key === key);
//   if (meta) return meta.label;
//   const [y, m] = String(key).split("-").map(Number);
//   if (!y || !m) return key;
//   return `${MONTH_NAMES[m - 1]} ${y}`;
// };
// export const monthShort = (key) => {
//   const meta = MONTHS_META.find((m) => m.key === key);
//   if (meta) return meta.short;
//   const [y, m] = String(key).split("-").map(Number);
//   if (!y || !m) return key;
//   return `${MONTH_NAMES[m - 1].slice(0, 3)} ${y}`;
// };



// Realistic fictional mock data for NCD Operations Hub — MONTH-WISE model
//frontend/src/mock/data.js
export const CURRENT_USER = {
  id: "U-1001",
  name: "Ananya Desai",
  email: "ananya.desai@ncdhub.in",
  role: "Finance User / Admin",
  initials: "AD",
};

export const REVIEWER_USER = {
  id: "U-2001",
  name: "Rohan Menon",
  email: "rohan.menon@ncdhub.in",
  role: "Reviewer",
  initials: "RM",
};

// ISO date -> DD-MM-YY handled in lib/format.js

export const SERIES = [
  { id: "NCD-2024-A1", name: "Series A1 – 8.65% Sec NCD 2027", isin: "INE528M07B12", issueDate: "2024-04-15", maturityDate: "2027-04-15", interestType: "Fixed", interestRate: 8.65, baseRate: null, spread: null, frequency: "Monthly", dayCount: "Actual/365", redemptionType: "Bullet", faceValue: 1000, status: "Active" },
  { id: "NCD-2024-B2", name: "Series B2 – Floating MIBOR+250 2028", isin: "INE528M07C09", issueDate: "2024-06-20", maturityDate: "2028-06-20", interestType: "Floating", interestRate: 9.10, baseRate: "MIBOR", spread: 2.50, frequency: "Quarterly", dayCount: "Actual/360", redemptionType: "Bullet", faceValue: 10000, status: "Active" },
  { id: "NCD-2023-C3", name: "Series C3 – 9.25% Sec NCD 2026", isin: "INE528M07A45", issueDate: "2023-11-08", maturityDate: "2026-11-08", interestType: "Fixed", interestRate: 9.25, baseRate: null, spread: null, frequency: "Half-Yearly", dayCount: "30/360", redemptionType: "Bullet", faceValue: 50000, status: "Locked" },
  { id: "NCD-2025-D4", name: "Series D4 – 8.90% Cum. NCD 2030", isin: "INE528M07D33", issueDate: "2025-01-10", maturityDate: "2030-01-10", interestType: "Fixed", interestRate: 8.90, baseRate: null, spread: null, frequency: "Annually", dayCount: "Actual/Actual", redemptionType: "Bullet", faceValue: 100000, status: "Draft" },
  { id: "NCD-2022-E5", name: "Series E5 – 8.20% Sec NCD 2025", isin: "INE528M07E88", issueDate: "2022-05-02", maturityDate: "2025-05-02", interestType: "Fixed", interestRate: 8.20, baseRate: null, spread: null, frequency: "Quarterly", dayCount: "Actual/365", redemptionType: "Bullet", faceValue: 75000, status: "Closed" },
];

export const MONTHS_META = [
  { key: "2026-08", label: "August 2026", short: "Aug 2026", fy: "FY 2026-27", quarter: "Q2" },
  { key: "2026-07", label: "July 2026", short: "Jul 2026", fy: "FY 2026-27", quarter: "Q2" },
  { key: "2026-06", label: "June 2026", short: "Jun 2026", fy: "FY 2026-27", quarter: "Q1" },
  { key: "2026-05", label: "May 2026", short: "May 2026", fy: "FY 2026-27", quarter: "Q1" },
  { key: "2026-04", label: "April 2026", short: "Apr 2026", fy: "FY 2026-27", quarter: "Q1" },
  { key: "2026-03", label: "March 2026", short: "Mar 2026", fy: "FY 2025-26", quarter: "Q4" },
  { key: "2026-02", label: "February 2026", short: "Feb 2026", fy: "FY 2025-26", quarter: "Q4" },
  { key: "2026-01", label: "January 2026", short: "Jan 2026", fy: "FY 2025-26", quarter: "Q4" },
];

// Quarters helper (for selection dropdowns)
export const QUARTERS = [
  { key: "FY2026-27_Q2", label: "Q2 FY 2026-27", months: ["2026-07", "2026-08", "2026-09"] },
  { key: "FY2026-27_Q1", label: "Q1 FY 2026-27", months: ["2026-04", "2026-05", "2026-06"] },
  { key: "FY2025-26_Q4", label: "Q4 FY 2025-26", months: ["2026-01", "2026-02", "2026-03"] },
  { key: "FY2025-26_Q3", label: "Q3 FY 2025-26", months: ["2025-10", "2025-11", "2025-12"] },
];

// Monthly calculation records (primary operational data)
// status values: Pending Review | Returned | Approved | Payment Generated | Closed
// paymentStatus: Confirmation Pending | All Confirmed | -
export const MONTHLY_CALCS = [
  { id: "CR-2026-0142", series: "NCD-2024-A1", month: "2026-08", investors: 1272, gross: 2745820.50, tds: 274582.05, net: 2471238.45, runBy: "Ananya Desai", runAt: "2026-09-06 14:22", status: "Pending Review", paymentStatus: "-", uploadVersion: 4, locked: false },
  { id: "CR-2026-0141", series: "NCD-2024-A1", month: "2026-07", investors: 1272, gross: 2712305.00, tds: 271230.50, net: 2441074.50, runBy: "Ananya Desai", runAt: "2026-08-05 11:10", status: "Approved", paymentStatus: "Confirmation Pending", uploadVersion: 4, locked: true, approvedBy: "Rohan Menon", approvedAt: "2026-08-06 09:41" },
  { id: "CR-2026-0140", series: "NCD-2024-A1", month: "2026-06", investors: 1268, gross: 2698112.30, tds: 269811.23, net: 2428301.07, runBy: "Ananya Desai", runAt: "2026-07-05 10:05", status: "Payment Generated", paymentStatus: "All Confirmed", uploadVersion: 3, locked: true, approvedBy: "Rohan Menon", approvedAt: "2026-07-06 10:22" },
  { id: "CR-2026-0139", series: "NCD-2024-A1", month: "2026-05", investors: 1268, gross: 2685400.00, tds: 268540.00, net: 2416860.00, runBy: "Ananya Desai", runAt: "2026-06-05 09:30", status: "Closed", paymentStatus: "All Confirmed", uploadVersion: 3, locked: true },
  { id: "CR-2026-0138", series: "NCD-2024-A1", month: "2026-04", investors: 1265, gross: 2672300.00, tds: 267230.00, net: 2405070.00, runBy: "Ananya Desai", runAt: "2026-05-05 09:30", status: "Closed", paymentStatus: "All Confirmed", uploadVersion: 3, locked: true },

  { id: "CR-2026-0132", series: "NCD-2024-B2", month: "2026-08", investors: 860, gross: 1962400.00, tds: 196240.00, net: 1766160.00, runBy: "Ananya Desai", runAt: "2026-09-04 11:08", status: "Approved", paymentStatus: "Confirmation Pending", uploadVersion: 2, locked: true, approvedBy: "Rohan Menon", approvedAt: "2026-09-05 09:41" },
  { id: "CR-2026-0131", series: "NCD-2024-B2", month: "2026-07", investors: 858, gross: 1940820.00, tds: 194082.00, net: 1746738.00, runBy: "Ananya Desai", runAt: "2026-08-04 11:20", status: "Payment Generated", paymentStatus: "All Confirmed", uploadVersion: 2, locked: true, approvedBy: "Rohan Menon", approvedAt: "2026-08-05 10:12" },
  { id: "CR-2026-0130", series: "NCD-2024-B2", month: "2026-06", investors: 858, gross: 1925000.00, tds: 192500.00, net: 1732500.00, runBy: "Ananya Desai", runAt: "2026-07-04 10:00", status: "Closed", paymentStatus: "All Confirmed", uploadVersion: 2, locked: true },

  { id: "CR-2026-0128", series: "NCD-2024-A1", month: "2026-08", investors: 1272, gross: 2745820.50, tds: 274582.05, net: 2471238.45, runBy: "Ananya Desai", runAt: "2026-09-06 12:10", status: "Returned", paymentStatus: "-", uploadVersion: 4, locked: false, returnedBy: "Rohan Menon", returnComment: "Please recheck partial redemption for folio F-000117." },
];

// Upload history (versioned)
export const UPLOADS = [
  { id: "UPL-0042", version: 4, filename: "series_A1_holders_v4.xlsx", series: "NCD-2024-A1", month: "2026-08", uploadedAt: "2026-08-05 10:24", uploadedBy: "Ananya Desai", total: 1284, valid: 1272, errors: 8, warnings: 4, status: "Completed with Errors", isLatest: true, tdsType: "Resident" },
  { id: "UPL-0041", version: 3, filename: "series_A1_holders_v3.xlsx", series: "NCD-2024-A1", month: "2026-05", uploadedAt: "2026-05-14 16:02", uploadedBy: "Ananya Desai", total: 1270, valid: 1268, errors: 2, warnings: 3, status: "Completed", isLatest: false, tdsType: "Resident" },
  { id: "UPL-0039", version: 2, filename: "series_B2_holders_v2.csv", series: "NCD-2024-B2", month: "2026-07", uploadedAt: "2026-07-22 11:47", uploadedBy: "Ananya Desai", total: 862, valid: 860, errors: 2, warnings: 5, status: "Completed with Errors", isLatest: true, tdsType: "Resident" },
  { id: "UPL-0038", version: 1, filename: "series_A1_nri_holders_v1.xlsx", series: "NCD-2024-A1", month: "2026-08", uploadedAt: "2026-08-05 10:38", uploadedBy: "Ananya Desai", total: 62, valid: 62, errors: 0, warnings: 0, status: "Completed", isLatest: true, tdsType: "NRI" },
  { id: "UPL-0037", version: 1, filename: "series_A1_lower_v1.xlsx", series: "NCD-2024-A1", month: "2026-08", uploadedAt: "2026-08-05 10:52", uploadedBy: "Ananya Desai", total: 12, valid: 12, errors: 0, warnings: 0, status: "Completed", isLatest: true, tdsType: "Lower" },
];

// Investor records — with TDS type, ready for edit
export const INVESTORS = [
  { id: "INV-0112", name: "Vikram Rao", pan: "AABCV1234E", panMasked: "AABCV****E", folio: "F-000112", series: "NCD-2024-A1", month: "2026-08", units: 250, allotment: "2024-04-15", ifsc: "HDFC0000123", account: "0056******7823", accountMasked: "******7823", category: "Individual", tdsType: "Resident", severity: "Passed", manuallyUpdated: false },
  { id: "INV-0113", name: "Meera Iyer", pan: "AKPPI4459F", panMasked: "AKPPI****F", folio: "F-000113", series: "NCD-2024-A1", month: "2026-08", units: 500, allotment: "2024-04-15", ifsc: "ICIC0001987", account: "0089******4411", accountMasked: "******4411", category: "Individual", tdsType: "Resident", severity: "Passed", manuallyUpdated: false },
  { id: "INV-0114", name: "Sundaram Capital LLP", pan: "AAECS9902K", panMasked: "AAECS****K", folio: "F-000114", series: "NCD-2024-A1", month: "2026-08", units: 4500, allotment: "2024-04-15", ifsc: "KKBK0000456", account: "1122******9821", accountMasked: "******9821", category: "Corporate", tdsType: "Resident", severity: "Passed", manuallyUpdated: false },
  { id: "INV-0115", name: "Ritika Shah", pan: "-", panMasked: "-", folio: "F-000115", series: "NCD-2024-A1", month: "2026-08", units: 100, allotment: "2024-06-01", ifsc: "SBIN0009823", account: "3344******1120", accountMasked: "******1120", category: "Individual", tdsType: "Resident", severity: "Critical", issue: "Missing PAN", manuallyUpdated: false },
  { id: "INV-0116", name: "Aarav Malhotra", pan: "BCPPM8871L", panMasked: "BCPPM****L", folio: "F-000116", series: "NCD-2024-A1", month: "2026-08", units: 200, allotment: "2024-04-15", ifsc: "YESB0000112", account: "5566******2245", accountMasked: "******2245", category: "Individual", tdsType: "Resident", severity: "Passed", manuallyUpdated: true },
  { id: "INV-0119", name: "Sneha Kapoor", pan: "EDPPK2201S", panMasked: "EDPPK****S", folio: "F-000119", series: "NCD-2024-A1", month: "2026-08", units: 300, allotment: "2024-04-15", ifsc: "UTIB0000234", account: "7788******8811", accountMasked: "******8811", category: "Individual", tdsType: "Resident", severity: "Warning", issue: "Missing Last Interest Paid Date", manuallyUpdated: false },
  // NRI
  { id: "INV-0201", name: "Anand Krishnan (NRI)", pan: "AAKPK7712R", panMasked: "AAKPK****R", folio: "F-000201", series: "NCD-2024-A1", month: "2026-08", units: 1200, allotment: "2024-04-15", ifsc: "HDFC0000923", account: "9900******1178", accountMasked: "******1178", category: "NRI", tdsType: "NRI", severity: "Passed", country: "Singapore", manuallyUpdated: false },
  { id: "INV-0202", name: "Priya Menon (NRI)", pan: "AKMPM2201N", panMasked: "AKMPM****N", folio: "F-000202", series: "NCD-2024-A1", month: "2026-08", units: 800, allotment: "2024-04-15", ifsc: "ICIC0009123", account: "1010******4432", accountMasked: "******4432", category: "NRI", tdsType: "NRI", severity: "Passed", country: "USA", manuallyUpdated: false },
  // Lower TDS
  { id: "INV-0301", name: "Kavery Enterprises Pvt Ltd", pan: "AAECK9012P", panMasked: "AAECK****P", folio: "F-000301", series: "NCD-2024-A1", month: "2026-08", units: 3000, allotment: "2024-04-15", ifsc: "AXIS0000778", account: "1212******6612", accountMasked: "******6612", category: "Corporate", tdsType: "Lower", severity: "Passed", lowerTds: { certificateNo: "LTC/2026/00891", refNo: "REF/PAN/A9012", validFrom: "2026-04-01", validTo: "2027-03-31", rate: 2.0, issuer: "Income Tax Office, Chennai", remarks: "197 certificate — TDS @ 2%" }, manuallyUpdated: false },
];

// Calculation line items (used by detail / review — reuse across runs)
export const CALCULATION_LINES = [
  { investor: "Vikram Rao", pan: "AABCV****E", folio: "F-000112", units: 250, rate: 8.65, days: 31, gross: 1836.30, tds: 183.63, net: 1652.67, tdsType: "Resident", edgeCase: "Normal", status: "Included" },
  { investor: "Meera Iyer", pan: "AKPPI****F", folio: "F-000113", units: 500, rate: 8.65, days: 31, gross: 3672.60, tds: 367.26, net: 3305.34, tdsType: "Resident", edgeCase: "Normal", status: "Included" },
  { investor: "Sundaram Capital LLP", pan: "AAECS****K", folio: "F-000114", units: 4500, rate: 8.65, days: 31, gross: 33053.42, tds: 3305.34, net: 29748.08, tdsType: "Resident", edgeCase: "Normal", status: "Included" },
  { investor: "Aarav Malhota (Mid-Period)", pan: "BCPPM****L", folio: "F-000116", units: 200, rate: 8.65, days: 15, gross: 710.96, tds: 71.10, net: 639.86, tdsType: "Resident", edgeCase: "Mid-Period Allotment", status: "Included" },
  { investor: "Anand Krishnan (NRI)", pan: "AAKPK****R", folio: "F-000201", units: 1200, rate: 8.65, days: 31, gross: 8813.71, tds: 1762.74, net: 7050.97, tdsType: "NRI", edgeCase: "Normal", status: "Included" },
  { investor: "Kavery Enterprises Pvt Ltd", pan: "AAECK****P", folio: "F-000301", units: 3000, rate: 8.65, days: 31, gross: 22035.62, tds: 440.71, net: 21594.91, tdsType: "Lower", edgeCase: "Lower TDS Certificate", status: "Included" },
  { investor: "Nikhil Bhatt", pan: "CDPPB****N", folio: "F-000118", units: 0, rate: 8.65, days: 31, gross: 0, tds: 0, net: 0, tdsType: "Resident", edgeCase: "Zero Units", status: "Excluded" },
];

// Reports (quarterly)
export const REPORTS = [
  { id: "RPT-000121", name: "Payment Summary Report", series: "NCD-2024-B2", fy: "FY 2026-27", quarter: "Q2", generatedAt: "2026-10-01 10:14", generatedBy: "Ananya Desai", format: "XLSX", status: "Ready" },
  { id: "RPT-000120", name: "TDS Report", series: "NCD-2024-B2", fy: "FY 2026-27", quarter: "Q2", generatedAt: "2026-10-01 10:14", generatedBy: "Ananya Desai", format: "XLSX", status: "Ready" },
  { id: "RPT-000112", name: "Payment Summary Report", series: "NCD-2024-A1", fy: "FY 2026-27", quarter: "Q1", generatedAt: "2026-07-01 12:02", generatedBy: "Ananya Desai", format: "XLSX", status: "Ready" },
  { id: "RPT-000111", name: "TDS Report", series: "NCD-2024-A1", fy: "FY 2026-27", quarter: "Q1", generatedAt: "2026-07-01 12:02", generatedBy: "Ananya Desai", format: "XLSX", status: "Ready" },
  { id: "RPT-000105", name: "Payment Summary Report", series: "NCD-2024-A1", fy: "FY 2025-26", quarter: "Q4", generatedAt: "2026-04-01 09:10", generatedBy: "Ananya Desai", format: "XLSX", status: "Ready" },
  { id: "RPT-000104", name: "TDS Report", series: "NCD-2024-A1", fy: "FY 2025-26", quarter: "Q4", generatedAt: "2026-04-01 09:10", generatedBy: "Ananya Desai", format: "XLSX", status: "Ready" },
];

export const AUDIT_LOG = [
  { id: "A-9821", ts: "2026-09-06 14:22", user: "Ananya Desai", action: "Calculation Run", entity: "CR-2026-0142", series: "NCD-2024-A1", description: "August 2026 · Submitted for review", status: "Success" },
  { id: "A-9820", ts: "2026-09-06 12:10", user: "Rohan Menon", action: "Return Calculation", entity: "CR-2026-0128", series: "NCD-2024-A1", description: "Please recheck partial redemption for folio F-000117.", status: "Success" },
  { id: "A-9819", ts: "2026-09-05 10:14", user: "Ananya Desai", action: "Payment Confirmed", entity: "NCD-2024-B2 / Jul 2026", series: "NCD-2024-B2", description: "Marked all July 2026 payments as confirmed", status: "Success" },
  { id: "A-9818", ts: "2026-09-05 09:41", user: "Rohan Menon", action: "Approve Calculation", entity: "CR-2026-0132", series: "NCD-2024-B2", description: "Approved after override on folio F-000188", status: "Success" },
  { id: "A-9817", ts: "2026-09-05 09:38", user: "Rohan Menon", action: "Override Net Payable", entity: "CR-2026-0132 / F-000188", series: "NCD-2024-B2", description: "Override 942.10 → 921.00 (reason: TDS re-adjustment on Form 15G)", status: "Success", before: "942.10", after: "921.00", reason: "TDS re-adjustment on Form 15G" },
  { id: "A-9816", ts: "2026-08-05 08:20", user: "Ananya Desai", action: "Investor Upload", entity: "UPL-0042", series: "NCD-2024-A1", description: "Aug 2026 · Resident · v4, 1284 rows, 12 exceptions", status: "Success" },
  { id: "A-9815", ts: "2026-08-04 11:08", user: "Ananya Desai", action: "Investor Edit", entity: "INV-0116", series: "NCD-2024-A1", description: "IFSC corrected: INVALID0X → YESB0000112", status: "Success", before: "INVALID0X", after: "YESB0000112", reason: "Bank returned invalid IFSC — corrected manually." },
  { id: "A-9814", ts: "2026-08-03 15:41", user: "Ananya Desai", action: "TDS Config Update", entity: "TDS/FY2026-27/Q2", series: "-", description: "NRI rate updated 20% → 20% (retained). Resident 10%.", status: "Success" },
];

export const NOTIFICATIONS = [
  { id: "N-01", type: "review", title: "CR-2026-0142 awaiting review", desc: "NCD-2024-A1 · August 2026 · TDS ₹2.74L", ts: "2 min ago" },
  { id: "N-02", type: "warning", title: "Upload UPL-0042 has 8 exceptions", desc: "NCD-2024-A1 · Aug 2026", ts: "6 hr ago" },
  { id: "N-03", type: "success", title: "Calculation CR-2026-0132 approved", desc: "By Rohan Menon", ts: "yesterday" },
  { id: "N-04", type: "info", title: "3 payment months awaiting confirmation", desc: "Across A1 & B2", ts: "2 days ago" },
];

// TDS configurations — Type + Rate + Effective From/To (no FY/Quarter)
// toDate === null means "open-ended / Till Now" (currently active).
export const TDS_CONFIGS = [
  { id: "TDS-R1", type: "Resident", rate: 10.0, fromDate: "2026-04-01", toDate: "2026-12-31", status: "Closed" },
  { id: "TDS-R2", type: "Resident", rate: 12.0, fromDate: "2027-01-01", toDate: null, status: "Active" },
  { id: "TDS-N1", type: "NRI", rate: 20.0, fromDate: "2026-04-01", toDate: "2026-09-30", status: "Closed" },
  { id: "TDS-N2", type: "NRI", rate: 22.0, fromDate: "2026-10-01", toDate: null, status: "Active" },
];

// ---- Redemption terms per series (maturity + lockIn + faceValue only) ---
export const REDEMPTION_TERMS = {
  "NCD-2024-A1": { lockInMonths: 12, maturityDate: "2027-04-15", faceValue: 1000, totalUnits: 2500, grossInterest: 215000, tds: 21500 },
  "NCD-2024-B2": { lockInMonths: 18, maturityDate: "2028-06-20", faceValue: 10000, totalUnits: 860, grossInterest: 894000, tds: 89400 },
  "NCD-2023-C3": { lockInMonths: 6, maturityDate: "2026-11-08", faceValue: 50000, totalUnits: 604, grossInterest: 2793750, tds: 279375 },
  "NCD-2025-D4": { lockInMonths: 24, maturityDate: "2030-01-10", faceValue: 100000, totalUnits: 300, grossInterest: 800000, tds: 80000 },
  "NCD-2022-E5": { lockInMonths: 0, maturityDate: "2025-05-02", faceValue: 75000, totalUnits: 800, grossInterest: 4920000, tds: 492000 },
};

// Series-level redemption requests
export const REDEMPTION_REQUESTS = [
  { id: "RD-2027-014", series: "NCD-2024-A1", maturityDate: "2027-04-15", totalUnits: 2500, faceValue: 1000, totalFaceValue: 2500000, grossInterest: 215000, tds: 21500, netPayable: 2693500, requestDate: "2027-04-15", requestedBy: "Ananya Desai", status: "Pending Approval" },
  { id: "RD-2026-011", series: "NCD-2023-C3", maturityDate: "2026-11-08", totalUnits: 604, faceValue: 50000, totalFaceValue: 30200000, grossInterest: 2793750, tds: 279375, netPayable: 32714375, requestDate: "2026-11-08", requestedBy: "Ananya Desai", status: "Approved", approvedBy: "Rohan Menon", approvedAt: "2026-11-09" },
  { id: "RD-2025-009", series: "NCD-2022-E5", maturityDate: "2025-05-02", totalUnits: 800, faceValue: 75000, totalFaceValue: 60000000, grossInterest: 4920000, tds: 492000, netPayable: 64428000, requestDate: "2025-05-02", requestedBy: "Ananya Desai", status: "Approved", approvedBy: "Rohan Menon", approvedAt: "2025-05-04" },
];

// Dashboard KPIs
export const KPIS = {
  activeSeries: 2,
  totalInvestors: 2132,
  pendingCalcs: 1,
  pendingReviews: 1,
  monthlyTdsDue: 470822.05, // Sum of pending months' TDS
  pendingPayments: 2,
};

// Helpers
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const monthLabel = (key) => {
  const meta = MONTHS_META.find((m) => m.key === key);
  if (meta) return meta.label;
  const [y, m] = String(key).split("-").map(Number);
  if (!y || !m) return key;
  return `${MONTH_NAMES[m - 1]} ${y}`;
};
export const monthShort = (key) => {
  const meta = MONTHS_META.find((m) => m.key === key);
  if (meta) return meta.short;
  const [y, m] = String(key).split("-").map(Number);
  if (!y || !m) return key;
  return `${MONTH_NAMES[m - 1].slice(0, 3)} ${y}`;
};

 

