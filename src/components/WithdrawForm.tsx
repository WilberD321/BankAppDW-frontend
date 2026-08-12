import { useCreateWithdraw } from "../hooks/useCreateWithdraw";
import { SingleAccountTransactionForm } from "./SingleAccountTransactionForm";

export function WithdrawForm() {
  const mutation = useCreateWithdraw();

  return (
    <SingleAccountTransactionForm
      mutation={mutation}
      actionLabel="Withdraw"
      pendingLabel="Withdrawing…"
      errorPrefix="Failed to create withdrawal"
    />
  );
}
