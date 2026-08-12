import { useState } from "react";
import type { FormEvent } from "react";
import { useCreateCustomer } from "../hooks/useCreateCustomer";
import { useUpdateCustomer } from "../hooks/useUpdateCustomer";
import type { Customer } from "../types/customer";

const CUSTOMER_ID_PATTERN = /^c\d{3}$/;

interface CustomerFormProps {
  mode: "create" | "edit";
  customer?: Customer;
  onSuccess?: () => void;
}

export function CustomerForm({ mode, customer, onSuccess }: CustomerFormProps) {
  const [customerId, setCustomerId] = useState("");
  const [customerIdError, setCustomerIdError] = useState<string | null>(null);
  const [name, setName] = useState(customer?.name ?? "");
  const [email, setEmail] = useState(customer?.email ?? "");

  const createMutation = useCreateCustomer();
  const updateMutation = useUpdateCustomer(customer?.id ?? "");
  const mutation = mode === "create" ? createMutation : updateMutation;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (mode === "create") {
      if (customerId && !CUSTOMER_ID_PATTERN.test(customerId)) {
        setCustomerIdError("Customer ID must look like c001 (c followed by 3 digits)");
        return;
      }
      setCustomerIdError(null);

      createMutation.mutate(
        { id: customerId || undefined, name, email: email || undefined },
        {
          onSuccess: () => {
            setCustomerId("");
            setName("");
            setEmail("");
            onSuccess?.();
          },
        }
      );
    } else {
      updateMutation.mutate({ name, email: email || undefined }, { onSuccess });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {mode === "create" && (
        <div className="form-field">
          <label htmlFor="customer_id">Customer ID (optional)</label>
          <input
            id="customer_id"
            value={customerId}
            onChange={(event) => {
              setCustomerId(event.target.value);
              setCustomerIdError(null);
            }}
            placeholder="Auto-generated if left blank, e.g. c001"
          />
          {customerIdError && <p role="alert">{customerIdError}</p>}
        </div>
      )}

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
