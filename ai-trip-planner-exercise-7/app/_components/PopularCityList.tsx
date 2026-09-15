"use client"; 

import React from "react";
import Image from "next/image";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Popular Destination to Visit
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DestinationContent = ({
  description,
  src,
}: {
  description: string;
  src: string;
}) => {
  return (
    <div className="bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        {description}
      </p>
      <Image
        src={src}
        alt={description}
        height={500}
        width={500}
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-2xl mt-8"
      />
    </div>
  );
};

const data = [

    {

        category: "Paris, France",

        title: "Explore the City of Lights – Eiffel Tower, Louvre & more",

        src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop",

        content: (
          <DestinationContent
            description="Stroll along the Seine, take in the view from the Eiffel Tower, and lose yourself in the Louvre's endless galleries. Paris blends world-class art, food, and romance into one unforgettable trip."
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop"
          />
        ),

    },

    {

        category: "New York, USA",

        title: "Experience NYC – Times Square, Central Park, Broadway",

        src: "https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

        content: (
          <DestinationContent
            description="From the bright lights of Times Square to a quiet walk through Central Park and a Broadway show at night, New York City never slows down. It's the classic big-city trip that has it all."
            src="https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        ),

    },

    {

        category: "Tokyo, Japan",

        title: "Discover Tokyo – Shibuya, Cherry Blossoms, Temples",

        src: "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

        content: (
          <DestinationContent
            description="Tokyo mixes neon-lit crossings like Shibuya with quiet, centuries-old temples and, in season, breathtaking cherry blossoms. It's a city where tradition and the future sit side by side."
            src="https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        ),

    },

    {

        category: "Rome, Italy",

        title: "Walk through History – Colosseum, Vatican, Roman Forum",

        src: "https://plus.unsplash.com/premium_photo-1675975678457-d70708bf77c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

        content: (
          <DestinationContent
            description="Walk the same ground as gladiators at the Colosseum, wander the Roman Forum's ancient ruins, and visit Vatican City's museums and St. Peter's Basilica. Rome puts thousands of years of history right on the street."
            src="https://plus.unsplash.com/premium_photo-1675975678457-d70708bf77c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        ),

    },

    {

        category: "Dubai, UAE",

        title: "Luxury and Innovation – Burj Khalifa, Desert Safari",

        src: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

        content: (
          <DestinationContent
            description="Take in the view from the top of the Burj Khalifa, shop in towering malls, and head into the dunes for a desert safari at sunset. Dubai pairs futuristic skylines with adventure just outside the city."
            src="https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        ),

    },

    {

        category: "Sydney, Australia",

        title: "Harbour Views – Opera House, Bondi Beach & Wildlife",

        src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

        content: (
          <DestinationContent
            description="Take in the Sydney Opera House and Harbour Bridge, relax on Bondi Beach, and spot native wildlife just outside the city. Sydney balances iconic landmarks with easy access to the coast."
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        ),

    },

];


