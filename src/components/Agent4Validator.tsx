
import React, { useState } from "react";
import { useShopping } from "@/context/ShoppingContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, ListCheck, ShoppingCart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ShoppingItem } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProductRecommendation } from "@/types";

const Agent4Validator: React.FC = () => {
  const { items, validatePurchase, togglePurchased, addItem } = useShopping();
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  
  // Only unpurchased items
  const unpurchasedItems = items.filter(item => !item.purchased);
  const selectedItem = items.find(item => item.id === selectedItemId);
  const validationResult = selectedItemId ? validatePurchase(selectedItemId) : null;

  const handleItemChange = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  const handlePurchase = () => {
    if (selectedItemId) {
      togglePurchased(selectedItemId);
      setSelectedItemId("");
    }
  };

  const handleAddAlternative = (product: ProductRecommendation) => {
    addItem({
      name: product.name,
      quantity: 1,
      price: product.price,
      category: product.category
    });
  };

  return (
    <Card className="agent-card agent-card-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-agent4" />
          <span>Purchase Validator</span>
        </CardTitle>
        <Badge variant="outline" className="bg-agent4/10 text-agent4 hover:bg-agent4/20">
          Agent 4
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {unpurchasedItems.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-muted-foreground/50" />
              <p>No unpurchased items to validate</p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm">Select an item to validate</label>
                <Select value={selectedItemId} onValueChange={handleItemChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an item" />
                  </SelectTrigger>
                  <SelectContent>
                    {unpurchasedItems.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name} - ${(item.price * item.quantity).toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedItem && validationResult && (
                <div className="space-y-4 pt-2">
                  <ValidatorResult 
                    selectedItem={selectedItem} 
                    validationResult={validationResult}
                    onPurchase={handlePurchase}
                    onAddAlternative={handleAddAlternative}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ValidatorResult: React.FC<{
  selectedItem: ShoppingItem;
  validationResult: { canPurchase: boolean; message: string; alternativeSuggestions?: ProductRecommendation[] };
  onPurchase: () => void;
  onAddAlternative: (product: ProductRecommendation) => void;
}> = ({ selectedItem, validationResult, onPurchase, onAddAlternative }) => {
  return (
    <div className="space-y-4">
      <Alert variant={validationResult.canPurchase ? "default" : "destructive"}>
        {validationResult.canPurchase ? (
          <Check className="h-4 w-4" />
        ) : (
          <X className="h-4 w-4" />
        )}
        <AlertTitle>
          {validationResult.canPurchase ? "Purchase Approved" : "Purchase Warning"}
        </AlertTitle>
        <AlertDescription>
          {validationResult.message}
        </AlertDescription>
      </Alert>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h3 className="text-sm font-medium">{selectedItem.name}</h3>
          <p className="text-sm text-muted-foreground">
            {selectedItem.quantity} × ${selectedItem.price.toFixed(2)} = ${(selectedItem.quantity * selectedItem.price).toFixed(2)}
          </p>
        </div>

        <Button
          onClick={onPurchase}
          disabled={!validationResult.canPurchase}
          className={validationResult.canPurchase ? "bg-agent4 hover:bg-agent4/80" : ""}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Mark as Purchased
        </Button>
      </div>

      {!validationResult.canPurchase && validationResult.alternativeSuggestions && validationResult.alternativeSuggestions.length > 0 && (
        <div className="pt-2">
          <h3 className="text-sm font-medium mb-2">Alternative Suggestions</h3>
          <div className="grid gap-2">
            {validationResult.alternativeSuggestions.map((product) => (
              <div 
                key={product.id}
                className="border rounded-lg p-3 bg-white flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{product.name}</p>
                  <div className="flex gap-4">
                    <span className="text-sm">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground">{product.store}</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="h-8 text-xs border-agent4/30 text-agent4 hover:text-agent4 hover:bg-agent4/10"
                  onClick={() => onAddAlternative(product)}
                >
                  <ListCheck className="h-3.5 w-3.5 mr-1" />
                  Add to List
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Agent4Validator;
