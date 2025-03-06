
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CategorySummary } from '@/lib/types';
import { formatCurrency } from '@/lib/finance';

interface TransactionCategoryChartProps {
  data: CategorySummary[];
  type: 'income' | 'expense';
}

const RADIAN = Math.PI / 180;
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', 
  '#5DADE2', '#45B39D', '#F4D03F', '#EB984E', '#EC7063'
];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border shadow-sm">
        <p className="font-medium capitalize">{payload[0].name}</p>
        <p>{formatCurrency(payload[0].value)}</p>
        <p className="text-sm text-muted-foreground">{`${payload[0].payload.percentage.toFixed(1)}%`}</p>
      </div>
    );
  }

  return null;
};

export const TransactionCategoryChart = ({ data, type }: TransactionCategoryChartProps) => {
  // Filter out categories with 0 amount
  const chartData = data.filter(item => item.totalAmount > 0);
  
  return (
    <div className="glass-card p-5 rounded-xl shadow-sm h-[400px]">
      <h2 className="text-lg font-medium mb-4">
        {type === 'income' ? 'Income' : 'Expense'} by Category
      </h2>
      
      {chartData.length === 0 ? (
        <div className="h-[90%] flex items-center justify-center">
          <p className="text-muted-foreground">No data available</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="totalAmount"
              nameKey="category"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
