import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  duration?: string;
  category: string;
  onStart: () => void;
}

export function ResourceCard({
  title,
  description,
  icon: Icon,
  duration,
  category,
  onStart,
}: ResourceCardProps) {
  return (
    <Card className="p-6 bg-white/50 backdrop-blur-sm border-primary/10 hover:shadow-glow transition-all duration-300 hover:scale-[1.02]">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-gradient-ocean rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          {duration && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {duration}
            </span>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-primary font-medium">{category}</span>
          <Button onClick={onStart} variant="ghost" size="sm">
            Start →
          </Button>
        </div>
      </div>
    </Card>
  );
}