import { useMemo, useState } from "react";
import { useAccounts } from "../hooks/useAccounts";
import { AccountCard } from "../components/AccountCard";
import { AccountForm } from "../components/AccountForm";

export function AllAccountsPage() {
  const [isCreating, setIsCreating] = useState(false);
  const { data, isLoading, isError, error } = useAccounts();

  const sortedAccounts = useMemo(
    () => [...(data ?? [])].sort((a, b) => a.id.localeCompare(b.id)),
    [data]
  );

  return (
    <>
      <h2>All accounts</h2>

      <button
        type="button"
        className="button-secondary"
        onClick={() => setIsCreating((current) => !current)}
      >
        {isCreating ? "Cancel" : "+ New account"}
      </button>
      {isCreating && (
        <div className="inline-panel">
          <AccountForm mode="create" onSuccess={() => setIsCreating(false)} />
        </div>
      )}

      {isLoading && <p>Loading accounts…</p>}
      {isError && (
        <p role="alert">Failed to load accounts: {(error as Error).message}</p>
      )}
      {data && sortedAccounts.length === 0 && <p>No accounts found.</p>}
      {sortedAccounts.length > 0 && (
        <div className="account-grid">
          {sortedAccounts.map((account) => (
            <AccountCard key={account.id} account={account} linkToOwner />
          ))}
        </div>
      )}
    </>
  );
}
