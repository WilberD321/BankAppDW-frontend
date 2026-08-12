import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchJson } from "../lib/apiClient";
import type { Account, AccountUpdate } from "../types/account";

export function useUpdateAccount(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AccountUpdate) =>
      fetchJson<Account>(`/api/v1/accounts/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
}
