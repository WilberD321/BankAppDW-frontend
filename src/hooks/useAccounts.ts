import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../lib/apiClient";
import type { Account } from "../types/account";

export function useAccounts() {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: () => fetchJson<Account[]>("/api/v1/accounts"),
  });
}
