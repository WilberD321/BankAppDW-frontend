import { useState } from "react";
import type { FormEvent } from "react";
import { useCreateCustomer } from "../hooks/useCreateCustomer";
import { useUpdateCustomer } from "../hooks/useUpdateCustomer";
import type { Customer } from "../types/customer";

interface CustomerFormProps {
  mode: "create" | "edit";
  customer?: Customer;
  onSuccess?: () => void;
}

export function CustomerForm({ mode, customer, onSuccess }: CustomerFormProps) {
  const [name, setName] = useState(customer?.name ?? "");
  const [email, setEmail] = useState(customer?.email ?? "");

  const createMutation = useCreateCustomer();
  const updateMutation = useUpdateCustomer(customer?.id ?? "");
  const mutation = mode === "create" ? createMutation : updateMutation;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const payload = { name, email: email || undefined };

    if (mode === "create") {
      createMutation.mutate(payload, {
        onSuccess: () => {
          setName("");
          setEmail("");
          onSuccess?.();
        },
      });
    } else {
      updateMutation.mutate(payload, { onSuccess });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="customer_name">Name</label>
        <input
          id="customer_name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="customer_email">Email</label>
        <input
          id="customer_email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending
          ? "Saving…"
          : mode === "create"
            ? "Create customer"
            : "Save changes"}
      </button>

      {mutation.isError && (
        <p role="alert">
          Failed to save customer: {(mutation.error as Error).message}
        </p>
      )}
    </form>
  );
}
