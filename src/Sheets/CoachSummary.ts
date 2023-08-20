import { StandardSheetConfig } from "../defs";

export const CoachSummarySheetConfig = {
  name: "Coaches Summary",
  locked: true,
  columnConfigurations: [{ headerName: "Coach Name", field: "coachName" }],
} as const satisfies StandardSheetConfig;
