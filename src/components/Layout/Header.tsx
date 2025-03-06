
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchIcon, BellIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LanguageSwitcher } from '@/components/UI/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export const Header = () => {
  const location = useLocation();
  const [title, setTitle] = useState('Dashboard');
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    switch (location.pathname) {
      case '/':
      case '/dashboard':
        setTitle(t('dashboard.title'));
        break;
      case '/transactions':
        setTitle(t('nav.transactions'));
        break;
      case '/analytics':
        setTitle(t('nav.analytics'));
        break;
      default:
        setTitle(t('app.title'));
    }
  }, [location.pathname, t]);
  
  return (
    <header 
      className={`sticky top-0 z-30 w-full transition-all duration-300 backdrop-blur-sm ${
        isScrolled ? 'border-b shadow-sm bg-background/80' : 'bg-background/50'
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight transition-all duration-300">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <SearchIcon className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('header.search')}
              className="w-64 pl-8 rounded-full bg-background"
            />
          </div>
          
          <LanguageSwitcher />
          
          <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive animate-pulse-soft" />
          </Button>
          
          <Button
            variant="default"
            size="sm"
            className="rounded-full px-4"
          >
            {t('header.connect')}
          </Button>
        </div>
      </div>
    </header>
  );
};
