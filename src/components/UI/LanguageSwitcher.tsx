
import { Button } from '@/components/ui/button';
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
    <div className="flex items-center space-x-1">
      <Button 
        variant={language === 'en' ? 'secondary' : 'ghost'} 
        size="icon" 
        onClick={() => handleLanguageChange('en')}
        className="relative"
        aria-label="Switch to English"
      >
        <span className="text-lg">🇺🇸</span>
      </Button>
      
      <Button 
        variant={language === 'pt-BR' ? 'secondary' : 'ghost'} 
        size="icon" 
        onClick={() => handleLanguageChange('pt-BR')}
        className="relative"
        aria-label="Switch to Portuguese"
      >
        <span className="text-lg">🇧🇷</span>
      </Button>
    </div>
  );
};
