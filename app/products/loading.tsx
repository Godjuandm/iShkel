// app/products/loading.tsx
import Navbar from '@/components/shared/Navbar';

export default function ProductsLoading() {
  return (
    <main className="min-h-screen bg-white font-neue">
      <Navbar dark />

      <section className="pt-24 md:pt-28 pb-8 md:pb-12 px-4 md:px-8 lg:px-14">
        <div className="max-w-340 mx-auto">
          <div className="h-9 md:h-11 w-72 max-w-full rounded-lg bg-gray-200 animate-pulse mb-10 md:mb-12" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
            <div className="h-164 rounded-[15px] bg-gray-200 animate-pulse" />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[320px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-[15px] bg-gray-200 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
