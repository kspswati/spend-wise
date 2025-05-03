
import React from "react";
import { ShoppingProvider } from "@/context/ShoppingContext";
import Agent1ShoppingList from "@/components/Agent1ShoppingList";
import Agent2BudgetManager from "@/components/Agent2BudgetManager";
import Agent3Recommendations from "@/components/Agent3Recommendations";
import Agent4Validator from "@/components/Agent4Validator";

const Dashboard: React.FC = () => {
  return (
    <ShoppingProvider>
      <div className="container py-6 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">SpendWise</h1>
          <p className="text-muted-foreground">Your intelligent shopping assistant</p>
        </header>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Agent1ShoppingList />
          <Agent2BudgetManager />
          <Agent3Recommendations />
          <Agent4Validator />
        </div>
      </div>
    </ShoppingProvider>
  );
};

export default Dashboard;
