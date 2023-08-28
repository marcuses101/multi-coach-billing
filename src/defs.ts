export interface ColumnConfiguration<T extends Record<string, any>> {
  headerName?: string;
  field: keyof T;
}

export interface StandardSheetConfig<T extends Record<string, any>> {
  name: string;
  locked?: boolean;
  columnConfigurations: ReadonlyArray<ColumnConfiguration<T>>;
  setup?: (sheet: GoogleAppsScript.Spreadsheet.Sheet) => void;
}

export interface SpecialSheetConfig {
  name: string;
  locked?: boolean;
  setup?: (sheet: GoogleAppsScript.Spreadsheet.Sheet) => void;
}
