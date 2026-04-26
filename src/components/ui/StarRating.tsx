import React from "react";
import { Star } from "lucide-react";

interface Props {
  rating: number;
  setRating: (value: number) => void;
}

const StarRating: React.FC<Props> = ({ rating, setRating }) => {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block">
        Rating
      </label>

      <div className="flex gap-2 cursor-pointer">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={26}
            onClick={() => setRating(star)}
            className={
              star <= rating
                ? "text-yellow-500 fill-yellow-500 hover:scale-110 transition"
                : "text-gray-300 hover:scale-110 transition"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default StarRating;