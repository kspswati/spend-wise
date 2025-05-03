
import React, { useState, useEffect } from "react";
import { Mic, Search, ChevronDown, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SearchInterfaceProps {
  onSearch: (query: string) => void;
}

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home",
  "Beauty",
  "Toys",
  "Sports",
  "Grocery",
  "Books"
];

const EXAMPLE_QUERIES = [
  "Laptop under $1500 with 16GB RAM and RTX graphics",
  "Noise-cancelling headphones for running",
  "Organic cotton t-shirts in medium size",
  "Best robot vacuum for pet hair under $300"
];

const RECENT_SEARCHES = [
  "Wireless earbuds with noise cancellation",
  "Kitchen gadgets under $50",
  "Winter jackets women's medium"
];

const SearchInterface: React.FC<SearchInterfaceProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showExamples, setShowExamples] = useState(true);
  const [showRecent, setShowRecent] = useState(true);
  const [searchFocus, setSearchFocus] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      onSearch(query);
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recognition
    if (!isRecording) {
      // Simulating voice recognition with a timeout
      setTimeout(() => {
        setQuery("Wireless headphones with noise cancellation under $200");
        setIsRecording(false);
      }, 2000);
    }
  };

  const handleCategoryClick = (category: string) => {
    setQuery(`Best ${category} products`);
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
    onSearch(example);
  };

  const handleRecentClick = (recent: string) => {
    setQuery(recent);
    onSearch(recent);
  };

  const clearSearch = () => {
    setQuery("");
  };

  // Add animation for the AI assistant suggestion
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.includes("laptop") || query.includes("computer")) {
        // This would be more sophisticated in a real app, using actual NLP
      }
    }, 800);
    
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <Card className="bg-gradient-to-b from-white to-blue-50">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4 text-center">What are you looking for today?</h2>
        
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex gap-2 relative">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                className="pl-10 pr-12 h-12 text-base"
                placeholder="Try: 'Laptop under $1500 with 16GB RAM and RTX graphics'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setTimeout(() => setSearchFocus(false), 200)}
              />
              {query.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8"
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={isRecording ? "destructive" : "outline"}
                  size="icon"
                  className="h-12 w-12"
                  onClick={handleVoiceInput}
                >
                  <Mic className={isRecording ? "animate-pulse" : ""} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search using your voice</p>
              </TooltipContent>
            </Tooltip>
            
            <Button type="submit" className="h-12 px-6">
              Search
            </Button>
          </div>
          
          {searchFocus && query.length > 2 && (
            <div className="absolute z-10 bg-white border rounded-md shadow-lg mt-1 w-full max-w-3xl p-2 animate-fade-in">
              <div className="flex items-center text-xs text-muted-foreground mb-2">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Suggestions
              </div>
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start text-left" 
                  onClick={() => handleExampleClick(`${query} with best reviews`)}
                >
                  <span>{query} <span className="text-primary">with best reviews</span></span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start text-left" 
                  onClick={() => handleExampleClick(`${query} under $300`)}
                >
                  <span>{query} <span className="text-primary">under $300</span></span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start text-left" 
                  onClick={() => handleExampleClick(`highest rated ${query}`)}
                >
                  <span><span className="text-primary">highest rated</span> {query}</span>
                </Button>
              </div>
            </div>
          )}
        </form>
        
        {showRecent && RECENT_SEARCHES.length > 0 && (
          <div className="mb-3">
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-muted-foreground">Recent Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {RECENT_SEARCHES.map((recent, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-accent flex items-center gap-1"
                  onClick={() => handleRecentClick(recent)}
                >
                  <span className="text-xs">{recent}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <Collapsible
          open={showExamples}
          onOpenChange={setShowExamples}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Example Queries</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Toggle examples</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <div className="flex flex-col gap-2 mb-4">
              {EXAMPLE_QUERIES.map((example, index) => (
                <Button 
                  key={index}
                  variant="ghost" 
                  className="justify-start text-left text-sm h-auto py-1 px-2"
                  onClick={() => handleExampleClick(example)}
                >
                  "{example}"
                </Button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible
          open={showCategories}
          onOpenChange={setShowCategories}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Popular Categories</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Toggle categories</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {CATEGORIES.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default SearchInterface;
