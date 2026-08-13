import { useCreateDeposit } from "../hooks/useCreateDeposit";
import { SingleAccountTransactionForm } from "./SingleAccountTransactionForm";

interface DepositFormProps {
  initialAccountId?: string;
}

export function DepositForm({ initialAccountId }: DepositFormProps) {
  const mutation = useCreateDeposit();

  return (
    <SingleAccountTransactionForm
      mutation={mutation}
      actionLabel="Deposit"
      pendingLabel="Depositing…"
      errorPrefix="Failed to create deposit"
      initialAccountId={initialAccountId}
    />
  );
}
