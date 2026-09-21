import { Step } from "@/types/loanJourney";

export const step3: Step = {
  title: "Loan & security details",
  component: "loan-security",
  form: [
    {
      id: "loanPurpose",
      inputLabel: "Loan Purpose",
      inputPlaceholder: "Select loan purpose",
      inputType: "select",
      required: true,
      options: [
        { value: "personal-expenses", label: "Personal expenses" },
        { value: "medical", label: "Medical" },
        { value: "education", label: "Education" },
        { value: "travel", label: "Travel" },
        { value: "wedding", label: "Wedding" },
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
      id: "approximateLoanAmount",
      inputLabel: "Approximate Loan Amount",
      inputPlaceholder: "Select approximate loan amount",
      inputType: "select",
      required: true,
      options: [
        { value: "up-to-1-lakh", label: "Up to ₹1 Lakh" },
        { value: "1-lakh-to-10-lakhs", label: "₹1 Lakh to ₹10 Lakhs" },
        { value: "10-lakhs-to-25-lakhs", label: "₹10 Lakhs to ₹25 Lakhs" },
        { value: "25-lakhs-to-40-lakhs", label: "₹25 Lakhs to ₹40 Lakhs" },
      ],
      helperText: "Final eligibility is determined after assessment.",
    },
    {
      id: "loanSecurityType",
      inputLabel: "Loan Security Type",
      inputPlaceholder: "Choose loan security type",
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
