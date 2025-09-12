import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Droplet, AlertTriangle } from 'lucide-react';

interface WaterTankLevelProps {
  level: 'OK' | 'EMPTY';
}

export const WaterTankLevel = ({ level }: WaterTankLevelProps) => {
  const isOk = level === 'OK';
  const fillPercentage = isOk ? 75 : 10;

  return (
    <Card className="glass glass-hover p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Water Tank Level</h3>
        <Droplet className={`h-5 w-5 ${isOk ? 'text-accent' : 'text-destructive'}`} />
      </div>
      
      <div className="space-y-4">
        {/* Tank Visualization */}
        <div className="relative h-32 w-20 mx-auto border-2 border-muted rounded-b-lg rounded-t-sm">
          <div 
            className={`absolute bottom-0 left-0 right-0 rounded-b-lg transition-all duration-1000 ${
              isOk ? 'bg-accent/40' : 'bg-destructive/40'
            }`}
            style={{ height: `${fillPercentage}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium">
              {fillPercentage}%
            </span>
          </div>
        </div>
        
        <div className="text-center">
          <Badge 
            className={`glass ${
              isOk 
                ? 'bg-accent/20 text-accent border-accent/30' 
                : 'bg-destructive/20 text-destructive border-destructive/30'
            }`}
          >
            {isOk ? (
              <>
                <Droplet className="h-3 w-3 mr-1" />
                Tank OK
              </>
            ) : (
              <>
                <AlertTriangle className="h-3 w-3 mr-1" />
                Tank Empty
              </>
            )}
          </Badge>
        </div>
        
        {!isOk && (
          <div className="text-center text-xs text-destructive animate-pulse">
            Refill required!
          </div>
        )}
      </div>
    </Card>
  );
};