
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Language, useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "ta", name: "தமிழ்" },
    { code: "te", name: "తెలుగు" }
  ];
  
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 p-2 h-9 text-sm border-bank-accent/50 hover:bg-bank-light hover:text-bank-primary"
          aria-label="Change language"
        >
          <Globe className="h-4 w-4" />
          {languages.find(lang => lang.code === language)?.name || "English"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-40">
        <div className="flex flex-col space-y-1">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={language === lang.code ? "secondary" : "ghost"}
              className="justify-start text-sm"
              onClick={() => handleLanguageChange(lang.code as Language)}
            >
              {lang.name}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelector;
