import { databaseService } from "./databaseService";
import { translate } from "@/utils/translations";

// Types for our chatbot data
export interface BankingCategory {
  id: string;
  name: string;
  keywords: string[];
}

export interface BankingQuestion {
  id: string;
  question: string;
  answer: string;
  categoryIds: string[];
  keywords: string[];
}

// Banking categories
export const bankingCategories: BankingCategory[] = [
  {
    id: "accounts",
    name: "Bank Accounts",
    keywords: ["account", "savings", "checking", "deposit", "balance", "statement"]
  },
  {
    id: "cards",
    name: "Credit & Debit Cards",
    keywords: ["card", "credit", "debit", "pin", "atm", "transaction", "payment"]
  },
  {
    id: "loans",
    name: "Loans & Mortgages",
    keywords: ["loan", "mortgage", "interest", "rate", "payment", "apply", "application"]
  },
  {
    id: "transfers",
    name: "Transfers & Payments",
    keywords: ["transfer", "payment", "wire", "send", "money", "pay", "bill"]
  },
  {
    id: "security",
    name: "Security & Access",
    keywords: ["security", "password", "login", "authentication", "protect", "fraud"]
  }
];

// Banking questions and answers
export const bankingQuestions: BankingQuestion[] = [
  // Account questions
  {
    id: "open-account",
    question: "How do I open a new bank account?",
    answer: "To open a new account, you can visit any branch with your ID proof, address proof, and passport-size photographs. Alternatively, you can also apply online through our website or mobile app and complete the verification process digitally.",
    categoryIds: ["accounts"],
    keywords: ["open", "new", "account", "create"]
  },
  {
    id: "check-balance",
    question: "How can I check my account balance?",
    answer: "You can check your account balance through our mobile banking app, online banking portal, by visiting any ATM, calling our 24/7 customer service, or visiting any branch. The mobile app and online banking provide real-time balance updates.",
    categoryIds: ["accounts"],
    keywords: ["check", "balance", "view", "see"]
  },
  {
    id: "account-fees",
    question: "What are the fees associated with my account?",
    answer: "Common account fees include monthly maintenance fees (typically $0-$15 depending on account type), overdraft fees ($35 per incident), ATM fees (varies by location and bank relationship), and wire transfer fees. Many fees can be waived by maintaining minimum balances or setting up direct deposits.",
    categoryIds: ["accounts"],
    keywords: ["fee", "charge", "cost", "expense"]
  },
  
  // Card questions
  {
    id: "lost-card",
    question: "What should I do if I lose my card?",
    answer: "If your card is lost or stolen, immediately report it by calling our 24/7 hotline at 1-800-123-4567 to block the card. You can also freeze your card temporarily through the mobile app or online banking. A replacement card will be issued and typically arrives within 3-5 business days.",
    categoryIds: ["cards", "security"],
    keywords: ["lost", "stolen", "missing", "card", "replace"]
  },
  {
    id: "card-pin",
    question: "How do I change my card PIN?",
    answer: "You can change your card PIN by visiting any of our ATMs and selecting the 'PIN Change' option, through secure online banking, via our mobile app under Card Settings, or by calling customer service. For security reasons, avoid using easily guessable numbers like birthdates.",
    categoryIds: ["cards", "security"],
    keywords: ["pin", "change", "reset", "forgot", "password"]
  },
  {
    id: "card-limit",
    question: "How can I increase my card limit?",
    answer: "To request a credit limit increase, log into online banking or the mobile app and navigate to the card services section, or call our customer service. The approval depends on factors like payment history, account standing, and income. Regular reviews of your account may also result in automatic limit increases.",
    categoryIds: ["cards"],
    keywords: ["limit", "increase", "credit", "spending"]
  },
  
  // Loan questions
  {
    id: "loan-apply",
    question: "How do I apply for a loan?",
    answer: "You can apply for a loan online through our website or mobile app, by phone, or by visiting any branch. You'll need to provide identification, proof of income, credit history information, and details about the loan purpose. Pre-qualification tools are available online to check potential rates without impacting your credit score.",
    categoryIds: ["loans"],
    keywords: ["loan", "apply", "get", "application"]
  },
  {
    id: "loan-rates",
    question: "What are the current loan interest rates?",
    answer: "Current rates vary by loan type: personal loans range from 7.99% to 15.99% APR, auto loans from 4.49% to 9.99% APR, and mortgages from 6.25% to 7.5% APR. Rates depend on your credit score, loan amount, term length, and market conditions. Check our website for the most current rates or speak with a loan officer for personalized rates.",
    categoryIds: ["loans"],
    keywords: ["rate", "interest", "apr", "percentage"]
  },
  {
    id: "mortgage-process",
    question: "What is the mortgage application process?",
    answer: "The mortgage process involves: 1) Pre-approval where we review your finances and credit, 2) Home shopping within your pre-approved amount, 3) Formal application with property details, 4) Underwriting where we verify all information, 5) Home appraisal and inspection, 6) Final approval, and 7) Closing where you sign documents and receive your keys. The process typically takes 30-45 days from application to closing.",
    categoryIds: ["loans"],
    keywords: ["mortgage", "home loan", "house", "buy", "property"]
  },
  
  // Transfer questions
  {
    id: "transfer-money",
    question: "How do I transfer money to another account?",
    answer: "You can transfer money through online banking, our mobile app, at a branch, by phone banking, or by setting up automatic transfers. For transfers to other banks, you'll need the recipient's account number and routing number. Internal transfers between your accounts are typically instant, while external transfers may take 1-3 business days.",
    categoryIds: ["transfers"],
    keywords: ["transfer", "send", "money", "account"]
  },
  {
    id: "international-transfer",
    question: "How do I make an international wire transfer?",
    answer: "For international wire transfers, you'll need the recipient's name, bank name, account number, SWIFT/BIC code, and sometimes an IBAN. You can initiate international transfers through online banking, our mobile app, or at any branch. Fees typically range from $30-$50, and transfers usually complete within 1-5 business days depending on the destination country.",
    categoryIds: ["transfers"],
    keywords: ["international", "wire", "transfer", "overseas", "foreign"]
  },
  {
    id: "bill-pay",
    question: "How does bill pay work?",
    answer: "Our bill pay service lets you pay bills electronically through online banking or our mobile app. You can set up one-time or recurring payments to service providers, businesses, or individuals. To set up, login and navigate to the Bill Pay section, add payees with their information, and schedule your payments. Electronic payments typically process within 1-2 business days, while check payments may take 5-7 days.",
    categoryIds: ["transfers"],
    keywords: ["bill", "pay", "payment", "utility"]
  },
  
  // Security questions
  {
    id: "secure-account",
    question: "How can I keep my account secure?",
    answer: "To keep your account secure: 1) Use strong, unique passwords and change them regularly, 2) Enable two-factor authentication, 3) Never share login details, OTPs, or card information, 4) Monitor your accounts regularly for suspicious activities, 5) Use secure networks for banking, 6) Keep contact information updated, 7) Set up alerts for transactions, and 8) Update your mobile app and banking software regularly.",
    categoryIds: ["security"],
    keywords: ["secure", "protect", "safety", "password"]
  },
  {
    id: "report-fraud",
    question: "How do I report suspicious activity or fraud?",
    answer: "Immediately report suspicious activity by calling our fraud hotline at 1-800-123-4567 (available 24/7), through secure messaging in online banking, or by visiting any branch. Please note transaction details, dates, and any communication you may have received. We recommend changing your password and PIN immediately if you suspect your credentials have been compromised.",
    categoryIds: ["security"],
    keywords: ["fraud", "suspicious", "scam", "hack", "report"]
  },
  {
    id: "online-banking",
    question: "How do I set up online banking?",
    answer: "To set up online banking, visit our website and click on 'Enroll in Online Banking', or download our mobile app. You'll need your account number, SSN/Tax ID, and personal information to verify your identity. After verification, you'll create a username, password, and security questions. The setup process takes approximately 5-10 minutes, and you'll have immediate access to your accounts once completed.",
    categoryIds: ["accounts", "security"],
    keywords: ["online", "banking", "setup", "access", "enroll"]
  }
];

