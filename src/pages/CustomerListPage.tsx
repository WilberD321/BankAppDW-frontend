import { useMemo, useState } from "react";
import { useCustomers } from "../hooks/useCustomers";
import { useAccounts } from "../hooks/useAccounts";
import { CustomerCard } from "../components/CustomerCard";
import { CustomerForm } from "../components/CustomerForm";

export function CustomerListPage() {
  const [isCreating, setIsCreating] = useState(false);
  const customersQuery = useCustomers();
  const accountsQuery = useAccounts();

  const accountCountsByOwner = useMemo(() => {
    const counts = new Map<string, number>();
    for (const account of accountsQuery.data ?? []) {
      counts.set(account.owner_id, (counts.get(account.owner_id) ?? 0) + 1);
    }
    return counts;
  }, [accountsQuery.data]);

  const sortedCustomers = useMemo(
    () =>
      [...(customersQuery.data ?? [])].sort((a, b) => a.id.localeCompare(b.id)),
    [customersQuery.data]
  );

  const isLoading = customersQuery.isLoading || accountsQuery.isLoading;
  const isError = customersQuery.isError || accountsQuery.isError;
  const error = customersQuery.error ?? accountsQuery.error;

  return (
    <>
      <h2>Customers</h2>

      <button
        type="button"
        className="button-secondary"
        onClick={() => setIsCreating((current) => !current)}
      >
        {isCreating ? "Cancel" : "+ New customer"}
      </button>
      {isCreating && (
        <div className="inline-panel">
          <CustomerForm mode="create" onSuccess={() => setIsCreating(false)} />
        </div>
      )}

      {isLoading && <p>Loading customers…</p>}
      {isError && (
        <p role="alert">Failed to load customers: {(error as Error).message}</p>
      )}
      {customersQuery.data && sortedCustomers.length === 0 && (
        <p>No customers found.</p>
      )}
      {sortedCustomers.length > 0 && (
        <div className="customer-grid">
          {sortedCustomers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              accountCount={accountCountsByOwner.get(customer.id) ?? 0}
            />
          ))}
        </div>
      )}
    </>
  );
}
