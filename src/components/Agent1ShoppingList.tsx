
import React, { useState } from "react";
import { useShopping } from "@/context/ShoppingContext";
import { ShoppingItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ListCheck, Plus, X, ShoppingCart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Agent1ShoppingList: React.FC = () => {
  const { 
    items, 
    addItem, 
    removeItem, 
    togglePurchased, 
    categories, 
    currentCategory, 
    setCurrentCategory 
  } = useShopping();
  
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [newItemPrice, setNewItemPrice] = useState(0);
  const [showOnlyUnpurchased, setShowOnlyUnpurchased] = useState(true);
  
  const filteredItems = items.filter(item => 
    (currentCategory === "All" || item.category === currentCategory) &&
    (!showOnlyUnpurchased || !item.purchased)
  );

  const handleAddItem = () => {
    if (!newItemName.trim()) {
      toast({
        title: "Error",
        description: "Please enter an item name",
        variant: "destructive"
      });
      return;
    }
    
    if (newItemPrice <= 0) {
      toast({
        title: "Error",
        description: "Price must be greater than 0",
        variant: "destructive"
      });
      return;
    }
    
    addItem({
      name: newItemName,
      quantity: newItemQuantity,
      price: newItemPrice,
      category: currentCategory === "All" ? "Groceries" : currentCategory
    });
    
    // Reset form
    setNewItemName("");
    setNewItemPrice(0);
    setNewItemQuantity(1);
  };

  return (
    <Card className="agent-card agent-card-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <ListCheck className="h-5 w-5 text-agent1" />
          <span>Shopping List Assistant</span>
        </CardTitle>
        <Badge variant="outline" className="bg-agent1/10 text-agent1 hover:bg-agent1/20">
          Agent 1
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Input
                placeholder="Item name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
            </div>
            <div className="w-20">
              <Input
                type="number"
                placeholder="Qty"
                min={1}
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="w-24">
              <Input
                type="number"
                placeholder="Price"
                min={0}
                step={0.01}
                value={newItemPrice || ""}
                onChange={(e) => setNewItemPrice(parseFloat(e.target.value) || 0)}
              />
            </div>
            <Button onClick={handleAddItem} size="icon" className="bg-agent1 hover:bg-agent1/80">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Checkbox 
                id="show-unpurchased"
                checked={showOnlyUnpurchased}
                onCheckedChange={(checked) => setShowOnlyUnpurchased(!!checked)}
              />
              <label htmlFor="show-unpurchased" className="text-sm cursor-pointer">
                Show only unpurchased
              </label>
            </div>
            
            <Select value={currentCategory} onValueChange={setCurrentCategory}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 mt-2">
            {filteredItems.length === 0 ? (
              <div className="text-center p-8 text-muted-foreground">
                <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-muted-foreground/50" />
                <p>No items in your shopping list</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <ShoppingListItem 
                  key={item.id} 
                  item={item} 
                  onRemove={removeItem} 
                  onToggle={togglePurchased} 
                />
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ShoppingListItem: React.FC<{ 
  item: ShoppingItem; 
  onRemove: (id: string) => void; 
  onToggle: (id: string) => void;
}> = ({ item, onRemove, onToggle }) => {
  const { validatePurchase } = useShopping();
  const validationResult = validatePurchase(item.id);
  
  return (
    <div className={`flex items-center justify-between p-2 rounded border ${
      item.purchased ? "bg-muted border-transparent" : "bg-white border-border"
    }`}>
      <div className="flex items-center gap-3">
        <Checkbox 
          checked={item.purchased}
          onCheckedChange={() => onToggle(item.id)}
          disabled={!validationResult.canPurchase && !item.purchased}
        />
        <div className={`flex flex-col ${item.purchased ? "text-muted-foreground line-through" : ""}`}>
          <span className="font-medium">{item.name}</span>
          <div className="flex gap-2 text-xs text-muted-foreground">
            <span>{item.quantity} × ${item.price.toFixed(2)}</span>
            <span>•</span>
            <span>{item.category}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {!item.purchased && !validationResult.canPurchase && (
          <Badge variant="outline" className="bg-destructive/10 text-destructive hover:bg-destructive/20 text-xs">
            Budget!
          </Badge>
        )}
        <span className="font-medium">${(item.quantity * item.price).toFixed(2)}</span>
        <Button variant="ghost" size="icon" onClick={() => onRemove(item.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Agent1ShoppingList;
