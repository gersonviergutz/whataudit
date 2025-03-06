
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconClassName?: string;
  delay?: number;
}

export const StatCard = ({
  icon,
  title,
  value,
  trend,
  className = '',
  iconClassName = '',
  delay = 0,
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
      className={cn(
        "glass-card rounded-xl overflow-hidden p-5 shadow-sm transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-xs font-medium ${
                  trend.isPositive ? 'text-income' : 'text-expense'
                }`}
              >
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          )}
        </div>
        
        <div className={cn(
          "p-3 rounded-full",
          iconClassName || "bg-primary/10"
        )}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};
