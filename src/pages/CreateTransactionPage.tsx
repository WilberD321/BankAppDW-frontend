import { useState } from "react";
import { Link } from "react-router";
import { TransferForm } from "../components/TransferForm";
import { DepositForm } from "../components/DepositForm";
import { WithdrawForm } from "../components/WithdrawForm";

type TransactionMode = "transfer" | "deposit" | "withdraw";

const MODE_LABELS: Record<TransactionMode, string> = {
  deposit: "Deposit",
  withdraw: "Withdraw",
  transfer: "Transfer",
};

export function CreateTransactionPage() {
  const [mode, setMode] = useState<TransactionMode>("transfer");

  return (
    <>
      <h2>New transaction</h2>

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

      {mode === "transfer" && <TransferForm />}
      {mode === "deposit" && <DepositForm />}
      {mode === "withdraw" && <WithdrawForm />}

      <p>
        <Link to="/transactions/history">View transaction history →</Link>
      </p>
    </>
  );
}
