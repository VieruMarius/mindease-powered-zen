import { ChatInterface } from "@/components/chat/ChatInterface";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Chat() {
  const navigate = useNavigate();
  const session = JSON.parse(localStorage.getItem("mindease_session") || "{}");

  if (!session.id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary-soft to-accent-soft flex items-center justify-center p-4">
        <Card className="p-8 bg-white/50 backdrop-blur-sm border-primary/10 shadow-medium max-w-md">
          <h2 className="text-2xl font-bold mb-4">Please log in first</h2>
          <p className="text-muted-foreground mb-6">
            You need to start a session to access the therapy chat.
          </p>
          <Button onClick={() => navigate("/")} variant="calm" className="w-full">
            Go to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-soft to-accent-soft">
      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          {session.subscription === "trial" && (
            <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
              Free Trial: {session.sessionsRemaining} session remaining
            </div>
          )}
        </div>

        {/* Chat Interface */}
        <ChatInterface />

        {/* Disclaimer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            This AI therapist provides support but is not a replacement for professional medical advice.
            If you're experiencing a crisis, please contact emergency services or a crisis hotline.
          </p>
        </div>
      </div>
    </div>
  );
}