import { Button } from '@/components/ui/button'
import { Clock, ExternalLink, Ticket } from 'lucide-react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Activity } from './ChatBox'

type Props = {
    activity:Activity
}

function PlaceCardItem({activity}: Props) {
  const [photoUrl, setPhotoUrl] = useState<string>("");

  const GetPlaceImage = async () => {
    try {
      const result = await axios.post("/api/hotel-image", {
        hotelName: activity?.place_name,
        location: activity?.place_address,
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
    activity && GetPlaceImage();
  }, [activity]);

  return (
    <div >
    <Image
      src={photoUrl ? photoUrl : "/placeholders/hotel.jpg"}
      width={400}
      height={200}
      alt={activity.place_name}
      className="rounded-xl object-cover w-full aspect-[2/1] h-auto"
    />
    <h2 className="font-semibold text-lg">
      {activity?.place_name}
    </h2>
    <p className="text-gray-500 line-clamp-2">
      {activity?.place_details}
    </p>
    <h2 className="flex gap-2 text-blue-500 line-clamp-1">
      {" "}
      <Ticket /> {activity?.ticket_pricing}
    </h2>
    <p className="flex  text-orange-400 gap-2 line-clamp-1">
      {" "}
      <Clock /> {activity?.best_time_to_visit}
    </p>
    <Link
      href={
        "https://www.google.com/maps/search/?api=1&query=" +
        activity?.place_name
      }
      target="_blank"
    >
      <Button
        size={"sm"}
        variant={"outline"}
        className="w-full mt-2"
      >
        View <ExternalLink />
      </Button>
    </Link>
  </div>
  )
}

export default PlaceCardItem