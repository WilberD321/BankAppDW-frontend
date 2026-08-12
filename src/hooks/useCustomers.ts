import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../lib/apiClient";
import type { Customer } from "../types/customer";

interface UseCustomersOptions {
  name?: string;
  enabled?: boolean;
}

export function useCustomers({ name, enabled = true }: UseCustomersOptions = {}) {
  const params = new URLSearchParams();
  if (name) params.set("name", name);
  const query = params.toString();

  return useQuery({
    queryKey: ["customers", { name }],
    queryFn: () =>
      fetchJson<Customer[]>(`/api/v1/customers${query ? `?${query}` : ""}`),
    enabled,
  });
}
