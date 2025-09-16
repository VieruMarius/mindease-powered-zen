import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, CreditCard, Shield, LogOut, Sparkles, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const session = JSON.parse(localStorage.getItem("mindease_session") || "{}");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem("mindease_session");
      localStorage.removeItem("mindease_moods");
      toast({
        title: "Logged out",
        description: "Your anonymous session has ended. Stay well!",
      });
      navigate("/");
    }, 1000);
  };

  const handleUpgrade = () => {
    navigate("/?pricing=true");
  };

  if (!session.id) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-soft to-accent-soft">
      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto bg-gradient-lavender rounded-full flex items-center justify-center animate-breathe">
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <p className="text-muted-foreground">Anonymous User #{session.id?.slice(0, 8)}</p>
          </div>

          {/* Subscription Status */}
          <Card className="p-6 bg-white/50 backdrop-blur-sm border-primary/10 shadow-medium">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Subscription
              </h2>
              <Badge variant={session.subscription === "trial" ? "secondary" : "default"}>
                {session.subscription || "Trial"}
              </Badge>
            </div>
            
            {session.subscription === "trial" ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  You have {session.sessionsRemaining || 1} free session remaining
                </p>
                <Button onClick={handleUpgrade} variant="premium" className="w-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Your subscription renews monthly
              </p>
            )}
          </Card>

          {/* Privacy & Security */}
          <Card className="p-6 bg-white/50 backdrop-blur-sm border-primary/10 shadow-medium">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              Privacy & Security
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <p className="text-sm">No personal data collected</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <p className="text-sm">End-to-end encrypted sessions</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <p className="text-sm">Anonymous authentication</p>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <Card className="p-6 bg-white/50 backdrop-blur-sm border-primary/10 shadow-medium">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              Your Journey
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-card rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {JSON.parse(localStorage.getItem("mindease_moods") || "[]").length}
                </p>
                <p className="text-xs text-muted-foreground">Mood Entries</p>
              </div>
              <div className="text-center p-4 bg-card rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {session.subscription === "trial" ? 1 : "∞"}
                </p>
                <p className="text-xs text-muted-foreground">Sessions Available</p>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full"
              disabled={isLoading}
            >
              <LogOut className="w-4 h-4 mr-2" />
              {isLoading ? "Logging out..." : "End Session"}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              Your data will be deleted when you log out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}