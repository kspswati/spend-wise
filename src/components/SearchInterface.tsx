
import React, { useState } from "react";
import { Mic, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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

const SearchInterface: React.FC<SearchInterfaceProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showExamples, setShowExamples] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recognition
    console.log("Voice input toggled");
  };

  const handleCategoryClick = (category: string) => {
    setQuery(category);
    // You could trigger search here or let the user refine the search
    console.log("Category selected:", category);
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
    onSearch(example);
  };

  return (
    <Card className="bg-gradient-to-b from-white to-blue-50">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4 text-center">What are you looking for today?</h2>
        
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                className="pl-10 pr-4 h-12 text-base"
                placeholder="Try: 'Laptop under $1500 with 16GB RAM and RTX graphics'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button
              type="button"
              variant={isRecording ? "destructive" : "outline"}
              size="icon"
              className="h-12 w-12"
              onClick={handleVoiceInput}
            >
              <Mic className={isRecording ? "animate-pulse" : ""} />
            </Button>
            <Button type="submit" className="h-12 px-6">
              Search
            </Button>
          </div>
        </form>
        
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
