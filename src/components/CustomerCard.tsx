import { Link } from "react-router";
import type { Customer } from "../types/customer";

interface CustomerCardProps {
  customer: Customer;
  accountCount: number;
}

export function CustomerCard({ customer, accountCount }: CustomerCardProps) {
  return (
    <Link to={`/customers/${customer.id}`} className="customer-card">
      <div className="customer-card-header">
        <span className="customer-card-id">{customer.id}</span>
        <span className="customer-card-name">{customer.name}</span>
      </div>
      <div className="customer-card-details">
        <p>{customer.email ?? "No email"}</p>
        <p>
          {accountCount} account{accountCount === 1 ? "" : "s"}
        </p>
      </div>
    </Link>
  );
}
