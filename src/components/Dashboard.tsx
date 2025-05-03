
import React, { useState, useEffect } from "react";
import { ShoppingProvider } from "@/context/ShoppingContext";
import SearchInterface from "@/components/SearchInterface";
import ResultsDisplay from "@/components/ResultsDisplay";
import UserPreferences from "@/components/UserPreferences";
import ConversationHistory from "@/components/ConversationHistory";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PanelRight, History, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sidebarTab, setSidebarTab] = useState<string>("preferences");
  
  // Process search query and show results
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim().length > 0) {
      setIsLoading(true);
      // Simulate API call delay (remove in production and replace with actual API call)
      setTimeout(() => {
        setIsLoading(false);
        setShowResults(true);
      }, 2000);
    }
  };
  
  return (
    <ShoppingProvider>
      <div className="container py-6 max-w-7xl">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">SpendWise</h1>
            <p className="text-muted-foreground">Your intelligent shopping assistant</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <PanelRight className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[350px] sm:w-[450px]">
                <Tabs defaultValue="preferences" value={sidebarTab} onValueChange={setSidebarTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="preferences">AI Preferences</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="preferences" className="mt-4">
                    <UserPreferences />
                  </TabsContent>
                  <TabsContent value="history" className="mt-4">
                    <ConversationHistory />
                  </TabsContent>
                </Tabs>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        
        <div className="grid gap-6">
          <div className="mb-2">
            <SearchInterface onSearch={handleSearch} />
          </div>
          
          {isLoading && (
            <div className="mt-4 animate-fade-in">
              <div className="flex items-center justify-center flex-col py-8">
                <div className="relative w-16 h-16 mb-4">
                  <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin"></div>
                  <div className="absolute inset-3 border-t-4 border-primary/30 rounded-full animate-ping"></div>
                </div>
                <h2 className="text-xl font-medium text-center">Searching for products...</h2>
                <p className="text-muted-foreground text-center mt-2">Our AI is analyzing thousands of products to find the best matches for you</p>
                
                <div className="w-full max-w-md mt-6 space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                    <div className="flex gap-2 justify-center">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-center">
                    <Skeleton className="h-12 w-12 rounded-md" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-4/5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {showResults && !isLoading && (
            <div className="mt-4 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Results for: <span className="text-primary">{query}</span></h2>
                <Button variant="ghost" size="sm" onClick={() => setShowResults(false)} className="flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  New Search
                </Button>
              </div>
              <ResultsDisplay query={query} />
            </div>
          )}
        </div>
        
        <Separator className="my-6" />
        
        <footer className="text-sm text-muted-foreground text-center">
          <p>SpendWise - Powered by Azure Multi-agent AI</p>
        </footer>
      </div>
    </ShoppingProvider>
  );
};

export default Dashboard;
