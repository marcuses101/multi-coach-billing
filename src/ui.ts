import { addCoach } from "Sheets/CoachInfo";
import { initialSpreadsheetSetup } from "initialSpreadsheetSetup";

const DEFAULT_SHEET_NAME = "Sheet1";

function reset() {
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

function resetAndInit() {
  reset();
  initialSpreadsheetSetup();
}

export function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("Billing Actions")
    .addItem("Initialize Spreadsheet", initialSpreadsheetSetup.name)
    .addItem("Reset and Initialize Spreadsheet", resetAndInit.name) // TODO REMOVE BEFORE HANDOFF
    .addItem("Add Coach", addCoach.name)
    .addToUi();
}
