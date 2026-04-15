export default function Loading() {
  return (
    <main className="container-width py-20">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 rounded-lg bg-gray-200" />
        <div className="h-5 w-72 rounded-lg bg-gray-100" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 p-6">
              <div className="h-5 w-20 rounded-full bg-gray-100" />
              <div className="mt-4 h-6 w-3/4 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-full rounded bg-gray-100" />
              <div className="mt-4 h-5 w-24 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
