
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'pt-BR';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  'en': {
    // General
    'app.title': 'WhatsApp Finance',
    'app.language': 'Language',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.transactions': 'Transactions',
    'nav.analytics': 'Analytics',
    'nav.whatsapp': 'WhatsApp',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'finance.income': 'Total Income',
    'finance.expenses': 'Total Expenses',
    'finance.balance': 'Current Balance',
    'finance.from_last_month': 'from last month',
    'transactions.recent': 'Recent Transactions',
    'transactions.view_all': 'View all',
    'transactions.no_transactions': 'No transactions yet',
    'transactions.add': 'Add Transaction',
    
    // Transactions
    'transactions.title': 'All Transactions',
    'transactions.search': 'Search transactions...',
    'transactions.filter.all': 'All',
    'transactions.filter.income': 'Income',
    'transactions.filter.expenses': 'Expenses',
    'transactions.filter.date': 'Date',
    'transactions.filter.amount': 'Amount',
    'transactions.no_results': 'No transactions found',
    'transactions.clear_search': 'Clear search',
    
    // Transaction Form
    'transaction.form.title': 'Add Transaction',
    'transaction.form.type': 'Transaction Type',
    'transaction.form.expense': 'Expense',
    'transaction.form.income': 'Income',
    'transaction.form.amount': 'Amount',
    'transaction.form.category': 'Category',
    'transaction.form.description': 'Description',
    'transaction.form.date': 'Date',
    'transaction.form.pick_date': 'Pick a date',
    'transaction.form.cancel': 'Cancel',
    
    // Analytics
    'analytics.title': 'Financial Analytics',
    'analytics.tab.overview': 'Overview',
    'analytics.tab.income': 'Income',
    'analytics.tab.expenses': 'Expenses',
    
    // Header
    'header.search': 'Search...',
    'header.connect': 'Connect WhatsApp',
  },
  'pt-BR': {
    // General
    'app.title': 'Finanças WhatsApp',
    'app.language': 'Idioma',
    
    // Navigation
    'nav.dashboard': 'Painel',
    'nav.transactions': 'Transações',
    'nav.analytics': 'Análises',
    'nav.whatsapp': 'WhatsApp',
    
    // Dashboard
    'dashboard.title': 'Painel',
    'finance.income': 'Renda Total',
    'finance.expenses': 'Despesas Totais',
    'finance.balance': 'Saldo Atual',
    'finance.from_last_month': 'do mês passado',
    'transactions.recent': 'Transações Recentes',
    'transactions.view_all': 'Ver todas',
    'transactions.no_transactions': 'Sem transações ainda',
    'transactions.add': 'Adicionar Transação',
    
    // Transactions
    'transactions.title': 'Todas as Transações',
    'transactions.search': 'Buscar transações...',
    'transactions.filter.all': 'Todas',
    'transactions.filter.income': 'Receitas',
    'transactions.filter.expenses': 'Despesas',
    'transactions.filter.date': 'Data',
    'transactions.filter.amount': 'Valor',
    'transactions.no_results': 'Nenhuma transação encontrada',
    'transactions.clear_search': 'Limpar busca',
    
    // Transaction Form
    'transaction.form.title': 'Adicionar Transação',
    'transaction.form.type': 'Tipo de Transação',
    'transaction.form.expense': 'Despesa',
    'transaction.form.income': 'Receita',
    'transaction.form.amount': 'Valor',
    'transaction.form.category': 'Categoria',
    'transaction.form.description': 'Descrição',
    'transaction.form.date': 'Data',
    'transaction.form.pick_date': 'Escolher uma data',
    'transaction.form.cancel': 'Cancelar',
    
    // Analytics
    'analytics.title': 'Análise Financeira',
    'analytics.tab.overview': 'Visão Geral',
    'analytics.tab.income': 'Receitas',
    'analytics.tab.expenses': 'Despesas',
    
    // Header
    'header.search': 'Buscar...',
    'header.connect': 'Conectar WhatsApp',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const savedLanguage = localStorage.getItem('language');
      return (savedLanguage === 'pt-BR' || savedLanguage === 'en') ? savedLanguage as Language : 'en';
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    console.log("Changing language to:", lang);
    setLanguageState(lang);
    try {
      localStorage.setItem('language', lang);
    } catch (error) {
      console.error("Error saving language to localStorage:", error);
    }
  };

  const t = (key: string): string => {
    if (!translations[language] || !translations[language][key]) {
      console.warn(`Translation missing for key: ${key} in language: ${language}`);
      return key;
    }
    return translations[language][key];
  };

  useEffect(() => {
    document.documentElement.lang = language;
    console.log("Language set to:", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
