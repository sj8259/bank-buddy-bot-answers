
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export interface ChatMessageProps {
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatMessage = ({ content, isBot, timestamp }: ChatMessageProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay before showing the message for animation purposes
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Format the timestamp
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp);

  return (
    <div
      className={cn(
        "mb-4 max-w-[80%] opacity-0",
        isBot ? "self-start" : "self-end",
        visible && "animate-message-fade-in"
      )}
    >
      <div
        className={cn(
          "rounded-2xl px-4 py-3 shadow-sm",
          isBot 
            ? "bg-bank-light text-bank-dark border border-bank-accent/20" 
            : "bg-bank-primary text-white"
        )}
      >
        {content}
      </div>
      <div 
        className={cn(
          "text-xs text-gray-500 mt-1",
          isBot ? "text-left" : "text-right"
        )}
      >
        {formattedTime}
      </div>
    </div>
  );
};

export default ChatMessage;
