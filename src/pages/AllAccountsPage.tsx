import { useMemo, useState } from "react";
import { useAccounts } from "../hooks/useAccounts";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { AccountCard } from "../components/AccountCard";
import { AccountForm } from "../components/AccountForm";

export function AllAccountsPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 250);

  const { data, isLoading, isError, error } = useAccounts();

  const sortedAccounts = useMemo(() => {
    const term = debouncedSearchTerm.trim().toLowerCase();
    const accounts = term
      ? (data ?? []).filter((account) => account.id.toLowerCase().includes(term))
      : (data ?? []);
    return [...accounts].sort((a, b) => a.id.localeCompare(b.id));
  }, [data, debouncedSearchTerm]);

  return (
    <>
      <h2>All accounts</h2>

      <div className="form-field search-field">
        <label htmlFor="account_search">Search by account ID</label>
        <input
          id="account_search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="e.g. a003"
        />
      </div>

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
      {!isLoading && sortedAccounts.length === 0 && <p>No accounts found.</p>}
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
