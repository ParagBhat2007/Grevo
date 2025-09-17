import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Radar, AlertCircle, CheckCircle } from 'lucide-react';

interface ObstacleDetectionProps {
  distance: number;
}

export const ObstacleDetection = ({ distance }: ObstacleDetectionProps) => {
  const threshold = 20;
  const isObstacleDetected = distance < threshold;
  const safetyPercentage = Math.min((distance / 50) * 100, 100);

  return (
    <Card className="glass glass-hover widget-glow animate-fade-in p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Obstacle Detection</h3>
        <Radar className={`h-5 w-5 ${isObstacleDetected ? 'text-destructive animate-pulse' : 'text-primary'}`} />
      </div>
      
      <div className="space-y-4">
        <div className="text-center">
          <div className={`text-3xl font-bold animate-scale-in ${
            isObstacleDetected ? 'text-destructive animate-pulse' : 'text-primary'
          }`}>
            {distance.toFixed(3)}
          </div>
          <div className="text-sm text-muted-foreground">cm</div>
        </div>
        
        {/* Distance Bar */}
        <div className="relative h-4 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${
              isObstacleDetected ? 'bg-destructive' : 'bg-primary'
            }`}
            style={{ width: `${Math.min(safetyPercentage, 100)}%` }}
          />
          {/* Threshold marker */}
          <div 
            className="absolute top-0 w-0.5 h-full bg-warning"
            style={{ left: `${(threshold / 50) * 100}%` }}
          />
        </div>
        
        <div className="text-center">
          <Badge 
            className={`glass ${
              isObstacleDetected 
                ? 'bg-destructive/20 text-destructive border-destructive/30 animate-pulse' 
                : 'bg-primary/20 text-primary border-primary/30'
            }`}
          >
            {isObstacleDetected ? (
              <>
                <AlertCircle className="h-3 w-3 mr-1" />
                Obstacle Detected!
              </>
            ) : (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Path Clear
              </>
            )}
          </Badge>
        </div>
        
        {isObstacleDetected && (
          <div className="text-center text-xs text-destructive">
            Robot stopped for safety
          </div>
        )}
      </div>
    </Card>
  );
};