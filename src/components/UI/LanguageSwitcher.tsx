
import { useState } from 'react';
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
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  
  const changeLanguage = (newLang: 'en' | 'pt-BR') => {
    if (newLang !== language) {
      setLanguage(newLang);
      toast({
        title: newLang === 'en' ? 'Language changed' : 'Idioma alterado',
        description: newLang === 'en' ? 'English is now active' : 'Português agora está ativo',
        duration: 2000,
      });
    }
    setIsOpen(false);
  };
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <GlobeIcon className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary" 
            style={{ display: language === 'pt-BR' ? 'block' : 'none' }}/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')}
          className={language === 'en' ? 'bg-secondary' : ''}
        >
          🇺🇸 English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('pt-BR')}
          className={language === 'pt-BR' ? 'bg-secondary' : ''}
        >
          🇧🇷 Português
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
