"use client";

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ProfitData } from '@/lib/types';

interface ProfitSummaryProps {
  profits: ProfitData[];
  totalProfit: {
    min: number;
    max: number;
  };
}

export function ProfitSummary({ profits, totalProfit }: ProfitSummaryProps) {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-center text-2xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Profit Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {profits.map((profit, index) => (
          <div
            key={index}
            className="p-4 bg-gray-900/50 rounded-lg border border-gray-700"
          >
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">
              Tier {index + 1}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">DOGE Amount:</p>
                <p className="font-mono text-white">
                  {profit.dogeAmount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Max Profit:</p>
                <p className="font-mono text-green-400">
                  ${profit.maxProfit.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Min Profit:</p>
                <p className="font-mono text-yellow-400">
                  ${profit.minProfit.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-6 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold text-center mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Total Projected Profits
          </h3>
          <div className="grid grid-cols-2 gap-8 text-center">
            <div>
              <p className="text-gray-400 mb-2">Maximum</p>
              <p className="text-2xl font-mono text-green-400">
                ${totalProfit.max.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-2">Minimum</p>
              <p className="text-2xl font-mono text-yellow-400">
                ${totalProfit.min.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}