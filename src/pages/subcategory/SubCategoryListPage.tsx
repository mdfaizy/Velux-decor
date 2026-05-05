import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSubCategoryBySlugApi } from "../../services/subCategoryApi";
import { Link } from "react-router-dom";
interface SubCategory {
  _id: string;
  name: string;
  image?: string;
  slug: string;
  category: {
    slug: string;
  };
}

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
    <div className="h-52 bg-gray-200"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
    </div>
  </div>
);

const SubCategoryListPage: React.FC = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        if (!categorySlug) return;

        setLoading(true);
        const res = await getSubCategoryBySlugApi(categorySlug);

        if (res.success) {
          setData(res.data || []);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [categorySlug]);

  const handleClick = (item: SubCategory) => {
    navigate(`/products/${item.category.slug}/${item.slug}`);
  };

  return (
    // <div className="bg-gray-50 min-h-screen mt-14">
    <div className="bg-gray-50 min-h-screen pt-[70px] md:pt-[70px]">

      {/* 🔥 HERO SECTION */}
      <div className="relative h-[260px] md:h-[320px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1615874959474-d609969a20ed"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white capitalize">
            {categorySlug}
          </h1>
          <p className="mt-3 text-gray-200 max-w-xl text-sm md:text-lg">
            Discover curated subcategories designed for modern luxury living.
          </p>
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-14">
       {/* 🔥 Breadcrumb */}
<div className="text-sm text-gray-500 mb-6 flex flex-wrap gap-2">

  <span
    onClick={() => navigate("/")}
    className="hover:text-black cursor-pointer"
  >
    Home
  </span>
  <span>›</span>
  <Link to='/categories'> <span
    className="hover:text-black cursor-pointer capitalize"
  >
    {categorySlug}
  </span></Link>

  <span>›</span>

  <span className="text-black font-semibold">
    Sub Categories
  </span>

</div>
        {/* 🔥 SECTION TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Explore Categories
          </h2>
          <p className="text-gray-500 mt-2">
            Choose a category to view premium products
          </p>
        </div>

        {/* 🔥 GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {loading
            ? Array(8)
                .fill(0)
                .map((_, i) => <SkeletonCard key={i} />)
            : data.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleClick(item)}
                  className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 bg-white"
                >
                  {/* IMAGE */}
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-52 w-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

                  {/* TEXT */}
                  <div className="absolute bottom-0 w-full p-4 text-white opacity-0 group-hover:opacity-100 transition">
                    <h3 className="text-lg font-semibold">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-200">
                      View Products →
                    </p>
                  </div>

                  {/* BOTTOM TEXT */}
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Premium Collection
                    </p>
                  </div>

                  {/* HOVER BORDER */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500 rounded-2xl transition"></div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryListPage;