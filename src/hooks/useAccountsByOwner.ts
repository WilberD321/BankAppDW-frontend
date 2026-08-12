import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../lib/apiClient";
import type { Account } from "../types/account";

export function useAccountsByOwner(ownerId: string | undefined) {
  return useQuery({
    queryKey: ["accounts", { ownerId }],
    queryFn: () =>
      fetchJson<Account[]>(
        `/api/v1/accounts?owner_id=${encodeURIComponent(ownerId!)}`
      ),
    enabled: !!ownerId,
  });
}
