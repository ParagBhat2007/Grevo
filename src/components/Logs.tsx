import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import { Terminal, Download, Trash2, Play } from 'lucide-react';

interface LogEntry {
  id: number;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

export const Logs = () => {
  const { t } = useLanguage();
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 1,
      timestamp: new Date().toLocaleTimeString(),
      level: 'success',
      message: t('logs.systemInit')
    },
    {
      id: 2,
      timestamp: new Date().toLocaleTimeString(),
      level: 'info',
      message: t('logs.connected')
    },
    {
      id: 3,
      timestamp: new Date().toLocaleTimeString(),
      level: 'info',
      message: t('logs.calibration')
    },
    {
      id: 4,
      timestamp: new Date().toLocaleTimeString(),
      level: 'warning',
      message: t('logs.obstacleDetected')
    },
    {
      id: 5,
      timestamp: new Date().toLocaleTimeString(),
      level: 'error',
      message: t('logs.tankEmpty')
    }
  ]);
  
  const [isLive, setIsLive] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const logIdCounter = useRef(6);

  const sampleMessages = [
    { level: 'info' as const, message: 'Moisture sensor reading: {}' },
    { level: 'info' as const, message: 'Motor status updated' },
    { level: 'success' as const, message: 'Watering cycle completed' },
    { level: 'warning' as const, message: 'Low battery warning: {}%' },
    { level: 'info' as const, message: 'GPS position updated' },
    { level: 'success' as const, message: 'Weed removal completed' },
    { level: 'info' as const, message: 'Temperature: {}°C, Humidity: {}%' },
  ];

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
      let message = randomMessage.message;
      
      // Replace placeholders with random values
      message = message.replace('{}', Math.floor(Math.random() * 100).toString());
      message = message.replace('{}', Math.floor(Math.random() * 100).toString());

      const newLog: LogEntry = {
        id: logIdCounter.current++,
        timestamp: new Date().toLocaleTimeString(),
        level: randomMessage.level,
        message
      };

      setLogs(prevLogs => {
        const updatedLogs = [...prevLogs, newLog];
        // Keep only last 50 logs
        return updatedLogs.slice(-50);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'success':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'info':
        return 'bg-accent/20 text-accent border-accent/30';
      case 'warning':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'error':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const exportLogs = () => {
    const logText = logs.map(log => 
      `[${log.timestamp}] ${log.level.toUpperCase()}: ${log.message}`
    ).join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agribot-logs-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen grid-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            {t('logs.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('logs.subtitle')}
          </p>
        </div>

        <Card className="glass glass-hover animate-scale-in">
          {/* Log Header */}
          <div className="flex items-center justify-between p-4 border-b border-muted/20">
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">{t('logs.systemLog')}</h3>
              <Badge className={`glass ${isLive ? 'bg-primary/20 text-primary border-primary/30 animate-pulse' : 'bg-muted/20 text-muted-foreground border-muted/30'}`}>
                {isLive ? t('logs.live') : t('logs.paused')}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsLive(!isLive)}
                size="sm"
                className={`glass glass-hover ${
                  isLive 
                    ? 'bg-warning/20 text-warning border-warning/30' 
                    : 'bg-primary/20 text-primary border-primary/30'
                }`}
              >
                <Play className="h-4 w-4 mr-1" />
                {isLive ? t('logs.pause') : t('logs.resume')}
              </Button>
              
              <Button
                onClick={exportLogs}
                size="sm"
                className="glass glass-hover bg-accent/20 text-accent border-accent/30"
              >
                <Download className="h-4 w-4 mr-1" />
                {t('logs.export')}
              </Button>
              
              <Button
                onClick={clearLogs}
                size="sm"
                className="glass glass-hover bg-destructive/20 text-destructive border-destructive/30"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                {t('logs.clear')}
              </Button>
            </div>
          </div>

          {/* Log Content */}
          <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
            <div className="space-y-2 font-mono text-sm">
              {logs.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  {t('logs.noLogs')}
                </div>
              ) : (
                logs.map((log) => (
                  <div 
                    key={log.id} 
                    className="flex items-start gap-3 p-2 rounded border border-muted/20 hover:bg-muted/5 transition-colors"
                  >
                    <span className="text-muted-foreground text-xs mt-0.5 w-20 flex-shrink-0">
                      {log.timestamp}
                    </span>
                    
                    <Badge className={`glass text-xs flex-shrink-0 ${getLevelColor(log.level)}`}>
                      {log.level.toUpperCase()}
                    </Badge>
                    
                    <span className="flex-1 break-all">
                      {log.message}
                    </span>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Log Footer */}
          <div className="flex items-center justify-between p-4 border-t border-muted/20 text-sm text-muted-foreground">
            <span>{logs.length} {t('logs.entries')}</span>
            <span>{t('logs.autoScroll')}</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
