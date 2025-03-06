
import { Transaction, TransactionType, TransactionCategory } from './types';

// Helper function to create a random date within the last 30 days
const getRandomRecentDate = (): Date => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  return new Date(now.setDate(now.getDate() - daysAgo));
};

// Helper function to create a random amount within a range
const getRandomAmount = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to get a random transaction type with weighted probability
const getRandomType = (): TransactionType => {
  return Math.random() > 0.4 ? 'expense' : 'income';
};

// Helper function to get a random category based on transaction type
const getRandomCategory = (type: TransactionType): TransactionCategory => {
  const incomeCategories: TransactionCategory[] = ['salary', 'gift', 'investments', 'other'];
  const expenseCategories: TransactionCategory[] = [
    'food', 'transport', 'utilities', 'entertainment', 
    'housing', 'healthcare', 'personal', 'education', 'other'
  ];
  
  const categories = type === 'income' ? incomeCategories : expenseCategories;
  return categories[Math.floor(Math.random() * categories.length)];
};

// Helper function to generate a description based on category
const getDescriptionForCategory = (category: TransactionCategory): string => {
  const descriptions: Record<TransactionCategory, string[]> = {
    food: ['Grocery shopping', 'Restaurant dinner', 'Coffee', 'Take-out lunch'],
    transport: ['Gas', 'Uber ride', 'Bus ticket', 'Car maintenance'],
    utilities: ['Electric bill', 'Water bill', 'Internet bill', 'Phone bill'],
    entertainment: ['Movie tickets', 'Streaming subscription', 'Concert tickets', 'Game purchase'],
    housing: ['Rent payment', 'Mortgage payment', 'Home repair', 'Furniture'],
    healthcare: ['Doctor visit', 'Medication', 'Health insurance', 'Gym membership'],
    personal: ['Clothes shopping', 'Haircut', 'Cosmetics', 'Personal care'],
    education: ['Tuition payment', 'Books', 'Online course', 'Workshop fee'],
    investments: ['Stock purchase', 'Mutual fund', 'Crypto investment', 'Retirement contribution'],
    salary: ['Monthly salary', 'Bonus payment', 'Overtime pay', 'Commission'],
    gift: ['Birthday gift', 'Holiday gift', 'Gift from family', 'Cash gift'],
    other: ['Miscellaneous expense', 'Unexpected cost', 'Other payment', 'Subscription']
  };

  const options = descriptions[category];
  return options[Math.floor(Math.random() * options.length)];
};

// Generate a list of 100 mock transactions
export const generateMockTransactions = (count: number = 100): Transaction[] => {
  return Array.from({ length: count }, (_, i) => {
    const type = getRandomType();
    const category = getRandomCategory(type);
    const createdBy: 'user' | 'whatsapp' | 'ai' = 
      Math.random() > 0.7 ? 'whatsapp' : Math.random() > 0.5 ? 'ai' : 'user';
    
    return {
      id: `trans-${i + 1}`,
      type,
      amount: getRandomAmount(type === 'income' ? 1000 : 10, type === 'income' ? 5000 : 1000),
      category,
      description: getDescriptionForCategory(category),
      date: getRandomRecentDate(),
      createdBy
    };
  });
};

// Initial transactions
export const mockTransactions = generateMockTransactions();

// Sample WhatsApp messages related to finance
export const whatsappMessages = [
  { text: "Spent $45 on groceries today", sender: "user", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  { text: "Got it! I've recorded a $45 expense for groceries.", sender: "bot", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000) },
  { text: "Received my salary of $3200", sender: "user", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { text: "Great! I've added $3200 income as salary. Your balance is now $3,780.", sender: "bot", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000) },
  { text: "Paid $120 for electricity bill", sender: "user", timestamp: new Date(Date.now() - 1000 * 60 * 30) },
  { text: "I've recorded a $120 expense for utilities (electricity).", sender: "bot", timestamp: new Date(Date.now() - 1000 * 60 * 30 + 1000) },
  { text: "What's my current balance?", sender: "user", timestamp: new Date(Date.now() - 1000 * 60 * 5) },
  { text: "Your current balance is $3,660. You have $3,500 in income and $840 in expenses this month.", sender: "bot", timestamp: new Date(Date.now() - 1000 * 60 * 5 + 1000) }
];

// Sample cars data (since the prompt mentioned 50 cars)
export const carModels = [
  "Toyota Camry", "Honda Civic", "Ford F-150", "Chevrolet Silverado", "Tesla Model 3", 
  "Nissan Altima", "BMW 3 Series", "Mercedes-Benz C-Class", "Audi A4", "Lexus RX", 
  "Hyundai Sonata", "Kia Optima", "Volkswagen Jetta", "Subaru Outback", "Mazda CX-5",
  "Jeep Wrangler", "Chrysler Pacifica", "Dodge Charger", "RAM 1500", "GMC Sierra",
  "Buick Enclave", "Cadillac XT5", "Lincoln Navigator", "Infiniti Q50", "Acura MDX",
  "Volvo XC90", "Jaguar F-Pace", "Land Rover Range Rover", "Porsche 911", "Ferrari 488",
  "Lamborghini Huracan", "Maserati Ghibli", "Alfa Romeo Giulia", "Fiat 500", "Mini Cooper",
  "Smart ForTwo", "Bentley Continental", "Rolls-Royce Ghost", "Aston Martin DB11", "McLaren 720S",
  "Bugatti Chiron", "Koenigsegg Jesko", "Pagani Huayra", "Rimac C_Two", "Lotus Evija",
  "Polestar 2", "Rivian R1T", "Lucid Air", "Fisker Ocean", "Genesis G80"
];
