
import React, { useState, useEffect, useRef } from "react";
import { Mic, Search, X, Sparkles, TrendingUp, Tag, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { fadeInAnimation, hoverScaleAnimation, buttonPressAnimation, popInAnimation } from "@/lib/animation-utils";

interface SearchInterfaceProps {
  onSearch: (query: string) => void;
}

// Search suggestions based on categories and trends
const SEARCH_SUGGESTIONS = [
  {
    category: "Trending Now",
    icon: <TrendingUp className="h-4 w-4 text-rose-400" />,
    items: [
      "Foldable smartphones under $1200",
      "Best smart home devices 2025",
      "OLED gaming monitors with high refresh rate"
    ]
  },
  {
    category: "Best Deals",
    icon: <Tag className="h-4 w-4 text-emerald-400" />,
    items: [
      "Noise-cancelling headphones under $200",
      "Robot vacuums on sale this week",
      "Wireless earbuds with longest battery life"
    ]
  },
  {
    category: "Top Categories",
    icon: <Zap className="h-4 w-4 text-amber-400" />,
    items: [
      "4K smart TVs with HDMI 2.1",
      "Ultralight gaming mice",
      "Mechanical keyboards with hot-swappable switches"
    ]
  }
];

const RECENT_SEARCHES = [
  "Wireless earbuds with noise cancellation",
  "Kitchen gadgets under $50",
  "Winter jackets women's medium"
];

const SearchInterface: React.FC<SearchInterfaceProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showRecent, setShowRecent] = useState(true);
  const [searchFocus, setSearchFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      onSearch(query);
      setShowSuggestions(false);
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

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleRecentClick = (recent: string) => {
    setQuery(recent);
    onSearch(recent);
  };

  const clearSearch = () => {
    setQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) && 
        !event.target?.toString().includes('CommandItem')
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Card className="bg-gradient-to-b from-white to-secondary/20 border border-accent/20 shadow-md rounded-2xl overflow-visible">
      <CardContent className="pt-8 pb-6">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
          What are you looking for today?
        </h2>
        
        <form onSubmit={handleSearch} className="relative mb-4">
          <div className="flex gap-2 relative">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                ref={inputRef}
                className={`pl-10 pr-12 h-12 text-base rounded-xl transition-all duration-200 ${searchFocus ? 'search-input-focused' : 'shadow'}`}
                placeholder="Search for products, brands, or categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => {
                  setSearchFocus(true);
                  setShowSuggestions(true);
                }}
                onBlur={() => setSearchFocus(false)}
              />
              {query.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8 hover:bg-accent/50 rounded-full"
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
                  className={`h-12 w-12 rounded-xl ${buttonPressAnimation} ${isRecording ? 'bg-destructive text-white' : 'border-accent/30'}`}
                  onClick={handleVoiceInput}
                >
                  <Mic className={isRecording ? "animate-pulse" : ""} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search using your voice</p>
              </TooltipContent>
            </Tooltip>
            
            <Button 
              type="submit" 
              className={`h-12 px-6 rounded-xl shadow-sm ${buttonPressAnimation}`}
            >
              Search
            </Button>
          </div>
          
          {showSuggestions && (
            <div className={`absolute z-10 w-full bg-white rounded-xl border border-accent/30 shadow-xl mt-2 overflow-hidden transition-all ${popInAnimation}`}>
              <Command>
                <CommandList className="max-h-80">
                  <CommandEmpty>No suggestions found.</CommandEmpty>
                  
                  {showRecent && RECENT_SEARCHES.length > 0 && (
                    <CommandGroup heading="Recent Searches">
                      {RECENT_SEARCHES.map((recent, index) => (
                        <CommandItem 
                          key={index} 
                          className={`${hoverScaleAnimation} cursor-pointer py-2`}
                          onSelect={() => handleRecentClick(recent)}
                        >
                          <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{recent}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                  
                  {SEARCH_SUGGESTIONS.map((group, groupIndex) => (
                    <CommandGroup key={groupIndex} heading={group.category}>
                      {group.items.map((item, itemIndex) => (
                        <CommandItem 
                          key={`${groupIndex}-${itemIndex}`} 
                          className={`${hoverScaleAnimation} cursor-pointer py-2`}
                          onSelect={() => handleSuggestionClick(item)}
                        >
                          {group.icon}
                          <span className="ml-2">{item}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                  
                  <CommandGroup heading="AI Suggestions">
                    <CommandItem 
                      className={`${hoverScaleAnimation} cursor-pointer py-2 border-t`}
                      onSelect={() => handleSuggestionClick(query + " best value for money")}
                    >
                      <Sparkles className="mr-2 h-4 w-4 text-primary" />
                      <span>{query || "Your search"} <span className="text-primary">best value for money</span></span>
                    </CommandItem>
                    <CommandItem 
                      className={`${hoverScaleAnimation} cursor-pointer py-2`}
                      onSelect={() => handleSuggestionClick("highest rated " + query)}
                    >
                      <Sparkles className="mr-2 h-4 w-4 text-primary" />
                      <span><span className="text-primary">highest rated</span> {query || "products"}</span>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          )}
        </form>
        
        {showRecent && RECENT_SEARCHES.length > 0 && !showSuggestions && (
          <div className="mb-3">
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-muted-foreground">Recent Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {RECENT_SEARCHES.map((recent, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className={`cursor-pointer hover:bg-accent border-accent/30 px-3 py-1.5 rounded-lg ${hoverScaleAnimation}`}
                  onClick={() => handleRecentClick(recent)}
                >
                  <span className="text-xs">{recent}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchInterface;
