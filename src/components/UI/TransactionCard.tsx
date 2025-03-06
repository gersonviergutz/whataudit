
import { motion } from 'framer-motion';
import { Transaction } from '@/lib/types';
import { formatCurrency } from '@/lib/finance';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  MessageSquareIcon, 
  UserIcon, 
  BrainIcon
} from 'lucide-react';

interface TransactionCardProps {
  transaction: Transaction;
  index?: number;
}

const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    food: '🍔',
    transport: '🚗',
    utilities: '💡',
    entertainment: '🎮',
    housing: '🏠',
    healthcare: '🏥',
    personal: '👤',
    education: '📚',
    investments: '📈',
    salary: '💰',
    gift: '🎁',
    other: '📦'
  };
  
  return icons[category] || '📝';
};

const getSourceIcon = (createdBy: 'user' | 'whatsapp' | 'ai') => {
  switch (createdBy) {
    case 'whatsapp':
      return <MessageSquareIcon className="h-3 w-3" />;
    case 'ai':
      return <BrainIcon className="h-3 w-3" />;
    default:
      return <UserIcon className="h-3 w-3" />;
  }
};

export const TransactionCard = ({ transaction, index = 0 }: TransactionCardProps) => {
  const { type, amount, category, description, date, createdBy } = transaction;
  const isIncome = type === 'income';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="glass-card rounded-lg overflow-hidden p-3 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isIncome ? 'bg-income/10 text-income' : 'bg-expense/10 text-expense'
        }`}>
          <span className="text-lg">{getCategoryIcon(category)}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{description}</p>
          <div className="flex items-center text-xs text-muted-foreground">
            <span>{new Date(date).toLocaleDateString()}</span>
            <span className="mx-1">•</span>
            <span className="capitalize">{category}</span>
            <span className="mx-1">•</span>
            <div className="flex items-center gap-1 bg-secondary rounded-full px-1.5 py-0.5">
              {getSourceIcon(createdBy)}
              <span className="capitalize">{createdBy}</span>
            </div>
          </div>
        </div>
        
        <div className={`text-right ${isIncome ? 'text-income' : 'text-expense'}`}>
          <div className="flex items-center justify-end font-medium">
            {isIncome ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
            {formatCurrency(amount)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
