export interface ColumnConfiguration {
  headerName?: string;
  field: string;
}

export interface SpecialSheetConfig {
  name: string;
  locked?: boolean;
  setup: (sheet: GoogleAppsScript.Spreadsheet.Sheet) => void;
}

export interface StandardSheetConfig {
  name: string;
  locked?: boolean;
  columnConfigurations: ReadonlyArray<ColumnConfiguration>;
}
