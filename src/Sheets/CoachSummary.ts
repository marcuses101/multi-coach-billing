import { StandardSheetConfig } from "../defs";
import { placeholderSheetSetup } from "../placeholderSheetSetup";

interface CoachSummary {
  coachName: string;
  previousBalanceInDollars: number;
}

export const CoachSummarySheetConfig = {
  name: "Coaches Summary",
  locked: true,
  columnConfigurations: [
    { headerName: "Coach Name", field: "coachName" },
    { headerName: "Previous Balance", field: "previousBalanceInDollars" },
  ],
  setup: placeholderSheetSetup,
} as const satisfies StandardSheetConfig<CoachSummary>;
