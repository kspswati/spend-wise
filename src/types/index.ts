
export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
  added: Date;
  purchased: boolean;
  rating?: number;
}

export interface Budget {
  total: number;
  spent: number;
  remaining: number;
  categories: {
    [key: string]: { 
      allocated: number;
      spent: number;
    };
  };
}

export interface ProductRecommendation {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  store: string;
  category: string;
}

export interface ValidationResult {
  canPurchase: boolean;
  message: string;
  alternativeSuggestions?: ProductRecommendation[];
}
