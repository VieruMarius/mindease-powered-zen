import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Mood {
  emoji: string;
  label: string;
  color: string;
}

const moods: Mood[] = [
  { emoji: "😊", label: "Happy", color: "mood-happy" },
  { emoji: "😌", label: "Calm", color: "mood-calm" },
  { emoji: "😰", label: "Anxious", color: "mood-anxious" },
  { emoji: "😢", label: "Sad", color: "mood-sad" },
  { emoji: "😤", label: "Angry", color: "mood-angry" },
];

export function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [note, setNote] = useState("");
  const { toast } = useToast();

  const handleSaveMood = () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling today",
      });
      return;
    }

    // Save mood to localStorage (in production, this would be saved to a database)
    const moodEntry = {
      id: crypto.randomUUID(),
      mood: selectedMood,
      note,
      timestamp: new Date().toISOString(),
    };

    const existingMoods = JSON.parse(localStorage.getItem("mindease_moods") || "[]");
    localStorage.setItem("mindease_moods", JSON.stringify([moodEntry, ...existingMoods]));

    toast({
      title: "Mood tracked",
      description: "Thank you for sharing how you feel",
    });

    // Reset
    setSelectedMood(null);
    setNote("");
  };

  return (
    <Card className="p-6 bg-white/50 backdrop-blur-sm border-primary/10 shadow-medium">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">How are you feeling?</h3>
          <p className="text-sm text-muted-foreground">Select your current mood</p>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => setSelectedMood(mood)}
              className={cn(
                "p-4 rounded-xl transition-all duration-300 hover:scale-110",
                selectedMood?.label === mood.label
                  ? `bg-${mood.color} shadow-glow scale-110`
                  : "bg-card hover:bg-card-hover"
              )}
            >
              <div className="text-3xl mb-1">{mood.emoji}</div>
              <div className="text-xs font-medium">{mood.label}</div>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="space-y-4 animate-fade-in">
            <Textarea
              placeholder="Add a note about how you're feeling (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[100px] resize-none bg-white/50"
            />
            
            <Button onClick={handleSaveMood} variant="calm" className="w-full">
              Save Mood Entry
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}