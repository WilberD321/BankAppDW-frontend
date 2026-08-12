import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchJson } from "../lib/apiClient";
import type { Transaction, WithdrawRequest } from "../types/transaction";

export function useCreateWithdraw() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: WithdrawRequest) =>
      fetchJson<Transaction>("/api/v1/transactions/withdraw", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
}
