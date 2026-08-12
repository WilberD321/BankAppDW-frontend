import type { Transaction } from "../types/transaction";

interface TransactionTableProps {
  transactions: Transaction[];
}

const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>From</th>
          <th>To</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.from_account_id ?? "—"}</td>
            <td>{transaction.to_account_id ?? "—"}</td>
            <td>{currencyFormatter.format(transaction.amount)}</td>
            <td>{transaction.type}</td>
            <td>{dateFormatter.format(new Date(transaction.timestamp))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
