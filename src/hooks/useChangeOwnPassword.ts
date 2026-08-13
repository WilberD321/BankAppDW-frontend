import { useMutation } from "@tanstack/react-query";
import { fetchJson } from "../lib/apiClient";
import type { SelfPasswordChangeRequest, UserOut } from "../types/auth";

export function useChangeOwnPassword() {
  return useMutation({
    mutationFn: (payload: SelfPasswordChangeRequest) =>
      fetchJson<UserOut>("/api/v1/auth/me/password", {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
  });
}
