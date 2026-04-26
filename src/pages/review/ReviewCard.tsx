// import React from "react";
// import { Star } from "lucide-react";

// interface ReviewCardProps {
//   reviewerName: string;
//   title: string;
//   location: string;
//   testimonial: string;
//   rating: number;
// }

// const ReviewCard: React.FC<ReviewCardProps> = ({
//   reviewerName,
//   title,
//   location,
//   testimonial,
//   rating,
// }) => {
//   return (
//     <div className="bg-gray-100 rounded-2xl p-6 w-full max-w-md">
      
//       {/* ⭐ Stars TOP */}
//       <div className="flex gap-1 mb-4">
//         {[...Array(5)].map((_, index) => (
//           <Star
//             key={index}
//             size={16}
//             className={
//               index < rating
//                 ? "text-yellow-500 fill-yellow-500"
//                 : "text-gray-300"
//             }
//           />
//         ))}
//       </div>

//       {/* 📝 Review Text */}
//       <p className="text-gray-700 text-sm leading-relaxed mb-6">
//         "{title}"
//       </p>

//       {/* 👤 User Info BOTTOM */}
//       <div className="flex items-center gap-3">
//         <img
//           src={testimonial}
//           alt={reviewerName}
//           className="w-10 h-10 rounded-full object-cover"
//         />

//         <div>
//           <h3 className="font-semibold text-sm text-gray-900">
//             {reviewerName}
//           </h3>
//           <p className="text-xs text-gray-500">{location}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewCard;


import React from "react";
import { Star } from "lucide-react";

const ReviewCard = ({
  reviewerName,
  title,
  location,
  testimonial,
  rating,
}: any) => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      
      {/* ⭐ Stars */}
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < rating
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }
          />
        ))}
      </div>

      {/* 📝 Text */}
      <p className="text-gray-700 text-sm mb-6 leading-relaxed">
        "{title}"
      </p>

      {/* 👤 User */}
      <div className="flex items-center gap-3">
        <img
          src={testimonial}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium text-gray-900">
            {reviewerName}
          </p>
          <p className="text-xs text-gray-500">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;