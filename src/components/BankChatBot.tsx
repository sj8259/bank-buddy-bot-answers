
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { SendIcon } from "lucide-react";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import SuggestionButton from "./SuggestionButton";
import CategorySelector from "./CategorySelector";
import { 
  findBestMatch, 
  getDefaultResponse, 
  getWelcomeMessage, 
  getSuggestedQuestions,
  bankingCategories,
  BankingQuestion
} from "@/services/bankBotData";

const BankChatBot = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    {
      content: getWelcomeMessage(),
      isBot: true,
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
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
    setTimeout(() => {
      const matchedQuestion = findBestMatch(inputValue);
      
      let botResponse: string;
      if (matchedQuestion) {
        botResponse = matchedQuestion.answer;
        
        // Set the category for suggested follow-up questions
        if (matchedQuestion.categoryIds.length > 0) {
          setActiveCategoryId(matchedQuestion.categoryIds[0]);
        }
      } else {
        botResponse = getDefaultResponse();
        setActiveCategoryId(null);
      }
      
      const botMessage: ChatMessageProps = {
        content: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setShowSuggestions(true);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    
    // Find category name
    const category = bankingCategories.find(cat => cat.id === categoryId);
    if (!category) return;
    
    const botMessage: ChatMessageProps = {
      content: `Here are some common questions about ${category.name}:`,
      isBot: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  const handleSuggestionClick = (question: string) => {
    // Simulate user asking the suggested question
    const userMessage: ChatMessageProps = {
      content: question,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setShowSuggestions(false);
    
    // Find and provide the answer
    setTimeout(() => {
      const matchedQuestion = findBestMatch(question);
      
      let botResponse: string;
      if (matchedQuestion) {
        botResponse = matchedQuestion.answer;
        
        // Set the category for suggested follow-up questions
        if (matchedQuestion.categoryIds.length > 0) {
          setActiveCategoryId(matchedQuestion.categoryIds[0]);
        }
      } else {
        botResponse = getDefaultResponse();
        setActiveCategoryId(null);
      }
      
      const botMessage: ChatMessageProps = {
        content: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setShowSuggestions(true);
    }, 1000);
  };

  // Get suggested questions for the active category
  const suggestedQuestions = activeCategoryId 
    ? getSuggestedQuestions(activeCategoryId)
    : [];

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="bg-bank-primary text-white py-4 px-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <h2 className="font-semibold text-lg">BankBuddy Assistant</h2>
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
            <CategorySelector onSelectCategory={handleCategorySelect} />
          </div>
        )}
        
        {showSuggestions && activeCategoryId && suggestedQuestions.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Related questions:</h3>
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
            placeholder="Type your banking question..."
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
