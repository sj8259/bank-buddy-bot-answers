
import { Button } from "@/components/ui/button";
import { bankingCategories, BankingCategory } from "@/services/bankBotData";

interface CategorySelectorProps {
  onSelectCategory: (categoryId: string) => void;
}

const CategorySelector = ({ onSelectCategory }: CategorySelectorProps) => {
  return (
    <div className="w-full">
      <h3 className="text-sm font-medium text-gray-700 mb-2">What can I help you with?</h3>
      <div className="grid grid-cols-2 gap-2">
        {bankingCategories.map((category: BankingCategory) => (
          <Button
            key={category.id}
            variant="outline"
            className="justify-start bg-white border border-bank-accent/30 text-bank-primary hover:bg-bank-light hover:text-bank-dark"
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
