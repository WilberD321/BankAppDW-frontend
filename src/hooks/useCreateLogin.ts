import { useMutation } from "@tanstack/react-query";
import { fetchJson } from "../lib/apiClient";
import type { CreateLoginRequest, UserOut } from "../types/auth";

export function useCreateLogin() {
  return useMutation({
    mutationFn: (payload: CreateLoginRequest) =>
      fetchJson<UserOut>("/api/v1/auth/users", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });
}
