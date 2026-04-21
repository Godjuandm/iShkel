'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#070707] text-white gap-6">
      <h2 className="text-2xl font-medium">Algo salió mal</h2>
      <button
        onClick={reset}
        className="px-8 py-3 border border-white/20 rounded-[15px] text-sm hover:bg-white/10 transition-colors"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
