"use client";
import Image from "next/image";
import { Hotel } from "./ChatBox";
import { Star, Wallet } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  hotel: Hotel;
};

function HotelCardItem({ hotel }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string>("");

  const GetHotelImage = async () => {
    try {
      const result = await axios.post("/api/hotel-image", {
        hotelName: hotel?.hotel_name,
        location: hotel?.hotel_address,
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
    hotel && GetHotelImage();
  }, [hotel]);

  return (
    <div className="flex flex-col gap-1 h-full">
      <Image
        src={photoUrl ? photoUrl : "/placeholders/hotel.jpg"}
        alt={`${hotel?.hotel_name ?? "Hotel"} photo`}
        width={400}
        height={200}
        className="rounded-xl shadow object-cover w-full aspect-[2/1] h-auto"
      />
      <h2 className="font-semibold text-lg line-clamp-2">{hotel?.hotel_name}</h2>
      <h2 className="text-gray-500 line-clamp-2">{hotel.hotel_address}</h2>
      <div className="flex justify-between items-center">
        <p className="flex gap-2 text-green-600">
          <Wallet /> {hotel.price_per_night}
        </p>
        <p className="text-yellow-500 flex gap-2">
          <Star /> {hotel.rating}
        </p>
      </div>
      <Link
        href={
          "https://www.google.com/maps/search/?api=1&query=" + hotel?.hotel_name
        }
        target="_blank"
        className="mt-auto pt-1"
      >
        <Button variant={"outline"} className="w-full">
          View
        </Button>
      </Link>
      {/* <p className="line-clamp-2 text-gray-500">{hotel?.description}</p> */}
    </div>
  );
}

export default HotelCardItem;
