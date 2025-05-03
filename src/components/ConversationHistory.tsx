
import React from "react";
import { User, Bot, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Sample conversation history data - in a real app, this would come from your backend
const conversationHistory = [
  {
    id: 1,
    timestamp: "2025-05-03T10:30:00",
    userQuery: "I need wireless headphones with good noise cancellation under $300",
    systemResponse: "Based on your preferences and budget, I recommend the Premium Wireless Headphones ($249.99) and Ultra-Light Wireless Earbuds ($179.99).",
    productsRecommended: [
      { id: 1, name: "Premium Wireless Headphones", price: 249.99 },
      { id: 2, name: "Ultra-Light Wireless Earbuds", price: 179.99 }
    ]
  },
  {
    id: 2,
    timestamp: "2025-05-02T15:45:00",
    userQuery: "Show me the best 4K TVs with HDMI 2.1 for gaming",
    systemResponse: "For gaming, I recommend these 4K TVs with HDMI 2.1 that offer low input lag and high refresh rates.",
    productsRecommended: [
      { id: 3, name: "UltraView 55\" OLED Gaming TV", price: 1299.99 },
      { id: 4, name: "GameMaster 65\" QLED TV", price: 1499.99 }
    ]
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const ConversationHistory: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Shopping Journey</h2>
        
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <div className="space-y-4">
        {conversationHistory.map((conversation) => (
          <Card key={conversation.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Shopping Session</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  {formatDate(conversation.timestamp)}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-muted h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">You asked</p>
                    <div className="bg-muted p-3 rounded-lg">
                      <p>{conversation.userQuery}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">SpendWise recommended</p>
                    <div className="border border-border p-3 rounded-lg">
                      <p className="mb-3">{conversation.systemResponse}</p>
                      
                      <Separator className="my-2" />
                      
                      <p className="text-sm font-medium mb-2">Recommended products:</p>
                      <ul className="space-y-2">
                        {conversation.productsRecommended.map((product) => (
                          <li key={product.id} className="flex justify-between">
                            <span>{product.name}</span>
                            <span className="font-medium">${product.price}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline">Revisit</Button>
                        <Button size="sm" variant="secondary">Refine Search</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConversationHistory;
