
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TransactionCard } from '@/components/UI/TransactionCard';
import { Transaction, TransactionType } from '@/lib/types';
import { 
  SearchIcon, 
  FilterIcon, 
  SortAscIcon, 
  ArrowUpIcon, 
  ArrowDownIcon, 
  XIcon 
} from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
}

type SortField = 'date' | 'amount';
type SortDirection = 'asc' | 'desc';

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'all'>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(transaction => {
        const matchesSearch = 
          transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
        
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
  }, [transactions, searchTerm, typeFilter, sortField, sortDirection]);
  
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
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search transactions..."
            className="pl-10"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
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
            All
          </Button>
          
          <Button
            variant={typeFilter === 'income' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('income')}
            className="flex-1 md:flex-initial"
          >
            <ArrowUpIcon className="h-4 w-4 mr-1 text-income" />
            Income
          </Button>
          
          <Button
            variant={typeFilter === 'expense' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('expense')}
            className="flex-1 md:flex-initial"
          >
            <ArrowDownIcon className="h-4 w-4 mr-1 text-expense" />
            Expenses
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSort('date')}
            className="hidden md:flex"
          >
            <SortAscIcon className="h-4 w-4 mr-1" />
            {sortField === 'date' ? (sortDirection === 'asc' ? 'Oldest' : 'Newest') : 'Date'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSort('amount')}
            className="hidden md:flex"
          >
            <SortAscIcon className="h-4 w-4 mr-1" />
            {sortField === 'amount' ? (sortDirection === 'asc' ? 'Lowest' : 'Highest') : 'Amount'}
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No transactions found</p>
            {searchTerm && (
              <Button 
                variant="link" 
                onClick={() => setSearchTerm('')}
                className="mt-2"
              >
                Clear search
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
