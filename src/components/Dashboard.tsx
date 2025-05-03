
import React, { useState } from "react";
import { ShoppingProvider } from "@/context/ShoppingContext";
import SearchInterface from "@/components/SearchInterface";
import ResultsDisplay from "@/components/ResultsDisplay";
import UserPreferences from "@/components/UserPreferences";
import ConversationHistory from "@/components/ConversationHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("search");
  
  return (
    <ShoppingProvider>
      <div className="container py-6 max-w-7xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">SpendWise</h1>
            <p className="text-muted-foreground">Your intelligent shopping assistant</p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
          </Tabs>
        </header>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="grid gap-6">
            <TabsContent value="search" className="mt-0">
              <SearchInterface />
            </TabsContent>
            
            <TabsContent value="results" className="mt-0">
              <ResultsDisplay />
            </TabsContent>
            
            <TabsContent value="preferences" className="mt-0">
              <UserPreferences />
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <ConversationHistory />
            </TabsContent>
          </div>
        </Tabs>
        
        <Separator className="my-6" />
        
        <footer className="text-sm text-muted-foreground text-center">
          <p>SpendWise - Powered by Azure Multi-agent AI</p>
        </footer>
      </div>
    </ShoppingProvider>
  );
};

export default Dashboard;
