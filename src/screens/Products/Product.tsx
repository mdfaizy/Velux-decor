import React from "react";
// import { Badge } from '../../components/Badge'; // Uncomment to use your custom Badge

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
}

const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Royal Velvet Drapes",
    category: "Curtains",
    price: 4800,
    originalPrice: 6200,
    image:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=500&q=80",
    badge: "Bestseller",
    rating: 5,
    reviews: 128,
  },
  {
    id: 2,
    name: "Marble Effect Wallpaper",
    category: "Wallpaper",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=500&q=80",
    badge: "New",
    rating: 4,
    reviews: 64,
  },
  {
    id: 3,
    name: "Linen Roman Blind",
    category: "Blinds",
    price: 2800,
    originalPrice: 3500,
    image:
      "https://images.unsplash.com/photo-1597218868981-1b68e15f0065?w=500&q=80",
    rating: 5,
    reviews: 92,
  },
  {
    id: 4,
    name: "Smart Motorised Track",
    category: "Home Automation",
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80",
    badge: "Premium",
    rating: 5,
    reviews: 47,
  },
  {
    id: 5,
    name: "Bay Window Rail Set",
    category: "Curtain Tracks",
    price: 3200,
    originalPrice: 3800,
    image:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=500&q=80",
    rating: 4,
    reviews: 38,
  },
  {
    id: 6,
    name: "Oak Engineered Floor",
    category: "Wooden Flooring",
    price: 9500,
    image:
      "https://images.unsplash.com/photo-1574691250077-03a929faece5?w=500&q=80",
    badge: "Luxury",
    rating: 5,
    reviews: 156,
  },
];

const ProductList = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
        <p className="mt-2 text-gray-600">
          Discover our collection of premium decor and automation solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURED_PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4">
                  {/* Swap this with your <Badge label={product.badge} /> if preferred */}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-800 backdrop-blur-sm shadow-sm">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${i < product.rating ? "fill-current" : "text-gray-300 fill-current"}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  ({product.reviews})
                </span>
              </div>

              {/* Price & Action */}
              <div className="mt-auto flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>
                <button className="bg-gray-900 text-white p-2 rounded-full hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
