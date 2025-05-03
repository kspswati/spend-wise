
import React, { useState } from "react";
import { Mic, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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

const SearchInterface: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", query);
  };

  const handleVoiceInput = () => {
    // Toggle voice recording state
    setIsRecording(!isRecording);
    // Here you would implement actual voice recognition
    console.log("Voice input toggled");
  };

  const handleCategoryClick = (category: string) => {
    setQuery(category);
    // You could trigger search here or let the user refine the search
    console.log("Category selected:", category);
  };

  return (
    <Card className="bg-gradient-to-b from-white to-blue-50">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Find Your Perfect Products</h2>
        
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9 pr-4 h-12"
                placeholder="What are you shopping for today?"
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
            <Button type="submit" className="h-12">
              Search
            </Button>
          </div>
        </form>
        
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
