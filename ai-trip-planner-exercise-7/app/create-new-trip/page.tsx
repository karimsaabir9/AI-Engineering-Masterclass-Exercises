"use client";
import { useEffect, useState } from "react";
import ChatBox from "./_components/ChatBox";
import Itinerary from "./_components/Itinerary";
import GlobalMap from "./_components/GlobalMap";
import { Button } from "@/components/ui/button";
import { Globe2, Plane } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function CreateNewTrip() {
  const [activeIndex, setActiveIndex] = useState(1);
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.replace("/");
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-10">
      <div>
        <ChatBox onViewTrip={() => setActiveIndex(0)} />
      </div>
      <div className="col-span-2 relative">
        {activeIndex == 0 ? <Itinerary /> : <GlobalMap />}

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                size={"lg"}
                className="absolute bg-black bottom-10 left-[50%] rounded-2xl hover:bg-gray-700"
                onClick={() => setActiveIndex(activeIndex == 0 ? 1 : 0)}
              />
            }
          >
            {activeIndex == 0 ? <Plane /> : <Globe2 />}
          </TooltipTrigger>
          <TooltipContent>Switch Between Map and Trip</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

export default CreateNewTrip;
