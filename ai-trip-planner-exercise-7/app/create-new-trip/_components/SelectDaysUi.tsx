"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  onSelectedOption: (value: string) => void;
};

function SelectDaysUi({ onSelectedOption }: Props) {
  const [days, setDays] = useState<number>(3);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center mt-1">
      <div className="col-span-2 md:col-span-4 p-3 border rounded-2xl bg-white flex flex-col items-center gap-3">
        <h2 className="font-semibold text-center">
          How many days do you want to travel?
        </h2>
        <div className="flex items-center justify-center gap-6">
          <Button
            size={"icon"}
            className="rounded-full bg-gray-100 text-black hover:bg-gray-200 shadow-none"
            onClick={() => setDays((prev) => Math.max(1, prev - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-bold w-20 text-center">{days} Days</h2>
          <Button
            size={"icon"}
            className="rounded-full bg-gray-100 text-black hover:bg-gray-200 shadow-none"
            onClick={() => setDays((prev) => prev + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          className="w-full rounded-full"
          onClick={() => onSelectedOption(days + " Days")}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default SelectDaysUi;
