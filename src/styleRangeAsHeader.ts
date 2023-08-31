import { DARK_GREY, WHITE } from "./colorConstants";

export function styleRangeAsHeader(range: GoogleAppsScript.Spreadsheet.Range) {
  range
    .setBackground(DARK_GREY) // Dark Grey
    .setFontColor(WHITE) // White
    .setFontWeight("bold")
    .setFontSize(12);
}
