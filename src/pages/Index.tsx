import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Dashboard } from '@/components/Dashboard';
import { Controls } from '@/components/Controls';
import { Logs } from '@/components/Logs';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'controls':
        return <Controls />;
      case 'logs':
        return <Logs />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <main>
        {renderSection()}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-muted/20 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 AgriBot - Smart Farming Solutions
            </p>
            <div className="mt-2 text-xs text-muted-foreground/70">
              Powered by Raspberry Pi • Real-time IoT Dashboard
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
