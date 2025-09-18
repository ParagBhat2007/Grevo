import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp } from 'lucide-react';

interface MoistureData {
  time: string;
  moisture: number;
}

export const MoistureChart = () => {
  const { t } = useLanguage();
  const [data, setData] = useState<MoistureData[]>([]);

  useEffect(() => {
    // Initialize with some sample data
    const initialData: MoistureData[] = [];
    const now = new Date();
    
    for (let i = 19; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60000); // 1 minute intervals
      initialData.push({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        moisture: 400 + Math.random() * 400 + Math.sin(i * 0.3) * 100
      });
    }
    
    setData(initialData);

    // Add new data point every 2 seconds
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData];
        const now = new Date();
        
        // Remove oldest point if we have 20 points
        if (newData.length >= 20) {
          newData.shift();
        }
        
        // Add new point
        newData.push({
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          moisture: 400 + Math.random() * 400 + Math.sin(Date.now() * 0.001) * 100
        });
        
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass glass-hover p-6 animate-scale-in">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-accent" />
        <h3 className="text-xl font-semibold">{t('widgets.moisture.title')}</h3>
        <div className="ml-auto text-sm text-muted-foreground">
          {t('widgets.moisture.liveUpdates')}
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--muted))" 
              strokeOpacity={0.3}
            />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 1023]}
            />
            <Line 
              type="monotone" 
              dataKey="moisture" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: 'hsl(var(--accent))', fill: 'hsl(var(--accent))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex justify-between text-sm text-muted-foreground">
        <span>{t('widgets.moisture.range')}</span>
        <span>{t('widgets.moisture.current')}: {data[data.length - 1]?.moisture.toFixed(0) || 0}</span>
      </div>
    </Card>
  );
};