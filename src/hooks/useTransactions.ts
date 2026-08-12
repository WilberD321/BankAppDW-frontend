import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../lib/apiClient";
import type { Transaction, TransactionFilters } from "../types/transaction";

export function useTransactions(filters: TransactionFilters = {}) {
  const params = new URLSearchParams();
  if (filters.start_date) params.set("start_date", filters.start_date);
  if (filters.type) params.set("type", filters.type);
  if (filters.from_account_id) params.set("from_account_id", filters.from_account_id);
  if (filters.to_account_id) params.set("to_account_id", filters.to_account_id);
  const query = params.toString();

  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: () =>
      fetchJson<Transaction[]>(
        `/api/v1/transactions${query ? `?${query}` : ""}`
      ),
  });
}
