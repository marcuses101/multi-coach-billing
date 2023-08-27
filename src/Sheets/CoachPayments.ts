import { StandardSheetConfig } from "../defs";

interface CoachPaymentInputEntry {
  coachName: string;
  amountPayedInDollars: number;
  date: Date;
  additionalInfo: string;
}

export const CoachPaymentsSheetConfig = {
  name: "Payments",
  columnConfigurations: [
    { headerName: "Coach Name", field: "coachName" },
    { headerName: "Amount", field: "amountPayedInDollars" },
    { headerName: "Date Received", field: "date" },
    { headerName: "Additional Info", field: "additionalInfo" },
  ],
} as const satisfies StandardSheetConfig<CoachPaymentInputEntry>;
