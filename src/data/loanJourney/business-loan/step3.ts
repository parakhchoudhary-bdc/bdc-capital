import { Step } from "@/types/loanJourney";

export const step3: Step = {
  title: "Loan & financials details",
  component: "loan-security",
  form: [
    {
      id: "loanPurpose",
      inputLabel: "Loan Purpose",
      inputPlaceholder: "Select Loan Purpose",
      inputType: "select",
      required: true,
      options: [
        { value: "working-capital", label: "Working Capital" },
        { value: "business-expansion", label: "Business Expansion" },
        { value: "purchase-of-equipment-machinery", label: "Purchase of Equipment / Machinery" },
        { value: "inventory-stock-purchase", label: "Inventory / Stock Purchase" },
        { value: "other", label: "Other" },
      ],
    },
    {
      id: "loanPurposeOther",
      inputLabel: "Mention Loan Purpose (if Others)",
      inputPlaceholder: "Enter loan purpose",
      inputType: "text",
      required: true,
      visibilityRule: {
        dependsOn: "loanPurpose",
        showWhenValueIs: "other",
      },
    },
    {
      id: "approximateLoanAmout",
      inputLabel: "Approximate Loan Amount",
      inputPlaceholder: "Select approximate loan amount",
      inputType: "select",
      required: true,
      options: [
        { value: "up-to-5-lakhs", label: "Up to ₹5 Lakhs" },
        { value: "5-lakhs-to-25-lakhs", label: "₹5 Lakhs to ₹25 Lakhs" },
        { value: "25-lakhs-to-1-crore", label: "₹25 Lakhs to ₹1 Crore" },
        { value: "1-crore-to-5-crore", label: "₹1 Crore to ₹5 Crore" },
        { value: "above-5-crore", label: "Above ₹5 Crore" },
      ],
      helperText: "Final eligibility is determined after assessment.",
    },
    {
      id: "annualTurnover",
      inputLabel: "Approximate Annual Turnover",
      inputPlaceholder: "Enter annual turnover",
      inputType: "currency",
      required: true,
    },
    {
      id: "loanSecurityType",
      inputLabel: "Loan Security Type",
      inputPlaceholder: "Choose Loan Security Type",
      inputType: "radio",
      options: [
        { value: "secured", label: "Secured" },
        { value: "unsecured", label: "Unsecured" },
      ],
      required: true,
    },
    {
      id: "typeOfSecurity",
      inputLabel: "Type of Security",
      inputPlaceholder: "Select type of security",
      inputType: "select",
      required: true,
      visibilityRule: {
        dependsOn: "loanSecurityType",
        showWhenValueIs: "secured",
      },
      options: [
        { value: "property", label: "Property" },
        { value: "vehicle", label: "Vehicle" },
        { value: "fixed-deposit", label: "Fixed Deposit / Other Assets" },
      ],
    },
    {
      id: "existingLoans",
      inputLabel: "Existing Loans",
      inputPlaceholder: "Do you have any existing loans?",
      inputType: "radio",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
      required: true,
    },
    {
      id: "totalOutstandingAmount",
      inputLabel: "Total Outstanding Amount",
      inputPlaceholder: "Enter total outstanding amount",
      inputType: "currency",
      required: true,
      visibilityRule: {
        dependsOn: "existingLoans",
        showWhenValueIs: "yes",
      },
    },
  ],
};
