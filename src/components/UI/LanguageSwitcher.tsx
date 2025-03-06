
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { GlobeIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const { toast } = useToast();
  
  const handleLanguageChange = (newLang: 'en' | 'pt-BR') => {
    setLanguage(newLang);
    
    toast({
      title: newLang === 'en' ? 'Language changed' : 'Idioma alterado',
      description: newLang === 'en' ? 'English is now active' : 'Português agora está ativo',
      duration: 2000,
    });
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <GlobeIcon className="h-5 w-5" />
          {language === 'pt-BR' && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('en')}
          className={language === 'en' ? 'bg-secondary' : ''}
        >
          🇺🇸 English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('pt-BR')}
          className={language === 'pt-BR' ? 'bg-secondary' : ''}
        >
          🇧🇷 Português
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
