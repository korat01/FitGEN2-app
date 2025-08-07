import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">404</h1>
        <h2 className="text-2xl font-semibold mb-2">{t('notfound.title')}</h2>
        <p className="text-xl text-muted-foreground mb-4">{t('notfound.message')}</p>
        <a href="/" className="text-primary hover:text-primary/80 underline">
          {t('notfound.back')}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
