
import { Language } from '../contexts/LanguageContext';

interface TranslationDictionary {
  [key: string]: {
    en: string;
    hi: string;
    ta: string;
    te: string;
  };
}

export const translations: TranslationDictionary = {
  // Welcome message
  welcomeMessage: {
    en: "Hello! I'm your BankBuddy assistant. I can help you with information about accounts, cards, loans, transfers, and security questions. What would you like to know?",
    hi: "नमस्ते! मैं आपका बैंकबडी सहायक हूँ। मैं आपको खाते, कार्ड, ऋण, स्थानांतरण और सुरक्षा प्रश्नों के बारे में जानकारी देने में मदद कर सकता हूँ। आप क्या जानना चाहेंगे?",
    ta: "வணக்கம்! நான் உங்கள் வங்கிநண்பர் உதவியாளர். கணக்குகள், அட்டைகள், கடன்கள், பரிமாற்றங்கள் மற்றும் பாதுகாப்பு கேள்விகள் பற்றிய தகவல்களுடன் நான் உங்களுக்கு உதவ முடியும். நீங்கள் என்ன அறிய விரும்புகிறீர்கள்?",
    te: "హలో! నేను మీ బ్యాంక్‌బడీ అసిస్టెంట్‌ని. ఖాతాలు, కార్డులు, రుణాలు, బదిలీలు మరియు భద్రతా ప్రశ్నలకు సంబంధించిన సమాచారంతో నేను మీకు సహాయం చేయగలను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?"
  },
  
  // Default fallback response
  defaultResponse: {
    en: "I don't have enough information about that banking query. Could you provide more details or rephrase your question?",
    hi: "मेरे पास उस बैंकिंग प्रश्न के बारे में पर्याप्त जानकारी नहीं है। क्या आप अधिक विवरण प्रदान कर सकते हैं या अपना प्रश्न दोबारा रख सकते हैं?",
    ta: "அந்த வங்கி வினவல் பற்றி எனக்குப் போதுமான தகவல் இல்லை. மேலும் விவரங்களை வழங்கவோ அல்லது உங்கள் கேள்வியை மறுபடியாக கேட்கவோ முடியுமா?",
    te: "ఆ బ్యాంకింగ్ ప్రశ్నకు సంబంధించి నాకు సరిపడా సమాచారం లేదు. దయచేసి మరింత వివరాలను అందించండి లేదా మీ ప్రశ్నను మరోలా అడగండి."
  },

  // Categories
  category_accounts: {
    en: "Bank Accounts",
    hi: "बैंक खाते",
    ta: "வங்கி கணக்குகள்",
    te: "బ్యాంకు ఖాతాలు"
  },
  category_cards: {
    en: "Credit & Debit Cards",
    hi: "क्रेडिट और डेबिट कार्ड",
    ta: "கிரெடிட் & டெபிட் கார்டுகள்",
    te: "క్రెడిట్ & డెబిట్ కార్డులు"
  },
  category_loans: {
    en: "Loans & Mortgages",
    hi: "ऋण और बंधक",
    ta: "கடன்கள் & அடமானங்கள்",
    te: "రుణాలు & తనఖాలు"
  },
  category_transfers: {
    en: "Transfers & Payments",
    hi: "स्थानांतरण और भुगतान",
    ta: "பரிமாற்றங்கள் & கொடுப்பனவுகள்",
    te: "బదిలీలు & చెల్లింపులు"
  },
  category_security: {
    en: "Security & Access",
    hi: "सुरक्षा और पहुँच",
    ta: "பாதுகாப்பு & அணுகல்",
    te: "భద్రత & ప్రాప్యత"
  },
  
  // UI elements
  whatCanIHelpWith: {
    en: "What can I help you with?",
    hi: "मैं आपकी किस प्रकार सहायता कर सकता हूँ?",
    ta: "நான் உங்களுக்கு எப்படி உதவ முடியும்?",
    te: "నేను మీకు ఏ విధంగా సహాయం చేయగలను?"
  },
  relatedQuestions: {
    en: "Related questions:",
    hi: "संबंधित प्रश्न:",
    ta: "தொடர்புடைய கேள்விகள்:",
    te: "సంబంధిత ప్రశ్నలు:"
  },
  typeBankingQuestion: {
    en: "Type your banking question...",
    hi: "अपना बैंकिंग प्रश्न लिखें...",
    ta: "உங்கள் வங்கி கேள்வியை உள்ளிடவும்...",
    te: "మీ బ్యాంకింగ్ ప్రశ్నను టైప్ చేయండి..."
  },
  
  // Informal responses
  greeting: {
    en: "Hello! I'm your banking assistant. How can I help you today? You can ask me about accounts, cards, loans, transfers, or security.",
    hi: "नमस्ते! मैं आपका बैंकिंग सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ? आप मुझसे खातों, कार्ड, ऋण, स्थानांतरण या सुरक्षा के बारे में पूछ सकते हैं।",
    ta: "வணக்கம்! நான் உங்கள் வங்கி உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்? கணக்குகள், கார்டுகள், கடன்கள், பரிமாற்றங்கள் அல்லது பாதுகாப்பு பற்றி நீங்கள் என்னிடம் கேட்கலாம்.",
    te: "హలో! నేను మీ బ్యాంకింగ్ సహాయకుడిని. నేడు నేను మీకు ఎలా సహాయం చేయగలను? మీరు ఖాతాలు, కార్డులు, రుణాలు, బదిలీలు లేదా భద్రత గురించి నన్ను అడగవచ్చు."
  },
  
  // More about category
  learnMoreAboutCategory: {
    en: "Would you like to learn more about {0}? You can ask me specific questions.",
    hi: "{0} के बारे में अधिक जानना चाहेंगे? आप मुझसे विशिष्ट प्रश्न पूछ सकते हैं।",
    ta: "{0} பற்றி மேலும் அறிய விரும்புகிறீர்களா? நீங்கள் என்னிடம் குறிப்பிட்ட கேள்விகளைக் கேட்கலாம்.",
    te: "{0} గురించి మరింత తెలుసుకోవాలనుకుంటున్నారా? మీరు నన్ను నిర్దిష్ట ప్రశ్నలు అడగవచ్చు."
  },
  
  // Common questions about category
  commonQuestionsAbout: {
    en: "Here are some common questions about {0}:",
    hi: "{0} के बारे में कुछ सामान्य प्रश्न यहां हैं:",
    ta: "{0} பற்றிய சில பொதுவான கேள்விகள் இங்கே:",
    te: "{0} గురించి కొన్ని సాధారణ ప్రశ్నలు ఇక్కడ ఉన్నాయి:"
  }
};

/**
 * Get translation for a key in the specified language
 */
export const translate = (key: string, language: Language, params: string[] = []): string => {
  // Return the key if translation doesn't exist
  if (!translations[key]) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }

  let text = translations[key][language] || translations[key].en; // Fallback to English
  
  // Replace parameters
  params.forEach((param, index) => {
    text = text.replace(`{${index}}`, param);
  });
  
  return text;
};
