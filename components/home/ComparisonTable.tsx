'use client';

import Image from 'next/image';
import Reveal from '@/components/shared/Reveal';

const products = [
  {
    id: 1,
    name: 'Fx Camon',
    image: '/Images_Icons/lock 1.png',
    recommended: false,
    features: {
      camaraFaceId: 'Sí',
      huella: 'Sí',
      bateria: '4200mAh',
      proteccion: 'IP 66',
      cilindro: 'Grado C',
      palma: 'Sí',
      ppf: 'No',
      wifi: 'Powered By Tuya',
      mecanismo: '5 Pasadores (Compatible a 8)',
      vaultGuard: 'Sí',
      videoportero: 'Sí',
      idioma: 'English · Español · Russian',
      garantia: '12-24 meses',
      encriptacion: 'AES-256',
      accesorios: '2 Llaves | 2 Tags',
    },
  },
  {
    id: 2,
    name: 'Fx Under',
    image: '/Images_Icons/lock 1.png',
    recommended: true,
    features: {
      camaraFaceId: 'Sí',
      huella: 'Sí',
      bateria: '4200mAh',
      proteccion: 'IP 55',
      cilindro: 'Grado C',
      palma: 'Sí',
      ppf: 'Sí',
      wifi: 'Powered By Tuya | Apertura remota',
      mecanismo: '5 Pasadores (Compatible a 8)',
      vaultGuard: 'Sí',
      videoportero: 'Sí',
      idioma: 'English · Español · Russian',
      garantia: '12-24 meses',
      encriptacion: 'AES-256',
      accesorios: '2 Llaves | 2 Tags',
    },
  },
  {
    id: 3,
    name: 'X | R',
    image: '/Images_Icons/lock 1.png',
    recommended: false,
    features: {
      camaraFaceId: 'No',
      huella: 'Sí',
      bateria: '3200mAh',
      proteccion: 'IP 55',
      cilindro: 'Grado C',
      palma: 'No',
      ppf: 'No',
      wifi: 'Powered By Tuya | Apertura remota | Clave temporal',
      mecanismo: '5 Pasadores (Compatible a 8)',
      vaultGuard: 'Sí',
      videoportero: 'No',
      idioma: 'English',
      garantia: '12-24 meses',
      encriptacion: 'AES-256',
      accesorios: '2 Llaves | 2 Tags',
    },
  },
];

type FeatureKey = keyof typeof products[0]['features'];

const rows: { key: FeatureKey; label: string }[] = [
  { key: 'camaraFaceId', label: 'Cámara y Face ID' },
  { key: 'huella', label: 'Huella | Contraseña | Tag ID' },
  { key: 'bateria', label: 'Batería de litio' },
  { key: 'proteccion', label: 'Protección IP' },
  { key: 'cilindro', label: 'Protección de Cilindro' },
  { key: 'palma', label: 'Palma' },
  { key: 'ppf', label: 'Revestimiento tipo PPF' },
  { key: 'wifi', label: 'Wifi' },
  { key: 'mecanismo', label: 'Mecanismo' },
  { key: 'vaultGuard', label: 'Vault Guard' },
  { key: 'videoportero', label: 'Videoportero 24/7 y registro' },
  { key: 'idioma', label: 'Idioma' },
  { key: 'garantia', label: 'Garantía' },
  { key: 'encriptacion', label: 'Encriptación Militar' },
  { key: 'accesorios', label: 'Accesorios' },
];

const GradientText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`gradient-text-gold ${className}`}>{children}</span>
);

function CellValue({ value }: { value: string }) {
  const isNo = value === 'No';
  if (isNo) return <span className="text-[#444] text-lg font-light">—</span>;
  return <span className="text-[#f2f2f2] text-[15px] text-center leading-snug">{value}</span>;
}

