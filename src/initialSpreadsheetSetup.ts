/* eslint-disable @typescript-eslint/no-unused-vars */
import { CoachInfoSheetConfig } from "./Sheets/CoachInfo";
import { CoachSummarySheetConfig } from "./Sheets/CoachSummary";
import { InvoiceHistorySheetConfig } from "./Sheets/InvoiceHistory";
import { PaymentsSheetConfig } from "./Sheets/Payments";
import { SkatersSummarySheetConfig } from "./Sheets/SkatersSummary";
import { StudentInfoSheetConfig } from "./Sheets/StudentInfo";
import { setupStandardSheet } from "./setupStandardSheet";
import { LessonLogsSheetConfig } from "./Sheets/LessonLogs";
import { SpecialSheetConfig, StandardSheetConfig } from "./defs";

export const config = [
  StudentInfoSheetConfig,
  CoachInfoSheetConfig,
  PaymentsSheetConfig,
  CoachSummarySheetConfig,
  SkatersSummarySheetConfig,
  {
    name: "Bill Preview",
    setup: (sheet: GoogleAppsScript.Spreadsheet.Sheet) => {},
  },
  {
    name: "Email Template",
    setup: (sheet: GoogleAppsScript.Spreadsheet.Sheet) => {},
  },
  InvoiceHistorySheetConfig,
  LessonLogsSheetConfig,
] as const satisfies ReadonlyArray<StandardSheetConfig | SpecialSheetConfig>;

export type SheetName = (typeof config)[number]["name"];

export const DEFAULT_SHEET_NAME = "Sheet1";

function setupSpecialSheet(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  sheetConfig: SpecialSheetConfig
) {
  sheetConfig.setup(sheet);
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
  const defaultSheet = spreadsheet.getSheetByName(DEFAULT_SHEET_NAME);
  if (defaultSheet) {
    spreadsheet.deleteSheet(defaultSheet);
  }
}

export function reset() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const currentSheets = spreadsheet
    .getSheets()
    .filter((sheet) => sheet.getName() !== DEFAULT_SHEET_NAME);
  if (!spreadsheet.getSheetByName(DEFAULT_SHEET_NAME)) {
    spreadsheet.insertSheet(DEFAULT_SHEET_NAME);
  }
  currentSheets.forEach((sheet) => {
    spreadsheet.deleteSheet(sheet);
  });
}

export function resetAndInit() {
  reset();
  initialSpreadsheetSetup();
}
