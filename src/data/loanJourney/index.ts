import { personalLoan } from "./personal-loan";
import { businessLoan } from "./business-loan";
import { housingLoan } from "./housing-loan";
import { vehicleLoan } from "./vehicle-loan";
import { loanAgainstProperty } from "./loan-against-property";
import { cashCreditFacility } from "./cash-credit-facility";
import { common } from "./common";

export { common };

export const allLoanJourneys = [
  personalLoan,
  businessLoan,
  housingLoan,
  vehicleLoan,
  loanAgainstProperty,
  cashCreditFacility,
];

export const getLoanJourneyByPath = (pathname: string) => {
  return allLoanJourneys.find((journey) => journey.pathname === pathname);
};
