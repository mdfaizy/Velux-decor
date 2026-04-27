// import React, { useEffect, useState } from "react";
// import { getProductsApi } from "../../services/productApi";
// interface Product {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   originalPrice?: number;
//   image: string;
//   badge?: string;
//   rating: number;
//   reviews: number;
// }


// interface FeaturedProductsProps {
//   productsRef: (node?: Element | null | undefined) => void;
//   productsInView: boolean;
//   // FEATURED_PRODUCTS: Product[];
  
//   products?: any[];
// }

// const StarRating = ({ rating }: { rating: number }) => (
//   <div className="flex gap-0.5">
//     {[1, 2, 3, 4, 5].map((s) => (
//       <span
//         key={s}
//         style={{ color: s <= rating ? "#C9A84C" : "#ccc", fontSize: "14px" }}
//       >
//         ★
//       </span>
//     ))}
//   </div>
// );

// export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
//   productsRef,
//    productsInView = true,
//   // FEATURED_PRODUCTS,
// }) => {

//   const [products, setProducts] = useState<Product[]>([]);
//   const fetchProducts = async () => {
//   try {
//     const res = await getProductsApi();

//     if (res.success) {
//       const formatted = res.data.map((item: any) => ({
//         id: item._id,
//         name: item.name,

//         category:
//           typeof item.category === "object"
//             ? item.category?.name || "General"
//             : item.category || "General",

//         price: item.price,

//         // 🔥 FIX HERE (VERY IMPORTANT)
//         image:
//           item.images && item.images.length > 0
//             ? item.images[0]
//             : "https://via.placeholder.com/300",

//         rating: item.rating || 5,
//         reviews: item.reviews || 0,
//       }));

//       setProducts(formatted);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

