import { useState } from "react";
import { Link, useParams } from "react-router";
import { useAccount } from "../hooks/useAccount";
import { TransferForm } from "../components/TransferForm";
import { DepositForm } from "../components/DepositForm";
import { WithdrawForm } from "../components/WithdrawForm";

type TransactionMode = "transfer" | "deposit" | "withdraw";

const MODE_LABELS: Record<TransactionMode, string> = {
  deposit: "Deposit",
  withdraw: "Withdraw",
  transfer: "Transfer",
};

const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});

export function CreateTransactionPage() {
  const { accountId } = useParams<{ accountId?: string }>();
  const [mode, setMode] = useState<TransactionMode>("transfer");
  const accountQuery = useAccount(accountId);

  return (
    <>
      <h2>New transaction</h2>

      {accountId && accountQuery.isLoading && <p>Loading account…</p>}
      {accountId && accountQuery.isError && (
        <p role="alert">
          Failed to load account: {(accountQuery.error as Error).message}
        </p>
      )}
      {accountId && accountQuery.data && (
        <p>
          Account <strong>{accountQuery.data.id}</strong> ·{" "}
          {currencyFormatter.format(accountQuery.data.balance)}
        </p>
      )}

      <div className="tab-group" role="tablist">
        {(Object.keys(MODE_LABELS) as TransactionMode[]).map((option) => (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={mode === option}
            className={mode === option ? "active" : undefined}
            onClick={() => setMode(option)}
          >
            {MODE_LABELS[option]}
          </button>
        ))}
      </div>

      {mode === "transfer" && <TransferForm prefillAccountId={accountId} />}
      {mode === "deposit" && <DepositForm initialAccountId={accountId} />}
      {mode === "withdraw" && <WithdrawForm initialAccountId={accountId} />}

      <p>
        <Link to="/transactions/history">View transaction history →</Link>
      </p>
    </>
  );
}
