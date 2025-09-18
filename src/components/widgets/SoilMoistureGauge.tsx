import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Droplets } from 'lucide-react';

interface SoilMoistureGaugeProps {
  value: number;
}

export const SoilMoistureGauge = ({ value }: SoilMoistureGaugeProps) => {
  const { t } = useLanguage();
  const percentage = (value / 1023) * 100;
  const getStatusColor = () => {
    if (percentage < 30) return 'text-destructive';
    if (percentage < 60) return 'text-warning';
    return 'text-primary';
  };

  const getStatusText = () => {
    if (percentage < 30) return t('widgets.soilMoisture.dry');
    if (percentage < 60) return t('widgets.soilMoisture.moderate');
    return t('widgets.soilMoisture.moist');
  };

  return (
    <Card className="glass glass-hover widget-glow animate-fade-in p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{t('widgets.soilMoisture.title')}</h3>
        <Droplets className={`h-5 w-5 ${getStatusColor()} animate-pulse`} />
      </div>
      
      <div className="space-y-4">
        <div className="text-center">
          <div className={`text-3xl font-bold ${getStatusColor()} animate-scale-in`}>
            {value.toFixed(3)}
          </div>
          <div className="text-sm text-muted-foreground">/1023</div>
        </div>
        
        {/* Circular Progress */}
        <div className="relative h-24 w-24 mx-auto">
          <svg className="h-24 w-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
              className={`transition-all duration-500 ${getStatusColor()}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {Math.round(percentage)}%
            </span>
          </div>
        </div>
        
        <div className="text-center">
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
      </div>
    </Card>
  );
};