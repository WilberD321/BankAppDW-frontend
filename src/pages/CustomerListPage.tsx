import { useMemo, useState } from "react";
import { useCustomers } from "../hooks/useCustomers";
import { useAccounts } from "../hooks/useAccounts";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { CustomerCard } from "../components/CustomerCard";
import { CustomerForm } from "../components/CustomerForm";
import type { Customer } from "../types/customer";

export function CustomerListPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 250);

  const customersQuery = useCustomers();
  const accountsQuery = useAccounts();
  const searchQuery = useCustomers({
    name: debouncedSearchTerm,
    enabled: debouncedSearchTerm.length > 0,
  });

  const accountCountsByOwner = useMemo(() => {
    const counts = new Map<string, number>();
    for (const account of accountsQuery.data ?? []) {
      counts.set(account.owner_id, (counts.get(account.owner_id) ?? 0) + 1);
    }
    return counts;
  }, [accountsQuery.data]);

  const displayedCustomers = useMemo(() => {
    const term = debouncedSearchTerm.trim().toLowerCase();
    let customers: Customer[];

    if (!term) {
      customers = customersQuery.data ?? [];
    } else {
      const merged = new Map<string, Customer>();
      for (const customer of searchQuery.data ?? []) {
        merged.set(customer.id, customer);
      }
      for (const customer of customersQuery.data ?? []) {
        if (customer.id.toLowerCase().includes(term)) {
          merged.set(customer.id, customer);
        }
      }
      customers = [...merged.values()];
    }

    return [...customers].sort((a, b) => a.id.localeCompare(b.id));
  }, [debouncedSearchTerm, customersQuery.data, searchQuery.data]);

  const isSearching = debouncedSearchTerm.trim().length > 0;
  const isLoading =
    customersQuery.isLoading ||
    accountsQuery.isLoading ||
    (isSearching && searchQuery.isLoading);
  const isError = customersQuery.isError || accountsQuery.isError || searchQuery.isError;
  const error = customersQuery.error ?? accountsQuery.error ?? searchQuery.error;

  return (
    <>
      <h2>Customers</h2>

      <div className="form-field search-field">
        <label htmlFor="customer_search">Search by name or customer ID</label>
        <input
          id="customer_search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="e.g. John or c123"
        />
      </div>

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
      {!isLoading && displayedCustomers.length === 0 && (
        <p>No customers found.</p>
      )}
      {displayedCustomers.length > 0 && (
        <div className="customer-grid">
          {displayedCustomers.map((customer) => (
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
