import { Link } from "react-router";
import type { Account } from "../types/account";

interface AccountCardProps {
  account: Account;
  linkToOwner?: boolean;
}

const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});

export function AccountCard({ account, linkToOwner = false }: AccountCardProps) {
  const body = (
    <>
      <div className="account-card-id">{account.id}</div>
      <div className="account-card-balance">
        {currencyFormatter.format(account.balance)}
      </div>
      <div className="account-card-details">
        <p>Branch {account.branch_id}</p>
      </div>
    </>
  );

  if (linkToOwner) {
    return (
      <Link to={`/customers/${account.owner_id}`} className="account-card">
        {body}
      </Link>
    );
  }

  return <div className="account-card">{body}</div>;
}
