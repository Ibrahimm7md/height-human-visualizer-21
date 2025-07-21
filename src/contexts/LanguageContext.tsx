import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    title: "Height Comparison Tool",
    subtitle: "Enter the heights of two people and see a visual comparison with accurate proportions",
    person1: "Person 1",
    person2: "Person 2",
    firstPerson: "First Person",
    secondPerson: "Second Person",
    enterHeight: "Enter height",
    person1Name: "Person 1 Name",
    person2Name: "Person 2 Name",
    heightComparison: "Height Comparison",
    heightDifference: "Height Difference",
    isTaller: "is taller",
    tip: "💡 Tip: You can use custom names and switch between centimeters and feet!",
    share: "Share",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    language: "Language",
    arabic: "العربية",
    english: "English",
    heightDifferenceLabel: "Height Difference:"
  },
  ar: {
    title: "أداة مقارنة الطول",
    subtitle: "أدخل أطوال شخصين وشاهد مقارنة بصرية بنسب دقيقة",
    person1: "الشخص الأول",
    person2: "الشخص الثاني", 
    firstPerson: "الشخص الأول",
    secondPerson: "الشخص الثاني",
    enterHeight: "أدخل الطول",
    person1Name: "اسم الشخص الأول",
    person2Name: "اسم الشخص الثاني",
    heightComparison: "مقارنة الأطوال",
    heightDifference: "فرق الطول",
    isTaller: "أطول",
    tip: "💡 نصيحة: يمكنك استخدام أسماء مخصصة والتبديل بين السنتيمتر والقدم!",
    share: "مشاركة",
    darkMode: "الوضع الداكن",
    lightMode: "الوضع الفاتح",
    language: "اللغة",
    arabic: "العربية",
    english: "English",
    heightDifferenceLabel: "فرق الطول:"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className={language === 'ar' ? 'font-arabic' : ''}>
        {children}
      </div>
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