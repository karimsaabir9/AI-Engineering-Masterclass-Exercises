"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { Globe2, Landmark, Plane, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const PENDING_TRIP_PROMPT_KEY = "pendingTripPrompt";

export const suggestions = [
  {
    title: "Create a New Trip",
    icon: <Globe2 className="text-blue-400 h-5 w-5 group-hover:text-white" />,
  },
  {
    title: "Inspire me where to go",
    icon: <Plane className="text-green-500 h-5 w-5 group-hover:text-white" />,
  },
  {
    title: "Discover Hidden gems",
    icon: (
      <Landmark className="text-orange-500 h-5 w-5 group-hover:text-white" />
    ),
  },
  {
    title: "Adventure Destination",
    icon: <Globe2 className="text-yellow-600 h-5 w-5 group-hover:text-white" />,
  },
];

const Hero = () => {
  const { user } = useUser();
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const onSend = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    if (prompt.trim()) {
      localStorage.setItem(PENDING_TRIP_PROMPT_KEY, prompt.trim());
    }
    //Navigate to Create Trip Planner Web Page
    router.push("/create-new-trip");
  };
  return (
    <div className="mt-24 w-full flex justify-center px-4">
      {/* Content */}
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-xl md:text-5xl font-bold">
          Hey, I&apos;m your personal
          <span className="text-primary"> Trip Planner</span>
        </h1>
        <p className="text-lg">
          Tell me what you want, and I&apos;ll handle the rest: Flights, Hotels,
          Trip Planner - all in seconds
        </p>

        {/* Input Box */}
        <div>
          <div className="border rounded-2xl p-4 relative">
            <Textarea
              placeholder="Create a trip for Paris from New York"
              className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button
              size={"icon"}
              className="absolute bottom-6 right-6"
              onClick={() => onSend()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Suggestion List */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-5">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => setPrompt(suggestion.title)}
              className="group flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary hover:text-white"
            >
              {suggestion.icon}
              <h2 className="text-[0.85rem]">{suggestion.title}</h2>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Hero;
