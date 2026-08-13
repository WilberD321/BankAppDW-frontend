import { useCreateWithdraw } from "../hooks/useCreateWithdraw";
import { SingleAccountTransactionForm } from "./SingleAccountTransactionForm";

interface WithdrawFormProps {
  initialAccountId?: string;
}

export function WithdrawForm({ initialAccountId }: WithdrawFormProps) {
  const mutation = useCreateWithdraw();

  return (
    <SingleAccountTransactionForm
      mutation={mutation}
      actionLabel="Withdraw"
      pendingLabel="Withdrawing…"
      errorPrefix="Failed to create withdrawal"
      initialAccountId={initialAccountId}
    />
  );
}
