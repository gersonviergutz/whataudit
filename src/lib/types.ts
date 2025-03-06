
export type TransactionType = 'income' | 'expense';

export type TransactionCategory = 
  | 'food' 
  | 'transport' 
  | 'utilities' 
  | 'entertainment' 
  | 'housing' 
  | 'healthcare' 
  | 'personal' 
  | 'education' 
  | 'investments' 
  | 'salary' 
  | 'gift' 
  | 'other';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: TransactionCategory;
  description: string;
  date: Date;
  createdBy: 'user' | 'whatsapp' | 'ai';
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  recentTransactions: Transaction[];
}

export interface CategorySummary {
  category: TransactionCategory;
  totalAmount: number;
  percentage: number;
}

export interface MonthlySummary {
  month: string;
  income: number;
  expense: number;
}
