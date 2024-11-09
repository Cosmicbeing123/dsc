"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const formSchema = z.object({
  dogeAmount: z.number().min(0),
  price: z.number().min(0),
  stopLoss: z.number().min(0).max(100),
});

type StrategyFormProps = {
  onStrategySubmit: (data: StrategyData) => void;
};

export function StrategyForm({ onStrategySubmit }: StrategyFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dogeAmount: 0,
      price: 1,
      stopLoss: 10,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onStrategySubmit({
      dogeAmount: values.dogeAmount,
      tiers: [{
        percentage: 100,
        price: values.price,
        stopLoss: values.stopLoss,
      }],
    });
    toast.success("Strategy updated successfully!");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="dogeAmount">DOGE Amount</Label>
        <Input
          id="dogeAmount"
          type="number"
          {...form.register("dogeAmount", { valueAsNumber: true })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Target Price ($)</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          {...form.register("price", { valueAsNumber: true })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="stopLoss">Stop Loss (%)</Label>
        <Input
          id="stopLoss"
          type="number"
          {...form.register("stopLoss", { valueAsNumber: true })}
        />
      </div>

      <Button type="submit" className="w-full">
        Calculate Strategy
      </Button>
    </form>
  );
}