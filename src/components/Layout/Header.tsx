
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { SearchIcon, BellIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LanguageSwitcher } from '@/components/UI/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [title, setTitle] = useState('Dashboard');
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();
  const { toast } = useToast();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Update search query from URL when on transactions page
    if (location.pathname === '/transactions') {
      const searchParam = searchParams.get('search');
      if (searchParam) {
        setSearchQuery(searchParam);
      }
    } else {
      // Reset search query when not on transactions page
      setSearchQuery('');
    }
  }, [location.pathname, searchParams]);
  
  useEffect(() => {
    switch (location.pathname) {
      case '/':
      case '/dashboard':
        setTitle(t('dashboard.title'));
        break;
      case '/transactions':
        setTitle(t('transactions.title'));
        break;
      case '/analytics':
        setTitle(t('analytics.title'));
        break;
      default:
        setTitle(t('app.title'));
    }
  }, [location.pathname, t]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      navigate(`/transactions?search=${encodeURIComponent(searchQuery)}`);
      toast({
        title: t('Searching'),
        description: `"${searchQuery}"`,
        duration: 2000,
      });
    }
  };
  
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
          <form onSubmit={handleSearch} className="relative hidden md:flex items-center">
            <SearchIcon className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('header.search')}
              className="w-64 pl-8 rounded-full bg-background"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-muted-foreground hover:text-foreground"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </form>
          
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
