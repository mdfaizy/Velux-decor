import React from "react";

interface Category {
  id: string;
  name: string;
  image: string;
  tag: string;
  icon: React.ReactNode;
  description: string;
}

interface Props {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}

const CategoriesSection: React.FC<Props> = ({
  categories,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <section id="categories" className="py-[110px] bg-[#F0EAE0]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-5 mb-[60px]">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C9A84C1A] border border-[#C9A84C33] rounded-full px-4 py-1.5 mb-4">
              <span className="text-[11px] font-bold text-[#C9A84C] tracking-[0.12em] uppercase">
                Our Collections
              </span>
            </div>

            <h2 className="font-serif text-[clamp(28px,4vw,50px)] font-bold text-[#3D2B1F] leading-[1.1]">
              Curated for Every Style
            </h2>
          </div>

          <p className="text-[16px] text-[#6B4C3B] max-w-[380px] leading-[1.7]">
            From classic elegance to modern minimalism — discover our premium
            furnishing solutions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {categories.map((cat, i) => {
            const isWide = i === 0 || i === 5;

            return (
              <div
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
                  ${isWide ? "md:col-span-2" : "col-span-1"}
                  ${activeCategory === cat.id
                    ? "border-2 border-[#C9A84C] shadow-[0_20px_50px_rgba(201,168,76,0.22)] -translate-y-1"
                    : "border-2 border-transparent shadow-[0_4px_20px_rgba(61,43,31,0.07)]"}
                `}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${isWide ? "h-[280px]" : "h-[220px]"}`}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className={`
                      w-full h-full object-cover transition-transform duration-700
                      ${activeCategory === cat.id ? "scale-105" : "scale-100"}
                    `}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(20,10,4,0.72)]" />

                  {/* Tag */}
                  <div className="absolute top-3.5 right-3.5 bg-[#C9A84C] rounded-full px-3 py-1 text-[10px] font-bold text-white tracking-wider uppercase">
                    {cat.tag}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="text-[22px]">{cat.icon}</span>

                      <span
                        className={`
                          font-serif font-bold text-[#FAF7F2] drop-shadow-md
                          ${isWide ? "text-[24px]" : "text-[20px]"}
                        `}
                      >
                        {cat.name}
                      </span>
                    </div>

                    <p className="text-[13px] text-[#FAF7F2BF] leading-[1.5] max-w-[380px]">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CategoriesSection;