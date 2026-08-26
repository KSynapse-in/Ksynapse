export default function DashboardLoading() {
  return (
    <div className="space-y-6 max-w-[1200px] animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-divider/40 rounded-lg" />
          <div className="h-4 w-72 bg-divider/30 rounded-md" />
        </div>
        <div className="h-9 w-36 bg-divider/40 rounded-xl" />
      </div>

      {/* Hero row skeleton */}
      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        <div className="bg-white rounded-2xl border border-divider/30 p-6 flex flex-col items-center justify-center h-[260px]">
          <div className="w-40 h-40 rounded-full bg-divider/20 border-4 border-divider/30 flex items-center justify-center">
            <div className="h-10 w-16 bg-divider/30 rounded-md" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-divider/30 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-divider/20" />
                <div className="w-12 h-4 bg-divider/20 rounded-md" />
              </div>
              <div className="h-7 w-24 bg-divider/30 rounded-md" />
              <div className="h-3 w-32 bg-divider/20 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* Three column row skeleton */}
      <div className="grid lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-divider/30 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-5 w-32 bg-divider/30 rounded-md" />
              <div className="w-4 h-4 rounded-full bg-divider/20" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex gap-3 items-center">
                  <div className="w-4 h-4 rounded-full bg-divider/30 flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <div className="h-3.5 bg-divider/30 rounded w-full" />
                    <div className="h-2.5 bg-divider/20 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
