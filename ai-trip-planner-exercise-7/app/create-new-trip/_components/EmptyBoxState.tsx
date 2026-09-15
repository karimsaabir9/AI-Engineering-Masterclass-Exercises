import { suggestions } from "@/app/_components/Hero";

type Props = {
  onSelectOption: (value: string) => void;
};

function EmptyBoxState({ onSelectOption }: Props) {
  return (
    <div className="mt-2">
      <h2 className="font-bold text-xl lg:text-2xl text-center">
        Start Planning new <strong className="text-primary">Trip</strong> using
        AI
      </h2>
      <p className="text-center text-gray-400 mt-1">
        Discover personalized travel itineraries, find the best destinations,
        and plan your dream vacotion effortlessly with the power of AI. Let our
        smart assistant do the hard work while you enjoy the journey.
      </p>
      {/* Suggestion List */}
      <div className="flex flex-col justify-center gap-2 mt-3">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={()=> onSelectOption(suggestion.title)}
            className="flex items-center gap-2 border rounded-xl p-2.5 cursor-pointer hover:border-primary hover:text-primary"
          >
            {suggestion.icon}
            <h2 className="text-xl">{suggestion.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmptyBoxState;
