import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../lib/apiClient";
import type { Customer } from "../types/customer";

export function useCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: () => fetchJson<Customer[]>("/api/v1/customers"),
  });
}
