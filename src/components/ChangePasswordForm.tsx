import { useState } from "react";
import type { FormEvent } from "react";
import { useChangeOwnPassword } from "../hooks/useChangeOwnPassword";

interface ChangePasswordFormProps {
  onSuccess?: () => void;
}

export function ChangePasswordForm({ onSuccess }: ChangePasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const mutation = useChangeOwnPassword();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    mutation.mutate(
      { current_password: currentPassword, new_password: newPassword },
      {
        onSuccess: () => {
          setCurrentPassword("");
          setNewPassword("");
          onSuccess?.();
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="change_password_current">Current password</label>
        <input
          id="change_password_current"
          type="password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="change_password_new">New password</label>
        <input
          id="change_password_new"
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Saving…" : "Change password"}
      </button>

      {mutation.isError && (
        <p role="alert">
          Failed to change password: {(mutation.error as Error).message}
        </p>
      )}
      {mutation.isSuccess && <p>Password changed.</p>}
    </form>
  );
}
