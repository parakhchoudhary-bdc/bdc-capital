import { Step } from "@/types/loanJourney";

export const step2: Step = {
  title: "Business operations & financials",
  form: [
    {
      id: "natureofBusiness",
      inputLabel: "Nature of Business",
      inputPlaceholder: "Select nature of business",
      inputType: "select",
      options: [
        { value: "e-commerce-seller", label: "E-commerce Seller" },
        { value: "startup-entrepreneur", label: "Startup / Entrepreneur" },
        { value: "service-provider", label: "Service Provider" },
        { value: "restaurant-food-business", label: "Restaurant / Food Business" },
        { value: "real-estate-broker", label: "Real Estate Broker" },
        { value: "transport-logistics-business", label: "Transport / Logistics Business" },
        { value: "manufacturer", label: "Manufacturer" },
        { value: "shop-owner", label: "Shop Owner" },
        { value: "retail-trader", label: "Retail / Wholesale Trader" },
        { value: "distributor-dealer-contractor", label: "Distributor / Dealer / Contractor" },
        { value: "other-business", label: "Other Business" },
      ],
      required: true,
    },
    {
      id: "natureofBusinessOther",
      inputLabel: "Mention Nature of Business (if Others)",
      inputPlaceholder: "Enter nature of business",
      inputType: "text",
      required: true,
      visibilityRule: {
        dependsOn: "natureofBusiness",
        showWhenValueIs: "other-business",
      },
    },

    {
      id: "yearInBusiness",
      inputLabel: "Year in Business",
      inputPlaceholder: "Select Year in Business",
      inputType: "select",
      options: [
        { value: "0-3 years", label: "0-3 Years" },
        { value: "4-7 years", label: "4-7 Years" },
        { value: "8-12 years", label: "8-12 Years" },
        { value: "12-20 years", label: "12-20 Years" },
        { value: "20+ years", label: "20+ Years" },
      ],
      required: true,
    },
    {
      id: "annualTurnover",
      inputLabel: "Approximate Annual Turnover",
      inputPlaceholder: "Enter annual turnover",
      inputType: "currency",
      required: true,
    },
    {
      id: "primaryOperatingCycle",
      inputLabel: "Primary Operating Cycle",
      inputPlaceholder: "Select primary operating cycle",
      inputType: "select",
      options: [
        { value: "inventory-based", label: "Inventory-based" },
        { value: "receivables-based", label: "Receivables-based" },
        { value: "mixed", label: "Mixed" },
      ],
      required: true,
      tooltip: "This describes how your business normally works — from buying or producing something to getting paid for it.",
    },
    {
      id: "averageOperatingCycleDuration",
      inputLabel: "Average Operating Cycle Duration",
      inputPlaceholder: "Select average operating cycle duration",
      inputType: "select",
      options: [
        { value: "up-to-30-days", label: "Up to 30 days" },
        { value: "30-60-days", label: "30–60 days" },
        { value: "60-days", label: "60+ days" },
      ],
      required: true,
      tooltip: "This is the usual amount of time your business takes to complete one full cycle of work and receive payment.",
    },
    {
      inputLabel: "GST Number (Optional)",
      inputType: "text",
      id: "gstNumber",
      name: "gstNumber",
      inputError: "Please enter GST Number",
      inputPlaceholder: "Enter GST Number",
    }
  ]
};
