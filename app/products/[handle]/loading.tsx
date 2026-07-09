// app/products/[handle]/loading.tsx
import Navbar from '@/components/shared/Navbar';

export default function ProductLoading() {
  return (
    <main className="bg-white font-neue antialiased overflow-x-hidden">
      <Navbar />

      {/* PDPHero placeholder */}
      <section className="relative min-h-[100svh] w-full bg-gray-300 animate-pulse" />

      {/* ProductShowroom placeholder */}
      <section className="bg-[#f2f2f2] py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-16 items-start">
            <div className="aspect-4/5 lg:aspect-776/805 w-full rounded-[15px] bg-gray-200 animate-pulse" />

            <div className="flex flex-col gap-4">
              <div className="h-4 w-16 rounded bg-gray-200 animate-pulse" />
              <div className="h-7 w-3/4 rounded bg-gray-200 animate-pulse" />
              <div className="space-y-2 mt-2">
                <div className="h-3.5 w-full rounded bg-gray-200 animate-pulse" />
                <div className="h-3.5 w-full rounded bg-gray-200 animate-pulse" />
                <div className="h-3.5 w-2/3 rounded bg-gray-200 animate-pulse" />
              </div>
              <div className="h-14 w-full rounded-[15px] bg-gray-200 animate-pulse mt-4" />
              <div className="h-8 w-32 rounded bg-gray-200 animate-pulse mt-2" />
              <div className="h-12 w-full rounded-[15px] bg-gray-200 animate-pulse mt-4" />
              <div className="h-[51px] w-full rounded-[11.5px] bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
