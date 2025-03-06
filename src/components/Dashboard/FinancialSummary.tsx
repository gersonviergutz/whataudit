
import { DollarSignIcon, TrendingUpIcon, TrendingDownIcon, WalletIcon } from 'lucide-react';
import { StatCard } from '@/components/UI/StatCard';
import { formatCurrency } from '@/lib/finance';
import { FinancialSummary as FinancialSummaryType } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface FinancialSummaryProps {
  data: FinancialSummaryType;
}

export const FinancialSummary = ({ data }: FinancialSummaryProps) => {
  const { totalIncome, totalExpenses, balance } = data;
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        title={t('finance.income')}
        value={formatCurrency(totalIncome)}
        icon={<TrendingUpIcon className="h-5 w-5 text-income" />}
        iconClassName="bg-income/10"
        trend={{ value: 12.5, isPositive: true }}
        delay={0}
      />
      
      <StatCard
        title={t('finance.expenses')}
        value={formatCurrency(totalExpenses)}
        icon={<TrendingDownIcon className="h-5 w-5 text-expense" />}
        iconClassName="bg-expense/10"
        trend={{ value: 8.3, isPositive: false }}
        delay={1}
      />
      
      <StatCard
        title={t('finance.balance')}
        value={formatCurrency(balance)}
        icon={<WalletIcon className="h-5 w-5 text-primary" />}
        iconClassName="bg-primary/10"
        trend={{ value: 4.2, isPositive: balance > 0 }}
        delay={2}
      />
    </div>
  );
};
