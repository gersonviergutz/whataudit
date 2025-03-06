
import { Transaction, FinancialSummary, CategorySummary, MonthlySummary, TransactionCategory } from './types';

export const calculateFinancialSummary = (transactions: Transaction[]): FinancialSummary => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpenses;
  
  // Sort by date desc and take the first 5 for recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);
  
  return {
    totalIncome,
    totalExpenses,
    balance,
    recentTransactions
  };
};

export const calculateCategorySummary = (
  transactions: Transaction[], 
  type: 'income' | 'expense'
): CategorySummary[] => {
  const filteredTransactions = transactions.filter(t => t.type === type);
  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  
  // Group by category
  const categoryMap = new Map<TransactionCategory, number>();
  
  filteredTransactions.forEach(transaction => {
    const currentAmount = categoryMap.get(transaction.category) || 0;
    categoryMap.set(transaction.category, currentAmount + transaction.amount);
  });
  
  // Convert to CategorySummary array
  const categorySummary: CategorySummary[] = Array.from(categoryMap.entries())
    .map(([category, amount]) => ({
      category,
      totalAmount: amount,
      percentage: totalAmount ? (amount / totalAmount) * 100 : 0
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount);
  
  return categorySummary;
};

export const calculateMonthlySummary = (transactions: Transaction[]): MonthlySummary[] => {
  const monthlyData = new Map<string, { income: number; expense: number }>();
  
  // Get the last 6 months as labels
  const today = new Date();
  const monthLabels: string[] = [];
  
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthName = d.toLocaleString('default', { month: 'short' });
    const key = `${monthName} ${d.getFullYear()}`;
    monthLabels.push(key);
    monthlyData.set(key, { income: 0, expense: 0 });
  }
  
  // Aggregate data by month
  transactions.forEach(transaction => {
    const d = transaction.date;
    const monthName = d.toLocaleString('default', { month: 'short' });
    const key = `${monthName} ${d.getFullYear()}`;
    
    if (monthlyData.has(key)) {
      const data = monthlyData.get(key)!;
      
      if (transaction.type === 'income') {
        data.income += transaction.amount;
      } else {
        data.expense += transaction.amount;
      }
      
      monthlyData.set(key, data);
    }
  });
  
  // Convert to MonthlySummary array
  return monthLabels.map(month => ({
    month,
    income: monthlyData.get(month)?.income || 0,
    expense: monthlyData.get(month)?.expense || 0
  }));
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};