export default function ComparisonTable() {
  return (
    <section className="w-full bg-[#070707] py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-[1360px] mx-auto">

        {/* Header */}
        <Reveal as="div">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-medium mb-12 md:mb-16 lg:mb-20">
            <span className="text-white">¿Cuál iShkel es la mejor </span>
            <GradientText>para ti?</GradientText>
          </h2>
        </Reveal>

        {/* Desktop Table */}
        <Reveal as="div" delay={0.1} className="hidden lg:block">

          {/* Product Headers */}
          <div className="grid grid-cols-[220px_1fr_1fr_1fr] gap-0">
            <div />
            {products.map((product) => (
              <div
                key={product.id}
                className={`flex flex-col items-center px-4 pb-6 pt-6 rounded-t-[20px] ${
                  product.recommended ? 'bg-white/5' : ''
                }`}
              >
                {product.recommended && (
                  <span className="mb-3 px-4 py-1 rounded-full text-[11px] font-medium tracking-widest uppercase border border-white/20 text-white/60">
                    Recomendado
                  </span>
                )}
                <div className="relative w-35 h-40 mb-4">
                  <Image src={product.image} alt={product.name} fill className="object-contain" />
                </div>
                <p className="text-[22px] font-semibold text-center">
                  <GradientText>{product.name}</GradientText>
                </p>
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="border-t border-[#222]">
            {rows.map((row, idx) => (
              <div
                key={row.key}
                className={`grid grid-cols-[220px_1fr_1fr_1fr] border-b border-[#222] hover:bg-white/2 transition-colors ${
                  idx === rows.length - 1 ? 'rounded-b-[20px]' : ''
                }`}
              >
                <div className="py-8 px-2 flex items-center">
                  <span className="text-[15px] font-medium tracking-[1.4px] uppercase">
                    <GradientText>{row.label}</GradientText>
                  </span>
                </div>
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`py-8 px-4 flex items-center justify-center ${
                      product.recommended ? 'bg-white/5' : ''
                    } ${idx === rows.length - 1 && product.recommended ? 'rounded-b-[20px]' : ''}`}
                  >
                    <CellValue value={product.features[row.key]} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-end mt-16">
            <button className="px-16 py-4 border-2 border-white rounded-[15px] text-white text-[20px] font-medium hover:bg-white hover:text-[#070707] active:scale-[0.98] transition-all duration-300">
              Comparar ahora
            </button>
          </div>
        </Reveal>

        {/* Tablet Table */}
        <Reveal as="div" delay={0.1} className="hidden md:block lg:hidden overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-[170px_1fr_1fr_1fr] gap-0 mb-6">
              <div />
              {products.map((product) => (
                <div key={product.id} className="flex flex-col items-center px-2">
                  {product.recommended && (
                    <span className="mb-2 px-3 py-0.5 rounded-full text-[10px] font-medium tracking-widest uppercase border border-white/20 text-white/60">
                      Top
                    </span>
                  )}
                  <div className="relative w-22.5 h-27.5 mb-3">
                    <Image src={product.image} alt={product.name} fill className="object-contain" />
                  </div>
                  <p className="text-[15px] font-semibold text-center">
                    <GradientText>{product.name}</GradientText>
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-[#222]">
              {rows.map((row) => (
                <div key={row.key} className="grid grid-cols-[170px_1fr_1fr_1fr] border-b border-[#222] hover:bg-white/2 transition-colors">
                  <div className="py-5 px-2 flex items-center">
                    <span className="text-white text-[12px] tracking-wider uppercase">{row.label}</span>
                  </div>
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className={`py-5 px-2 flex items-center justify-center ${
                        product.recommended ? 'bg-white/5' : ''
                      }`}
                    >
                      <CellValue value={product.features[row.key]} />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-10">
              <button className="px-10 py-3 border-2 border-white rounded-[15px] text-white text-[16px] font-medium hover:bg-white hover:text-[#070707] active:scale-[0.98] transition-all duration-300">
                Comparar ahora
              </button>
            </div>
          </div>
        </Reveal>

        {/* Mobile Cards */}
        <Reveal as="div" delay={0.1} className="md:hidden space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={`rounded-2xl p-5 border ${
                product.recommended ? 'bg-white/[0.07] border-white/20' : 'bg-[#111] border-[#222]'
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
                <div className="relative w-15 h-20">
                  <Image src={product.image} alt={product.name} fill className="object-contain" />
                </div>
                <p className="text-lg font-semibold">
                  <GradientText>{product.name}</GradientText>
                </p>
              </div>

              <div className="space-y-3 text-sm">
                {rows.map((row) => (
                  <div key={row.key} className="flex justify-between gap-4">
                    <span className="text-[#888] uppercase tracking-wide text-xs shrink-0">{row.label}</span>
                    <CellValue value={product.features[row.key]} />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-8">
            <button className="w-full max-w-xs px-8 py-3 border-2 border-white rounded-[15px] text-white text-base font-medium hover:bg-white hover:text-[#070707] active:scale-[0.98] transition-all duration-300">
              Comparar ahora
            </button>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
