import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  features: string[];
  isPopular?: boolean;
  isPremium?: boolean;
  buttonText: string;
  onSelect: () => void;
  disabled?: boolean;
}

export function PricingCard({
  title,
  price,
  period,
  features,
  isPopular,
  isPremium,
  buttonText,
  onSelect,
  disabled
}: PricingCardProps) {
  return (
    <Card className={cn(
      "relative p-6 transition-all duration-300 hover:shadow-glow",
      isPremium && "bg-gradient-to-br from-primary-soft to-accent-soft border-primary/30",
      isPopular && "shadow-medium scale-[1.02]"
    )}>
      {isPopular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-ocean text-white border-0">
          Most Popular
        </Badge>
      )}
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          <div className="mt-2">
            <span className="text-3xl font-bold text-primary">{price}</span>
            {period && <span className="text-muted-foreground">/{period}</span>}
          </div>
        </div>

        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={onSelect}
          disabled={disabled}
          variant={isPremium ? "premium" : isPopular ? "calm" : "outline"}
          className="w-full"
          size="lg"
        >
          {buttonText}
        </Button>
      </div>
    </Card>
  );
}