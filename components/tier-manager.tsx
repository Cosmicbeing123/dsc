"use client";

import { Tier } from '@/lib/types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Trash2Icon, PlusCircleIcon } from 'lucide-react';

interface TierManagerProps {
  tiers: Tier[];
  setTiers: (tiers: Tier[]) => void;
}

export function TierManager({ tiers, setTiers }: TierManagerProps) {
  const addTier = () => {
    setTiers([...tiers, { price: 0, percentage: 0, tsl: 0 }]);
  };

  const removeTier = (index: number) => {
    setTiers(tiers.filter((_, i) => i !== index));
  };

  const updateTier = (index: number, field: keyof Tier, value: number) => {
    const newTiers = [...tiers];
    newTiers[index][field] = value;
    setTiers(newTiers);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-yellow-400">Strategy Tiers</h2>
        <Button 
          onClick={addTier} 
          variant="outline" 
          className="gap-2 border-yellow-400/50 hover:bg-yellow-400/10 text-yellow-400"
        >
          <PlusCircleIcon className="w-4 h-4" />
          Add Tier
        </Button>
      </div>

      <div className="space-y-4">
        {tiers.map((tier, index) => (
          <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-yellow-400">Tier {index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeTier(index)}
                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
              >
                <Trash2Icon className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Price ($)</label>
                <Input
                  type="number"
                  value={tier.price}
                  onChange={(e) => updateTier(index, 'price', Number(e.target.value))}
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Percentage (%)</label>
                <Input
                  type="number"
                  value={tier.percentage}
                  onChange={(e) => updateTier(index, 'percentage', Number(e.target.value))}
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Stop Loss (%)</label>
                <Input
                  type="number"
                  value={tier.tsl}
                  onChange={(e) => updateTier(index, 'tsl', Number(e.target.value))}
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                  placeholder="0"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}