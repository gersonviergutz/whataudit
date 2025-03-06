
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
import { PlusIcon } from 'lucide-react';

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAddingTransaction, setIsAddingTransaction] = useState(searchParams.get('add') === 'true');
  
  useEffect(() => {
    // Update dialog state from URL
    setIsAddingTransaction(searchParams.get('add') === 'true');
  }, [searchParams]);
  
  const handleOpenAddDialog = () => {
    setSearchParams({ add: 'true' });
  };
  
  const handleCloseAddDialog = () => {
    setSearchParams({});
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
            <h1 className="text-xl font-semibold">All Transactions</h1>
            
            <Button onClick={handleOpenAddDialog} className="rounded-full">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </div>
          
          <TransactionList transactions={transactions} />
        </motion.div>
      </main>
      
      <Dialog open={isAddingTransaction} onOpenChange={(open) => {
        if (!open) handleCloseAddDialog();
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
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
