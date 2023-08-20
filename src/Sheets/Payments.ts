import { StandardSheetConfig } from "../defs";

export const PaymentsSheetConfig = {
  name: "Payments",
  columnConfigurations: [
    { headerName: "Skater Name", field: "skaterName" },
    { headerName: "Amount", field: "amountPayedInDollars" },
    { headerName: "Date Received", field: "date" },
    { headerName: "Additional Info", field: "additionalInfo" },
  ],
} as const satisfies StandardSheetConfig;
