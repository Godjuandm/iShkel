'use client';

import Image from 'next/image';

const products = [
  {
    id: 1,
    name: 'Cerradura FX 321312',
    image: '/Images_Icons/lock 1.png',
    faceId: false,
    huella: false,
    bateria: '20h',
    resistente: true,
    tarjetas: 2,
    precio: '800,000 COP',
    recommended: false,
  },
  {
    id: 2,
    name: 'Cerradura FX 321312',
    image: '/Images_Icons/lock 1.png',
    faceId: true,
    huella: true,
    bateria: '40h',
    resistente: true,
    tarjetas: 2,
    precio: '1,200,000 COP',
    recommended: false,
  },
  {
    id: 3,
    name: 'Cerradura FX 321312',
    image: '/Images_Icons/lock 1.png',
    faceId: true,
    huella: true,
    bateria: '100h',
    resistente: true,
    tarjetas: 4,
    precio: '1,500,000 COP',
    recommended: true,
  },
];

const FaceIdIcon = () => (
  <img src="/Images_Icons/faceId.png" alt="Face ID Icon" className="w-[50px] h-[50px]" />
);

const FingerprintIcon = () => (
  <img src="/Images_Icons/Huella.png" alt="Fingerprint Icon" className="w-[50px] h-[50px]" />
);

const WaterIcon = () => (
  <img src="/Images_Icons/WaterResistanceIcon.png" alt="Water Resistant Icon" className="w-[50px] h-[50px]" />
);

const CardIcon = () => (
  <div className="relative w-[50px] h-[38px]">
    <div className="absolute top-0 left-0 w-[38px] h-[28px] bg-[#f2f2f2] rounded-[5px]" />
    <div className="absolute top-[10px] left-[12px] w-[38px] h-[28px] bg-[#555] rounded-[5px]" />
  </div>
);

const GradientText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span
    className={`bg-clip-text text-transparent ${className}`}
    style={{
      backgroundImage: 'linear-gradient(180deg, #8C857E 0%, #C4B6A6 25%, #F2F2F2 50%, #C4B6A6 75%, #8C857E 100%)',
    }}
  >
    {children}
  </span>
);

const NotAvailable = () => (
  <span className="text-[#444] text-2xl font-light">—</span>
);

