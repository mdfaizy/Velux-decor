import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import apiConnector from "../services/apiConnector";
import EnquiryModal from "./AiAgentMobile/EnquiryModal";
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ChevronRight, 
  Star, 
  Eye,
  CheckCircle
} from "lucide-react";

const ProductDetails = () => {
  const { categorySlug, subCategorySlug, productSlug } = useParams();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  const fetchProduct = async () => {
    try {
      if (!productSlug) return;

      let url = subCategorySlug
        ? `/products/${categorySlug}/${subCategorySlug}/${productSlug}`
        : `/products/detail/${productSlug}`;

      const res = await apiConnector.get(url);

      if (res.data.success) {
        setProduct(res.data.data);
        setActiveImage(res.data.data.images?.[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [categorySlug, subCategorySlug, productSlug]);

  if (!product) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading product details...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4 mt-14">
      {/* Enhanced Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-3 rounded-lg shadow-sm">
          <Link to="/" className="hover:text-amber-600 transition">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/categories" className="hover:text-amber-600 transition">
            {product.category?.name}
          </Link>
          {product.subCategory && (
            <>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-700">{product.subCategory?.name}</span>
            </>
          )}
          <ChevronRight className="w-4 h-4" />
          <span className="text-amber-700 font-semibold">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Main Product Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-10">
            
            {/* LEFT - Image Gallery */}
            <div>
              <div className="relative bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-[500px] object-cover transition duration-500 hover:scale-105"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    New
                  </span>
                )}
                {product.discount && (
                  <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {product.discount}% OFF
                  </span>
                )}
                <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg hover:bg-white transition">
                  <Eye className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Thumbnails Grid */}
              <div className="grid grid-cols-5 gap-3 mt-4">
                {product.images?.map((img: string, i: number) => (
                  <div
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`
                      relative rounded-lg overflow-hidden cursor-pointer border-2
                      transition duration-200
                      ${activeImage === img
                        ? "border-amber-600 shadow-lg"
                        : "border-gray-200 hover:border-amber-300"}
                    `}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-24 object-cover"
                    />
                    {activeImage === img && (
                      <div className="absolute inset-0 bg-amber-600/10"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT - Product Info */}
            <div className="flex flex-col">
              {/* Product Badges */}
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold">
                  Best Seller
                </span>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-gray-500 ml-1">(128 reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              {/* SKU & Category */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                <span>SKU: <span className="text-gray-700">{product.sku || "PRD-001"}</span></span>
                <span>Category: <span className="text-gray-700">{product.category?.name}</span></span>
                {product.availability && (
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> In Stock
                  </span>
                )}
              </div>

              {/* Price Card */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-200 mb-4">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-4xl font-bold text-amber-700">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="ml-3 text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                    )}
                    {product.discount && (
                      <span className="ml-3 text-green-600 font-semibold">Save {product.discount}%</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">Inclusive of all taxes</span>
                </div>
                {product.emiAvailable && (
                  <p className="text-sm text-gray-600 mt-2">
                    EMI available from ₹{Math.round(product.price / 12)}/month
                  </p>
                )}
              </div>

              {/* Description Preview */}
              <p className="text-gray-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Key Features */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Key Features</h3>
                <ul className="grid grid-cols-1 gap-2">
                  {product.features?.slice(0, 4).map((f: any, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition font-bold text-gray-600"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-x border-gray-300 font-medium min-w-[50px] text-center">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition font-bold text-gray-600"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">{product.stock || 50}+ items available</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-200">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>

                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setEnquiryOpen(true);
                  }}
                  className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold transition duration-200 flex items-center justify-center gap-2"
                >
                  Enquire Now
                </button>

                <button 
                  onClick={() => setIsWishlist(!isWishlist)}
                  className="p-3 border border-gray-300 rounded-lg hover:border-amber-600 transition duration-200 group"
                >
                  <Heart className={`w-5 h-5 ${isWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600 group-hover:text-amber-600'}`} />
                </button>

                <button className="p-3 border border-gray-300 rounded-lg hover:border-amber-600 transition duration-200 group">
                  <Share2 className="w-5 h-5 text-gray-600 group-hover:text-amber-600" />
                </button>
              </div>

              {/* Trust Badges */}
           
            </div>
          </div>

    
        </div>

     
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        open={enquiryOpen}
        setOpen={setEnquiryOpen}
        product={selectedProduct}
      />
    </div>
  );
};

export default ProductDetails;