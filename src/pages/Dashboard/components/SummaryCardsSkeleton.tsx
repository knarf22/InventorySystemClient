const SkeletonCard = () => (
  <div className="bg-white shadow-md rounded-2xl p-5 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="h-3 w-24 bg-gray-200 rounded" />
        <div className="h-6 w-16 bg-gray-300 rounded" />
      </div>
      <div className="h-12 w-12 bg-gray-200 rounded-full" />
    </div>
  </div>
);

const SummaryCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default SummaryCardsSkeleton;
