import { useState } from "react";
import type { FormEvent } from "react";
import { useCreateLogin } from "../hooks/useCreateLogin";

interface CreateLoginFormProps {
  customerId: string;
  onSuccess?: () => void;
}

export function CreateLoginForm({ customerId, onSuccess }: CreateLoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useCreateLogin();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    mutation.mutate(
      { customer_id: customerId, username, password },
      {
        onSuccess: () => {
          setUsername("");
          setPassword("");
          onSuccess?.();
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="new_login_username">Username</label>
        <input
          id="new_login_username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="new_login_password">Password</label>
        <input
          id="new_login_password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating…" : "Create login"}
      </button>

      {mutation.isError && (
        <p role="alert">
          Failed to create login: {(mutation.error as Error).message}
        </p>
      )}
      {mutation.isSuccess && <p>Login created for {mutation.data.username}.</p>}
    </form>
  );
}
