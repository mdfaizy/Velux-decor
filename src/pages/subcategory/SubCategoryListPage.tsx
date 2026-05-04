// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getSubCategoryBySlugApi } from "../../services/subCategoryApi";

// const SubCategoryListPage = () => {
//   const { categorySlug } = useParams();
//   const [data, setData] = useState<any[]>([]);
//   const navigate = useNavigate();

// useEffect(() => {
//   const fetchSub = async () => {
//     try {
//       if (!categorySlug) return;

//       const res = await getSubCategoryBySlugApi(categorySlug);

//       setData(res.data || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   fetchSub();
// }, [categorySlug]);
//   return (
//     <div className="max-w-7xl mx-auto mt-10 px-6 py-10">

//       {/* HEADER */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold capitalize text-gray-800">
//           {categorySlug?.replace("-", " ")}
//         </h1>
//         <p className="text-gray-500 mt-1">
//           Explore sub categories
//         </p>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//         {data.map((item) => (
//           <div
//             key={item._id}
//             onClick={() => {
//               if (!item?.category?.slug || !item?.slug) return;

//               navigate(`/products/${item.category.slug}/${item.slug}`);
//             }}
//             className="group bg-white rounded-xl border hover:shadow-lg transition-all cursor-pointer overflow-hidden"
//           >
//             {/* IMAGE */}
//             <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
//               <img
//                 src={item.image || "https://via.placeholder.com/300"}
//                 alt={item.name}
//                 className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
//               />
//             </div>

//             {/* CONTENT */}
//             <div className="p-3 text-center">
//               <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition">
//                 {item.name}
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* EMPTY STATE */}
//       {data.length === 0 && (
//         <div className="text-center mt-20 text-gray-500">
//           No subcategories found
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubCategoryListPage;


import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSubCategoryBySlugApi } from "../../services/subCategoryApi";

/**
 * SubCategory interface for type safety
 */
interface SubCategory {
  _id: string;
  name: string;
  image?: string;
  slug: string;
  category: {
    slug: string;
  };
}

/**
 * API Response interface
 */
interface ApiResponse {
  data?: SubCategory[];
  success?: boolean;
  message?: string;
}

/**
 * SubCategoryListPage Component
 * 
 * Displays a grid of subcategories for a given category.
 * Handles loading states, errors, and navigation with proper accessibility.
 */
const SubCategoryListPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();

  // State management
  const [data, setData] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch subcategories by category slug
   */
  useEffect(() => {
    const fetchSubCategories = async (): Promise<void> => {
      // Early return if categorySlug is not available
      if (!categorySlug) {
        setError("Category not found");
        return;
      }

      setLoading(true);
      setError(null);
      setData([]);

      try {
        const response: ApiResponse = await getSubCategoryBySlugApi(
          categorySlug
        );

        if (response?.data && Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setData([]);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to load subcategories. Please try again later.";
        setError(errorMessage);
        console.error("Error fetching subcategories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [categorySlug]);

  /**
   * Handle card click with navigation
   * Memoized to prevent unnecessary re-renders
   */
  const handleCardClick = useCallback(
    (item: SubCategory): void => {
      if (item?.category?.slug && item?.slug) {
        navigate(`/products/${item.category.slug}/${item.slug}`);
      }
    },
    [navigate]
  );

  /**
   * Handle keyboard navigation (Enter and Space keys)
   */
  const handleKeyPress = useCallback(
    (
      e: React.KeyboardEvent<HTMLDivElement>,
      item: SubCategory
    ): void => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCardClick(item);
      }
    },
    [handleCardClick]
  );

  /**
   * Placeholder image SVG with proper dimensions
   */
  const placeholderImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%23e5e7eb'/%3E%3C/svg%3E";

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto mt-10 px-6 py-10">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold capitalize text-gray-800">
            {categorySlug?.replace(/-/g, " ")}
          </h1>
          <p className="text-gray-500 mt-1">Explore sub categories</p>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              <p className="text-gray-600 mt-4">Loading subcategories...</p>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="text-red-800 font-semibold">Error</h3>
            <p className="text-red-700 mt-1">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* GRID */}
        {!loading && !error && (
          <>
            {data.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {data.map((item) => (
                  <div
                    key={item._id}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleCardClick(item)}
                    onKeyPress={(e) => handleKeyPress(e, item)}
                    className="group bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label={`View ${item.name} subcategory`}
                  >
                    {/* IMAGE CONTAINER */}
                    <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image || placeholderImage}
                        alt={item.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* CONTENT CONTAINER */}
                    <div className="p-3 text-center">
                      <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="text-center mt-20 py-12">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-500 text-lg">
                  No subcategories found
                </p>
                <p className="text-gray-400 mt-2">
                  Try browsing other categories or check back later.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SubCategoryListPage; 