import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Check, 
  Zap, 
  Shield, 
  Smartphone, 
  BarChart3, 
  Cloud, 
  Headphones,
  Settings,
  Leaf,
  Bot
} from 'lucide-react';

export const Subscription = () => {
  const { t } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const baseFeatures = [
    { icon: <Smartphone className="h-4 w-4" />, text: 'Mobile App Access' },
    { icon: <BarChart3 className="h-4 w-4" />, text: 'Basic Analytics' },
    { icon: <Settings className="h-4 w-4" />, text: 'Remote Control' },
    { icon: <Leaf className="h-4 w-4" />, text: 'Soil Monitoring' },
    { icon: <Shield className="h-4 w-4" />, text: 'Basic Security' },
  ];

  const premiumFeatures = [
    { icon: <Bot className="h-4 w-4" />, text: 'AI-Powered Insights' },
    { icon: <Cloud className="h-4 w-4" />, text: 'Cloud Storage (100GB)' },
    { icon: <BarChart3 className="h-4 w-4" />, text: 'Advanced Analytics' },
    { icon: <Zap className="h-4 w-4" />, text: 'Automated Scheduling' },
    { icon: <Headphones className="h-4 w-4" />, text: 'Priority Support' },
    { icon: <Shield className="h-4 w-4" />, text: 'Advanced Security' },
    { icon: <Settings className="h-4 w-4" />, text: 'Custom Integrations' },
    { icon: <Leaf className="h-4 w-4" />, text: 'Weather Predictions' },
  ];

  const pricing = {
    base: {
      monthly: 1499,
      yearly: 15999,
    },
    premium: {
      monthly: 2499,
      yearly: 27999,
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-nature bg-clip-text text-transparent">
          {t('subscription.title')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('subscription.subtitle')}
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <Tabs value={billingCycle} onValueChange={(value: 'monthly' | 'yearly') => setBillingCycle(value)}>
          <TabsList className="grid w-full grid-cols-2 glass">
            <TabsTrigger value="monthly" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              Monthly
            </TabsTrigger>
            <TabsTrigger value="yearly" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              Yearly (Save 20%)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Base Plan */}
              <Card className="glass glass-hover transition-smooth">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Leaf className="h-6 w-6 text-primary" />
                    {t('subscription.base')}
                  </CardTitle>
                  <CardDescription>Perfect for small farms</CardDescription>
                  <div className="text-3xl font-bold text-primary">
                    ₹{pricing.base.monthly}
                    <span className="text-sm font-normal text-muted-foreground">/{t('subscription.month')}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {baseFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="text-primary">{feature.icon}</div>
                        <span className="text-sm">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    {t('subscription.choose')}
                  </Button>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="glass glass-hover transition-smooth border-primary/30 relative">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-nature text-white">
                  {t('subscription.popular')}
                </Badge>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Zap className="h-6 w-6 text-accent" />
                    {t('subscription.premium')}
                  </CardTitle>
                  <CardDescription>For professional farming operations</CardDescription>
                  <div className="text-3xl font-bold text-accent">
                    ₹{pricing.premium.monthly}
                    <span className="text-sm font-normal text-muted-foreground">/{t('subscription.month')}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {premiumFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="text-accent">{feature.icon}</div>
                        <span className="text-sm">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-accent hover:opacity-90">
                    {t('subscription.choose')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="yearly" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Base Plan Yearly */}
              <Card className="glass glass-hover transition-smooth">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Leaf className="h-6 w-6 text-primary" />
                    {t('subscription.base')}
                  </CardTitle>
                  <CardDescription>Perfect for small farms</CardDescription>
                  <div className="text-3xl font-bold text-primary">
                    ₹{pricing.base.yearly}
                    <span className="text-sm font-normal text-muted-foreground">/{t('subscription.year')}</span>
                  </div>
                  <div className="text-sm text-green-600">Save ₹2,989 per year!</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {baseFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="text-primary">{feature.icon}</div>
                        <span className="text-sm">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    {t('subscription.choose')}
                  </Button>
                </CardContent>
              </Card>

              {/* Premium Plan Yearly */}
              <Card className="glass glass-hover transition-smooth border-primary/30 relative">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-nature text-white">
                  {t('subscription.popular')}
                </Badge>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Zap className="h-6 w-6 text-accent" />
                    {t('subscription.premium')}
                  </CardTitle>
                  <CardDescription>For professional farming operations</CardDescription>
                  <div className="text-3xl font-bold text-accent">
                    ₹{pricing.premium.yearly}
                    <span className="text-sm font-normal text-muted-foreground">/{t('subscription.year')}</span>
                  </div>
                  <div className="text-sm text-green-600">Save ₹4,989 per year!</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {premiumFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="text-accent">{feature.icon}</div>
                        <span className="text-sm">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-accent hover:opacity-90">
                    {t('subscription.choose')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          All plans include 30-day money-back guarantee
        </p>
      </div>
    </div>
  );
};