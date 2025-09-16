import { useState } from "react";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wind, Brain, Heart, Headphones, Book, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const resources = [
  {
    id: "1",
    title: "4-7-8 Breathing",
    description: "A calming breathing technique to reduce anxiety and promote relaxation",
    icon: Wind,
    duration: "5 min",
    category: "Breathing",
  },
  {
    id: "2",
    title: "Body Scan Meditation",
    description: "Progressive relaxation technique to release tension throughout your body",
    icon: Brain,
    duration: "10 min",
    category: "Meditation",
  },
  {
    id: "3",
    title: "Gratitude Journal",
    description: "Reflect on positive moments and cultivate appreciation",
    icon: Heart,
    duration: "5 min",
    category: "Journaling",
  },
  {
    id: "4",
    title: "Calming Sounds",
    description: "Nature sounds and white noise for relaxation and focus",
    icon: Headphones,
    duration: "∞",
    category: "Audio",
  },
  {
    id: "5",
    title: "CBT Techniques",
    description: "Learn cognitive behavioral therapy exercises for managing thoughts",
    icon: Book,
    duration: "15 min",
    category: "Education",
  },
  {
    id: "6",
    title: "Morning Routine",
    description: "Start your day with mindfulness and positive intentions",
    icon: Sun,
    duration: "10 min",
    category: "Routine",
  },
];

export default function Resources() {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStartExercise = (resourceId: string) => {
    setActiveExercise(resourceId);
    toast({
      title: "Exercise Started",
      description: "Follow the guided instructions to complete the exercise",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-soft to-accent-soft">
      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-sunrise bg-clip-text text-transparent">
              Wellness Resources
            </h1>
            <p className="text-muted-foreground">
              Exercises and techniques to support your mental health journey
            </p>
          </div>

          {/* Active Exercise */}
          {activeExercise && (
            <Card className="p-6 bg-gradient-calm text-white shadow-glow animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Exercise in Progress</h3>
                  <p className="text-sm opacity-90">
                    {resources.find(r => r.id === activeExercise)?.title}
                  </p>
                </div>
                <Button
                  onClick={() => setActiveExercise(null)}
                  variant="glass"
                  size="sm"
                >
                  End Session
                </Button>
              </div>
            </Card>
          )}

          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {["All", "Breathing", "Meditation", "Journaling", "Audio", "Education", "Routine"].map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Resource Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                {...resource}
                onStart={() => handleStartExercise(resource.id)}
              />
            ))}
          </div>

          {/* Tips Section */}
          <Card className="p-8 bg-white/50 backdrop-blur-sm border-primary/10 shadow-medium">
            <h2 className="text-2xl font-bold mb-4">Daily Wellness Tips</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Practice deep breathing for 5 minutes when you wake up",
                "Take short breaks every hour to stretch and move",
                "Write down 3 things you're grateful for before bed",
                "Limit screen time 1 hour before sleeping",
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}