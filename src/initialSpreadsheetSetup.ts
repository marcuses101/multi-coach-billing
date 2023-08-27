/* eslint-disable @typescript-eslint/no-unused-vars */
import { CoachInfoSheetConfig } from "./Sheets/CoachInfo";
import { CoachSummarySheetConfig } from "./Sheets/CoachSummary";
import { InvoiceHistorySheetConfig } from "./Sheets/InvoiceHistory";
import { SkaterPaymentsSheetConfig } from "./Sheets/SkaterPayments";
import { SkatersSummarySheetConfig } from "./Sheets/SkatersSummary";
import { SkaterInfoSheetConfig } from "./Sheets/SkaterInfo";
import { setupStandardSheet } from "./setupStandardSheet";
import { LessonLogsSheetConfig } from "./Sheets/LessonLogs";
import { StandardSheetConfig } from "./defs";
import { SkaterBalanceLogSheetConfig } from "./Sheets/SkaterBalanceLog";
import { CoachBalanceLogSheetConfig } from "./Sheets/CoachBalanceLog";
import { BillPreviewSheetConfig } from "./Sheets/BillPreview";
import { EmailTemplateSheetConfig } from "./Sheets/EmailTemplate";

export const config = [
  SkaterInfoSheetConfig,
  CoachInfoSheetConfig,
  SkaterPaymentsSheetConfig,
  SkaterBalanceLogSheetConfig,
  CoachBalanceLogSheetConfig,
  CoachSummarySheetConfig,
  SkatersSummarySheetConfig,
  BillPreviewSheetConfig,
  EmailTemplateSheetConfig,
  InvoiceHistorySheetConfig,
  LessonLogsSheetConfig,
] as const satisfies ReadonlyArray<StandardSheetConfig<any>>;

export type SheetName = (typeof config)[number]["name"];

export const DEFAULT_SHEET_NAME = "Sheet1";

export function initialSpreadsheetSetup() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = config.map((sheetConfig) => ({
    sheetConfig,
    sheet: spreadsheet.insertSheet(sheetConfig.name),
  }));
  sheets.forEach(({ sheet: currentSheet, sheetConfig }) => {
    if ("columnConfigurations" in sheetConfig) {
      setupStandardSheet(currentSheet, sheetConfig);
    }
    if ("setup" in sheetConfig && typeof sheetConfig.setup === "function") {
      sheetConfig.setup(currentSheet);
    }
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
