import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchJson } from "../lib/apiClient";
import type { Customer, CustomerUpdate } from "../types/customer";

export function useUpdateCustomer(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CustomerUpdate) =>
      fetchJson<Customer>(`/api/v1/customers/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
}
