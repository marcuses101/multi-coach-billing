import { SpecialSheetConfig } from "../defs";
import { placeholderSheetSetup } from "../placeholderSheetSetup";

export const BillPreviewSheetConfig = {
  name: "Bill Preview",
  setup: placeholderSheetSetup,
} as const satisfies SpecialSheetConfig;
