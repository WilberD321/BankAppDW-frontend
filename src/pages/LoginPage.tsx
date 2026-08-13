import { useState } from "react";
import type { FormEvent } from "react";
import { useLogin } from "../hooks/useLogin";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    loginMutation.mutate({ username, password });
  }

  return (
    <div className="login-page inline-panel">
      <h2>BankAppDW — Log in</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="login_username">Username</label>
          <input
            id="login_username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="login_password">Password</label>
          <input
            id="login_password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Logging in…" : "Log in"}
        </button>

        {loginMutation.isError && (
          <p role="alert">
            Failed to log in: {(loginMutation.error as Error).message}
          </p>
        )}
      </form>
    </div>
  );
}
