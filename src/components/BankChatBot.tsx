
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { SendIcon } from "lucide-react";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import SuggestionButton from "./SuggestionButton";
import CategorySelector from "./CategorySelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { 
  findBestMatch, 
  getDefaultResponse, 
  getWelcomeMessage,
  BankingQuestion
} from "@/services/bankBotData";
import { databaseService } from "@/services/databaseService";

const BankChatBot = () => {
  const { language } = useLanguage();
  
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    {
      content: translate("welcomeMessage", language),
      isBot: true,
      timestamp: new Date()
    }
  ]);
  
  // Reset welcome message when language changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].isBot) {
      setMessages([{
        content: translate("welcomeMessage", language),
        isBot: true,
        timestamp: new Date()
      }]);
    }
  }, [language]);
  
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState<BankingQuestion[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch suggested questions when active category changes
  useEffect(() => {
    const fetchSuggestedQuestions = async () => {
      if (activeCategoryId) {
        try {
          const questions = await databaseService.getQuestionsByCategory(activeCategoryId);
          setSuggestedQuestions(questions.slice(0, 3));
        } catch (error) {
          console.error("Error fetching suggested questions:", error);
          setSuggestedQuestions([]);
        }
      } else {
        setSuggestedQuestions([]);
      }
    };
    
    fetchSuggestedQuestions();
  }, [activeCategoryId]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessageProps = {
      content: inputValue,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setShowSuggestions(false);
    
    // Process the user's message and generate a response
    setTimeout(async () => {
      const matchedQuestion = await findBestMatch(inputValue);
      
      let botResponse: string;
      let matchedQuestionId: string | null = null;
      let newCategoryId: string | null = null;
      
      if (matchedQuestion) {
        // Get translated response if it's a synthetic or greeting message, otherwise use the answer from the database
        if (matchedQuestion.id.startsWith('synthetic-') || matchedQuestion.id.startsWith('greeting-')) {
          botResponse = matchedQuestion.answer;
        } else {
          // For real questions, we would need to have translations for all answers
          // For now, we'll just use the English answers
          botResponse = matchedQuestion.answer;
        }
        
        matchedQuestionId = matchedQuestion.id.startsWith('synthetic-') || matchedQuestion.id.startsWith('greeting-') ? 
          null : matchedQuestion.id;
        
        // Set the category for suggested follow-up questions
        if (matchedQuestion.categoryIds.length > 0) {
          setActiveCategoryId(matchedQuestion.categoryIds[0]);
          newCategoryId = matchedQuestion.categoryIds[0];
        }
      } else {
        // Handle truly informal queries by checking if they contain any banking-related keywords
        const input = inputValue.toLowerCase();
        if (input.length < 10 && 
            !input.includes('loan') && 
            !input.includes('account') && 
            !input.includes('card') && 
            !input.includes('transfer') && 
            !input.includes('security')) {
          botResponse = translate("greeting", language);
        } else {
          botResponse = translate("defaultResponse", language);
        }
        
        setActiveCategoryId(null);
      }
      
      const botMessage: ChatMessageProps = {
        content: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      // Log the interaction to the database
      await databaseService.logChatInteraction(inputValue, botResponse, matchedQuestionId);
      
      setMessages(prev => [...prev, botMessage]);
      setShowSuggestions(true);
      
      // If a specific category was identified and we have a single-word query,
      // show a follow-up suggestion about that category
      if (newCategoryId && inputValue.trim().split(/\s+/).length < 3) {
        const categories = await databaseService.getCategories();
        const category = categories.find(c => c.id === newCategoryId);
        
        if (category) {
          setTimeout(() => {
            const categoryName = translate(`category_${category.id}`, language);
            const followUpMessage: ChatMessageProps = {
              content: translate("learnMoreAboutCategory", language, [categoryName]),
              isBot: true,
              timestamp: new Date()
            };
            
            setMessages(prev => [...prev, followUpMessage]);
          }, 1000);
        }
      }
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleCategorySelect = async (categoryId: string) => {
    setActiveCategoryId(categoryId);
    
    try {
      // Get category details from the database
      const categories = await databaseService.getCategories();
      const category = categories.find(cat => cat.id === categoryId);
      
      if (!category) return;
      
      const categoryName = translate(`category_${category.id}`, language);
      const botMessage: ChatMessageProps = {
        content: translate("commonQuestionsAbout", language, [categoryName]),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const handleSuggestionClick = async (question: string) => {
    // Simulate user asking the suggested question
    const userMessage: ChatMessageProps = {
      content: question,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setShowSuggestions(false);
    
    // Find and provide the answer
    setTimeout(async () => {
      const matchedQuestion = await findBestMatch(question);
      
      let botResponse: string;
      let matchedQuestionId: string | null = null;
      
      if (matchedQuestion) {
        botResponse = matchedQuestion.answer;
        matchedQuestionId = matchedQuestion.id;
        
        // Set the category for suggested follow-up questions
        if (matchedQuestion.categoryIds.length > 0) {
          setActiveCategoryId(matchedQuestion.categoryIds[0]);
        }
      } else {
        botResponse = translate("defaultResponse", language);
        setActiveCategoryId(null);
      }
      
      // Log the interaction to the database
      await databaseService.logChatInteraction(question, botResponse, matchedQuestionId);
      
      const botMessage: ChatMessageProps = {
        content: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setShowSuggestions(true);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="bg-bank-primary text-white py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <h2 className="font-semibold text-lg">BankBuddy Assistant</h2>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-auto p-4 flex flex-col">
        <div className="flex flex-col flex-1">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              content={message.content}
              isBot={message.isBot}
              timestamp={message.timestamp}
            />
          ))}
          <div ref={messageEndRef} />
        </div>
        
        {messages.length === 1 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              {translate("whatCanIHelpWith", language)}
            </h3>
            <CategorySelector onSelectCategory={handleCategorySelect} />
          </div>
        )}
        
        {showSuggestions && activeCategoryId && suggestedQuestions.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              {translate("relatedQuestions", language)}
            </h3>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question: BankingQuestion) => (
                <SuggestionButton
                  key={question.id}
                  text={question.question}
                  onClick={() => handleSuggestionClick(question.question)}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t p-4">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder={translate("typeBankingQuestion", language)}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            className="bg-bank-primary hover:bg-bank-secondary"
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BankChatBot;
