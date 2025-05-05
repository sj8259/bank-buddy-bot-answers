
import { Button } from "@/components/ui/button";

interface SuggestionButtonProps {
  text: string;
  onClick: () => void;
}

const SuggestionButton = ({ text, onClick }: SuggestionButtonProps) => {
  return (
    <Button
      variant="outline"
      className="bg-white border border-bank-accent/30 text-bank-primary hover:bg-bank-light hover:text-bank-dark"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default SuggestionButton;
