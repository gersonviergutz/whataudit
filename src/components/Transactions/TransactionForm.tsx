
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TransactionType, TransactionCategory } from '@/lib/types';
import { format } from 'date-fns';
import { CalendarIcon, PlusIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TransactionFormProps {
  onAddTransaction: (transaction: {
    type: TransactionType;
    amount: number;
    category: TransactionCategory;
    description: string;
    date: Date;
  }) => void;
  onCancel: () => void;
}

export const TransactionForm = ({
  onAddTransaction,
  onCancel,
}: TransactionFormProps) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<TransactionCategory>('food');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  
  const incomeCategories: TransactionCategory[] = [
    'salary', 'investments', 'gift', 'other'
  ];
  
  const expenseCategories: TransactionCategory[] = [
    'food', 'transport', 'utilities', 'entertainment',
    'housing', 'healthcare', 'personal', 'education', 'other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!amount || Number(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (!description) {
      toast.error('Please enter a description');
      return;
    }
    
    onAddTransaction({
      type,
      amount: Number(amount),
      category,
      description,
      date
    });
    
    toast.success(`${type === 'income' ? 'Income' : 'Expense'} added successfully`);
    
    // Reset form
    setType('expense');
    setAmount('');
    setCategory('food');
    setDescription('');
    setDate(new Date());
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Transaction Type</Label>
        <RadioGroup 
          value={type} 
          onValueChange={(value) => {
            setType(value as TransactionType);
            setCategory(value === 'income' ? 'salary' : 'food');
          }}
          className="flex"
        >
          <div className="flex items-center space-x-2 mr-4">
            <RadioGroupItem value="expense" id="expense" />
            <Label htmlFor="expense" className="cursor-pointer">Expense</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="income" id="income" />
            <Label htmlFor="income" className="cursor-pointer">Income</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="pl-8"
            step="0.01"
            min="0"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select 
          value={category} 
          onValueChange={(value) => setCategory(value as TransactionCategory)}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {(type === 'income' ? incomeCategories : expenseCategories).map((cat) => (
              <SelectItem key={cat} value={cat}>
                <span className="capitalize">{cat}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 pointer-events-auto">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              initialFocus
              className="p-3"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="flex gap-2 pt-2">
        <Button type="submit" className="flex-1">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add {type === 'income' ? 'Income' : 'Expense'}
        </Button>
        
        <Button type="button" variant="outline" onClick={onCancel}>
          <XIcon className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </div>
    </form>
  );
};
