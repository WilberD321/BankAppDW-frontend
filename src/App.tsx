import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "./lib/apiClient";

interface Customer {
  id: string;
  name: string;
  email: string | null;
}

function App() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["customers"],
    queryFn: () => fetchJson<Customer[]>("/api/v1/customers"),
  });

  return (
    <main>
      <h1>BankAppDW</h1>
      <h2>Customers</h2>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to load customers: {(error as Error).message}</p>}
      {data && (
        <ul>
          {data.map((customer) => (
            <li key={customer.id}>
              {customer.id} — {customer.name}
              {customer.email ? ` (${customer.email})` : ""}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
