
import React, { useState, useEffect } from "react";
import { ShoppingProvider } from "@/context/ShoppingContext";
import SearchInterface from "@/components/SearchInterface";
import ResultsDisplay from "@/components/ResultsDisplay";
import UserPreferences from "@/components/UserPreferences";
import ConversationHistory from "@/components/ConversationHistory";
import UserAuth from "@/components/UserAuth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PanelLeft, History, Search, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { fadeInAnimation, hoverElevateAnimation } from "@/lib/animation-utils";

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
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
        <div className="container py-8 max-w-7xl">
          <header className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className={`${hoverElevateAnimation} rounded-xl bg-white backdrop-blur-sm border-accent/30`}
                  >
                    <PanelLeft className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[350px] sm:w-[450px] border-r-accent/20 bg-sidebar">
                  <Tabs defaultValue="preferences" value={sidebarTab} onValueChange={setSidebarTab}>
                    <TabsList className="grid w-full grid-cols-2 rounded-xl bg-sidebar-accent/50">
                      <TabsTrigger value="preferences" className="rounded-lg data-[state=active]:bg-white">
                        AI Preferences
                      </TabsTrigger>
                      <TabsTrigger value="history" className="rounded-lg data-[state=active]:bg-white">
                        History
                      </TabsTrigger>
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
              
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
                    SpendWise
                  </h1>
                </div>
                <p className="text-muted-foreground">Your intelligent shopping assistant</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <UserAuth />
            </div>
          </header>
          
          <div className="grid gap-6">
            <div className="mb-2">
              <SearchInterface onSearch={handleSearch} />
            </div>
            
            {isLoading && (
              <div className={`mt-6 ${fadeInAnimation}`}>
                <div className="flex items-center justify-center flex-col py-8">
                  <div className="relative w-16 h-16 mb-4 overflow-visible">
                    <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-3 border-t-4 border-primary/20 rounded-full animate-ping"></div>
                  </div>
                  <h2 className="text-xl font-medium text-center bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
                    Finding the best products for you...
                  </h2>
                  <p className="text-muted-foreground text-center mt-2">
                    Our AI is analyzing thousands of products to match your preferences
                  </p>
                  
                  <div className="w-full max-w-md mt-8 space-y-6">
                    <div className="space-y-4">
                      <div className="flex gap-4 items-center">
                        <Skeleton className="h-16 w-16 rounded-xl" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-4/5" />
                          <Skeleton className="h-3 w-2/5" />
                        </div>
                      </div>
                      
                      <div className="flex gap-4 items-center">
                        <Skeleton className="h-16 w-16 rounded-xl" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/5" />
                          <Skeleton className="h-3 w-2/5" />
                        </div>
                      </div>
                      
                      <div className="flex gap-4 items-center">
                        <Skeleton className="h-16 w-16 rounded-xl" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-4/5" />
                          <Skeleton className="h-3 w-3/5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {showResults && !isLoading && (
              <div className={`mt-6 ${fadeInAnimation}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Results for: 
                    <span className="text-primary ml-2">{query}</span>
                  </h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowResults(false)} 
                    className="flex items-center gap-2 rounded-xl"
                  >
                    <Search className="h-4 w-4" />
                    New Search
                  </Button>
                </div>
                <ResultsDisplay query={query} />
              </div>
            )}
          </div>
          
          <Separator className="my-8 opacity-50" />
          
          <footer className="text-sm text-muted-foreground text-center">
            <p>SpendWise - Powered by Azure Multi-agent AI</p>
          </footer>
        </div>
      </div>
    </ShoppingProvider>
  );
};

export default Dashboard;
