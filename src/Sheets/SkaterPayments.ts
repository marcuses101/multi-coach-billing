import { StandardSheetConfig } from "../defs";

interface PaymentInputEntry {
  skaterName: string;
  amountPayedInDollars: number;
  date: Date;
  additionalInfo: string;
}

export const SkaterPaymentsSheetConfig = {
  name: "Payments",
  columnConfigurations: [
    { headerName: "Skater Name", field: "skaterName" },
    { headerName: "Amount", field: "amountPayedInDollars" },
    { headerName: "Date Received", field: "date" },
    { headerName: "Additional Info", field: "additionalInfo" },
  ],
} as const satisfies StandardSheetConfig<PaymentInputEntry>;
