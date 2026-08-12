import { useCreateDeposit } from "../hooks/useCreateDeposit";
import { SingleAccountTransactionForm } from "./SingleAccountTransactionForm";

export function DepositForm() {
  const mutation = useCreateDeposit();

  return (
    <SingleAccountTransactionForm
      mutation={mutation}
      actionLabel="Deposit"
      pendingLabel="Depositing…"
      errorPrefix="Failed to create deposit"
    />
  );
}
