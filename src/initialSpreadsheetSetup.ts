import { CoachInfoSheetConfig } from "Sheets/CoachInfo";

/* eslint-disable @typescript-eslint/no-unused-vars */
interface ColumnConfiguration {
  headerName?: string;
  field: string;
}

export interface StandardSheetConfig {
  name: string;
  locked?: boolean;
  columnConfigurations: ReadonlyArray<ColumnConfiguration>;
}

export interface SpecialSheetConfig {
  name: string;
  locked?: boolean;
  setup: (sheet: GoogleAppsScript.Spreadsheet.Sheet) => void;
}

export const config = [
  {
    name: "Student Info",
    columnConfigurations: [
      { headerName: "Id", field: "id" },
      { headerName: "First Name", field: "firstName" },
      { headerName: "Last Name", field: "lastName" },
    ],
  },
  CoachInfoSheetConfig,
  {
    name: "Payments",
    columnConfigurations: [
      { headerName: "Client", field: "client" },
      { headerName: "Amount", field: "amountPayed" },
      { headerName: "Date Received", field: "date" },
      { headerName: "Amount", field: "amountPayed" },
    ],
  },
  {
    name: "Summary",
    locked: true,
    columnConfigurations: [
      { headerName: "Student", field: "student" },
      { headerName: "Lessons Total", field: "lessonsTotal" },
      { headerName: "Extras Total", field: "extrasTotal" },
      { headerName: "Sub Total", field: "subTotal" },
      { headerName: "Payments Total", field: "paymentsTotal" },
      { headerName: "Charges Total", field: "chargesTotal" },
      { headerName: "Previous Balance", field: "previousBalance" },
      { headerName: "Grand Total", field: "grandTotal" },
    ],
  },
  {
    name: "Bill Preview",
    setup: (sheet: GoogleAppsScript.Spreadsheet.Sheet) => {},
  },
  {
    name: "Email Template",
    setup: (sheet: GoogleAppsScript.Spreadsheet.Sheet) => {},
  },
  {
    name: "Invoice History",
    columnConfigurations: [
      { headerName: "Invoice Id", field: "invoiceId" },
      { headerName: "Date", field: "date" },
      { headerName: "Student Name", field: "studentName" },
      { headerName: "Amount", field: "amount" },
      { headerName: "Invoice Link", field: "invoiceLink" },
    ],
  },
] as const;

export type SheetName = (typeof config)[number]["name"];

function setupSpecialSheet(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  sheetConfig: SpecialSheetConfig
) {
  sheetConfig.setup(sheet);
}
export function setupStandardSheet(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  sheetConfig: StandardSheetConfig
) {
  sheet
    .getRange("A1:Z")
    .applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY);
  // Remove unused columns

  const numberOfColumns = sheetConfig.columnConfigurations.length;

  sheet.deleteColumns(
    numberOfColumns + 1,
    sheet.getMaxColumns() - numberOfColumns
  );
  const headers = sheetConfig.columnConfigurations.map(
    ({ headerName = "" }) => headerName
  );

  sheet
    .getRange("1:1")
    .setFontWeight("bold")
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);

  sheet.getRange(1, 1, 1, numberOfColumns).setValues([headers]);
}

export function initialSpreadsheetSetup() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = config.map((sheetConfig) => ({
    sheetConfig,
    sheet: spreadsheet.insertSheet(sheetConfig.name),
  }));
  sheets.forEach(({ sheet: currentSheet, sheetConfig }) => {
    if ("setup" in sheetConfig) {
      setupSpecialSheet(currentSheet, sheetConfig);
      return;
    }
    setupStandardSheet(currentSheet, sheetConfig);
  });
}
