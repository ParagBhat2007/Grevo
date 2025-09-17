import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'mr' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.controls': 'Controls',
    'nav.logs': 'Logs',
    'nav.subscription': 'Subscription',
    'dashboard.title': 'Grevo Control Panel',
    'dashboard.subtitle': 'Monitor and Control Your Smart Farming Robot',
    'dashboard.status': 'Raspberry Pi Connected',
    'dashboard.soilMoisture': 'Soil Moisture',
    'dashboard.waterTank': 'Water Tank Level',
    'dashboard.obstacle': 'Obstacle Detection',
    'dashboard.systemStatus': 'System Status',
    'controls.movement': 'Movement Controls',
    'controls.actions': 'Actions',
    'controls.forward': '↑ Forward',
    'controls.left': '← Left',
    'controls.stop': 'STOP',
    'controls.right': '→ Right',
    'controls.backward': '↓ Backward',
    'controls.water': 'Water Plants',
    'controls.weed': 'Weed Now',
    'subscription.title': 'Choose Your Plan',
    'subscription.subtitle': 'Enhance your farming with our premium features',
    'subscription.base': 'Base Model',
    'subscription.premium': 'Premium Model',
    'subscription.month': 'month',
    'subscription.year': 'year',
    'subscription.popular': 'Most Popular',
    'subscription.choose': 'Choose Plan',
    'footer.text': '© 2025 Grevo - Made by Parag Bhat',
    'footer.subtitle': 'Powered by Raspberry Pi • Real-time IoT Dashboard'
  },
  hi: {
    'nav.dashboard': 'डैशबोर्ड',
    'nav.controls': 'नियंत्रण',
    'nav.logs': 'लॉग्स',
    'nav.subscription': 'सब्सक्रिप्शन',
    'dashboard.title': 'ग्रेवो नियंत्रण पैनल',
    'dashboard.subtitle': 'अपने स्मार्ट कृषि रोबोट की निगरानी और नियंत्रण करें',
    'dashboard.status': 'रास्पबेरी पाई कनेक्टेड',
    'dashboard.soilMoisture': 'मिट्टी की नमी',
    'dashboard.waterTank': 'पानी की टंकी का स्तर',
    'dashboard.obstacle': 'बाधा का पता लगाना',
    'dashboard.systemStatus': 'सिस्टम की स्थिति',
    'controls.movement': 'गति नियंत्रण',
    'controls.actions': 'क्रियाएं',
    'controls.forward': '↑ आगे',
    'controls.left': '← बाएं',
    'controls.stop': 'रुकें',
    'controls.right': '→ दाएं',
    'controls.backward': '↓ पीछे',
    'controls.water': 'पौधों को पानी दें',
    'controls.weed': 'खरपतवार हटाएं',
    'subscription.title': 'अपना प्लान चुनें',
    'subscription.subtitle': 'हमारी प्रीमियम सुविधाओं के साथ अपनी खेती को बढ़ाएं',
    'subscription.base': 'बेस मॉडल',
    'subscription.premium': 'प्रीमियम मॉडल',
    'subscription.month': 'महीना',
    'subscription.year': 'साल',
    'subscription.popular': 'सबसे लोकप्रिय',
    'subscription.choose': 'प्लान चुनें',
    'footer.text': '© 2025 ग्रेवो - पराग भट द्वारा निर्मित',
    'footer.subtitle': 'रास्पबेरी पाई द्वारा संचालित • रियल-टाइम IoT डैशबोर्ड'
  },
  mr: {
    'nav.dashboard': 'डॅशबोर्ड',
    'nav.controls': 'नियंत्रण',
    'nav.logs': 'लॉग्ज',
    'nav.subscription': 'सबस्क्रिप्शन',
    'dashboard.title': 'ग्रेवो नियंत्रण पॅनेल',
    'dashboard.subtitle': 'तुमच्या स्मार्ट शेती रोबोटचे निरीक्षण आणि नियंत्रण करा',
    'dashboard.status': 'रास्पबेरी पाई कनेक्ट केले',
    'dashboard.soilMoisture': 'मातीची ओलावा',
    'dashboard.waterTank': 'पाण्याच्या टाकीची पातळी',
    'dashboard.obstacle': 'अडथळा शोधणे',
    'dashboard.systemStatus': 'सिस्टमची स्थिती',
    'controls.movement': 'हालचाल नियंत्रण',
    'controls.actions': 'कृती',
    'controls.forward': '↑ पुढे',
    'controls.left': '← डावीकडे',
    'controls.stop': 'थांबा',
    'controls.right': '→ उजवीकडे',
    'controls.backward': '↓ मागे',
    'controls.water': 'झाडांना पाणी द्या',
    'controls.weed': 'तण काढा',
    'subscription.title': 'तुमचा प्लॅन निवडा',
    'subscription.subtitle': 'आमच्या प्रीमियम वैशिष्ट्यांसह तुमची शेती वाढवा',
    'subscription.base': 'बेस मॉडेल',
    'subscription.premium': 'प्रीमियम मॉडेल',
    'subscription.month': 'महिना',
    'subscription.year': 'वर्ष',
    'subscription.popular': 'सर्वाधिक लोकप्रिय',
    'subscription.choose': 'प्लॅन निवडा',
    'footer.text': '© 2025 ग्रेवो - पराग भट यांनी बनवले',
    'footer.subtitle': 'रास्पबेरी पाई द्वारे चालवले • रियल-टाइम IoT डॅशबोर्ड'
  },
  ml: {
    'nav.dashboard': 'ഡാഷ്‌ബോർഡ്',
    'nav.controls': 'നിയന്ത്രണങ്ങൾ',
    'nav.logs': 'ലോഗുകൾ',
    'nav.subscription': 'സബ്‌സ്ക്രിപ്‌ഷൻ',
    'dashboard.title': 'ഗ്രേവോ കൺട്രോൾ പാനൽ',
    'dashboard.subtitle': 'നിങ്ങളുടെ സ്മാർട്ട് കൃഷി റോബോട്ട് നിരീക്ഷിക്കുകയും നിയന്ത്രിക്കുകയും ചെയ്യുക',
    'dashboard.status': 'റാസ്പ്ബെറി പൈ കണക്റ്റഡ്',
    'dashboard.soilMoisture': 'മണ്ണിന്റെ ഈർപ്പം',
    'dashboard.waterTank': 'വാട്ടർ ടാങ്ക് ലെവൽ',
    'dashboard.obstacle': 'തടസ്സം കണ്ടെത്തൽ',
    'dashboard.systemStatus': 'സിസ്റ്റം സ്റ്റാറ്റസ്',
    'controls.movement': 'ചലന നിയന്ത്രണങ്ങൾ',
    'controls.actions': 'പ്രവർത്തനങ്ങൾ',
    'controls.forward': '↑ മുന്നോട്ട്',
    'controls.left': '← ഇടത്',
    'controls.stop': 'നിർത്തുക',
    'controls.right': '→ വലത്',
    'controls.backward': '↓ പിന്നോട്ട്',
    'controls.water': 'ചെടികൾക്ക് വെള്ളം നൽകുക',
    'controls.weed': 'കളകൾ നീക്കം ചെയ്യുക',
    'subscription.title': 'നിങ്ങളുടെ പ്ലാൻ തിരഞ്ഞെടുക്കുക',
    'subscription.subtitle': 'ഞങ്ങളുടെ പ്രീമിയം ഫീച്ചറുകൾ ഉപയോഗിച്ച് നിങ്ങളുടെ കൃഷി മെച്ചപ്പെടുത്തുക',
    'subscription.base': 'ബേസ് മോഡൽ',
    'subscription.premium': 'പ്രീമിയം മോഡൽ',
    'subscription.month': 'മാസം',
    'subscription.year': 'വർഷം',
    'subscription.popular': 'ഏറ്റവും ജനപ്രിയം',
    'subscription.choose': 'പ്ലാൻ തിരഞ്ഞെടുക്കുക',
    'footer.text': '© 2025 ഗ്രേവോ - പരാഗ് ഭട്ട് നിർമ്മിച്ചത്',
    'footer.subtitle': 'റാസ്പ്ബെറി പൈ പവർഡ് • റിയൽ-ടൈം IoT ഡാഷ്ബോർഡ്'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};