//   useEffect(() => {
//     fetchProducts();
//   }, []);
//   return (
//     <section
//       id="products"
//       ref={productsRef}
//       style={{ padding: "110px 0", background: "#FAF7F2" }}
//     >
//       <div className="max-w-7xl mx-auto px-6">
//         <div style={{ textAlign: "center", marginBottom: 64 }}>
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 8,
//               background: "rgba(201,168,76,0.1)",
//               borderRadius: 30,
//               padding: "6px 18px",
//               marginBottom: 20,
//               border: "1px solid rgba(201,168,76,0.2)",
//             }}
//           >
//             <span
//               style={{
//                 fontSize: 11,
//                 fontWeight: 700,
//                 color: "#C9A84C",
//                 letterSpacing: "0.12em",
//                 textTransform: "uppercase",
//               }}
//             >
//               Featured Products
//             </span>
//           </div>
//           <h2
//             style={{
//               fontFamily: "'Playfair Display',serif",
//               fontSize: "clamp(28px,4vw,50px)",
//               fontWeight: 700,
//               color: "#3D2B1F",
//               marginBottom: 16,
//             }}
//           >
//             Bestselling Pieces
//           </h2>
//           <p
//             style={{
//               fontSize: 17,
//               color: "#6B4C3B",
//               maxWidth: 500,
//               margin: "0 auto",
//             }}
//           >
//             Handpicked from our premium collection — loved by thousands of
//             homeowners across India.
//           </p>
//         </div>

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
//             gap: 24,
//           }}
//         >
//           {products.map((p, i) => (
//             <div
//               key={p.id}
//               style={{
//                 background: "#fff",
//                 borderRadius: 16,
//                 overflow: "hidden",
//                 cursor: "pointer",
//                 boxShadow: "0 4px 20px rgba(61,43,31,0.06)",
//                 opacity: productsInView ? 1 : 0,
//                 transform: productsInView
//                   ? "translateY(0)"
//                   : "translateY(20px)",
//                 transition: `all 0.6s ease ${i * 0.1}s`,
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.boxShadow =
//                   "0 16px 48px rgba(61,43,31,0.14)")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.boxShadow =
//                   "0 4px 20px rgba(61,43,31,0.06)")
//               }
//             >
//               <div
//                 style={{
//                   position: "relative",
//                   height: 230,
//                   overflow: "hidden",
//                 }}
//               >
//                 <img
//                   src={p.image}
//                   alt={p.name}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                     transition: "transform 0.5s",
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.transform = "scale(1.06)")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.transform = "none")
//                   }
//                 />
//                 {p.badge && (
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: 12,
//                       left: 12,
//                       background: "#C9A84C",
//                       borderRadius: 6,
//                       padding: "4px 10px",
//                       fontSize: 10,
//                       fontWeight: 700,
//                       color: "#fff",
//                       letterSpacing: "0.06em",
//                       textTransform: "uppercase",
//                     }}
//                   >
//                     {p.badge}
//                   </div>
//                 )}
//                 <button
//                   style={{
//                     position: "absolute",
//                     top: 12,
//                     right: 12,
//                     width: 36,
//                     height: 36,
//                     borderRadius: "50%",
//                     background: "rgba(255,255,255,0.92)",
//                     border: "none",
//                     cursor: "pointer",
//                     fontSize: 18,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                     transition: "all 0.2s",
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.background = "#C9A84C")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.background =
//                       "rgba(255,255,255,0.92)")
//                   }
//                 >
//                   ♡
//                 </button>
//               </div>
//               <div style={{ padding: "18px 20px 22px" }}>
//                 <div
//                   style={{
//                     fontSize: 10,
//                     fontWeight: 700,
//                     color: "#C9A84C",
//                     letterSpacing: "0.1em",
//                     textTransform: "uppercase",
//                     marginBottom: 6,
//                   }}
//                 >
//                   {p.category}
//                 </div>
//                 <div
//                   style={{
//                     fontFamily: "'Playfair Display',serif",
//                     fontSize: 18,
//                     fontWeight: 600,
//                     color: "#3D2B1F",
//                     marginBottom: 8,
//                     lineHeight: 1.3,
//                   }}
//                 >
//                   {p.name}
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 6,
//                     marginBottom: 14,
//                   }}
//                 >
//                   <StarRating rating={p.rating} />
//                   <span style={{ fontSize: 12, color: "#8A8278" }}>
//                     ({p.reviews})
//                   </span>
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "baseline",
//                       gap: 8,
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontSize: 20,
//                         fontWeight: 700,
//                         color: "#3D2B1F",
//                       }}
//                     >
//                       ₹{p.price.toLocaleString()}
//                     </span>
//                     {p.originalPrice && (
//                       <span
//                         style={{
//                           fontSize: 13,
//                           color: "#8A8278",
//                           textDecoration: "line-through",
//                         }}
//                       >
//                         ₹{p.originalPrice.toLocaleString()}
//                       </span>
//                     )}
//                   </div>
//                   <button
//                     style={{
//                       background: "linear-gradient(135deg,#C9A84C,#8B6914)",
//                       border: "none",
//                       borderRadius: 8,
//                       padding: "9px 16px",
//                       fontSize: 12,
//                       fontWeight: 600,
//                       color: "#fff",
//                       cursor: "pointer",
//                       letterSpacing: "0.03em",
//                       transition: "all 0.2s",
//                     }}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.transform = "translateY(-1px)")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.transform = "none")
//                     }
//                   >
//                     Enquire
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div style={{ textAlign: "center", marginTop: 52 }}>
//           <button
//             style={{
//               background: "transparent",
//               border: "2px solid #3D2B1F",
//               borderRadius: 8,
//               padding: "16px 48px",
//               fontSize: 14,
//               fontWeight: 700,
//               color: "#3D2B1F",
//               cursor: "pointer",
//               letterSpacing: "0.08em",
//               textTransform: "uppercase",
//               transition: "all 0.3s",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = "#3D2B1F";
//               e.currentTarget.style.color = "#FAF7F2";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = "transparent";
//               e.currentTarget.style.color = "#3D2B1F";
//             }}
//           >
//             View All Products
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };





