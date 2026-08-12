import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchJson } from "../lib/apiClient";
import type { Transaction, TransferRequest } from "../types/transaction";

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TransferRequest) =>
      fetchJson<Transaction>("/api/v1/transactions/transfer", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
}
