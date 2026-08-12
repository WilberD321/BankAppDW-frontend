export interface Transaction {
  id: string;
  from_account_id: string | null;
  to_account_id: string | null;
  amount: number;
  type: string;
  timestamp: string;
}

export interface TransferRequest {
  from_account_id: string;
  to_account_id: string;
  amount: number;
}

export interface DepositRequest {
  account_id: string;
  amount: number;
}

export interface WithdrawRequest {
  account_id: string;
  amount: number;
}

export interface TransactionFilters {
  start_date?: string;
  type?: string;
  from_account_id?: string;
  to_account_id?: string;
}
