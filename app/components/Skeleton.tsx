export const Skeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
          
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};

