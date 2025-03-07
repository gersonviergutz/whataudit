
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Layout/Header';
import { Navigation } from '@/components/Layout/Navigation';
import { TransactionList } from '@/components/Transactions/TransactionList';
import { TransactionForm } from '@/components/Transactions/TransactionForm';
import { mockTransactions } from '@/lib/mockData';
import { Transaction, TransactionType, TransactionCategory } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlusIcon, SearchIcon, XIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAddingTransaction, setIsAddingTransaction] = useState(searchParams.get('add') === 'true');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const { t } = useLanguage();
  
  useEffect(() => {
    // Update dialog state from URL
    setIsAddingTransaction(searchParams.get('add') === 'true');
    // Update search term from URL
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);
  
  const handleOpenAddDialog = () => {
    // Preserve search parameter if it exists
    const newParams = new URLSearchParams(searchParams);
    newParams.set('add', 'true');
    setSearchParams(newParams);
  };
  
  const handleCloseAddDialog = () => {
    // Preserve search parameter if it exists
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('add');
    setSearchParams(newParams);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Update URL with search parameter
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('search', value);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };
  
  const handleAddTransaction = (transactionData: {
    type: TransactionType;
    amount: number;
    category: TransactionCategory;
    description: string;
    date: Date;
  }) => {
    const newTransaction: Transaction = {
      id: `trans-${transactions.length + 1}`,
      ...transactionData,
      createdBy: 'user'
    };
    
    setTransactions([newTransaction, ...transactions]);
    handleCloseAddDialog();
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-5xl px-4 py-6 pb-20 sm:pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card rounded-xl overflow-hidden p-5 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">{t('transactions.title')}</h1>
            
            <Button onClick={handleOpenAddDialog} className="rounded-full">
              <PlusIcon className="mr-2 h-4 w-4" />
              {t('transactions.add')}
            </Button>
          </div>
          
          <div className="mb-4 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={t('transactions.search')}
              className="pl-10 w-full"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => handleSearchChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <TransactionList 
            transactions={transactions} 
            searchTerm={searchTerm}
          />
        </motion.div>
      </main>
      
      <Dialog open={isAddingTransaction} onOpenChange={(open) => {
        if (!open) handleCloseAddDialog();
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('transaction.form.title')}</DialogTitle>
          </DialogHeader>
          
          <TransactionForm
            onAddTransaction={handleAddTransaction}
            onCancel={handleCloseAddDialog}
          />
        </DialogContent>
      </Dialog>
      
      <Navigation />
    </div>
  );
};

export default Transactions;
