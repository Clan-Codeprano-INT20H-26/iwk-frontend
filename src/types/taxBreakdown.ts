interface TaxSummary {
  taxType: string;
  summaryName: string;
  rate: number;
}

interface BaseRate {
  jurType: string;
  jurName: string;
  rate: number;
}

export interface TaxBreakdown {
  baseRates: BaseRate[];
  taxSummaries: TaxSummary[];
}
