import { useState } from "react";
import type { FormEvent } from "react";
import { useCreateAccount } from "../hooks/useCreateAccount";
import { useUpdateAccount } from "../hooks/useUpdateAccount";
import type { Account } from "../types/account";

interface AccountFormProps {
  mode: "create" | "edit";
  account?: Account;
  ownerId?: string;
  onSuccess?: () => void;
}

const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});

export function AccountForm({ mode, account, ownerId, onSuccess }: AccountFormProps) {
  const [ownerIdInput, setOwnerIdInput] = useState("");
  const [branchId, setBranchId] = useState(account?.branch_id ?? "");
  const [balance, setBalance] = useState("");

  const createMutation = useCreateAccount();
  const updateMutation = useUpdateAccount(account?.id ?? "");
  const mutation = mode === "create" ? createMutation : updateMutation;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (mode === "create") {
      createMutation.mutate(
        {
          owner_id: ownerId ?? ownerIdInput,
          branch_id: branchId,
          balance: balance ? Number(balance) : undefined,
        },
        {
          onSuccess: () => {
            setOwnerIdInput("");
            setBranchId("");
            setBalance("");
            onSuccess?.();
          },
        }
      );
    } else {
      updateMutation.mutate({ branch_id: branchId }, { onSuccess });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {mode === "edit" && account && (
        <p>
          <strong>{account.id}</strong> · Owner {account.owner_id} · Balance{" "}
          {currencyFormatter.format(account.balance)}
        </p>
      )}

      {mode === "create" && ownerId === undefined && (
        <div className="form-field">
          <label htmlFor="account_owner_id">Owner ID</label>
          <input
            id="account_owner_id"
            value={ownerIdInput}
            onChange={(event) => setOwnerIdInput(event.target.value)}
            required
          />
        </div>
      )}

      <div className="form-field">
        <label htmlFor="account_branch_id">Branch ID</label>
        <input
          id="account_branch_id"
          value={branchId}
          onChange={(event) => setBranchId(event.target.value)}
          required
        />
      </div>

      {mode === "create" && (
        <div className="form-field">
          <label htmlFor="account_balance">Starting balance</label>
          <input
            id="account_balance"
            type="number"
            min="0"
            step="0.01"
            value={balance}
            onChange={(event) => setBalance(event.target.value)}
          />
        </div>
      )}

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending
          ? "Saving…"
          : mode === "create"
            ? "Create account"
            : "Save changes"}
      </button>

      {mutation.isError && (
        <p role="alert">
          Failed to save account: {(mutation.error as Error).message}
        </p>
      )}
    </form>
  );
}