import React, { useEffect, useState } from "react";
import { getProductsApi } from "../../services/productApi";
interface Product {
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

import { useNavigate } from "react-router-dom";

interface FeaturedProductsProps {
  productsRef: (node?: Element | null | undefined) => void;
  productsInView: boolean;
  // FEATURED_PRODUCTS: Product[];
  
  products?: any[];
}


const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <span
        key={s}
        style={{ color: s <= rating ? "#C9A84C" : "#ccc", fontSize: "14px" }}
      >
        ★
      </span>
    ))}
  </div>
);

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  productsRef,
   productsInView = true,
  // FEATURED_PRODUCTS,
}) => {
const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const fetchProducts = async () => {
  try {
    const res = await getProductsApi();

    if (res.success) {
      const formatted = res.data.map((item: any) => ({
        id: item._id,
        name: item.name,

        category:
          typeof item.category === "object"
            ? item.category?.name || "General"
            : item.category || "General",

        price: item.price,

        // 🔥 FIX HERE (VERY IMPORTANT)
        image:
          item.images && item.images.length > 0
            ? item.images[0]
            : "https://via.placeholder.com/300",

        rating: item.rating || 5,
        reviews: item.reviews || 0,
      }));

      setProducts(formatted);
    }
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section
      id="products"
      ref={productsRef}
      style={{ padding: "110px 0", background: "#FAF7F2" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(201,168,76,0.1)",
              borderRadius: 30,
              padding: "6px 18px",
              marginBottom: 20,
              border: "1px solid rgba(201,168,76,0.2)",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#C9A84C",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Featured Products
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(28px,4vw,50px)",
              fontWeight: 700,
              color: "#3D2B1F",
              marginBottom: 16,
            }}
          >
            Bestselling Pieces
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "#6B4C3B",
              maxWidth: 500,
              margin: "0 auto",
            }}
          >
            Handpicked from our premium collection — loved by thousands of
            homeowners across India.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 24,
          }}
        >
          {products.map((p, i) => (
            <div
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
              style={{
                background: "#fff",
                borderRadius: 16,
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(61,43,31,0.06)",
                opacity: productsInView ? 1 : 0,
                transform: productsInView
                  ? "translateY(0)"
                  : "translateY(20px)",
                transition: `all 0.6s ease ${i * 0.1}s`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 16px 48px rgba(61,43,31,0.14)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(61,43,31,0.06)")
              }
            >
              <div
                style={{
                  position: "relative",
                  height: 230,
                  overflow: "hidden",
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.06)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "none")
                  }
                />
                {p.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      background: "#C9A84C",
                      borderRadius: 6,
                      padding: "4px 10px",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {p.badge}
                  </div>
                )}
                <button
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.92)",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#C9A84C")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.92)")
                  }
                >
                  ♡
                </button>
              </div>
              <div style={{ padding: "18px 20px 22px" }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#C9A84C",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  {p.category}
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#3D2B1F",
                    marginBottom: 8,
                    lineHeight: 1.3,
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 14,
                  }}
                >
                  <StarRating rating={p.rating} />
                  <span style={{ fontSize: 12, color: "#8A8278" }}>
                    ({p.reviews})
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#3D2B1F",
                      }}
                    >
                      ₹{p.price.toLocaleString()}
                    </span>
                    {p.originalPrice && (
                      <span
                        style={{
                          fontSize: 13,
                          color: "#8A8278",
                          textDecoration: "line-through",
                        }}
                      >
                        ₹{p.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
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
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-1px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "none")
                    }
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 52 }}>
          <button
            style={{
              background: "transparent",
              border: "2px solid #3D2B1F",
              borderRadius: 8,
              padding: "16px 48px",
              fontSize: 14,
              fontWeight: 700,
              color: "#3D2B1F",
              cursor: "pointer",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#3D2B1F";
              e.currentTarget.style.color = "#FAF7F2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#3D2B1F";
            }}
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

