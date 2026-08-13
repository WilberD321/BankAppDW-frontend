import { useState } from "react";
import type { FormEvent } from "react";
import { useAdminUpdateCustomerLogin } from "../hooks/useAdminUpdateCustomerLogin";

interface EditCustomerLoginFormProps {
  customerId: string;
  onSuccess?: () => void;
}

export function EditCustomerLoginForm({
  customerId,
  onSuccess,
}: EditCustomerLoginFormProps) {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const mutation = useAdminUpdateCustomerLogin(customerId);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    mutation.mutate(
      {
        admin_password: adminPassword,
        username: username || undefined,
        new_password: newPassword || undefined,
      },
      {
        onSuccess: () => {
          setUsername("");
          setNewPassword("");
          setAdminPassword("");
          onSuccess?.();
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="edit_login_username">New username</label>
        <input
          id="edit_login_username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Leave blank to keep current"
        />
      </div>

      <div className="form-field">
        <label htmlFor="edit_login_new_password">New password</label>
        <input
          id="edit_login_new_password"
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          placeholder="Leave blank to keep current"
        />
      </div>

      <div className="form-field">
        <label htmlFor="edit_login_admin_password">
          Your admin password (to confirm this change)
        </label>
        <input
          id="edit_login_admin_password"
          type="password"
          value={adminPassword}
          onChange={(event) => setAdminPassword(event.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Saving…" : "Save login changes"}
      </button>

      {mutation.isError && (
        <p role="alert">
          Failed to update login: {(mutation.error as Error).message}
        </p>
      )}
      {mutation.isSuccess && <p>Login updated for {mutation.data.username}.</p>}
    </form>
  );
}
