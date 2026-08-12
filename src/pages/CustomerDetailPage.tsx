import { Link, useParams } from "react-router";
import { useCustomer } from "../hooks/useCustomer";
import { useAccountsByOwner } from "../hooks/useAccountsByOwner";
import { AccountTable } from "../components/AccountTable";

export function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const customerQuery = useCustomer(id);
  const accountsQuery = useAccountsByOwner(id);

  return (
    <>
      <Link to="/">← Back to customers</Link>
      <h1>Customer detail</h1>

      {customerQuery.isLoading && <p>Loading customer…</p>}
      {customerQuery.isError && (
        <p role="alert">
          Failed to load customer: {(customerQuery.error as Error).message}
        </p>
      )}
      {customerQuery.data && (
        <div>
          <p>
            <strong>{customerQuery.data.name}</strong>
          </p>
          <p>{customerQuery.data.email ?? "—"}</p>
        </div>
      )}

      <h2>Accounts</h2>
      {accountsQuery.isLoading && <p>Loading accounts…</p>}
      {accountsQuery.isError && (
        <p role="alert">
          Failed to load accounts: {(accountsQuery.error as Error).message}
        </p>
      )}
      {accountsQuery.data && accountsQuery.data.length === 0 && (
        <p>No accounts found for this customer.</p>
      )}
      {accountsQuery.data && accountsQuery.data.length > 0 && (
        <AccountTable accounts={accountsQuery.data} />
      )}
    </>
  );
}
