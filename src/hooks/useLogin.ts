import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

export function useLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      login(username, password),
  });
}
