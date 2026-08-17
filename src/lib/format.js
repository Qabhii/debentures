export const inr = (n, opts = {}) => {
  if (n == null || Number.isNaN(Number(n))) return "—";
  const { compact = false, decimals = 2 } = opts;
  if (compact) {
    const v = Number(n);
    if (Math.abs(v) >= 1e7) return `₹${(v / 1e7).toFixed(2)} Cr`;
    if (Math.abs(v) >= 1e5) return `₹${(v / 1e5).toFixed(2)} L`;
    if (Math.abs(v) >= 1e3) return `₹${(v / 1e3).toFixed(2)} K`;
  }
  return "₹" + Number(n).toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};

export const num = (n, decimals = 0) => {
  if (n == null) return "—";
  return Number(n).toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};

// DD-MM-YY Indian format
export const fmtDate = (d) => {
  if (!d || d === "-") return "—";
  const s = String(d);
  // ISO YYYY-MM-DD or YYYY-MM-DD HH:MM
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}:\d{2}))?/);
  if (!m) return s;
  const yy = m[1].slice(2);
  const time = m[4] ? ` ${m[4]}` : "";
  return `${m[3]}-${m[2]}-${yy}${time}`;
};

export const shortDate = fmtDate; // legacy alias
