const SkeletonCard = ({ wide = false }: { wide?: boolean }) => (
  <div
    className={`overflow-hidden rounded-[16px] animate-pulse ${
      wide ? "lg:col-span-2" : ""
    }`}
  >
    <div
      className={`bg-gray-200 ${
        wide ? "h-[280px]" : "h-[220px]"
      } rounded-[16px] relative`}
    >
      <div className="absolute bottom-5 left-5 right-5">
        <div className="h-6 w-40 bg-gray-300 rounded mb-3"></div>

        <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>

        <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);

export default SkeletonCard;