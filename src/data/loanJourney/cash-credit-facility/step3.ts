import { Step } from "@/types/loanJourney";

export const step3: Step = {
  title: "Cash credit requirement details",
  form: [
    {
      id: "purposeOfCashCredit",
      inputLabel: "Purpose of Cash Credit",
      inputType: "select",
      required: true,
      inputPlaceholder: "Select purpose of cash credit",
      options: [
        { value: "inventory-purchase", label: "Inventory purchase" },
        { value: "receivables-funding", label: "Receivables funding" },
        { value: "day-to-day-operational-expenses", label: "Day-to-day operational expenses" },
        { value: "other", label: "Other" },
      ],
    },
    {
      id: "purposeOfCashCreditOther",
      inputLabel: "Mention Purpose of Cash Credit (if Others)",
      inputPlaceholder: "Enter purpose of cash credit",
      inputType: "text",
      required: true,
      visibilityRule: {
        dependsOn: "purposeOfCashCredit",
        showWhenValueIs: "other",
      },
    },
    {
      id: "approximateCashCreditLimitRequired",
      inputLabel: "Approximate Cash Credit Limit Required*",
      inputPlaceholder: "Select approximate cash credit limit required",
      inputType: "select",
      required: true,
      options: [
        { value: "up-to-5-lakhs", label: "Up to ₹5 Lakhs" },
        { value: "5-lakhs-to-25-lakhs", label: "₹5 Lakhs to ₹25 Lakhs" },
        { value: "25-lakhs-to-5-crore", label: "₹25 Lakhs to ₹5 Crore" },
        { value: "5-crore-to-15-crore", label: "₹5 Crore to ₹15 Crore" },
        { value: "above-15-crore", label: "Above ₹15 Crore" },
      ],
      helperText: "Final eligibility is determined after assessment.",
    },
    {
      id: "expectedUtilisationPattern",
      inputLabel: "Expected Utilisation Pattern",
      inputPlaceholder: "Select expected utilisation pattern",
      inputType: "radio",
      options: [
        { value: "continuous", label: "Continuous" },
        { value: "periodic", label: "Periodic" },
      ],
      required: true,
      tooltip: "This helps us understand how you plan to use the approved amount — whether you will use it regularly or only when needed.",
    },
    {
      id: "existingCashCredit",
      inputLabel: "Existing Cash Credit",
      inputPlaceholder: "Do you have any existing cash credit?",
      inputType: "radio",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
      required: true,
    },
    {
      id: "existingCashCreditAmount",
      inputLabel: "Total Outstanding Amount",
      inputPlaceholder: "Enter total outstanding amount",
      inputType: "currency",
      required: true,
      visibilityRule: {
        dependsOn: "existingCashCredit",
        showWhenValueIs: "yes",
      },
    },
  ]
};
