
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TransactionCard } from '@/components/UI/TransactionCard';
import { Transaction, TransactionType } from '@/lib/types';
import { 
  FilterIcon, 
  SortAscIcon, 
  ArrowUpIcon, 
  ArrowDownIcon, 
  XIcon 
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TransactionListProps {
  transactions: Transaction[];
  searchTerm?: string;
}

type SortField = 'date' | 'amount';
type SortDirection = 'asc' | 'desc';

export const TransactionList = ({ transactions, searchTerm = '' }: TransactionListProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'all'>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const { t } = useLanguage();
  
  // Use the passed searchTerm if provided, otherwise use local state
  const effectiveSearchTerm = searchTerm || localSearchTerm;
  
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(transaction => {
        const matchesSearch = 
          transaction.description.toLowerCase().includes(effectiveSearchTerm.toLowerCase()) ||
          transaction.category.toLowerCase().includes(effectiveSearchTerm.toLowerCase());
        
        const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
        
        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        if (sortField === 'date') {
          return sortDirection === 'desc'
            ? b.date.getTime() - a.date.getTime()
            : a.date.getTime() - b.date.getTime();
        } else {
          return sortDirection === 'desc'
            ? b.amount - a.amount
            : a.amount - b.amount;
        }
      });
  }, [transactions, effectiveSearchTerm, typeFilter, sortField, sortDirection]);
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  return (
    <div className="space-y-4">
      {!searchTerm && (
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Input
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              placeholder={t('transactions.search')}
              className="pl-10"
            />
            {localSearchTerm && (
              <button
                onClick={() => setLocalSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={typeFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter('all')}
              className="flex-1 md:flex-initial"
            >
              <FilterIcon className="h-4 w-4 mr-1" />
              {t('transactions.filter.all')}
            </Button>
            
            <Button
              variant={typeFilter === 'income' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter('income')}
              className="flex-1 md:flex-initial"
            >
              <ArrowUpIcon className="h-4 w-4 mr-1 text-income" />
              {t('transactions.filter.income')}
            </Button>
            
            <Button
              variant={typeFilter === 'expense' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter('expense')}
              className="flex-1 md:flex-initial"
            >
              <ArrowDownIcon className="h-4 w-4 mr-1 text-expense" />
              {t('transactions.filter.expenses')}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSort('date')}
              className="hidden md:flex"
            >
              <SortAscIcon className="h-4 w-4 mr-1" />
              {sortField === 'date' ? (sortDirection === 'asc' ? 'Oldest' : 'Newest') : t('transactions.filter.date')}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSort('amount')}
              className="hidden md:flex"
            >
              <SortAscIcon className="h-4 w-4 mr-1" />
              {sortField === 'amount' ? (sortDirection === 'asc' ? 'Lowest' : 'Highest') : t('transactions.filter.amount')}
            </Button>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('transactions.no_results')}</p>
            {effectiveSearchTerm && (
              <Button 
                variant="link" 
                onClick={() => searchTerm ? null : setLocalSearchTerm('')}
                className="mt-2"
              >
                {t('transactions.clear_search')}
              </Button>
            )}
          </div>
        ) : (
          filteredTransactions.map((transaction, index) => (
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
