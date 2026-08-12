import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchJson } from "../lib/apiClient";
import type { Customer, CustomerCreate } from "../types/customer";

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CustomerCreate) =>
      fetchJson<Customer>("/api/v1/customers", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
}
