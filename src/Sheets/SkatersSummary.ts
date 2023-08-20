import { StandardSheetConfig } from "../defs";

export const SkatersSummarySheetConfig = {
  name: "Skaters Summary",
  locked: true,
  columnConfigurations: [
    { headerName: "Student", field: "student" },
    { headerName: "Lessons Total", field: "lessonsTotal" },
    { headerName: "Extras Total", field: "extrasTotal" },
    { headerName: "Sub Total", field: "subTotal" },
    { headerName: "Payments Total", field: "paymentsTotal" },
    { headerName: "Charges Total", field: "chargesTotal" },
    { headerName: "Previous Balance", field: "previousBalance" },
    { headerName: "Grand Total", field: "grandTotal" },
  ],
} as const satisfies StandardSheetConfig;
