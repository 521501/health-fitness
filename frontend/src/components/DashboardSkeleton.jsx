const DashboardSkeleton = () => {
  return (
    <div className="space-y-6 p-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
        <div className="h-8 w-1/3 rounded bg-gray-200 mb-6" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-28 rounded-3xl bg-gray-200" />
          <div className="h-28 rounded-3xl bg-gray-200" />
          <div className="h-28 rounded-3xl bg-gray-200" />
        </div>
      </div>
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
        <div className="h-6 w-2/5 rounded bg-gray-200 mb-4" />
        <div className="space-y-3">
          <div className="h-16 rounded-3xl bg-gray-200" />
          <div className="h-16 rounded-3xl bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
