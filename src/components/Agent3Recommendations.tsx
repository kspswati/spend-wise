
import React from "react";
import { useShopping } from "@/context/ShoppingContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarIcon, ListCheck, Search } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ProductRecommendation } from "@/types";

const Agent3Recommendations: React.FC = () => {
  const { 
    recommendations, 
    currentCategory, 
    setCurrentCategory, 
    categories, 
    addItem 
  } = useShopping();

  const handleAddToList = (product: ProductRecommendation) => {
    addItem({
      name: product.name,
      quantity: 1,
      price: product.price,
      category: product.category
    });
  };

  return (
    <Card className="agent-card agent-card-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Search className="h-5 w-5 text-agent3" />
          <span>Product Recommender</span>
        </CardTitle>
        <Badge variant="outline" className="bg-agent3/10 text-agent3 hover:bg-agent3/20">
          Agent 3
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Recommended for you</span>
            <Select value={currentCategory} onValueChange={setCurrentCategory}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {recommendations.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-2 text-muted-foreground/50" />
              <p>No recommendations available</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              {recommendations.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToList={handleAddToList} 
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ProductCard: React.FC<{ 
  product: ProductRecommendation; 
  onAddToList: (product: ProductRecommendation) => void;
}> = ({ product, onAddToList }) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="p-4 flex gap-3">
        <div className="h-20 w-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-1">
          <h3 className="font-medium">{product.name}</h3>
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon 
                  key={i} 
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(product.rating) 
                      ? "text-yellow-500 fill-yellow-500" 
                      : "text-gray-300 fill-gray-300"
                  }`} 
                />
              ))}
              <span className="text-xs ml-1 text-muted-foreground">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs ml-2 text-muted-foreground">{product.store}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="font-medium">${product.price.toFixed(2)}</span>
            <Button 
              size="sm" 
              variant="outline"
              className="h-8 text-xs flex items-center gap-1 border-agent3/30 text-agent3 hover:text-agent3 hover:bg-agent3/10"
              onClick={() => onAddToList(product)}
            >
              <ListCheck className="h-3.5 w-3.5" />
              Add to List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agent3Recommendations;
