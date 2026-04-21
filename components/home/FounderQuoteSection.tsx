export default function FounderNote() {
  return (
    <section className="w-full bg-[#373434 opacity-15] py-24 px-4 md:py-20 relative overflow-hidden">
      {/* Subtle light glow effect */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Quote */}
        <blockquote className="text-2xl md:text-4xl lg:text-4xl font-neue font-medium leading-tight mb-8">
          <span className="text-white">&quot;Ingeniería de </span>
          <span className="text-[#888]">Seguridad </span>
          <span className="text-white">que se Siente como lujo&quot;</span>
          <span className="text-[#888]"> Cerraduras Biométricas</span>
          <span className="text-white"> | </span>
          <span className="text-[#888]">Instalación </span>
          <span className="text-white">Certificada | </span>
          <span className="text-[#888]">Soporte </span>
          <span className="text-white">24/7</span>
        </blockquote>

        {/* Attribution */}
        <p className="text-[#888] text-sm md:text-base font-medium">
          Fundador de iShkell
        </p>
      </div>
    </section>
  );
}