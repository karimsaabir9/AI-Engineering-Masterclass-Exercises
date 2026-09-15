"use client";
import { Timeline } from "@/components/ui/timeline";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import HotelCardItem from "./HotelCardItem";
import PlaceCardItem from "./PlaceCardItem";
import { useTripDetail } from "@/app/Provider";

function Itinerary() {
  const { tripDetailInfo } = useTripDetail() || {};

  const data = tripDetailInfo
    ? [
        {
          title: "Recommended Hotels",
          content: (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {tripDetailInfo.hotels.map((hotel, index) => (
                <HotelCardItem key={index} hotel={hotel} />
              ))}
            </div>
          ),
        },

        ...tripDetailInfo.itinerary.map((dayData) => ({
          title: `Day ${dayData?.day}`,
          content: (
            <div>
              <p className="mb-2 font-bold text-xl text-primary">
                Best Time :{dayData?.best_time_to_visit_day}
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {dayData?.activities?.map((activity, index) => (
                  <PlaceCardItem key={index} activity={activity} />
                ))}
              </div>
            </div>
          ),
        })),
      ]
    : [];
  return (
    <div className="relative w-full h-[83vh] overflow-auto ">
      {tripDetailInfo ? (
        <Timeline data={data} tripData={tripDetailInfo} />
      ) : (
        <div>
          <h2 className="flex gap-2 items-center absolute bottom-5 left-5 text-3xl text-white">
            <ArrowLeft /> Getting to know you to build perfect trip here...
          </h2>
          <Image
            src="/placeholders/travel.png"
            alt="travel"
            width={"800"}
            height={"800"}
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      )}
    </div>
  );
}
export default Itinerary;
