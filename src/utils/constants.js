export const C = {
  bg: "#F7F8FA",
  surface: "#FFFFFF",
  border: "#E4E7EC",
  borderStrong: "#D0D5DD",
  textPrimary: "#101828",
  textSecondary: "#667085",
  textTertiary: "#98A2B3",
  accent: "#146C5B",
  accentSoft: "#E6F2EF",
  accentText: "#0E4F42",
  danger: "#B42318",
  dangerSoft: "#FDECEC",
  success: "#067647",
  successSoft: "#E7F6EE",
};

export const FONT_STACK = '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif';
export const MONO_STACK = '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace';

export const FAMILY = [
  { id: "you", name: "You" },
  { id: "mom", name: "Mom" },
  { id: "dad", name: "Dad" },
  { id: "jess", name: "Jess" },
];

export const initialExpenses = [
  { id: 1, text: "Groceries — Whole Foods", rate: 86.42, date: "2026-08-21" },
  { id: 2, text: "Electricity bill", rate: 142.0, date: "2026-08-18" },
  { id: 3, text: "Internet", rate: 59.99, date: "2026-08-12" },
  { id: 4, text: "Gas station fill-up", rate: 48.3, date: "2026-07-29" },
  { id: 5, text: "Pharmacy — prescriptions", rate: 22.15, date: "2026-07-14" },
];

// owedBy = person who is owed the money (creator). owedTo = person who owes it.
export const initialOwed = [
  { id: 1, text: "Dinner at Olive Garden", rate: 34.5, date: "2026-08-20", owedBy: "you", owedTo: "jess", status: "pending" },
  { id: 2, text: "Movie tickets", rate: 28.0, date: "2026-08-15", owedBy: "you", owedTo: "dad", status: "pending" },
  { id: 3, text: "Uber split", rate: 12.75, date: "2026-08-09", owedBy: "you", owedTo: "mom", status: "paid" },
  { id: 4, text: "Concert tickets", rate: 65.0, date: "2026-08-17", owedBy: "mom", owedTo: "you", status: "pending" },
  { id: 5, text: "Birthday gift split", rate: 40.0, date: "2026-08-05", owedBy: "dad", owedTo: "you", status: "pending" },
  { id: 6, text: "Takeout order", rate: 18.6, date: "2026-07-22", owedBy: "mom", owedTo: "you", status: "paid" },
];
