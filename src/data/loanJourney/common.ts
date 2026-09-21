import { CommonData } from "@/types/loanJourney";

export const common: CommonData = {
  selectLoanType: {
    formHeading: "Let's Get Started",
    formDescription: "Select a loan type and enter your details to continue.",
    ctaContent: "Continue",
    form: [
      {
        inputType: "select",
        inputLabel: "Select Loan Type",
        inputError: "Please select loan type",
        id: "loanType",
        name: "loanType",
      },
      {
        inputLabel: "Full Name",
        inputType: "text",
        required: true,
        inputPlaceholder: "Enter your full name",
        id: "fullName",
        name: "fullName",
      },
      {
        inputLabel: "Mobile Number",
        inputType: "number",
        required: true,
        inputPlaceholder: "Enter 10 digit mobile number",
        id: "mobileNumber",
        name: "mobileNumber",
      },
      {
        inputLabel: "Email ID",
        inputType: "email",
        required: true,
        inputPlaceholder: "Enter your email",
        id: "email",
        name: "email",
      },
      {
        inputLabel: "Date of Birth",
        inputType: "date",
        required: true,
        id: "dob",
        name: "dob",
        inputError: "Please enter a valid Date of birth",
        ageError: "You must be at least 21 years old",
      },
    ],
  },
  otpVerification: {},
};
