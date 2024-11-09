"use client";

import { Dog } from "lucide-react";
import { useState } from "react";
import { StrategyForm } from "@/components/strategy-form";
import { StrategyVisualizer } from "@/components/strategy-visualizer";
import { StrategyData } from "@/lib/types";

export function DogecoinStrategy() {
  const [strategyData, setStrategyData] = useState<StrategyData | null>(null);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Dog className="w-12 h-12 text-yellow-500" />
          <h1 className="text-4xl font-bold">DogePro Strategy</h1>
        </div>
        <p className="text-muted-foreground">
          Visualize and optimize your Dogecoin selling strategy
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="p-6 border rounded-lg">
          <StrategyForm onStrategySubmit={setStrategyData} />
        </div>
        <div className="p-6 border rounded-lg">
          <StrategyVisualizer data={strategyData} />
        </div>
      </div>
    </div>
  );
}
