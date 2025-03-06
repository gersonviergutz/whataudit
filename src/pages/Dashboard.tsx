
import { useState, useEffect } from 'react';
import { Header } from '@/components/Layout/Header';
import { Navigation } from '@/components/Layout/Navigation';
import { FinancialSummary } from '@/components/Dashboard/FinancialSummary';
import { RecentTransactions } from '@/components/Dashboard/RecentTransactions';
import { WhatsAppSimulator } from '@/components/WhatsApp/WhatsAppSimulator';
import { mockTransactions } from '@/lib/mockData';
import { calculateFinancialSummary } from '@/lib/finance';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [summary, setSummary] = useState(calculateFinancialSummary(mockTransactions));
  const navigate = useNavigate();
  
  useEffect(() => {
    // Recalculate summary when transactions change
    setSummary(calculateFinancialSummary(mockTransactions));
  }, []);
  
  const handleAddTransaction = () => {
    navigate('/transactions?add=true');
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-7xl px-4 py-6 pb-20 sm:pb-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <motion.div variants={item} className="lg:col-span-3">
            <FinancialSummary data={summary} />
          </motion.div>
          
          <motion.div variants={item} className="lg:col-span-2">
            <RecentTransactions transactions={summary.recentTransactions} />
          </motion.div>
          
          <motion.div variants={item}>
            <WhatsAppSimulator />
          </motion.div>
        </motion.div>
        
        <Button 
          onClick={handleAddTransaction}
          className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 rounded-full shadow-lg"
          size="lg"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </main>
      
      <Navigation />
    </div>
  );
};

export default Dashboard;
