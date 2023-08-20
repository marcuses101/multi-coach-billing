import { StandardSheetConfig } from "./defs";

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
