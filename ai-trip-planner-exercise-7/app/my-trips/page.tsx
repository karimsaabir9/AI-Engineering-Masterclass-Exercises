"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useConvex } from "convex/react";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserDetail } from "../Provider";
import { TripInfo } from "../create-new-trip/_components/ChatBox";
import MyTripCardItem from "./_components/MyTripCardItem";

export type Trip = {
  tripId: string;
  tripDetail: TripInfo;
  _id: string;
};

function MyTrips() {
  const [myTrips, setMyTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const { userDetail } = useUserDetail() || {};
  const convex = useConvex();
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.replace("/");
  }, [isLoaded, isSignedIn, router]);

  const GetUserTrips = async () => {
    try {
      const result = await convex.query(api.tripDetail.GetUserTrips, {});
      setMyTrips(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userDetail && GetUserTrips();
  }, [userDetail]);

  return (
    <div className="px-4 py-6 sm:px-10 sm:py-10 md:px-24 lg:px-48">
      <h2 className="font-bold text-3xl">My Trips</h2>

      {loading && (
        <div className="flex justify-center mt-10">
          <Loader className="animate-spin" />
        </div>
      )}

      {!loading && myTrips.length === 0 && (
        <div className="p-7 border rounded-2xl flex flex-col items-center justify-center gap-5 mt-6">
          <h2>You don&apos;t have any trip plan created!</h2>

          <Link href="/create-new-trip">
            <Button>Create New Trip</Button>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {myTrips?.map((trip, index) => (
          <MyTripCardItem trip={trip} key={index} />
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
