import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnonymousAuth } from "@/components/auth/AnonymousAuth";
import { PricingCard } from "@/components/subscription/PricingCard";
import { Sparkles, Heart, Shield, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPricing, setShowPricing] = useState(false);
  
  const session = localStorage.getItem("mindease_session");
  const isLoggedIn = !!session;

  const handleSubscribe = (tier: string) => {
    if (!isLoggedIn) {
      toast({
        title: "Please log in first",
        description: "Start with an anonymous session to subscribe",
      });
      return;
    }
    
    // In production, this would integrate with Stripe
    toast({
      title: "Subscription Started",
      description: `You've selected the ${tier} plan. Payment processing coming soon.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-soft to-accent-soft">
      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Hero Section */}
        <section className="text-center space-y-8 mb-16">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-lavender bg-clip-text text-transparent mb-4">
              MindEase
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your safe space for mental wellness. Anonymous, supportive, and always here for you.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Shield, label: "100% Anonymous", color: "bg-gradient-calm" },
              { icon: Brain, label: "AI Therapy", color: "bg-gradient-ocean" },
              { icon: Heart, label: "Mood Tracking", color: "bg-gradient-sunrise" },
              { icon: Sparkles, label: "Resources", color: "bg-gradient-lavender" },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-primary/10 hover:shadow-medium transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-foreground">{feature.label}</p>
              </div>
            ))}
          </div>

          {/* Auth or Dashboard */}
          {!isLoggedIn ? (
            <div className="max-w-md mx-auto">
              <AnonymousAuth />
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">Welcome back! You're logged in anonymously.</p>
              <Button onClick={() => navigate("/chat")} variant="calm" size="lg">
                Continue to Therapy Chat
              </Button>
            </div>
          )}
        </section>

        {/* Pricing Section */}
        <section className="space-y-8">
          <div className="text-center">
            <Button
              onClick={() => setShowPricing(!showPricing)}
              variant="outline"
              className="mb-8"
            >
              {showPricing ? "Hide" : "View"} Subscription Plans
            </Button>
          </div>

          {showPricing && (
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-fade-in">
              <PricingCard
                title="Free Trial"
                price="€0"
                features={[
                  "1 AI therapy session",
                  "Basic mood tracking",
                  "Access to resources",
                  "Anonymous account",
                ]}
                buttonText="Start Free"
                onSelect={() => handleSubscribe("trial")}
                disabled={isLoggedIn}
              />
              
              <PricingCard
                title="Essential"
                price="€20"
                period="month"
                features={[
                  "3 AI therapy sessions",
                  "Advanced mood analytics",
                  "All resources unlocked",
                  "Personalized insights",
                  "Priority support",
                ]}
                isPopular
                buttonText="Subscribe"
                onSelect={() => handleSubscribe("essential")}
              />
              
              <PricingCard
                title="Unlimited"
                price="€99"
                period="month"
                features={[
                  "Unlimited AI sessions",
                  "Advanced mood analytics",
                  "All resources unlocked",
                  "Personalized insights",
                  "Priority support",
                  "Export your data",
                  "Custom exercises",
                ]}
                isPremium
                buttonText="Go Unlimited"
                onSelect={() => handleSubscribe("unlimited")}
              />
            </div>
          )}
        </section>

        {/* Crisis Support Notice */}
        <section className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-destructive/10 border border-destructive/20 rounded-full">
            <span className="text-sm text-destructive font-medium">
              If you're in crisis, please reach out for immediate help
            </span>
            <Button
              onClick={() => navigate("/crisis")}
              variant="crisis"
              size="sm"
            >
              Crisis Support
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}