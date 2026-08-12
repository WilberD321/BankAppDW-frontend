export interface Customer {
  id: string;
  name: string;
  email: string | null;
}

export interface CustomerCreate {
  id?: string;
  name: string;
  email?: string;
}

export interface CustomerUpdate {
  name?: string;
  email?: string;
}
