
import React, { useState } from "react";
import { Check, RefreshCw, ThumbsUp, ThumbsDown, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

const UserPreferences: React.FC = () => {
  // State for inferred user preferences (in real implementation, these would come from AI backend)
  const [priceSensitivity, setPriceSensitivity] = useState(70);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Sample inferred preferences
  const [shoppingPriorities, setShoppingPriorities] = useState({
    quality: 60,
    price: 80,
    convenience: 40
  });
  
  // Sample brand preferences inferred from user behavior
  const [brandPreferences, setBrandPreferences] = useState({
    "Apple": true,
    "Samsung": true,
    "Sony": false,
    "LG": false,
    "Nike": true,
    "Adidas": false
  });
  
  // Budget categories inferred from spending habits
  const [budgetCategories, setBudgetCategories] = useState([
    { name: "Electronics", allocation: 500, confidence: 85 },
    { name: "Clothing", allocation: 200, confidence: 92 },
    { name: "Home", allocation: 300, confidence: 78 }
  ]);
  
  const handleBrandToggle = (brand: string) => {
    setBrandPreferences({
      ...brandPreferences,
      [brand]: !brandPreferences[brand as keyof typeof brandPreferences]
    });
  };
  
  const handlePriorityChange = (priority: keyof typeof shoppingPriorities, value: number) => {
    setShoppingPriorities({
      ...shoppingPriorities,
      [priority]: value
    });
  };
  
  const handleBudgetChange = (index: number, value: number) => {
    const updated = [...budgetCategories];
    updated[index].allocation = value;
    setBudgetCategories(updated);
  };
  
  const refreshInferences = () => {
    setIsRefreshing(true);
    // In a real implementation, this would call the AI backend to refresh inferences
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">AI-Inferred Preferences</h2>
          <p className="text-sm text-muted-foreground">These preferences are automatically detected based on your shopping behavior</p>
        </div>
        <Button 
          onClick={refreshInferences} 
          variant="outline" 
          disabled={isRefreshing}
          className="flex gap-2 items-center"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Price Sensitivity</span>
              <Badge variant="outline" className="ml-2">AI Detected</Badge>
            </CardTitle>
            <CardDescription>Based on your previous purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>How price-sensitive are you?</Label>
                  <span className="text-sm font-medium">{priceSensitivity}%</span>
                </div>
                <Slider 
                  value={[priceSensitivity]} 
                  onValueChange={([value]) => setPriceSensitivity(value)} 
                  max={100} 
                  step={1}
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">Save Every Penny</span>
                  <span className="text-xs text-muted-foreground">Quality Over Price</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Shopping Priorities</span>
              <Badge variant="outline" className="ml-2">AI Detected</Badge>
            </CardTitle>
            <CardDescription>Based on your shopping patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Quality</Label>
                  <span className="text-sm font-medium">{shoppingPriorities.quality}%</span>
                </div>
                <Slider 
                  value={[shoppingPriorities.quality]} 
                  onValueChange={([value]) => handlePriorityChange("quality", value)} 
                  max={100} 
                  step={1}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Price</Label>
                  <span className="text-sm font-medium">{shoppingPriorities.price}%</span>
                </div>
                <Slider 
                  value={[shoppingPriorities.price]} 
                  onValueChange={([value]) => handlePriorityChange("price", value)} 
                  max={100} 
                  step={1}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Convenience</Label>
                  <span className="text-sm font-medium">{shoppingPriorities.convenience}%</span>
                </div>
                <Slider 
                  value={[shoppingPriorities.convenience]} 
                  onValueChange={([value]) => handlePriorityChange("convenience", value)} 
                  max={100} 
                  step={1}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Brand Preferences</span>
              <Badge variant="outline" className="ml-2">AI Detected</Badge>
            </CardTitle>
            <CardDescription>Based on your browsing and purchase history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(brandPreferences).map(([brand, preferred]) => (
                <div key={brand} className="flex items-center justify-between space-x-2">
                  <Label htmlFor={`brand-${brand}`} className="flex-1 cursor-pointer">
                    {brand}
                  </Label>
                  <Switch
                    id={`brand-${brand}`}
                    checked={preferred}
                    onCheckedChange={() => handleBrandToggle(brand)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Budget Categories</span>
              <Badge variant="outline" className="ml-2">AI Detected</Badge>
            </CardTitle>
            <CardDescription>Based on your spending patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                      <Label>{category.name}</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                            <Info className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[200px] text-xs">
                            AI confidence: {category.confidence}%
                            <br />
                            Based on your past {category.name.toLowerCase()} purchases
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span className="text-sm font-medium">${category.allocation}</span>
                  </div>
                  <Slider 
                    value={[category.allocation]} 
                    onValueChange={([value]) => handleBudgetChange(index, value)} 
                    min={10}
                    max={1000} 
                    step={10}
                  />
                  <Progress value={category.confidence} className="h-1" />
                  <Separator className="my-2" />
                </div>
              ))}
              
              <p className="text-xs text-muted-foreground mt-4">
                These budget categories were automatically determined based on your shopping history
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserPreferences;
