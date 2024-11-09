"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { StrategyData } from "@/lib/types";

interface StrategyVisualizerProps {
  data: StrategyData | null;
}

export function StrategyVisualizer({ data }: StrategyVisualizerProps) {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (data && data.tiers[0]) {
      const tier = data.tiers[0];
      const amount = data.dogeAmount;
      const bestCase = amount * tier.price;
      const worstCase = bestCase * (1 - tier.stopLoss / 100);

      setChartData([
        { name: "Entry", value: amount },
        { name: "Best Case", value: bestCase },
        { name: "Worst Case", value: worstCase },
      ]);
    }
  }, [data]);

  if (!data) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <p className="text-muted-foreground">Enter your strategy details</p>
      </div>
    );
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}