export interface BillingSubscription {
  company: string;
  name: string;
  type: string;
  price: number;
  worker_count: number;
  created: string;
  active: boolean;
  id: number;
  current_period_start: string;
  current_period_end: string;
  subscription_type: number;
  last_time_billed: string;
}

export interface CheckInformation {
  payment_information_submited: boolean;
}

export interface Payment {
  type: string;
  amount: number;
  status: string;
  created: string;
  invoice_url: string;
}

export interface Plan {
  id?: number;
  type?: string;
  save?: boolean;
  pay?: number;
  active?: boolean;
  status?: string;
  worker_count?: number;
  procent: number;
  changed?: any;

  start_range_price_annual: number;
  start_range_price_monthly: number;
  start_range: number;
  step_change_val: number;
  amount_tag_line?: string;
  table_text?: string;
  table?: string[];
  percentage_discount?: number;
  discount_comment?: string;
  amount_comment?: string;
  heading_tag_line?: string;
  heading?: string;
}
