import type { Account } from "../types/account";

interface AccountTableProps {
  accounts: Account[];
}

const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});

export function AccountTable({ accounts }: AccountTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Branch ID</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account) => (
          <tr key={account.id}>
            <td>{account.id}</td>
            <td>{account.branch_id}</td>
            <td>{currencyFormatter.format(account.balance)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
