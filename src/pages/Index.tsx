
import BankChatBot from "@/components/BankChatBot";
import { PiggyBank } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-bank-light/30 py-8 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="bg-bank-primary p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-5c4-.5 5-2 5-7 0-1-.5-2-2-2z"/>
                <path d="M2 9v1c0 1.1.9 2 2 2h1"/>
                <path d="M16 11h0"/>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-bank-dark mb-2">BankBuddy NLP Chatbot</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Get instant answers to all your banking queries. Our AI-powered assistant can help you with accounts, cards, loans, transfers, and security questions.
          </p>
        </div>

        <div className="mb-10">
          <BankChatBot />
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>🔒 This is a demo chatbot for educational purposes. No real banking information is processed.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
