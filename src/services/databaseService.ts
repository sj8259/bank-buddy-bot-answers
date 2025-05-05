
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
