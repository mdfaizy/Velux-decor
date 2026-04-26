import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { getReviewsApi } from "../../services/reviewApi";

interface Review {
  _id: string;
  reviewerName: string;
  title: string;
  location: string;
  testimonial: string;
  rating: number;
}

const ReviewSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const res = await getReviewsApi();

      if (res.success) {
        setReviews(res.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Customer Reviews
//       </h2>

//       {/* Loader */}
//       {loading && (
//         <div className="text-center text-gray-500">Loading reviews...</div>
//       )}

//       {/* No Data */}
//       {!loading && reviews.length === 0 && (
//         <div className="text-center text-gray-500">
//           No reviews available
//         </div>
//       )}

//       {/* Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//   {reviews.map((review) => (
//     <ReviewCard
//       key={review._id}
//       reviewerName={review.reviewerName}
//       title={review.title}
//       location={review.location}
//       testimonial={review.testimonial}
//       rating={review.rating}
//     />
//   ))}
// </div>
//     </div>

<div className="bg-[#f5f5f5] py-16">
  <h2 className="text-2xl font-semibold text-center mb-10">
    Customer Reviews
  </h2>

  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
    {reviews.map((review) => (
      <ReviewCard
        key={review._id}
        reviewerName={review.reviewerName}
        title={review.title}
        location={review.location}
        testimonial={review.testimonial}
        rating={review.rating}
      />
    ))}
  </div>
</div>
  );
};

export default ReviewSection;