import { Tier, ProfitData } from './types';

export function calculateProfits(dogeAmount: number, tiers: Tier[]) {
  let remainingDoge = dogeAmount;
  let totalMin = 0;
  let totalMax = 0;

  const profits: ProfitData[] = tiers.map((tier) => {
    const dogeToSell = (remainingDoge * tier.percentage) / 100;
    const maxProfit = dogeToSell * tier.price;
    const minProfit = maxProfit * (1 - tier.tsl / 100);

    remainingDoge -= dogeToSell;
    totalMin += minProfit;
    totalMax += maxProfit;

    return {
      dogeAmount: dogeToSell,
      maxProfit,
      minProfit,
    };
  });

  return {
    profits,
    totalMin,
    totalMax,
  };
}