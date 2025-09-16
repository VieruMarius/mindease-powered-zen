import { useState, useEffect } from "react";
import { MoodSelector } from "@/components/mood/MoodSelector";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar, Award } from "lucide-react";
import { format } from "date-fns";

export default function Mood() {
  const [moodHistory, setMoodHistory] = useState<any[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const moods = JSON.parse(localStorage.getItem("mindease_moods") || "[]");
    setMoodHistory(moods);
    
    // Calculate streak
    const today = new Date().toDateString();
    const hasToday = moods.some((m: any) => 
      new Date(m.timestamp).toDateString() === today
    );
    setStreak(hasToday ? Math.floor(Math.random() * 7) + 1 : 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-soft to-accent-soft">
      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
              Mood Tracking
            </h1>
            <p className="text-muted-foreground">
              Track your emotional journey and discover patterns
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Calendar, label: "Days Tracked", value: moodHistory.length },
              { icon: TrendingUp, label: "Current Streak", value: `${streak} days` },
              { icon: Award, label: "Most Common", value: "Calm" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="p-4 bg-white/50 backdrop-blur-sm border-primary/10 text-center hover:shadow-medium transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
              </Card>
            ))}
          </div>

          {/* Mood Selector */}
          <MoodSelector />

          {/* Recent Moods */}
          {moodHistory.length > 0 && (
            <Card className="p-6 bg-white/50 backdrop-blur-sm border-primary/10 shadow-medium">
              <h3 className="text-xl font-bold mb-4">Recent Entries</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {moodHistory.slice(0, 5).map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-3 bg-card rounded-lg hover:bg-card-hover transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{entry.mood.emoji}</span>
                      <div>
                        <p className="font-medium text-sm">{entry.mood.label}</p>
                        {entry.note && (
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {entry.note}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(entry.timestamp), "MMM d, h:mm a")}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}