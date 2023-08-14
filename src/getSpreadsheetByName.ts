import { SheetName } from "initialSpreadsheetSetup";

export function getSheetByName(
  name: SheetName
): GoogleAppsScript.Spreadsheet.Sheet {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(name);
  if (sheet === null) {
    throw new Error(`spreadsheet misconfigured, "${name}" sheet is missing`);
  }
  return sheet;
}
