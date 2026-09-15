import { Wallet, Banknote, Gem, type LucideIcon } from "lucide-react";

export const SelectBudgetOptions: {
  id: number;
  title: string;
  desc: string;
  icon: LucideIcon;
  color: string;
}[] = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: Wallet,
    color: "bg-green-100 text-green-600",
  },

  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: Banknote,
    color: "bg-yellow-100 text-yellow-600",
  },

  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about cost",
    icon: Gem,
    color: "bg-purple-100 text-purple-600",
  },
];

type Props = {
  onSelectedOption: (value: string) => void;
};

function BudgetUi({ onSelectedOption }: Props) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-3 gap-2 items-center mt-1">
      {SelectBudgetOptions.map((item, index) => (
        <div
          key={index}
          className="h-44 p-3 border rounded-2xl bg-white hover:border-primary cursor-pointer flex flex-col items-center justify-center text-center"
          onClick={() => onSelectedOption(item.title + ":" + item.desc)}
        >
          <div className={`p-3 rounded-full ${item.color}`}>
            <item.icon className="h-7 w-7" strokeWidth={1.75} />
          </div>
          <h2 className=" text-lg font-semibold mt-2">{item.title}</h2>
          <p className="text-sm text-gray-500">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default BudgetUi;
