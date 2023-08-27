import type { StandardSheetConfig } from "../defs";

interface CoachBalanceSheetEntry {
  coachId: string;
  coachName: string;
  date: Date;
  amountInCents: number;
  type: string; // TODO determine some enum for this value
  additionalInfo: string;
}

export const CoachBalanceLogSheetConfig = {
  name: "Coach Balance Log",
  columnConfigurations: [
    { headerName: "Skater Id", field: "coachId" },
    { headerName: "Skater Name", field: "coachName" },
    { headerName: "Date", field: "date" },
    { headerName: "Amount", field: "amountInCents" },
    { headerName: "Type", field: "type" },
    { headerName: "Additional Info", field: "additionalInfo" },
  ],
} as const satisfies StandardSheetConfig<CoachBalanceSheetEntry>;
