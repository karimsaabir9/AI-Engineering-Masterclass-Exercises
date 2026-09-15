import { Home, HeartHandshake, PartyPopper, User, type LucideIcon } from "lucide-react";

export const SelectTravelesList: {
  id: number;
  title: string;
  desc: string;
  icon: LucideIcon;
  people: string;
}[] = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveles in exploration",
    icon: User,
    people: "1",
  },

  {
    id: 2,
    title: "A Couple",
    desc: "Two traveles in tandem",
    icon: HeartHandshake,
    people: "2 People",
  },

  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adv",
    icon: Home,
    people: "3 to 5 People",
  },

  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekes",
    icon: PartyPopper,
    people: "5 to 10 People",
  },
];

type Props = {
  onSelectedOption: (value: string) => void;
};

function GroupSizeUi({ onSelectedOption }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center mt-1">
      {SelectTravelesList.map((item, index) => (
        <div
          key={index}
          className="h-24 flex flex-col items-center justify-center text-center p-3 border rounded-2xl bg-white hover:border-primary cursor-pointer"
          onClick={() => onSelectedOption(item.title + ":" + item.people)}
        >
          <h2 className="mb-1">
            <item.icon className="h-5 w-5" strokeWidth={1.75} />
          </h2>
          <h2>{item.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default GroupSizeUi;
