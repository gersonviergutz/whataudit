
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Transaction } from '@/lib/types';
import { TransactionCard } from '@/components/UI/TransactionCard';
import { ChevronRightIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const handleViewAll = () => {
    navigate('/transactions');
  };
  
  return (
    <div className="glass-card rounded-xl overflow-hidden p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">{t('transactions.recent')}</h2>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-xs gap-1 hover:bg-primary/10 hover:text-primary"
          onClick={handleViewAll}
        >
          {t('transactions.view_all')}
          <ChevronRightIcon className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <p className="text-center py-6 text-muted-foreground">{t('transactions.no_transactions')}</p>
        ) : (
          transactions.map((transaction, index) => (
            <TransactionCard 
              key={transaction.id} 
              transaction={transaction} 
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
};
