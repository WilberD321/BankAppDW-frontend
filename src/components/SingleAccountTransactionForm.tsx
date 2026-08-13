import { useState } from "react";
import type { FormEvent } from "react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { Transaction } from "../types/transaction";

interface SingleAccountTransactionFormProps {
  mutation: UseMutationResult<
    Transaction,
    Error,
    { account_id: string; amount: number }
  >;
  actionLabel: string;
  pendingLabel: string;
  errorPrefix: string;
  initialAccountId?: string;
}

export function SingleAccountTransactionForm({
  mutation,
  actionLabel,
  pendingLabel,
  errorPrefix,
  initialAccountId,
}: SingleAccountTransactionFormProps) {
  const [accountId, setAccountId] = useState(initialAccountId ?? "");
  const [amount, setAmount] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    mutation.mutate(
      { account_id: accountId, amount: Number(amount) },
      {
        onSuccess: () => {
          setAccountId("");
          setAmount("");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="account_id">Account ID</label>
        <input
          id="account_id"
          value={accountId}
          onChange={(event) => setAccountId(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? pendingLabel : actionLabel}
      </button>

      {mutation.isError && (
        <p role="alert">
          {errorPrefix}: {(mutation.error as Error).message}
        </p>
      )}
      {mutation.isSuccess && <p>Transaction {mutation.data.id} created.</p>}
    </form>
  );
}
