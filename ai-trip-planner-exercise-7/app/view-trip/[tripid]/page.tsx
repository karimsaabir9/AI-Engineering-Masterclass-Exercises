"use client";
import GlobalMap from "@/app/create-new-trip/_components/GlobalMap";
import Itinerary from "@/app/create-new-trip/_components/Itinerary";
import { Trip } from "@/app/my-trips/page";
import { useTripDetail, useUserDetail } from "@/app/Provider";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useConvex } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function ViewTrip() {
  const { tripid } = useParams();
  const { userDetail } = useUserDetail() || {};
  const convex = useConvex();
  const [, setTripData] = useState<Trip | null>();
  const { setTripDetailInfo } = useTripDetail() || {};
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.replace("/");
  }, [isLoaded, isSignedIn, router]);

  const GetTrip = async () => {
    if (!userDetail) return;
    const result = await convex.query(api.tripDetail.GetTripById, {
      tripid: tripid + "",
    });
    setTripData(result);
    setTripDetailInfo?.(result?.tripDetail);
  };

  useEffect(() => {
    userDetail && GetTrip();
  }, [userDetail]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
      <div className="lg:col-span-3">
        <Itinerary />
      </div>
      <div className="lg:col-span-2">
        <GlobalMap />
      </div>
    </div>
  );
}

export default ViewTrip;
