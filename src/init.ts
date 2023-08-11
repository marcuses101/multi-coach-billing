interface ColumnConfiguration {
  headerName?: string;
}

interface SheetConfig {
  columnConfigurations: ColumnConfiguration[];
}

interface MainSpreadsheetConfiguration {
  sheets: SheetConfig[];
}

export function init(config: MainSpreadsheetConfiguration) {
  console.log(config);
  // Create Sheets
  // Configure Columns
  // Set Validation
}
