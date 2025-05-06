
import { Button } from "@/components/ui/button";
import { bankingCategories, BankingCategory } from "@/services/bankBotData";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";

interface CategorySelectorProps {
  onSelectCategory: (categoryId: string) => void;
}

const CategorySelector = ({ onSelectCategory }: CategorySelectorProps) => {
  const { language } = useLanguage();
  
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-2">
        {bankingCategories.map((category: BankingCategory) => (
          <Button
            key={category.id}
            variant="outline"
            className="justify-start bg-white border border-bank-accent/30 text-bank-primary hover:bg-bank-light hover:text-bank-dark"
            onClick={() => onSelectCategory(category.id)}
          >
            {translate(`category_${category.id}`, language)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
