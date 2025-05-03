
import React, { createContext, useContext, useState, useEffect } from "react";
import { ShoppingItem, Budget, ProductRecommendation, ValidationResult } from "@/types";
import { toast } from "@/components/ui/use-toast";

interface ShoppingContextProps {
  // Agent 1: Shopping List
  items: ShoppingItem[];
  addItem: (item: Omit<ShoppingItem, 'id' | 'added' | 'purchased'>) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<ShoppingItem>) => void;
  togglePurchased: (id: string) => void;
  
  // Agent 2: Budget Manager
  budget: Budget;
  updateBudget: (updates: Partial<Budget>) => void;
  allocateToCategoryBudget: (category: string, amount: number) => void;
  
  // Agent 3: Recommendation Engine
  recommendations: ProductRecommendation[];
  getRecommendations: (category: string) => void;
  
  // Agent 4: Purchase Validator
  validatePurchase: (itemId: string) => ValidationResult;
  
  // Current category filter
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
  categories: string[];
}

const ShoppingContext = createContext<ShoppingContextProps | undefined>(undefined);

// Sample data
const initialItems: ShoppingItem[] = [
  { id: "1", name: "Milk", quantity: 1, price: 3.99, category: "Groceries", added: new Date(), purchased: false },
  { id: "2", name: "Bread", quantity: 2, price: 2.49, category: "Groceries", added: new Date(), purchased: false },
  { id: "3", name: "Eggs", quantity: 1, price: 4.99, category: "Groceries", added: new Date(), purchased: true }
];

const initialBudget: Budget = {
  total: 500,
  spent: 11.47,
  remaining: 488.53,
  categories: {
    "Groceries": { allocated: 200, spent: 11.47 },
    "Electronics": { allocated: 100, spent: 0 },
    "Clothing": { allocated: 100, spent: 0 },
    "Home": { allocated: 100, spent: 0 }
  }
};

const sampleRecommendations: ProductRecommendation[] = [
  { 
    id: "r1", 
    name: "Organic Whole Milk", 
    price: 3.49, 
    rating: 4.8, 
    image: "/placeholder.svg", 
    store: "Whole Foods",
    category: "Groceries"
  },
  { 
    id: "r2", 
    name: "Natural Wheat Bread", 
    price: 2.29, 
    rating: 4.5, 
    image: "/placeholder.svg", 
    store: "Trader Joe's",
    category: "Groceries"
  },
  { 
    id: "r3", 
    name: "Free Range Eggs (Dozen)", 
    price: 4.49, 
    rating: 4.9, 
    image: "/placeholder.svg", 
    store: "Local Market",
    category: "Groceries"
  },
  { 
    id: "r4", 
    name: "Wireless Earbuds", 
    price: 89.99, 
    rating: 4.7, 
    image: "/placeholder.svg", 
    store: "ElectroShop",
    category: "Electronics"
  },
  { 
    id: "r5", 
    name: "Smart Watch", 
    price: 199.99, 
    rating: 4.6, 
    image: "/placeholder.svg", 
    store: "TechZone",
    category: "Electronics"
  }
];

