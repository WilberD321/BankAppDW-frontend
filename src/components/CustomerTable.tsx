import { Link, useNavigate } from "react-router";
import type { Customer } from "../types/customer";

interface CustomerTableProps {
  customers: Customer[];
}

export function CustomerTable({ customers }: CustomerTableProps) {
  const navigate = useNavigate();

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr
            key={customer.id}
            data-clickable
            onClick={() => navigate(`/customers/${customer.id}`)}
          >
            <td>
              <Link to={`/customers/${customer.id}`}>{customer.id}</Link>
            </td>
            <td>{customer.name}</td>
            <td>{customer.email ?? "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
