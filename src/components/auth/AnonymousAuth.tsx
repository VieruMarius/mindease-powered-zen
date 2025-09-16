import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

export function AnonymousAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAnonymousLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate anonymous login - in production, this would generate a session
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store anonymous session
      localStorage.setItem("mindease_session", JSON.stringify({
        id: crypto.randomUUID(),
        type: "anonymous",
        createdAt: new Date().toISOString(),
        subscription: "trial",
        sessionsRemaining: 1
      }));
      
      toast({
        title: "Welcome to MindEase",
        description: "Your anonymous session has been created. Your privacy is our priority.",
      });
      
      navigate("/chat");
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not create session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-8 bg-white/50 backdrop-blur-sm border-primary/10 shadow-medium">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-gradient-lavender rounded-full flex items-center justify-center animate-breathe">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Start Your Journey</h2>
          <p className="text-muted-foreground">
            No personal information required. Your privacy is protected.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleAnonymousLogin}
            disabled={isLoading}
            variant="calm"
            size="lg"
            className="w-full"
          >
            {isLoading ? "Creating safe space..." : "Begin Anonymous Session"}
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Your first session is free. No credit card required.
          </p>
        </div>
      </div>
    </Card>
  );
}