export default function ComparisonTable() {
  return (
    <section className="w-full bg-[#070707] py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-[1360px] mx-auto">

        {/* Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-medium mb-12 md:mb-16 lg:mb-20">
          <span className="text-white">Cual iShkel es la mejor </span>
          <GradientText>para ti?</GradientText>
        </h2>

        {/* Desktop Table */}
        <div className="hidden lg:block">

          {/* Product Headers */}
          <div className="grid grid-cols-[200px_1fr_1fr_1fr] gap-0 mb-0">
            <div />
            {products.map((product) => (
              <div
                key={product.id}
                className={`flex flex-col items-center px-4 pb-6 pt-6 rounded-t-[20px] transition-colors ${
                  product.recommended ? 'bg-white/[0.05]' : ''
                }`}
              >
                {product.recommended && (
                  <span className="mb-3 px-4 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase border border-white/20 text-white/60">
                    Recomendado
                  </span>
                )}
                <div className="relative w-[169px] h-[170px] mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-[24px] font-medium text-center">
                  <GradientText>Cerradura FX 321312</GradientText>
                </p>
              </div>
            ))}
          </div>

          {/* Table Rows */}
          <div className="border-t border-[#222]">

            {/* FACE ID Row */}
            <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-[#222] group hover:bg-white/[0.02] transition-colors">
              <div className="py-12 px-2 flex items-center">
                <span className="text-[20px] font-medium tracking-[1.7px] uppercase">
                  <GradientText>FACE ID</GradientText>
                </span>
              </div>
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`py-12 px-4 flex flex-col items-center justify-center transition-colors ${
                    product.recommended ? 'bg-white/[0.05]' : ''
                  }`}
                >
                  {product.faceId ? (
                    <>
                      <p className="text-[#f2f2f2] text-[16px] text-center mb-4 leading-relaxed">
                        Implementación de Face ID<br />con tecnología de punta
                      </p>
                      <FaceIdIcon />
                    </>
                  ) : (
                    <NotAvailable />
                  )}
                </div>
              ))}
            </div>

            {/* HUELLA DIGITAL Row */}
            <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-[#222] group hover:bg-white/[0.02] transition-colors">
              <div className="py-12 px-2 flex items-center">
                <span className="text-[20px] font-medium tracking-[1.7px] uppercase">
                  <GradientText>HUELLA DIGITAL</GradientText>
                </span>
              </div>
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`py-12 px-4 flex flex-col items-center justify-center transition-colors ${
                    product.recommended ? 'bg-white/[0.05]' : ''
                  }`}
                >
                  {product.huella ? (
                    <>
                      <p className="text-[#f2f2f2] text-[16px] text-center mb-4 leading-relaxed">
                        Desbloqueo biométrico<br />de alta precisión
                      </p>
                      <FingerprintIcon />
                    </>
                  ) : (
                    <NotAvailable />
                  )}
                </div>
              ))}
            </div>

            {/* VIDA DE LA BATERIA Row */}
            <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-[#222] group hover:bg-white/[0.02] transition-colors">
              <div className="py-10 px-2 flex items-center">
                <span className="text-[20px] font-medium tracking-[1.7px] uppercase">
                  <GradientText>VIDA DE LA BATERÍA</GradientText>
                </span>
              </div>
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`py-10 px-4 flex items-center justify-center transition-colors ${
                    product.recommended ? 'bg-white/[0.05]' : ''
                  }`}
                >
                  <span className="text-[#f2f2f2] text-[24px] font-bold">{product.bateria}</span>
                </div>
              ))}
            </div>

            {/* RESISTENTE AL AGUA Row */}
            <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-[#222] group hover:bg-white/[0.02] transition-colors">
              <div className="py-10 px-2 flex items-center">
                <span className="text-[20px] font-medium tracking-[1.7px] uppercase">
                  <GradientText>RESISTENTE AL AGUA</GradientText>
                </span>
              </div>
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`py-10 px-4 flex items-center justify-center transition-colors ${
                    product.recommended ? 'bg-white/[0.05]' : ''
                  }`}
                >
                  <WaterIcon />
                </div>
              ))}
            </div>

            {/* TARJETAS Row */}
            <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-[#222] group hover:bg-white/[0.02] transition-colors">
              <div className="py-10 px-2 flex items-center">
                <span className="text-[20px] font-medium tracking-[1.7px] uppercase">
                  <GradientText>TARJETAS</GradientText>
                </span>
              </div>
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`py-10 px-4 flex flex-col items-center justify-center gap-4 transition-colors ${
                    product.recommended ? 'bg-white/[0.05]' : ''
                  }`}
                >
                  <span className="text-[#f2f2f2] text-[16px]">{product.tarjetas}x Tarjetas</span>
                  <CardIcon />
                </div>
              ))}
            </div>

            {/* PRECIO Row */}
            <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-[#222]">
              <div className="py-10 px-2 flex items-center">
                <span className="text-[#f2f2f2] text-[20px] tracking-[1.7px] uppercase font-medium">PRECIO</span>
              </div>
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`py-10 px-4 flex items-center justify-center rounded-b-[20px] transition-colors ${
                    product.recommended ? 'bg-white/[0.05]' : ''
                  }`}
                >
                  <span
                    className={`text-[16px] font-semibold ${
                      product.recommended ? 'text-white text-[18px]' : 'text-[#f2f2f2]'
                    }`}
                  >
                    {product.precio}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-end mt-16">
            <button className="px-16 py-4 border-2 border-white rounded-[15px] text-white text-[20px] font-medium hover:bg-white hover:text-[#070707] transition-colors duration-300">
              Comparar ahora
            </button>
          </div>
        </div>

        {/* Tablet Table (md screens) */}
        <div className="hidden md:block lg:hidden overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-[150px_1fr_1fr_1fr] gap-0 mb-6">
              <div />
              {products.map((product) => (
                <div key={product.id} className="flex flex-col items-center px-2">
                  {product.recommended && (
                    <span className="mb-2 px-3 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase border border-white/20 text-white/60">
                      Top
                    </span>
                  )}
                  <div className="relative w-[100px] h-[120px] mb-3">
                    <Image src={product.image} alt={product.name} fill className="object-contain" />
                  </div>
                  <p className="text-[16px] font-medium text-center">
                    <GradientText>FX 321312</GradientText>
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-[#222]">
              {[
                { label: 'FACE ID', values: ['—', '✓', '✓'] },
                { label: 'HUELLA', values: ['—', '✓', '✓'] },
                { label: 'BATERÍA', values: ['20h', '40h', '100h'] },
                { label: 'AGUA', values: ['✓', '✓', '✓'] },
                { label: 'TARJETAS', values: ['2x', '2x', '4x'] },
                { label: 'PRECIO', values: ['800K', '1.2M', '1.5M'] },
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-[150px_1fr_1fr_1fr] border-b border-[#222] hover:bg-white/[0.02] transition-colors">
                  <div className="py-6 px-2 flex items-center">
                    <span className="text-white text-[14px] tracking-wider uppercase">{row.label}</span>
                  </div>
                  {row.values.map((val, i) => (
                    <div
                      key={i}
                      className={`py-6 px-2 flex items-center justify-center ${
                        i === 2 ? 'bg-white/[0.05]' : ''
                      }`}
                    >
                      <span className={`text-[16px] font-medium ${val === '—' ? 'text-[#444]' : 'text-[#f2f2f2]'}`}>
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-10">
              <button className="px-10 py-3 border-2 border-white rounded-[15px] text-white text-[16px] font-medium hover:bg-white hover:text-[#070707] transition-colors duration-300">
                Comparar ahora
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={`rounded-2xl p-5 border transition-colors ${
                product.recommended
                  ? 'bg-white/[0.07] border-white/20'
                  : 'bg-[#111] border-[#222]'
              }`}
            >
              {product.recommended && (
                <div className="mb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase border border-white/20 text-white/60">
                    Recomendado
                  </span>
                </div>
              )}
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[#333]">
                <div className="relative w-[70px] h-[90px]">
                  <Image src={product.image} alt={product.name} fill className="object-contain" />
                </div>
                <div>
                  <p className="text-base font-medium">
                    <GradientText>Cerradura FX 321312</GradientText>
                  </p>
                  <p className="text-[#f2f2f2] text-lg font-bold mt-1">{product.precio}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#888] uppercase tracking-wide">Face ID</span>
                  <span className={product.faceId ? 'text-white font-medium' : 'text-[#444]'}>
                    {product.faceId ? '✓ Incluido' : '—'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888] uppercase tracking-wide">Huella</span>
                  <span className={product.huella ? 'text-white font-medium' : 'text-[#444]'}>
                    {product.huella ? '✓ Incluido' : '—'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888] uppercase tracking-wide">Batería</span>
                  <span className="text-[#f2f2f2] font-bold">{product.bateria}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888] uppercase tracking-wide">Resistente al agua</span>
                  <span className="text-white font-medium">✓ Incluido</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888] uppercase tracking-wide">Tarjetas</span>
                  <span className="text-[#f2f2f2]">{product.tarjetas}x</span>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-8">
            <button className="w-full max-w-xs px-8 py-3 border-2 border-white rounded-[15px] text-white text-base font-medium hover:bg-white hover:text-[#070707] transition-colors duration-300">
              Comparar ahora
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
