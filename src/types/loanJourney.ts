export interface InputField {
  inputLabel: string;
  inputType: string;
  required?: boolean;
  inputError?: string;
  inputPlaceholder?: string;
  name?: string;
  id?: string;
  ageError?: string;
  min?: number;
  max?: number;
  options?: { value: string; label: string }[];
  tooltip?: string;
  helperText?: string;
  visibilityRule?: {
    dependsOn: string | string[];
    showWhenValueIs: string | string[];
  };
  dynamicLabel?: {
    dependsOn: string;
    map: Record<string, string>;
  };
  dynamicPlaceholder?: {
    dependsOn: string;
    map: Record<string, string>;
  };
}

export interface Step {
  title: string;
  component?: "personal" | "employment" | "loan-security" | "business-details" | "property-loan" | "vehicle-loan" | "lap-property-details";
  form?: InputField[];
}

export interface LoanJourney {
  id: string;
  pathname: string;
  title: string;
  loanJourney: {
    step1: Step;
    step2: Step;
    step3: Step;
    step4: Step;
  };
}

export interface CommonData {
  selectLoanType: {
    formHeading: string;
    formDescription: string;
    ctaContent: string;
    form?: InputField[];
  };
  otpVerification: {
    // Add properties as needed when defining OTP step
  };
}
