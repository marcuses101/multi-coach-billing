import { StandardSheetConfig } from "./defs";

export function setupSheetColumns<T extends Record<string, any> = any>(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  sheetConfig: StandardSheetConfig<T>
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
