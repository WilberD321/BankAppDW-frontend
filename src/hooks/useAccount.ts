import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../lib/apiClient";
import type { Account } from "../types/account";

export function useAccount(id: string | undefined) {
  return useQuery({
    queryKey: ["accounts", id],
    queryFn: () => fetchJson<Account>(`/api/v1/accounts/${id}`),
    enabled: !!id,
  });
}