/**
 * Find the best matching question based on user input
 */
export async function findBestMatch(userInput: string): Promise<BankingQuestion | null> {
  const input = userInput.toLowerCase().trim();
  
  try {
    // First check if this is an informal query
    const informalResult = await databaseService.handleInformalQuery(input);
    if (informalResult.response) {
      if (informalResult.matchedQuestionId) {
        // If we have a direct match from the informal handler
        const questions = await databaseService.getQuestions();
        const matchedQuestion = questions.find(q => q.id === informalResult.matchedQuestionId);
        if (matchedQuestion) {
          return matchedQuestion;
        }
      } else if (informalResult.categoryId) {
        // If we have a category but no specific question, create a synthetic response
        const syntheticQuestion: BankingQuestion = {
          id: `synthetic-${Date.now()}`,
          question: userInput,
          answer: informalResult.response,
          categoryIds: [informalResult.categoryId],
          keywords: []
        };
        return syntheticQuestion;
      } else {
        // For pure informality like greetings
        const syntheticQuestion: BankingQuestion = {
          id: `greeting-${Date.now()}`,
          question: userInput,
          answer: informalResult.response,
          categoryIds: [],
          keywords: []
        };
        return syntheticQuestion;
      }
    }
    
    // Get questions from the database
    const questions = await databaseService.getQuestions();
    
    // First, look for direct matches in question text
    const directMatch = questions.find(q => q.question.toLowerCase().includes(input));
    if (directMatch) return directMatch;
    
    // Extract potential intent from informal query
    let detectedCategory = null;
    if (input.includes('account') || input.includes('balance') || input.includes('statement')) {
      detectedCategory = 'accounts';
    } else if (input.includes('card') || input.includes('credit') || input.includes('debit')) {
      detectedCategory = 'cards';
    } else if (input.includes('loan') || input.includes('mortgage') || input.includes('interest')) {
      detectedCategory = 'loans';
    } else if (input.includes('transfer') || input.includes('payment') || input.includes('bill')) {
      detectedCategory = 'transfers';
    } else if (input.includes('secure') || input.includes('password') || input.includes('login')) {
      detectedCategory = 'security';
    }
    
    // Get categories from the database
    const categories = await databaseService.getCategories();
    
    // Calculate match scores based on keywords
    const matches = questions.map(question => {
      let score = 0;
      
      // Boost score for questions in the detected category
      if (detectedCategory && question.categoryIds.includes(detectedCategory)) {
        score += 2;
      }
      
      // Check question keywords
      question.keywords.forEach(keyword => {
        if (input.includes(keyword.toLowerCase())) {
          score += 3; // Higher score for question-specific keywords
        }
      });
      
      // Check category keywords
      question.categoryIds.forEach(catId => {
        const category = categories.find(cat => cat.id === catId);
        if (category) {
          category.keywords.forEach(keyword => {
            if (input.includes(keyword.toLowerCase())) {
              score += 1; // Lower score for category keywords
            }
          });
        }
      });
      
      return { question, score };
    });
    
    // Sort by score and get the best match
    matches.sort((a, b) => b.score - a.score);
    
    // Return the best match if score is above threshold
    if (matches.length > 0 && matches[0].score > 0) {
      return matches[0].question;
    }
    
  } catch (error) {
    console.error("Error finding best match:", error);
  }
  
  return null;
}

/**
 * Generate a default response when no match is found
 */
export function getDefaultResponse(): string {
  const responses = [
    "defaultResponse",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Get suggested questions based on a category
 */
export async function getSuggestedQuestions(categoryId: string): Promise<BankingQuestion[]> {
  try {
    const questions = await databaseService.getQuestionsByCategory(categoryId);
    return questions.slice(0, 3);
  } catch (error) {
    console.error("Error getting suggested questions:", error);
    return [];
  }
}

/**
 * Get welcome message
 */
export function getWelcomeMessage(): string {
  return "welcomeMessage";
}
