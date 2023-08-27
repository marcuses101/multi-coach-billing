export function placeholderSheetSetup(
  sheet: GoogleAppsScript.Spreadsheet.Sheet
) {
  sheet
    .getRange("A2")
    .setValue("TODO - SETUP HAS NOT BEEN IMPLEMENTED FOR THIS SHEET");
}
