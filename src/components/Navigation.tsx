import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  LayoutDashboard, 
  Gamepad2, 
  ScrollText, 
  Menu,
  X,
  Leaf,
  CreditCard
} from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { id: 'controls', label: t('nav.controls'), icon: Gamepad2 },
    { id: 'logs', label: t('nav.logs'), icon: ScrollText },
    { id: 'subscription', label: t('nav.subscription'), icon: CreditCard },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-muted/20 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Grevo
              </span>
              <Badge className="glass bg-primary/20 text-primary border-primary/30 text-xs ml-2">
                v2.1
              </Badge>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <Button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    className={`glass glass-hover transition-smooth animate-fade-in ${
                      isActive
                        ? 'bg-primary/20 text-primary border-primary/30 glow-primary widget-glow'
                        : 'bg-muted/10 text-muted-foreground border-muted/20 hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
              <div className="flex items-center gap-2">
                <LanguageSelector />
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              onClick={toggleMobileMenu}
              className="md:hidden glass glass-hover bg-muted/10 text-muted-foreground border-muted/20"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm">
          <div className="fixed top-16 left-0 right-0 glass border-b border-muted/20 p-4">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <Button
                      key={item.id}
                      onClick={() => {
                        onSectionChange(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full justify-start glass glass-hover transition-smooth animate-fade-in ${
                        isActive
                          ? 'bg-primary/20 text-primary border-primary/30 glow-primary widget-glow'
                          : 'bg-muted/10 text-muted-foreground border-muted/20 hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Button>
                  );
                })}
                <div className="flex items-center gap-2 mt-4">
                  <LanguageSelector />
                  <ThemeToggle />
                </div>
              </div>
          </div>
        </div>
      )}
    </>
  );
};