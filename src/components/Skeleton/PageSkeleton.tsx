const PageSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse p-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-48 rounded bg-slate-200 dark:bg-slate-700"></div>
          <div className="mt-3 h-4 w-72 rounded bg-slate-200 dark:bg-slate-700"></div>
        </div>

        <div className="h-10 w-36 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-xl bg-white p-6 shadow dark:bg-slate-800"
          >
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700"></div>

            <div className="mt-4 h-8 w-28 rounded bg-slate-200 dark:bg-slate-700"></div>

            <div className="mt-6 h-3 w-20 rounded bg-slate-200 dark:bg-slate-700"></div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="h-96 rounded-xl bg-white p-6 shadow dark:bg-slate-800">
          <div className="h-full rounded bg-slate-200 dark:bg-slate-700"></div>
        </div>

        <div className="h-96 rounded-xl bg-white p-6 shadow dark:bg-slate-800">
          <div className="h-full rounded bg-slate-200 dark:bg-slate-700"></div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-800">
        {[1, 2, 3, 4, 5].map((row) => (
          <div
            key={row}
            className="mb-4 h-12 rounded bg-slate-200 dark:bg-slate-700"
          ></div>
        ))}
      </div>

    </div>
  );
};

export default PageSkeleton;