export const ShoppingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ShoppingItem[]>(initialItems);
  const [budget, setBudget] = useState<Budget>(initialBudget);
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>(sampleRecommendations.filter(r => r.category === "Groceries"));
  const [currentCategory, setCurrentCategory] = useState<string>("Groceries");
  const [categories] = useState<string[]>(["Groceries", "Electronics", "Clothing", "Home"]);

  // Agent 1: Shopping List Management
  const addItem = (item: Omit<ShoppingItem, 'id' | 'added' | 'purchased'>) => {
    const newItem: ShoppingItem = {
      ...item,
      id: Date.now().toString(),
      added: new Date(),
      purchased: false
    };
    
    setItems(prev => [...prev, newItem]);
    toast({ 
      title: "Item added",
      description: `${item.name} has been added to your shopping list.`
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast({ 
      description: "Item removed from your shopping list."
    });
  };

  const updateItem = (id: string, updates: Partial<ShoppingItem>) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const togglePurchased = (id: string) => {
    setItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          const isPurchased = !item.purchased;
          
          // Update budget when marking as purchased
          if (isPurchased) {
            const totalCost = item.price * item.quantity;
            updateBudgetOnPurchase(item.category, totalCost);
          }
          
          return { ...item, purchased: isPurchased };
        }
        return item;
      })
    );
  };

  // Agent 2: Budget Management
  const updateBudget = (updates: Partial<Budget>) => {
    setBudget(prev => ({ ...prev, ...updates }));
  };

  const updateBudgetOnPurchase = (category: string, amount: number) => {
    setBudget(prev => {
      const newBudget = { ...prev };
      newBudget.spent += amount;
      newBudget.remaining = newBudget.total - newBudget.spent;
      
      if (newBudget.categories[category]) {
        newBudget.categories[category].spent += amount;
      } else {
        // If category doesn't exist, create it
        newBudget.categories[category] = {
          allocated: amount * 2, // Default allocation
          spent: amount
        };
      }
      
      return newBudget;
    });
  };

  const allocateToCategoryBudget = (category: string, amount: number) => {
    setBudget(prev => {
      const newBudget = { ...prev };
      
      if (newBudget.categories[category]) {
        newBudget.categories[category].allocated = amount;
      } else {
        newBudget.categories[category] = {
          allocated: amount,
          spent: 0
        };
      }
      
      return newBudget;
    });
    
    toast({ 
      title: "Budget Updated",
      description: `${category} budget set to $${amount.toFixed(2)}`
    });
  };

  // Agent 3: Recommendation Engine
  const getRecommendations = (category: string) => {
    // Simulate API call to get recommendations
    // In a real app, this would make an actual API request
    setTimeout(() => {
      const filtered = sampleRecommendations.filter(r => r.category === category);
      setRecommendations(filtered.length > 0 ? filtered : sampleRecommendations);
    }, 300);
  };

  // Agent 4: Purchase Validation
  const validatePurchase = (itemId: string): ValidationResult => {
    const item = items.find(i => i.id === itemId);
    if (!item) {
      return {
        canPurchase: false,
        message: "Item not found"
      };
    }

    const totalCost = item.price * item.quantity;
    const categoryBudget = budget.categories[item.category]?.allocated || 0;
    const categorySpent = budget.categories[item.category]?.spent || 0;
    
    if (budget.remaining < totalCost) {
      // Over total budget
      return {
        canPurchase: false,
        message: "This purchase would exceed your total budget",
        alternativeSuggestions: getSimilarCheaperOptions(item)
      };
    } else if ((categoryBudget - categorySpent) < totalCost) {
      // Over category budget
      return {
        canPurchase: false,
        message: `This purchase would exceed your ${item.category} budget`,
        alternativeSuggestions: getSimilarCheaperOptions(item)
      };
    }
    
    return {
      canPurchase: true,
      message: "This purchase is within your budget"
    };
  };

  // Helper for Agent 4
  const getSimilarCheaperOptions = (item: ShoppingItem): ProductRecommendation[] => {
    // Find similar but cheaper items
    return sampleRecommendations
      .filter(r => 
        r.category === item.category && 
        r.price < item.price &&
        r.name.toLowerCase().includes(item.name.toLowerCase())
      )
      .slice(0, 2);
  };

  // Update recommendations when category changes
  useEffect(() => {
    getRecommendations(currentCategory);
  }, [currentCategory]);

  return (
    <ShoppingContext.Provider value={{
      // Agent 1
      items,
      addItem,
      removeItem,
      updateItem,
      togglePurchased,
      
      // Agent 2
      budget,
      updateBudget,
      allocateToCategoryBudget,
      
      // Agent 3
      recommendations,
      getRecommendations,
      
      // Agent 4
      validatePurchase,
      
      // Shared state
      currentCategory,
      setCurrentCategory,
      categories
    }}>
      {children}
    </ShoppingContext.Provider>
  );
};

export const useShopping = () => {
  const context = useContext(ShoppingContext);
  if (context === undefined) {
    throw new Error("useShopping must be used within a ShoppingProvider");
  }
  return context;
};
