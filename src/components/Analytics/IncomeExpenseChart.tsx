
import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MonthlySummary } from '@/lib/types';
import { formatCurrency } from '@/lib/finance';

interface IncomeExpenseChartProps {
  data: MonthlySummary[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-4 border shadow-sm text-sm">
        <p className="font-medium">{label}</p>
        <p className="text-income">{`Income: ${formatCurrency(payload[0].value)}`}</p>
        <p className="text-expense">{`Expenses: ${formatCurrency(payload[1].value)}`}</p>
        <p className="font-medium mt-1">{`Balance: ${formatCurrency(payload[0].value - payload[1].value)}`}</p>
      </div>
    );
  }

  return null;
};

export const IncomeExpenseChart = ({ data }: IncomeExpenseChartProps) => {
  const chartData = useMemo(() => {
    return data.map(item => ({
      name: item.month,
      Income: item.income,
      Expenses: item.expense
    }));
  }, [data]);

  return (
    <div className="glass-card p-5 rounded-xl shadow-sm h-[400px]">
      <h2 className="text-lg font-medium mb-4">Income vs Expenses</h2>
      
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip 
            content={<CustomTooltip />}
          />
          <Legend />
          <Bar dataKey="Income" fill="hsl(var(--income))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Expenses" fill="hsl(var(--expense))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
