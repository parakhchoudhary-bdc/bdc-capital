import { LoanJourney } from "@/types/loanJourney";
import { step1 } from "./step1";
import { step2 } from "./step2";
import { step3 } from "./step3";
import { step4 } from "./step4";

export const cashCreditFacility: LoanJourney = {
  id: "cash-credit-facility",
  pathname: "cash-credit-facility",
  title: "Cash Credit Facility",
  loanJourney: {
    step1,
    step2,
    step3,
    step4,
  },
};
