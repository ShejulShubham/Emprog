
export default function ItemSkeleton() {
    // TODO: Match the exact layout of ItemCard
  return (
    <div className="bg-white rounded-lg shadow-md p-4 animate-pulse border border-gray-100">
      {/* Title Placeholder */}
      <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-3"></div>
      
      {/* Type Placeholder */}
      <div className="h-4 bg-gray-100 rounded-md w-1/4 mb-4"></div>
      
      {/* Progress Info Placeholder (Pills) */}
      <div className="flex gap-2 mb-4">
        <div className="h-7 bg-purple-50 rounded-full w-20"></div>
        <div className="h-7 bg-purple-50 rounded-full w-24"></div>
      </div>

      {/* Buttons Placeholder */}
      <div className="flex justify-between mt-9 gap-2">
        <div className="h-9 bg-gray-200 rounded-full w-1/2"></div>
        <div className="h-9 bg-gray-200 rounded-full w-1/2"></div>
      </div>
    </div>
  );
}