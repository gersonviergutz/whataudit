
import { useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { Navigation } from '@/components/Layout/Navigation';
import { IncomeExpenseChart } from '@/components/Analytics/IncomeExpenseChart';
import { TransactionCategoryChart } from '@/components/Analytics/TransactionCategoryChart';
import { mockTransactions } from '@/lib/mockData';
import { calculateCategorySummary, calculateMonthlySummary } from '@/lib/finance';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const monthlySummary = calculateMonthlySummary(mockTransactions);
  const incomeCategorySummary = calculateCategorySummary(mockTransactions, 'income');
  const expenseCategorySummary = calculateCategorySummary(mockTransactions, 'expense');
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-7xl px-4 py-6 pb-20 sm:pb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">Financial Analytics</h1>
            
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <IncomeExpenseChart data={monthlySummary} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TransactionCategoryChart 
                  data={incomeCategorySummary} 
                  type="income" 
                />
                
                <TransactionCategoryChart 
                  data={expenseCategorySummary} 
                  type="expense" 
                />
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="income" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <TransactionCategoryChart 
                data={incomeCategorySummary} 
                type="income" 
              />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="expenses" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <TransactionCategoryChart 
                data={expenseCategorySummary} 
                type="expense" 
              />
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Navigation />
    </div>
  );
};

export default Analytics;
