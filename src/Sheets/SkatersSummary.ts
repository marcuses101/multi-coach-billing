import { StandardSheetConfig } from "../defs";
import { placeholderSheetSetup } from "../placeholderSheetSetup";

interface SkaterSummaryEntry {
  skaterName: string;
  lessonsTotalInDollars: number;
  extrasTotalInDollars: number;
  subTotalInDollars: number;
  paymentsTotalInDollars: number;
  chargesTotalInDollars: number;
  previousBalanceInDollars: number;
  grandTotalInDollars: number;
}

export const SkatersSummarySheetConfig = {
  name: "Skaters Summary",
  locked: true,
  columnConfigurations: [
    { headerName: "Skater Name", field: "skaterName" },
    { headerName: "Lessons Total", field: "lessonsTotalInDollars" },
    { headerName: "Extras Total", field: "extrasTotalInDollars" },
    { headerName: "Sub Total", field: "subTotalInDollars" },
    { headerName: "Payments Total", field: "paymentsTotalInDollars" },
    { headerName: "Charges Total", field: "chargesTotalInDollars" },
    { headerName: "Previous Balance", field: "previousBalanceInDollars" },
    { headerName: "Grand Total", field: "grandTotalInDollars" },
  ],
  setup: placeholderSheetSetup,
} as const satisfies StandardSheetConfig<SkaterSummaryEntry>;
