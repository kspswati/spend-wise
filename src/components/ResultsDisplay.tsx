
import React, { useState } from "react";
import { LayoutGrid, LayoutList, ChevronDown, Star, Info, Tag, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface ResultsDisplayProps {
  query: string;
}

// Sample data - in a real app, this would come from your backend based on the query
const generateSampleProducts = (query: string) => [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: 249.99,
    rating: 4.7,
    specs: ["Noise Cancellation", "40h Battery", "Bluetooth 5.0"],
    tag: "Top Rated",
    tagType: "success",
    priceHistory: [
      { date: "Jan", price: 299.99 },
      { date: "Feb", price: 279.99 },
      { date: "Mar", price: 279.99 },
      { date: "Apr", price: 259.99 },
      { date: "May", price: 249.99 }
    ],
    relevanceScore: 95,
    reasoning: "These headphones offer the best combination of sound quality, battery life, and noise cancellation in your budget range.",
    aiNotes: ["Matches your preference for premium audio brands", "Within your typical audio equipment budget range", "Has features you've searched for previously"]
  },
  {
    id: 2,
    name: "Ultra-Light Wireless Earbuds",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: 179.99,
    rating: 4.5,
    specs: ["Water Resistant", "24h Battery", "Touch Controls"],
    tag: "Best Price",
    tagType: "primary",
    priceHistory: [
      { date: "Jan", price: 199.99 },
      { date: "Feb", price: 189.99 },
      { date: "Mar", price: 189.99 },
      { date: "Apr", price: 189.99 },
      { date: "May", price: 179.99 }
    ],
    relevanceScore: 88,
    reasoning: "If portability is your priority, these earbuds offer excellent sound quality in a compact form factor at a lower price point.",
    aiNotes: ["Aligns with your preference for portable audio devices", "Good value based on your price sensitivity profile", "Similar to products you've viewed recently"]
  },
  {
    id: 3,
    name: "Premium Noise-Cancelling Headset",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: 329.99,
    rating: 4.8,
    specs: ["Active Noise Cancellation", "50h Battery", "Hi-Res Audio"],
    tag: "Premium Pick",
    tagType: "warning",
    priceHistory: [
      { date: "Jan", price: 349.99 },
      { date: "Feb", price: 349.99 },
      { date: "Mar", price: 339.99 },
      { date: "Apr", price: 329.99 },
      { date: "May", price: 329.99 }
    ],
    relevanceScore: 92,
    reasoning: "For audiophiles who prioritize sound quality, these headphones deliver studio-grade audio with excellent noise isolation.",
    aiNotes: ["Matches your preference for high-end audio equipment", "Features align with your past purchases", "Currently at its lowest price point this year"]
  },
  {
    id: 4,
    name: "Budget Wireless Earphones",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: 89.99,
    rating: 4.2,
    specs: ["IPX4 Water Resistant", "18h Battery", "Built-in Mic"],
    tag: "Budget Friendly",
    tagType: "default",
    priceHistory: [
      { date: "Jan", price: 99.99 },
      { date: "Feb", price: 99.99 },
      { date: "Mar", price: 94.99 },
      { date: "Apr", price: 94.99 },
      { date: "May", price: 89.99 }
    ],
    relevanceScore: 78,
    reasoning: "These earphones offer excellent value with decent sound quality and all essential features at an entry-level price point.",
    aiNotes: ["Good option if you're looking to save on budget", "Basic functionality meets the requirements in your search", "Popular entry-level choice with good reviews"]
  }
];

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ query }) => {
  const [displayMode, setDisplayMode] = useState<"grid" | "list">("grid");
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);
  const products = generateSampleProducts(query);
  
  const toggleProductExpansion = (productId: number) => {
    if (expandedProduct === productId) {
      setExpandedProduct(null);
    } else {
      setExpandedProduct(productId);
    }
  };
  
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-yellow-400 text-yellow-400 h-4 w-4" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="text-yellow-400 h-4 w-4" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-300 h-4 w-4" />);
    }
    
    return <div className="flex">{stars}</div>;
  };

  const getTagStyles = (tagType: string) => {
    switch (tagType) {
      case "success":
        return "bg-green-100 text-green-800";
      case "primary":
        return "bg-blue-100 text-blue-800";
      case "warning":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleFeedback = (productId: number, isPositive: boolean) => {
    console.log(`User gave ${isPositive ? 'positive' : 'negative'} feedback for product ${productId}`);
    // In a real app, this would send feedback to your backend
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="font-medium text-muted-foreground">
          Found {products.length} products matching your criteria
        </div>
        
        <div className="flex items-center gap-2">
          <Tabs defaultValue="grid" value={displayMode} onValueChange={(v) => setDisplayMode(v as "grid" | "list")}>
            <TabsList>
              <TabsTrigger value="grid">
                <LayoutGrid className="h-4 w-4 mr-1" />
                Grid
              </TabsTrigger>
              <TabsTrigger value="list">
                <LayoutList className="h-4 w-4 mr-1" />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className={displayMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden border-t-4 border-t-primary/40 hover:shadow-md transition-shadow">
            <div className={displayMode === "grid" ? "" : "flex"}>
              <div className={displayMode === "grid" ? "relative" : "relative w-1/3"}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className={`w-full object-cover ${displayMode === "grid" ? "h-48" : "h-full"}`}
                />
                {product.tag && (
                  <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium flex items-center ${getTagStyles(product.tagType)}`}>
                    <Tag className="h-3 w-3 mr-1" />
                    {product.tag}
                  </div>
                )}
              </div>
              
              <div className={displayMode === "grid" ? "" : "w-2/3"}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{product.name}</CardTitle>
                    <div className="text-lg font-bold text-primary">${product.price}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderRatingStars(product.rating)}
                    <span className="text-sm text-muted-foreground">{product.rating}/5</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {product.specs.map((spec, i) => (
                      <span key={i} className="text-xs bg-secondary px-2 py-1 rounded">{spec}</span>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Relevance to Your Search</span>
                      <span className="text-xs text-muted-foreground">{product.relevanceScore}%</span>
                    </div>
                    <Progress value={product.relevanceScore} className="h-2" />
                  </div>
                </CardContent>
                
                <CardFooter className="flex-col items-start pt-0 pb-3">
                  <Collapsible
                    open={expandedProduct === product.id}
                    onOpenChange={() => toggleProductExpansion(product.id)}
                    className="w-full"
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-0 h-auto w-full flex justify-between">
                        <div className="flex items-center">
                          <Info className="h-4 w-4 mr-2" />
                          <span>Why This Recommendation</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-2">
                      <p className="text-sm text-muted-foreground">{product.reasoning}</p>
                      
                      <div className="mt-3 bg-accent/30 p-3 rounded-md">
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <Info className="h-4 w-4 mr-1" />
                          AI-Generated Insights
                        </h4>
                        <ul className="space-y-1">
                          {product.aiNotes.map((note, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start">
                              <span className="mr-1.5 text-primary">•</span> {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-2">Price History</h4>
                        <div className="h-32">
                          <ChartContainer
                            config={{
                              price: { color: "hsl(var(--primary))" }
                            }}
                          >
                            <AreaChart
                              data={product.priceHistory}
                              margin={{
                                top: 5,
                                right: 5,
                                left: 0,
                                bottom: 5,
                              }}
                            >
                              <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <XAxis dataKey="date" />
                              <YAxis domain={['auto', 'auto']} />
                              <ChartTooltip
                                content={
                                  <ChartTooltipContent indicator="dot" />
                                }
                              />
                              <Area
                                type="monotone"
                                dataKey="price"
                                stroke="hsl(var(--primary))"
                                fillOpacity={1}
                                fill="url(#colorPrice)"
                              />
                            </AreaChart>
                          </ChartContainer>
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-4 pt-2 border-t border-dashed border-muted">
                        <span className="text-xs text-muted-foreground">Was this recommendation helpful?</span>
                        <div className="flex gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleFeedback(product.id, true)}
                              >
                                <ThumbsUp className="h-4 w-4 text-green-500" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>This recommendation is helpful</p>
                            </TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleFeedback(product.id, false)}
                              >
                                <ThumbsDown className="h-4 w-4 text-red-500" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>This recommendation is not helpful</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
