
import React, { useState } from "react";
import { Check, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const UserPreferences: React.FC = () => {
  // State for user preferences
  const [priceSensitivity, setPriceSensitivity] = useState(70);
  const [shoppingPriorities, setShoppingPriorities] = useState({
    quality: 60,
    price: 80,
    convenience: 40
  });
  
  // Sample brand preferences
  const [brandPreferences, setBrandPreferences] = useState({
    "Apple": true,
    "Samsung": true,
    "Sony": false,
    "LG": false,
    "Nike": true,
    "Adidas": false
  });
  
  // Budget categories
  const [budgetCategories, setBudgetCategories] = useState([
    { name: "Electronics", allocation: 500 },
    { name: "Clothing", allocation: 200 },
    { name: "Home", allocation: 300 }
  ]);
  
  // New category input
  const [newCategory, setNewCategory] = useState("");
  const [newAllocation, setNewAllocation] = useState(100);
  
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
  
  const addBudgetCategory = () => {
    if (newCategory.trim() !== "") {
      setBudgetCategories([
        ...budgetCategories,
        { name: newCategory, allocation: newAllocation }
      ]);
      setNewCategory("");
      setNewAllocation(100);
    }
  };
  
  const savePreferences = () => {
    console.log("Saving preferences:", {
      priceSensitivity,
      shoppingPriorities,
      brandPreferences,
      budgetCategories
    });
    // Here you would implement saving to backend
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Shopping Preferences</h2>
        <Button onClick={savePreferences}>
          <Save className="mr-2 h-4 w-4" />
          Save Preferences
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Price Sensitivity</CardTitle>
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
            <CardTitle>Shopping Priorities</CardTitle>
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
            <CardTitle>Brand Preferences</CardTitle>
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
            <CardTitle>Budget Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <Label>{category.name}</Label>
                    <span className="text-sm font-medium">${category.allocation}</span>
                  </div>
                  <Slider 
                    value={[category.allocation]} 
                    onValueChange={([value]) => handleBudgetChange(index, value)} 
                    min={10}
                    max={1000} 
                    step={10}
                  />
                  <Separator className="my-2" />
                </div>
              ))}
              
              <div className="pt-2 flex gap-2">
                <Input 
                  placeholder="New Category" 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1"
                />
                <Input 
                  type="number" 
                  placeholder="Budget" 
                  value={newAllocation}
                  onChange={(e) => setNewAllocation(Number(e.target.value))}
                  className="w-24"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={addBudgetCategory}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserPreferences;
