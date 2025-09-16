import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Globe, MessageCircle, AlertCircle } from "lucide-react";

const crisisContacts = [
  {
    country: "International",
    name: "Crisis Text Line",
    number: "Text HOME to 741741",
    icon: MessageCircle,
  },
  {
    country: "USA",
    name: "National Suicide Prevention Lifeline",
    number: "988",
    icon: Phone,
  },
  {
    country: "UK",
    name: "Samaritans",
    number: "116 123",
    icon: Phone,
  },
  {
    country: "Ireland",
    name: "Samaritans Ireland",
    number: "116 123",
    icon: Phone,
  },
  {
    country: "Australia",
    name: "Lifeline",
    number: "13 11 14",
    icon: Phone,
  },
  {
    country: "Canada",
    name: "Talk Suicide Canada",
    number: "1-833-456-4566",
    icon: Phone,
  },
];

export default function Crisis() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-soft to-accent-soft">
      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Emergency Banner */}
          <Card className="p-6 bg-destructive/10 border-destructive/20 shadow-glow">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-destructive shrink-0 animate-pulse" />
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-destructive">
                  If you're in immediate danger
                </h1>
                <p className="text-foreground">
                  Please call your local emergency services immediately:
                </p>
                <div className="flex gap-4">
                  <Button variant="crisis" size="lg">
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency: 911 (US) / 999 (UK) / 112 (EU)
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Crisis Hotlines */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">24/7 Crisis Support Hotlines</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {crisisContacts.map((contact) => {
                const Icon = contact.icon;
                return (
                  <Card
                    key={contact.country}
                    className="p-4 bg-white/50 backdrop-blur-sm border-primary/10 hover:shadow-medium transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-ocean rounded-xl flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">{contact.country}</p>
                        <p className="font-semibold text-sm">{contact.name}</p>
                        <p className="text-primary font-bold">{contact.number}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Additional Resources */}
          <Card className="p-6 bg-white/50 backdrop-blur-sm border-primary/10 shadow-medium">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Additional Resources
            </h3>
            <div className="space-y-3">
              <a
                href="https://www.iasp.info/resources/Crisis_Centres/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-card rounded-lg hover:bg-card-hover transition-all duration-300"
              >
                <p className="font-medium text-sm">International Crisis Centers</p>
                <p className="text-xs text-muted-foreground">
                  Find crisis support in your country
                </p>
              </a>
              <a
                href="https://www.befrienders.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-card rounded-lg hover:bg-card-hover transition-all duration-300"
              >
                <p className="font-medium text-sm">Befrienders Worldwide</p>
                <p className="text-xs text-muted-foreground">
                  Emotional support to prevent suicide worldwide
                </p>
              </a>
            </div>
          </Card>

          {/* Message */}
          <Card className="p-8 bg-gradient-calm text-white text-center shadow-glow">
            <h3 className="text-xl font-bold mb-3">You Matter</h3>
            <p className="text-sm opacity-90">
              Your life has value and meaning. This moment of crisis will pass.
              Please reach out for help - you don't have to go through this alone.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}