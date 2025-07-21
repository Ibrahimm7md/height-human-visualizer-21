import React from 'react';
import { Moon, Sun, Share2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const LanguageThemeToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const handleShare = async () => {
    try {
      await navigator.share({
        title: t('title'),
        text: t('subtitle'),
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success(language === 'ar' ? 'تم نسخ الرابط!' : 'Link copied!');
    }
  };

  return (
    <div className="fixed top-4 right-4 flex gap-2 z-10">
      {/* Language Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
            <Globe className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setLanguage('en')}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage('ar')}>
            العربية
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Toggle */}
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleTheme}
        className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80"
      >
        {theme === 'light' ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Button>

      {/* Share Button */}
      <Button 
        variant="outline" 
        size="icon" 
        onClick={handleShare}
        className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80"
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
};