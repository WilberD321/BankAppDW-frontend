import { useState } from "react";
import type { FormEvent } from "react";
import { useCreateTransaction } from "../hooks/useCreateTransaction";

export function TransferForm() {
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const mutation = useCreateTransaction();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    mutation.mutate(
      {
        from_account_id: fromAccountId,
        to_account_id: toAccountId,
        amount: Number(amount),
      },
      {
        onSuccess: () => {
          setFromAccountId("");
          setToAccountId("");
          setAmount("");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="from_account_id">From account ID</label>
        <input
          id="from_account_id"
          value={fromAccountId}
          onChange={(event) => setFromAccountId(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="to_account_id">To account ID</label>
        <input
          id="to_account_id"
          value={toAccountId}
          onChange={(event) => setToAccountId(event.target.value)}
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
        {mutation.isPending ? "Transferring…" : "Transfer"}
      </button>

      {mutation.isError && (
        <p role="alert">
          Failed to create transaction: {(mutation.error as Error).message}
        </p>
      )}
      {mutation.isSuccess && <p>Transaction {mutation.data.id} created.</p>}
    </form>
  );
}
