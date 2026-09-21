import { Step } from "@/types/loanJourney";

export const step2: Step = {
  title: "Employment details",
  component: "employment",
  form: [
    {
      id: "employmentType",
      inputLabel: "Employment Type",
      inputPlaceholder: "Select employment type",
      inputType: "select",
      options: [
        { value: "salaried", label: "Salaried" },
        { value: "self-employed-professional", label: "Self-Employed / Professional" },
        { value: "self-employed-business", label: "Self-Employed / Business" },
      ],
      required: true,
    },

    //if Salaried
    {
      id: "employerType",
      inputLabel: "Employer Type",
      inputPlaceholder: "Select employer type",
      inputType: "select",
      options: [
        { value: "private", label: "Private" },
        { value: "government", label: "Government" },
        { value: "psu", label: "PSU" },
        { value: "other", label: "Other" },
      ],
      required: true,
      visibilityRule: {
        dependsOn: "employmentType",
        showWhenValueIs: "salaried",
      },
    },
    {
      id: "employerTypeOther",
      inputLabel: "Mention Employer Type (if Others)",
      inputPlaceholder: "Enter employer type",
      inputType: "text",
      required: true,
      visibilityRule: {
        dependsOn: "employerType",
        showWhenValueIs: "other",
      },
    },
    {
      id: "employmentStatus",
      inputLabel: "Employment Status",
      inputPlaceholder: "Select employment status",
      inputType: "radio",
      options: [
        { value: "permanent", label: "Permanent" },
        { value: "contractual", label: "Contractual" },
      ],
      required: true,
      visibilityRule: {
        dependsOn: "employmentType",
        showWhenValueIs: "salaried",
      },
    },

    //if Self-Employed / Professional
    {
      id: "natureofProfession",
      inputLabel: "Nature of Profession",
      inputPlaceholder: "Select nature of profession",
      inputType: "select",
      options: [
        { value: "doctor", label: "Doctor / Medical Practitioner" },
        { value: "chartered-accountant", label: "Chartered Accountant (CA)" },
        { value: "company-secretary", label: "Company Secretary (CS)" },
        { value: "cost-accountant", label: "Cost Accountant (CMA)" },
        { value: "lawyer-advocate", label: "Lawyer / Advocate" },
        { value: "architect", label: "Architect" },
        { value: "engineer-consultant", label: "Engineer / Consultant" },
        { value: "it-professional", label: "IT Professional / Software Developer" },
        { value: "designer", label: "Designer (Graphic / UI-UX / Interior)" },
        { value: "freelancer", label: "Freelancer / Independent Consultant" },
        { value: "other-professional", label: "Other Professional" },
      ],
      required: true,
      visibilityRule: {
        dependsOn: "employmentType",
        showWhenValueIs: "self-employed-professional",
      },
    },
    {
      id: "natureofProfessionOther",
      inputLabel: "Mention Nature of Profession (if Others)",
      inputPlaceholder: "Enter nature of profession",
      inputType: "text",
      required: true,
      visibilityRule: {
        dependsOn: "natureofProfession",
        showWhenValueIs: "other-professional",
      },
    },

    //if Self-Employed / Business
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
      visibilityRule: {
        dependsOn: "employmentType",
        showWhenValueIs: "self-employed-business",
      },
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

    //years of experience when the employment type is "self-employed-business/professional"
    {
      id: "yearOfExperience",
      inputLabel: "Year of Experience",
      inputPlaceholder: "Select year of experience",
      inputType: "select",
      options: [
        { value: "0-3 years", label: "0-3 Years" },
        { value: "4-7 years", label: "4-7 Years" },
        { value: "8-12 years", label: "8-12 Years" },
        { value: "12-20 years", label: "12-20 Years" },
        { value: "20+ years", label: "20+ Years" },
      ],
      required: true,
      visibilityRule: {
        dependsOn: "employmentType",
        showWhenValueIs: ["self-employed-professional", "self-employed-business"],
      },
    },

    // Unified Income Field
    {
      id: "income",
      inputLabel: "Total Monthly Income", // Default label
      inputPlaceholder: "Enter amount",
      inputType: "currency",
      required: true,
      dynamicLabel: {
        dependsOn: "employmentType",
        map: {
          "self-employed-professional": "Average Monthly Income",
        }
      },
      dynamicPlaceholder: {
        dependsOn: "employmentType",
        map: {
          "self-employed-professional": "Enter average monthly income",
        }
      }
    },

    //Work Address
    {
      id: "workAddress",
      inputLabel: "Work Address",
      inputPlaceholder: "Enter work address",
      inputType: "text",
      required: true,
    },

    //Work Address Pincode
    {
      id: "workAddressPincode",
      inputLabel: "Work Address Pincode",
      inputPlaceholder: "Enter work address pincode",
      inputType: "number",
      required: true,
    },
  ],
};
