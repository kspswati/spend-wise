
import React, { useState } from "react";
import { useShopping } from "@/context/ShoppingContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign, Save } from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const Agent2BudgetManager: React.FC = () => {
  const { budget, updateBudget, allocateToCategoryBudget, categories } = useShopping();
  const [totalBudget, setTotalBudget] = useState(budget.total);
  const [categoryAllocations, setCategoryAllocations] = useState<Record<string, number>>(
    Object.fromEntries(
      Object.entries(budget.categories).map(([category, { allocated }]) => [category, allocated])
    )
  );

  const handleUpdateTotalBudget = () => {
    if (totalBudget <= 0) return;
    updateBudget({ total: totalBudget, remaining: totalBudget - budget.spent });
  };

  const handleUpdateCategoryBudget = (category: string) => {
    const amount = categoryAllocations[category];
    if (amount <= 0) return;
    allocateToCategoryBudget(category, amount);
  };

  const spentPercentage = (budget.spent / budget.total) * 100;

  return (
    <Card className="agent-card agent-card-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-agent2" />
          <span>Budget Manager</span>
        </CardTitle>
        <Badge variant="outline" className="bg-agent2/10 text-agent2 hover:bg-agent2/20">
          Agent 2
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total Budget</span>
              <span className="font-medium">${budget.total.toFixed(2)}</span>
            </div>
            <Progress value={spentPercentage} className="h-2" 
              style={{
                background: 'linear-gradient(to right, #dcfce7, #fef3c7, #fee2e2)',
              }}
            />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Spent: ${budget.spent.toFixed(2)}
              </span>
              <span className="text-muted-foreground">
                Remaining: ${budget.remaining.toFixed(2)}
              </span>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="edit-total-budget">
              <AccordionTrigger className="text-sm">Edit Total Budget</AccordionTrigger>
              <AccordionContent className="flex items-center gap-2">
                <Input
                  type="number"
                  min={1}
                  step={1}
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(parseFloat(e.target.value) || 0)}
                />
                <Button 
                  size="sm" 
                  onClick={handleUpdateTotalBudget}
                  className="bg-agent2 hover:bg-agent2/80"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="space-y-4 pt-2">
            <h3 className="font-medium">Category Budgets</h3>
            
            {Object.entries(budget.categories).map(([category, { allocated, spent }]) => {
              const percentage = allocated ? (spent / allocated) * 100 : 0;
              
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{category}</span>
                    <span className="font-medium">
                      ${spent.toFixed(2)} / ${allocated.toFixed(2)}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={1}
                      step={1}
                      value={categoryAllocations[category] || allocated}
                      onChange={(e) => 
                        setCategoryAllocations({
                          ...categoryAllocations,
                          [category]: parseFloat(e.target.value) || 0
                        })
                      }
                      className="h-8 text-sm"
                    />
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleUpdateCategoryBudget(category)}
                      className="h-8 text-xs"
                    >
                      Update
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Agent2BudgetManager;
