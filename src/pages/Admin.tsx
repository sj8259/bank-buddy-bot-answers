
import { useEffect, useState } from "react";
import { databaseService, ChatHistoryEntry } from "@/services/databaseService";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistoryEntry[]>([]);
  const [unansweredQueries, setUnansweredQueries] = useState<{query: string, count: number}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const history = await databaseService.getChatHistory();
        const unanswered = await databaseService.getUnansweredQueries();
        
        setChatHistory(history);
        setUnansweredQueries(unanswered);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-bank-light/30 py-8 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Chat
            </Button>
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-bank-dark mb-6">Knowledge Base Admin</h1>
        
        {isLoading ? (
          <p>Loading data...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Common Unanswered Queries</h2>
                <p className="text-sm text-gray-600">
                  These queries had no matching answer in the knowledge base
                </p>
              </CardHeader>
              <CardContent>
                {unansweredQueries.length > 0 ? (
                  <ul className="space-y-2">
                    {unansweredQueries.map((item, index) => (
                      <li key={index} className="p-2 bg-gray-50 rounded flex justify-between">
                        <span>{item.query}</span>
                        <span className="bg-bank-primary/10 px-2 rounded-full text-bank-dark">
                          {item.count} {item.count === 1 ? 'time' : 'times'}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No unanswered queries yet.</p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Chat History</h2>
                <p className="text-sm text-gray-600">
                  Recent user interactions with the chatbot
                </p>
              </CardHeader>
              <CardContent>
                {chatHistory.length > 0 ? (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {chatHistory.map((entry) => (
                      <div key={entry.id} className="border-b pb-3">
                        <p className="text-xs text-gray-500">{formatDate(entry.timestamp)}</p>
                        <p className="font-medium">User: {entry.userQuery}</p>
                        <p className="text-gray-700">Bot: {entry.botResponse}</p>
                        {entry.matchedQuestionId ? (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            Matched
                          </span>
                        ) : (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                            No match
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No chat history yet.</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
