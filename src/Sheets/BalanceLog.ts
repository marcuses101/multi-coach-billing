import type { StandardSheetConfig } from "../defs";

export const BalanceLogSheetConfig: StandardSheetConfig = {
  name: "Balance Log",
  columnConfigurations: [
    { headerName: "Skater Id", field: "skaterId" },
    { headerName: "Skater Name", field: "skaterName" },
    { headerName: "Date", field: "date" },
    { headerName: "Amount", field: "amount" },
    { headerName: "Type", field: "type" },
    { headerName: "Additional Info", field: "additionalInfo" },
  ],
};
