import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchJson } from "../lib/apiClient";

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      fetchJson<void>(`/api/v1/customers/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
}
