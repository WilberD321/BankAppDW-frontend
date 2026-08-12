import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useCustomer } from "../hooks/useCustomer";
import { useAccountsByOwner } from "../hooks/useAccountsByOwner";
import { useDeleteCustomer } from "../hooks/useDeleteCustomer";
import { EditableAccountCard } from "../components/EditableAccountCard";
import { CustomerForm } from "../components/CustomerForm";
import { AccountForm } from "../components/AccountForm";

export function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const customerQuery = useCustomer(id);
  const accountsQuery = useAccountsByOwner(id);
  const deleteCustomerMutation = useDeleteCustomer();

  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const sortedAccounts = useMemo(
    () => [...(accountsQuery.data ?? [])].sort((a, b) => a.id.localeCompare(b.id)),
    [accountsQuery.data]
  );

  function handleDeleteCustomer() {
    if (!customerQuery.data) return;
    if (
      window.confirm(
        `Delete customer ${customerQuery.data.id}? This will also delete all of their accounts.`
      )
    ) {
      deleteCustomerMutation.mutate(customerQuery.data.id, {
        onSuccess: () => navigate("/"),
      });
    }
  }

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
      {customerQuery.data && !isEditing && (
        <div>
          <p>
            <strong>{customerQuery.data.name}</strong>
          </p>
          <p>{customerQuery.data.email ?? "—"}</p>
          <div className="button-row">
            <button
              type="button"
              className="button-secondary button-sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              type="button"
              className="button-danger button-sm"
              onClick={handleDeleteCustomer}
              disabled={deleteCustomerMutation.isPending}
            >
              {deleteCustomerMutation.isPending ? "Deleting…" : "Delete customer"}
            </button>
          </div>
          {deleteCustomerMutation.isError && (
            <p role="alert">
              Failed to delete customer:{" "}
              {(deleteCustomerMutation.error as Error).message}
            </p>
          )}
        </div>
      )}
      {customerQuery.data && isEditing && (
        <div className="inline-panel">
          <CustomerForm
            mode="edit"
            customer={customerQuery.data}
            onSuccess={() => setIsEditing(false)}
          />
          <button
            type="button"
            className="button-secondary button-sm"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      )}

      <h2>Accounts</h2>

      {customerQuery.data && (
        <>
          <button
            type="button"
            className="button-secondary"
            onClick={() => setIsCreatingAccount((current) => !current)}
          >
            {isCreatingAccount ? "Cancel" : "+ New account"}
          </button>
          {isCreatingAccount && (
            <div className="inline-panel">
              <AccountForm
                mode="create"
                ownerId={customerQuery.data.id}
                onSuccess={() => setIsCreatingAccount(false)}
              />
            </div>
          )}
        </>
      )}

      {accountsQuery.isLoading && <p>Loading accounts…</p>}
      {accountsQuery.isError && (
        <p role="alert">
          Failed to load accounts: {(accountsQuery.error as Error).message}
        </p>
      )}
      {accountsQuery.data && sortedAccounts.length === 0 && (
        <p>No accounts found for this customer.</p>
      )}
      {sortedAccounts.length > 0 && (
        <div className="account-grid">
          {sortedAccounts.map((account) => (
            <EditableAccountCard key={account.id} account={account} />
          ))}
        </div>
      )}
    </>
  );
}
