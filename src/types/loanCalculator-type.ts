// types/loan.ts
export interface LoanCalculatorType {
  label: string;

  amount: number;
  minAmount: number;
  maxAmount: number;

  rate: number;
  minRate: number;
  maxRate: number;

  tenture: number;
  minTenture: number;
  maxTenture: number;
}
