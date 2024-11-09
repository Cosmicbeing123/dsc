"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { TierManager } from './tier-manager';
import { ProfitSummary } from './profit-summary';
import { StrategyCharts } from './strategy-charts';
import { calculateProfits } from '@/lib/calculations';
import { Tier, ProfitData } from '@/lib/types';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';

export function DogecoinStrategyPlanner() {
  const [dogeAmount, setDogeAmount] = useState(1000000);
  const [tiers, setTiers] = useState<Tier[]>([
    { price: 1, percentage: 25, tsl: 10 },
    { price: 2, percentage: 25, tsl: 15 },
    { price: 5, percentage: 25, tsl: 20 },
    { price: 10, percentage: 25, tsl: 25 },
  ]);
  const [profits, setProfits] = useState<ProfitData[]>([]);
  const [totalProfit, setTotalProfit] = useState({ min: 0, max: 0 });

  useEffect(() => {
    const { profits, totalMin, totalMax } = calculateProfits(dogeAmount, tiers);
    setProfits(profits);
    setTotalProfit({ min: totalMin, max: totalMax });
  }, [dogeAmount, tiers]);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="relative w-16 h-16">
          <Image
            src="https://cryptologos.cc/logos/dogecoin-doge-logo.png"
            alt="Dogecoin"
            fill
            className="object-contain drop-shadow-[0_0_0.3rem_#ffffff70]"
          />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
          Dogecoin Strategy Planner
        </h1>
      </div>

      <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm mb-8">
        <CardContent className="pt-6">
          <label htmlFor="dogeAmount" className="block mb-2 text-yellow-400 font-medium">
            Total DOGE Amount:
          </label>
          <Input
            id="dogeAmount"
            type="number"
            value={dogeAmount}
            onChange={(e) => setDogeAmount(Number(e.target.value))}
            className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
            placeholder="Enter DOGE amount"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <TierManager tiers={tiers} setTiers={setTiers} />
          <ProfitSummary profits={profits} totalProfit={totalProfit} />
        </div>
        <div>
          <StrategyCharts profits={profits} tiers={tiers} />
        </div>
      </div>
    </div>
  );
}