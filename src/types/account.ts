export interface Account {
  id: string;
  owner_id: string;
  branch_id: string;
  balance: number;
}

export interface AccountCreate {
  owner_id: string;
  branch_id: string;
  balance?: number;
}

export interface AccountUpdate {
  branch_id?: string;
}
