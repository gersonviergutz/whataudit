
import { useLocation, Link } from 'react-router-dom';
import { 
  HomeIcon, 
  BarChart4Icon, 
  ListIcon, 
  MessageSquareIcon
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Navigation = () => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const isActive = (path: string) => {
    return location.pathname === path || 
      (path === '/dashboard' && location.pathname === '/');
  };
  
  const navItems = [
    { path: '/dashboard', label: t('nav.dashboard'), icon: HomeIcon },
    { path: '/transactions', label: t('nav.transactions'), icon: ListIcon },
    { path: '/analytics', label: t('nav.analytics'), icon: BarChart4Icon },
  ];
  
  return (
    <nav className="fixed left-0 bottom-0 w-full sm:w-16 sm:left-4 sm:top-1/2 sm:-translate.y-1/2 sm:h-auto z-40 sm:rounded-xl bg-white shadow-lg sm:shadow-xl border border-border backdrop-blur-sm sm:backdrop-blur-md transition-all duration-300">
      <div className="flex sm:flex-col justify-around items-center h-16 sm:h-auto sm:py-6 sm:gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`relative flex flex-col items-center justify-center p-2 sm:p-3 rounded-full sm:rounded-xl transition-all duration-300 ${
              isActive(item.path)
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {isActive(item.path) && (
              <span className="absolute inset-0 rounded-full sm:rounded-xl bg-primary/10 animate-pulse-soft" />
            )}
            <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-xs mt-1 sm:sr-only">{item.label}</span>
            
            {isActive(item.path) && (
              <span className="hidden sm:block absolute left-[-8px] w-1 h-8 rounded-full bg-primary" />
            )}
          </Link>
        ))}
        
        <Link
          to="/whatsapp"
          className="relative flex flex-col items-center justify-center p-2 sm:p-3 rounded-full sm:rounded-xl transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          <MessageSquareIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-xs mt-1 sm:sr-only">{t('nav.whatsapp')}</span>
        </Link>
      </div>
    </nav>
  );
};
