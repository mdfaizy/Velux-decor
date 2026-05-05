// import { Link, useParams } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import apiConnector from "../services/apiConnector";

// const ProductDetails = () => {
//   const { categorySlug, subCategorySlug, productSlug } = useParams();

//   const [product, setProduct] = useState<any>(null);
//   const [activeImage, setActiveImage] = useState<string>("");

//   const fetchProduct = async () => {
//     try {
//       if (!categorySlug || !productSlug) return;

//       let url = subCategorySlug
//         ? `/products/${categorySlug}/${subCategorySlug}/${productSlug}`
//         : `/products/detail/${categorySlug}/${productSlug}`;

//       const res = await apiConnector.get(url);

//       if (res.data.success) {
//         setProduct(res.data.data);
//         setActiveImage(res.data.data.images?.[0]);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchProduct();
//   }, [categorySlug, subCategorySlug, productSlug]);

//   if (!product) return <div className="p-10 text-center">Loading...</div>;

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10 mt-16">

//       {/* 🔥 Breadcrumb */}
//       <div className="text-sm text-gray-500 mb-6 flex flex-wrap gap-2">
//         <Link to="/" className="hover:text-black">Home</Link>
//         <span>›</span>

//         <Link to="/featured-products" className="hover:text-black">Products</Link>
//         <span>›</span>
// <Link to="/categories" className="hover:text-black"><span className="text-gray-700">{product.category?.name}</span></Link>
        

//         {product.subCategory && (
//           <>
//           <Link to="/featured-products" className="hover:text-black">Products</Link>
//             <span>›</span>
//             <span className="text-gray-700">{product.subCategory?.name}</span>
//           </>
//         )}

//         <span>›</span>
//         <span className="text-black font-semibold">{product.name}</span>
//       </div>

//       {/* 🔥 MAIN GRID */}
//       <div className="grid lg:grid-cols-2 gap-10">

//         {/* LEFT - IMAGES */}
//         <div>
//           <div className="border rounded-xl overflow-hidden shadow-sm">
//             <img
//               src={activeImage}
//               alt={product.name}
//               className="w-full h-[420px] object-cover"
//             />
//           </div>

//           {/* THUMBNAILS */}
//           <div className="flex gap-3 mt-4 flex-wrap">
//             {product.images?.map((img: string, i: number) => (
//               <img
//                 key={i}
//                 src={img}
//                 onClick={() => setActiveImage(img)}
//                 className={`
//                   w-20 h-20 object-cover rounded-lg cursor-pointer border transition
//                   ${activeImage === img
//                     ? "border-black scale-105"
//                     : "border-gray-200 hover:scale-105"}
//                 `}
//               />
//             ))}
//           </div>
//         </div>

//         {/* RIGHT - DETAILS */}
//         <div className="flex flex-col justify-between">

//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">
//               {product.name}
//             </h1>

//             <p className="text-gray-500 mt-2">
//               Category:{" "}
//               <span className="text-gray-700 font-medium">
//                 {product.category?.name}
//               </span>
//             </p>

//             {/* PRICE */}
//             <div className="mt-4">
//               <span className="text-3xl font-bold text-green-600">
//                 ₹{product.price}
//               </span>
//             </div>

//             {/* DESCRIPTION */}
//             <p className="mt-5 text-gray-600 leading-relaxed">
//               {product.description}
//             </p>

//             {/* FEATURES */}
//             <div className="mt-6">
//               <h3 className="font-semibold text-lg mb-3">Features</h3>
//               <ul className="space-y-2">
//                 {product.features?.map((f: any, i: number) => (
//                   <li
//                     key={i}
//                     className="flex items-center gap-2 text-gray-700"
//                   >
//                     <span className="text-green-600">✔</span> {f}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* CTA */}
//           <div className="mt-8">
//             <button className="w-full bg-black text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition">
//               Enquire Now
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;


import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import apiConnector from "../services/apiConnector";
import EnquiryModal from "./AiAgentMobile/EnquiryModal";

const ProductDetails = () => {
  const { categorySlug, subCategorySlug, productSlug } = useParams();
 const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [activeImage, setActiveImage] = useState<string>("");

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

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 mt-14">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6 lg:p-10">

        {/* 🔥 Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex flex-wrap gap-2">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>›</span>

          <Link to="/categories" className="hover:text-black">
            {product.category?.name}
          </Link>

          {product.subCategory && (
            <>
              <span>›</span>
              <span className="text-gray-700">{product.subCategory?.name}</span>
            </>
          )}

          <span>›</span>
          <span className="text-black font-semibold">{product.name}</span>
        </div>

        {/* 🔥 MAIN GRID */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT IMAGE SECTION */}
          <div>
            <div className="border rounded-xl overflow-hidden shadow-md">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-[420px] object-cover hover:scale-105 transition duration-300"
              />
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 mt-4 flex-wrap">
              {product.images?.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setActiveImage(img)}
                  className={`
                    w-20 h-20 object-cover rounded-lg cursor-pointer border
                    transition duration-200
                    ${activeImage === img
                      ? "border-black scale-105 shadow"
                      : "border-gray-200 hover:scale-105"}
                  `}
                />
              ))}
            </div>
          </div>

          {/* RIGHT DETAILS SECTION */}
          <div className="flex flex-col justify-between">

            <div>
              {/* TITLE */}
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* CATEGORY */}
              <p className="text-gray-500 mt-2">
                Category:{" "}
                <span className="text-gray-800 font-medium">
                  {product.category?.name}
                </span>
              </p>

              {/* PRICE CARD */}
              <div className="mt-5 bg-gray-100 p-4 rounded-xl flex items-center justify-between">
                <span className="text-3xl font-bold text-green-600">
                  ₹{product.price}
                </span>

                <span className="text-sm text-gray-500">
                  Inclusive of all taxes
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="mt-5 text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* FEATURES */}
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-3">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features?.map((f: any, i: number) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-gray-700"
                    >
                      <span className="text-green-600">✔</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA SECTION */}
            <div className="mt-8 flex gap-4">
                <button
                    style={{
                      background: "linear-gradient(135deg,#C9A84C,#8B6914)",
                      border: "none",
                      borderRadius: 8,
                      padding: "9px 16px",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#fff",
                      cursor: "pointer",
                      letterSpacing: "0.03em",
                      transition: "all 0.2s",
                    }}
                    onClick={() => {
  setSelectedProduct(product);
  setEnquiryOpen(true);
}}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-1px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "none")
                    }
                  >
                    Enquire
                  </button>

              <button className="flex-1 border border-black py-3 rounded-lg text-lg font-medium hover:bg-black hover:text-white transition">
                Add to Wishlist
              </button>
            </div>

          </div>
        </div>
      </div>

      <EnquiryModal
        open={enquiryOpen}
        setOpen={setEnquiryOpen}
        product={selectedProduct}
      />
    </div>
  );
};

export default ProductDetails;