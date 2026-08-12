import { useState } from "react";
import { Link } from "react-router";
import { useTransactions } from "../hooks/useTransactions";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { TransactionTable } from "../components/TransactionTable";
import type { TransactionFilters } from "../types/transaction";

const TRANSACTION_TYPES = ["TRANSFER", "DEPOSIT", "WITHDRAWAL"];

export function TransactionsPage() {
  const [startDate, setStartDate] = useState("");
  const [type, setType] = useState("");
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const debouncedFromAccountId = useDebouncedValue(fromAccountId, 250);
  const debouncedToAccountId = useDebouncedValue(toAccountId, 250);

  const filters: TransactionFilters = {
    start_date: startDate || undefined,
    type: type || undefined,
    from_account_id: debouncedFromAccountId || undefined,
    to_account_id: debouncedToAccountId || undefined,
  };

  const { data, isLoading, isError, error } = useTransactions(filters);

  function clearFilters() {
    setStartDate("");
    setType("");
    setFromAccountId("");
    setToAccountId("");
  }

  return (
    <>
      <Link to="/transactions">← New transaction</Link>
      <h2>Transaction history</h2>

      <div className="filter-row">
        <div className="form-field">
          <label htmlFor="filter_start_date">Start date</label>
          <input
            id="filter_start_date"
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="filter_type">Type</label>
          <select
            id="filter_type"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="">All types</option>
            {TRANSACTION_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="filter_from">From account</label>
          <input
            id="filter_from"
            value={fromAccountId}
            onChange={(event) => setFromAccountId(event.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="filter_to">To account</label>
          <input
            id="filter_to"
            value={toAccountId}
            onChange={(event) => setToAccountId(event.target.value)}
          />
        </div>

        <button type="button" className="button-secondary" onClick={clearFilters}>
          Clear filters
        </button>
      </div>

      {isLoading && <p>Loading transactions…</p>}
      {isError && (
        <p role="alert">
          Failed to load transactions: {(error as Error).message}
        </p>
      )}
      {data && data.length === 0 && <p>No transactions found.</p>}
      {data && data.length > 0 && <TransactionTable transactions={data} />}
    </>
  );
}
