
import { BankingCategory, BankingQuestion } from './bankBotData';

// This interface defines the structure of our chat history entries
export interface ChatHistoryEntry {
  id: string;
  userQuery: string;
  botResponse: string;
  matchedQuestionId: string | null;
  timestamp: Date;
  wasHelpful?: boolean;
}

// A class to handle all database operations
class DatabaseService {
  private localStorageKey = 'bankBuddy_chatHistory';
  private categoriesKey = 'bankBuddy_categories';
  private questionsKey = 'bankBuddy_questions';
  
  constructor() {
    // Initialize the local database if it doesn't exist
    this.initializeLocalDatabase();
  }
  
  // Initialize the database with default values if empty
  private initializeLocalDatabase(): void {
    // Check if we have the categories and questions in localStorage
    const storedCategories = localStorage.getItem(this.categoriesKey);
    const storedQuestions = localStorage.getItem(this.questionsKey);
    
    // Import default data from bankBotData if no stored data exists
    if (!storedCategories || !storedQuestions) {
      this.importDefaultData();
    }
  }
  
  // Import the default data from bankBotData.ts
  private importDefaultData(): void {
    import('./bankBotData').then(data => {
      localStorage.setItem(this.categoriesKey, JSON.stringify(data.bankingCategories));
      localStorage.setItem(this.questionsKey, JSON.stringify(data.bankingQuestions));
      console.log('Initialized database with default values');
    });
  }
  
  // Get all categories
  async getCategories(): Promise<BankingCategory[]> {
    const storedCategories = localStorage.getItem(this.categoriesKey);
    return storedCategories ? JSON.parse(storedCategories) : [];
  }
  
  // Get all questions
  async getQuestions(): Promise<BankingQuestion[]> {
    const storedQuestions = localStorage.getItem(this.questionsKey);
    return storedQuestions ? JSON.parse(storedQuestions) : [];
  }
  
  // Get questions by category
  async getQuestionsByCategory(categoryId: string): Promise<BankingQuestion[]> {
    const questions = await this.getQuestions();
    return questions.filter(q => q.categoryIds.includes(categoryId));
  }
  
  // Handle informal queries by detecting intent
  async handleInformalQuery(userInput: string): Promise<{ 
    response: string;
    categoryId: string | null;
    matchedQuestionId: string | null;
  }> {
    const input = userInput.toLowerCase().trim();
    
    // Handle greetings
    const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy'];
    if (greetings.some(greeting => input === greeting || input.startsWith(greeting + ' '))) {
      return {
        response: "Hello! I'm your banking assistant. How can I help you today? You can ask me about accounts, cards, loans, transfers, or security.",
        categoryId: null,
        matchedQuestionId: null
      };
    }
    
    // Intent detection for loans
    if (input.includes('loan') || input.includes('mortgage')) {
      // Match any questions about loans/mortgage processes
      const questions = await this.getQuestions();
      const loanQuestions = questions.filter(q => 
        q.categoryIds.includes('loans') && 
        (q.question.toLowerCase().includes('process') || 
         q.question.toLowerCase().includes('apply') || 
         q.question.toLowerCase().includes('how'))
      );
      
      if (input.includes('process') && loanQuestions.length > 0) {
        const processQuestion = loanQuestions.find(q => q.question.toLowerCase().includes('process'));
        if (processQuestion) {
          return {
            response: processQuestion.answer,
            categoryId: 'loans',
            matchedQuestionId: processQuestion.id
          };
        }
      }
      
      if (loanQuestions.length > 0) {
        return {
          response: "I can help you with loan information. Are you interested in applying for a loan, learning about the mortgage process, or checking current interest rates?",
          categoryId: 'loans',
          matchedQuestionId: null
        };
      }
    }
    
    return {
      response: "",
      categoryId: null,
      matchedQuestionId: null
    };
  }
  
  // Save a new chat history entry
  async logChatInteraction(
    userQuery: string, 
    botResponse: string, 
    matchedQuestionId: string | null
  ): Promise<void> {
    const history = await this.getChatHistory();
    
    const newEntry: ChatHistoryEntry = {
      id: Date.now().toString(),
      userQuery,
      botResponse,
      matchedQuestionId,
      timestamp: new Date(),
    };
    
    history.push(newEntry);
    localStorage.setItem(this.localStorageKey, JSON.stringify(history));
  }
  
  // Get all chat history
  async getChatHistory(): Promise<ChatHistoryEntry[]> {
    const history = localStorage.getItem(this.localStorageKey);
    return history ? JSON.parse(history) : [];
  }
  
  // Mark a chat interaction as helpful or not
  async markInteractionHelpfulness(id: string, wasHelpful: boolean): Promise<void> {
    const history = await this.getChatHistory();
    const updatedHistory = history.map(entry => 
      entry.id === id ? { ...entry, wasHelpful } : entry
    );
    
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedHistory));
  }
  
  // Get common unanswered queries (for future knowledge base expansion)
  async getUnansweredQueries(): Promise<{query: string, count: number}[]> {
    const history = await this.getChatHistory();
    const unansweredQueries = history.filter(entry => !entry.matchedQuestionId);
    
    // Count occurrences of each query
    const queryCounts: Record<string, number> = {};
    unansweredQueries.forEach(entry => {
      const normalizedQuery = entry.userQuery.toLowerCase().trim();
      queryCounts[normalizedQuery] = (queryCounts[normalizedQuery] || 0) + 1;
    });
    
    // Convert to array and sort by count
    return Object.entries(queryCounts)
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count);
  }
}

// Export a singleton instance
export const databaseService = new DatabaseService();
