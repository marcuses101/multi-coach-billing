import type { StandardSheetConfig } from "../defs";

interface SkaterBalanceLogEntry {
  skaterId: string;
  skaterName: string;
  date: Date;
  amountInDollars: number;
  type: string; // TODO determine some enum for this value
  additionalInfo: string;
}

export const SkaterBalanceLogSheetConfig = {
  name: "Skater Balance Log",
  columnConfigurations: [
    { headerName: "Skater Id", field: "skaterId" },
    { headerName: "Skater Name", field: "skaterName" },
    { headerName: "Date", field: "date" },
    { headerName: "Amount", field: "amountInDollars" },
    { headerName: "Type", field: "type" },
    { headerName: "Additional Info", field: "additionalInfo" },
  ],
} as const satisfies StandardSheetConfig<SkaterBalanceLogEntry>;
