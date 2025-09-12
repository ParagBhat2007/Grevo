import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MoistureChart } from './widgets/MoistureChart';
import { 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  Square,
  Droplets,
  Scissors,
  GamepadIcon
} from 'lucide-react';

export const Controls = () => {
  const [lastCommand, setLastCommand] = useState<string>('');
  const { toast } = useToast();

  const sendCommand = (command: string, label: string) => {
    setLastCommand(command);
    toast({
      title: "Command Sent",
      description: `${label} command sent to AgriBot`,
      duration: 2000,
    });
    
    // Here you would normally send the command to your backend/Raspberry Pi
    console.log(`Sending command: ${command}`);
  };

  const movementControls = [
    { label: '↑ Forward', command: 'FORWARD', icon: ArrowUp, position: 'col-start-2' },
    { label: '← Left', command: 'LEFT', icon: ArrowLeft, position: 'col-start-1 row-start-2' },
    { label: 'STOP', command: 'STOP', icon: Square, position: 'col-start-2 row-start-2', variant: 'destructive' },
    { label: '→ Right', command: 'RIGHT', icon: ArrowRight, position: 'col-start-3 row-start-2' },
    { label: '↓ Backward', command: 'BACKWARD', icon: ArrowDown, position: 'col-start-2 row-start-3' },
  ];

  const actionControls = [
    { label: 'Water Plants', command: 'WATER', icon: Droplets, color: 'accent' },
    { label: 'Weed Now', command: 'WEED', icon: Scissors, color: 'warning' },
  ];

  return (
    <div className="min-h-screen grid-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Robot Controls
          </h2>
          <p className="text-xl text-muted-foreground">
            Direct control of your AgriBot movements and actions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Movement Controls */}
          <Card className="glass glass-hover p-6 animate-scale-in">
            <div className="flex items-center gap-2 mb-6">
              <GamepadIcon className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Movement Controls</h3>
            </div>
            
            <div className="grid grid-cols-3 grid-rows-3 gap-3 max-w-xs mx-auto">
              {movementControls.map((control) => {
                const Icon = control.icon;
                return (
                  <Button
                    key={control.command}
                    onClick={() => sendCommand(control.command, control.label)}
                    className={`
                      glass glass-hover h-16 w-16 p-0 ${control.position}
                      ${control.variant === 'destructive' 
                        ? 'bg-destructive/20 hover:bg-destructive/30 text-destructive border-destructive/30' 
                        : 'bg-primary/20 hover:bg-primary/30 text-primary border-primary/30'
                      }
                      transition-smooth hover:scale-105 active:scale-95
                    `}
                  >
                    <Icon className="h-6 w-6" />
                  </Button>
                );
              })}
            </div>
            
            {lastCommand && (
              <div className="mt-4 text-center">
                <Badge className="glass bg-accent/20 text-accent border-accent/30">
                  Last: {lastCommand}
                </Badge>
              </div>
            )}
          </Card>

          {/* Action Controls */}
          <Card className="glass glass-hover p-6 animate-scale-in">
            <h3 className="text-xl font-semibold mb-6">Actions</h3>
            
            <div className="space-y-4">
              {actionControls.map((control) => {
                const Icon = control.icon;
                return (
                  <Button
                    key={control.command}
                    onClick={() => sendCommand(control.command, control.label)}
                    className={`
                      glass glass-hover w-full h-16 text-lg font-medium
                      ${control.color === 'accent' 
                        ? 'bg-accent/20 hover:bg-accent/30 text-accent border-accent/30' 
                        : 'bg-warning/20 hover:bg-warning/30 text-warning border-warning/30'
                      }
                      transition-smooth hover:scale-105 active:scale-95
                    `}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {control.label}
                  </Button>
                );
              })}
            </div>
            
            <div className="mt-6 p-4 bg-muted/10 rounded-lg border border-muted/20">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Action Status</h4>
              <div className="flex gap-2 flex-wrap">
                <Badge className="glass bg-primary/20 text-primary border-primary/30">
                  Motor: Active
                </Badge>
                <Badge className="glass bg-muted/20 text-muted-foreground border-muted/30">
                  Pump: Standby
                </Badge>
                <Badge className="glass bg-muted/20 text-muted-foreground border-muted/30">
                  Weeder: Standby
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Moisture History Chart */}
        <div className="mt-8">
          <MoistureChart />
        </div>
      </div>
    </div>
  );
};