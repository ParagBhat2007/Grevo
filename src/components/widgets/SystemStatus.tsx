import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Settings, Zap, Droplets, Scissors } from 'lucide-react';

interface SystemStatusProps {
  status: {
    motor: boolean;
    pump: boolean;
    weeder: boolean;
  };
}

export const SystemStatus = ({ status }: SystemStatusProps) => {
  const { t } = useLanguage();
  const systems = [
    {
      label: t('widgets.system.motor'),
      active: status.motor,
      icon: Zap,
      color: 'primary'
    },
    {
      label: t('widgets.system.pump'),
      active: status.pump,
      icon: Droplets,
      color: 'accent'
    },
    {
      label: t('widgets.system.weeder'),
      active: status.weeder,
      icon: Scissors,
      color: 'warning'
    }
  ];

  return (
    <Card className="glass glass-hover widget-glow animate-fade-in p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{t('widgets.system.title')}</h3>
        <Settings className="h-5 w-5 text-muted-foreground animate-bounce-subtle" />
      </div>
      
      <div className="space-y-3">
        {systems.map((system) => {
          const Icon = system.icon;
          return (
            <div key={system.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${
                  system.active 
                    ? `text-${system.color}` 
                    : 'text-muted-foreground'
                }`} />
                <span className="text-sm font-medium">{system.label}</span>
              </div>
              
                <Badge 
                  className={`glass text-xs ${
                    system.active
                      ? `bg-${system.color}/20 text-${system.color} border-${system.color}/30`
                      : 'bg-muted/20 text-muted-foreground border-muted/30'
                  }`}
                >
                  {system.active ? t('widgets.system.on') : t('widgets.system.off')}
                </Badge>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-3 border-t border-muted/30">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{t('widgets.system.activeSystems')}</span>
          <span className="font-medium text-primary">
            {Object.values(status).filter(Boolean).length}/3
          </span>
        </div>
      </div>
    </Card>
  );
};