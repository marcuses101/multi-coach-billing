import { LIGHT_GREY, WHITE } from "../colorConstants";
import { SpecialSheetConfig } from "../defs";
import { styleRangeAsHeader } from "../styleRangeAsHeader";

const POSSIBLE_TEMPLATE_VARIABLES = [
  "firstName",
  "lastName",
  "email",
  "date",
  "currentAmount",
  "previousBalance",
  "grandTotal",
  "companyName",
  "companyStreet",
  "companyTown",
  "companyProvince",
  "companyCountry",
] as const;

const PREVIEW_EXAMPLE_VALUES: Record<
  (typeof POSSIBLE_TEMPLATE_VARIABLES)[number],
  string | number
> = {
  firstName: "Tester",
  lastName: "McTesterson",
  email: "testing@testing.com",
  date: "01/01/2023",
  currentAmount: 250.5,
  previousBalance: 0,
  grandTotal: 500.5,
  companyName: "Example Corp.",
  companyStreet: "Business Street",
  companyTown: "Business Town",
  companyProvince: "Ontario",
  companyCountry: "Canada",
};

const DEFAULT_EMAIL_SUBJECT_TEMPLATE =
  "Figure Skating Bill: {{firstName}} {{lastName}} {{date}}";

const DEFAULT_EMAIL_BODY_TEMPLATE = `\
Hello,

The balance of your account is {{grandTotal}}.
Please see the attached invoice for full details.

Thank you,
{{companyName}}
{{companyStreet}}, {{companyTown}}`;

const EMAIL_TEMPLATE_SHEET_INFO = `\
Use this sheet to customize the email that will be sent out along with the bill.
Any value listed in the "Variables" column is available to use in template.
Variables will be replaced with the actual info in the email, similar to what is seen in the "Preview" Cells`;

function mustache_(string: string, obj: Record<string, string | number>) {
  const regex = /{{2}([^{}]*)}{2}/g;
  return string.replace(regex, (substring, match) => {
    const replaceValue = obj[match] ?? substring;
    return String(replaceValue);
  });
}

function PreviewTemplate(input: string) {
  return mustache_(input, PREVIEW_EXAMPLE_VALUES);
}

export const EmailTemplateSheetConfig = {
  name: "Email Template",
  setup: (sheet) => {
    const templateTable = [
      ["Subject Template", "Body Template"],
      [DEFAULT_EMAIL_SUBJECT_TEMPLATE, DEFAULT_EMAIL_BODY_TEMPLATE],
      ["Subject Preview", "Body Preview"],
      [
        `=${PreviewTemplate.name}(INDIRECT("R[-2]C[0]",false))`,
        `=${PreviewTemplate.name}(INDIRECT("R[-2]C[0]",false))`,
      ],
    ];

    sheet
      .getRange(1, 1, templateTable.length, templateTable[0].length)
      .setValues(templateTable)
      .setBorder(
        true,
        true,
        true,
        true,
        true,
        true,
        "#000000",
        SpreadsheetApp.BorderStyle.SOLID
      );

    const variablesColumn = POSSIBLE_TEMPLATE_VARIABLES.map((entry) => [
      `{{${entry}}}`,
    ]);
    variablesColumn.unshift(["Available Variables"]);
    sheet.getRange(6, 1, variablesColumn.length, 1).setValues(variablesColumn);

    const infoValues = [["Info"], [EMAIL_TEMPLATE_SHEET_INFO]];

    sheet
      .getRange(6, 2, infoValues.length, infoValues[0].length)
      .setValues([["Info"], [EMAIL_TEMPLATE_SHEET_INFO]]);

    sheet.deleteColumns(
      sheet.getLastColumn() + 1,
      sheet.getMaxColumns() - sheet.getLastColumn()
    );

    // Add styling
    sheet.setColumnWidths(1, sheet.getLastColumn(), 500);

    sheet.getRange("A1:B").setBackground(LIGHT_GREY);
    sheet.getRange("2:2").setBackground(WHITE);
    styleRangeAsHeader(sheet.getRange("1:1"));
    styleRangeAsHeader(sheet.getRange("3:3"));
    styleRangeAsHeader(sheet.getRange("6:6"));

    sheet.getDataRange().setVerticalAlignment("top");
    sheet.deleteRows(20, sheet.getMaxRows() - 20);
  },
} as const satisfies SpecialSheetConfig;
