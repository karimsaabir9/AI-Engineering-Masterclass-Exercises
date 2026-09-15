import { ArrowBigRightIcon } from "lucide-react";
import Image from "next/image";
import { Trip } from "../page";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

type Props = {
  trip: Trip;
};

function MyTripCardItem({ trip }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string>("");

  const GetPlaceImage = async () => {
    try {
      const result = await axios.post("/api/hotel-image", {
        hotelName: trip?.tripDetail?.destination
      });
      if (!result?.data || result?.data?.error) {
        return;
      }
      setPhotoUrl(result?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    trip && GetPlaceImage();
  }, [trip]);

  return (
    <Link href={'/view-trip/'+trip?.tripId} className="p-5 shadow rounded-2xl ">
      <Image
        src={photoUrl ? photoUrl : "/placeholders/hotel.jpg"}
        alt={`${trip?.tripDetail?.destination ?? "Trip"} photo`}
        width={400}
        height={400}
        className="rounded-xl object-cover w-full h-[270px] "
      />
      <h2 className="flex flex-wrap items-center gap-2 font-semibold text-lg sm:text-xl mt-2">
        {trip?.tripDetail?.origin}
        <ArrowBigRightIcon className="shrink-0" />
        {trip?.tripDetail?.destination}
      </h2>
      <h2 className="mt-2 text-gray-500">
        {trip?.tripDetail?.duration} Trip with {trip?.tripDetail?.budget} Budget
      </h2>
    </Link>
  );
}

export default MyTripCardItem;
