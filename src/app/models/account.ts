// src/app/model/account.model.ts

// 1. Define Customer FIRST so AccountDetails can use it
export interface Customer {
  id: number;
  name: string;
  email: string;
}

// 2. The Base Account (Common fields only)
export interface AccountDetails {
  type: string;        // "CurrentAccount" or "SavingAccount"
  id: string;          // The Account ID (UUID)
  balance: number;
  creditedAt: string;
  status: string;
  customerDTO: Customer; // Now this works because Customer is defined above
}

// 3. Specific fields for Current Accounts
export interface CurrentAccount extends AccountDetails {
  overDraft: number;
}

// 4. Specific fields for Savings Accounts
export interface SavingAccount extends AccountDetails {
  interestRate: number;
}
export interface AccountOperation {
  id: number;
  operationDate: string;
  amount: number;
  type: string; // "DEBIT" or "CREDIT"
  description: string;
}

// 6. The History Object (Matches AccountHistoryDTO)
export interface AccountHistory {
  accountId: string;
  balance: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  accountOperationsDTO: AccountOperation[]; // Note the name matches Java exactly
}
