import { StandardSheetConfig } from "../defs";

export const InvoiceHistorySheetConfig = {
  name: "Invoice History",
  columnConfigurations: [
    { headerName: "Invoice Id", field: "invoiceId" },
    { headerName: "Date", field: "date" },
    { headerName: "Student Name", field: "studentName" },
    { headerName: "Amount", field: "amount" },
    { headerName: "Invoice Link", field: "invoiceLink" },
  ],
} as const satisfies StandardSheetConfig;
