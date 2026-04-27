import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByIdApi } from "../services/productApi";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [activeImage, setActiveImage] = useState<string>("");

  // 🔥 Fetch Product
  const fetchProduct = async () => {
    try {
      const res = await getProductByIdApi(id);
      if (res.success) {
        setProduct(res.data);

        // 🔥 set default image
        if (res.data.images?.length) {
          setActiveImage(res.data.images[0]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-5">

      {/* 🔥 BREADCRUMB */}
      <div className="flex justify-end text-sm text-gray-500 mb-4">
        Home / Products /{" "}
        <span className="text-black ml-1 font-medium">
          {product.name}
        </span>
      </div>

      {/* 🔥 MAIN SECTION */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* 🔥 IMAGE SECTION */}
        <div>

          {/* MAIN IMAGE */}
          <img
            src={activeImage}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-xl border"
          />

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4 flex-wrap">
            {product.images?.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(img)}
                className={`
                  w-20 h-20 object-cover rounded cursor-pointer border
                  transition
                  ${activeImage === img
                    ? "border-black scale-105"
                    : "border-gray-200 hover:scale-105"}
                `}
              />
            ))}
          </div>

        </div>

        {/* 🔥 DETAILS */}
        <div>

            <div className="text-sm text-gray-500 mb-4 flex flex-wrap gap-1">

      <Link to="/" className="hover:text-black">Home</Link>
      <span>›</span>

      <Link to="/featured-products" className="hover:text-black">Products</Link>
      <span>›</span>

      <span className="text-black font-medium">
        {product.category?.name}
      </span>
      <span>›</span>

      <span className="text-black font-semibold">
        {product.name}
      </span>

    </div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-500 mt-2">
            Category: {product.category?.name}
          </p>

          <h2 className="text-2xl text-green-600 mt-4 font-semibold">
            ₹{product.price}
          </h2>

          <p className="mt-4 text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* 🔥 FEATURES */}
          <div className="mt-5">
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="space-y-2 text-gray-700">
              {product.features?.map((f: any, i: number) => {
                // 🔥 FIX for wrong stored JSON string
                if (typeof f === "string" && f.startsWith("[")) {
                  try {
                    return JSON.parse(f).map(
                      (item: string, idx: number) => (
                        <li key={idx}>✔ {item}</li>
                      )
                    );
                  } catch {
                    return <li key={i}>✔ {f}</li>;
                  }
                }
                return <li key={i}>✔ {f}</li>;
              })}
            </ul>
          </div>

          {/* 🔥 BUTTON */}
          <button className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
            Enquire Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;