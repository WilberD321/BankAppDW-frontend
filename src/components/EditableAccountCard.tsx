import { useState } from "react";
import { AccountCard } from "./AccountCard";
import { AccountForm } from "./AccountForm";
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import type { Account } from "../types/account";

interface EditableAccountCardProps {
  account: Account;
}

export function EditableAccountCard({ account }: EditableAccountCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const deleteMutation = useDeleteAccount();

  function handleDelete() {
    if (window.confirm(`Delete account ${account.id}?`)) {
      deleteMutation.mutate(account.id);
    }
  }

  if (isEditing) {
    return (
      <div className="account-card">
        <AccountForm
          mode="edit"
          account={account}
          onSuccess={() => setIsEditing(false)}
        />
        <button
          type="button"
          className="button-secondary button-sm"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div>
      <AccountCard account={account} />
      <div className="account-card-actions">
        <button
          type="button"
          className="button-secondary button-sm"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          type="button"
          className="button-danger button-sm"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? "Deleting…" : "Delete"}
        </button>
      </div>
      {deleteMutation.isError && (
        <p role="alert">
          Failed to delete account: {(deleteMutation.error as Error).message}
        </p>
      )}
    </div>
  );
}
