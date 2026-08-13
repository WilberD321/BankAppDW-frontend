import { useMutation } from "@tanstack/react-query";
import { fetchJson } from "../lib/apiClient";
import type { AdminUpdateUserRequest, UserOut } from "../types/auth";

export function useAdminUpdateCustomerLogin(customerId: string) {
  return useMutation({
    mutationFn: (payload: AdminUpdateUserRequest) =>
      fetchJson<UserOut>(`/api/v1/auth/users/by-customer/${customerId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
  });
}
