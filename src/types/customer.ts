export interface Customer {
  id: string;
  name: string;
  email: string | null;
}

export interface CustomerCreate {
  name: string;
  email?: string;
}

export interface CustomerUpdate {
  name?: string;
  email?: string;
}
