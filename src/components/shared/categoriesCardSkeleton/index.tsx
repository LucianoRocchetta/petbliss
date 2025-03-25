export const CategoriesCardSkeleton = () => {
  return (
    <div className="w-full h-40 bg-zinc-700 animate-pulse flex items-center justify-between p-5 gap-5">
      <div className="bg-zinc-600 p-2 lg:p-5 w-3/4"></div>
      <div className="bg-zinc-600 p-5 lg:p-10 rounded-full"></div>
    </div>
  );
};
