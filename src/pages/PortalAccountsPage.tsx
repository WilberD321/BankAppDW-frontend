import { useMemo } from "react";
import { useAccounts } from "../hooks/useAccounts";
import { AccountCard } from "../components/AccountCard";

export function PortalAccountsPage() {
  const { data, isLoading, isError, error } = useAccounts();

  const sortedAccounts = useMemo(
    () => [...(data ?? [])].sort((a, b) => a.id.localeCompare(b.id)),
    [data]
  );

  return (
    <>
      <h2>My accounts</h2>
      {isLoading && <p>Loading accounts…</p>}
      {isError && (
        <p role="alert">Failed to load accounts: {(error as Error).message}</p>
      )}
      {data && sortedAccounts.length === 0 && <p>No accounts found.</p>}
      {sortedAccounts.length > 0 && (
        <div className="account-grid">
          {sortedAccounts.map((account) => (
            <AccountCard key={account.id} account={account} linkToTransactions />
          ))}
        </div>
      )}
    </>
  );
}
