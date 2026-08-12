import { useCustomers } from "../hooks/useCustomers";
import { CustomerTable } from "../components/CustomerTable";

export function CustomerListPage() {
  const { data, isLoading, isError, error } = useCustomers();

  return (
    <>
      <h2>Customers</h2>
      {isLoading && <p>Loading customers…</p>}
      {isError && (
        <p role="alert">Failed to load customers: {(error as Error).message}</p>
      )}
      {data && data.length === 0 && <p>No customers found.</p>}
      {data && data.length > 0 && <CustomerTable customers={data} />}
    </>
  );
}
