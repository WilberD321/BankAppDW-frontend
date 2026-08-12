import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../lib/apiClient";
import type { Customer } from "../types/customer";

export function useCustomer(id: string | undefined) {
  return useQuery({
    queryKey: ["customers", id],
    queryFn: () => fetchJson<Customer>(`/api/v1/customers/${id}`),
    enabled: !!id,
  });
}
