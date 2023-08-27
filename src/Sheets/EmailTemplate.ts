import { SpecialSheetConfig } from "../defs";
import { placeholderSheetSetup } from "../placeholderSheetSetup";

export const EmailTemplateSheetConfig = {
  name: "Email Template",
  setup: placeholderSheetSetup,
} as const satisfies SpecialSheetConfig;
