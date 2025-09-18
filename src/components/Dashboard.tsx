import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SoilMoistureGauge } from './widgets/SoilMoistureGauge';
import { WaterTankLevel } from './widgets/WaterTankLevel';
import { ObstacleDetection } from './widgets/ObstacleDetection';
import { SystemStatus } from './widgets/SystemStatus';
import { useLanguage } from '@/contexts/LanguageContext';
import { Wifi, Activity } from 'lucide-react';

export const Dashboard = () => {
  const { t } = useLanguage();
  const [moistureValue, setMoistureValue] = useState(650);
  const [waterLevel, setWaterLevel] = useState<'OK' | 'EMPTY'>('OK');
  const [obstacleDistance, setObstacleDistance] = useState(45);
  const [systemStatus, setSystemStatus] = useState({
    motor: true,
    pump: false,
    weeder: false
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMoistureValue(prev => Math.max(200, Math.min(1023, prev + Math.random() * 40 - 20)));
      setObstacleDistance(prev => Math.max(5, Math.min(100, prev + Math.random() * 10 - 5)));
      
      // Randomly update system status
      if (Math.random() < 0.1) {
        setSystemStatus(prev => ({
          ...prev,
          pump: Math.random() > 0.7,
          weeder: Math.random() > 0.8
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen grid-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            {t('dashboard.title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {t('dashboard.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge className="glass glass-hover bg-primary/20 text-primary border-primary/30 px-4 py-2 animate-pulse-glow">
              <Wifi className="h-4 w-4 mr-2" />
              {t('dashboard.status')}
            </Badge>
            <Badge className="glass glass-hover bg-accent/20 text-accent border-accent/30 px-4 py-2">
              <Activity className="h-4 w-4 mr-2" />
              {t('dashboard.systemActive')}
            </Badge>
          </div>
        </div>

        {/* Dashboard Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-scale-in">
          <div className="md:col-span-1">
            <SoilMoistureGauge value={moistureValue} />
          </div>
          
          <div className="md:col-span-1">
            <WaterTankLevel level={waterLevel} />
          </div>
          
          <div className="md:col-span-1">
            <ObstacleDetection distance={obstacleDistance} />
          </div>
          
          <div className="md:col-span-1">
            <SystemStatus status={systemStatus} />
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="glass glass-hover p-6 text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{t('dashboard.plantsWatered')}</h3>
            <p className="text-3xl font-bold text-primary">24</p>
          </Card>
          
          <Card className="glass glass-hover p-6 text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{t('dashboard.weedsRemoved')}</h3>
            <p className="text-3xl font-bold text-accent">8</p>
          </Card>
          
          <Card className="glass glass-hover p-6 text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{t('dashboard.hoursActive')}</h3>
            <p className="text-3xl font-bold text-warning">6.5</p>
          </Card>
        </div>
      </div>
    </div>
  );
};