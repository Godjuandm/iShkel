// components/products/ProductShowroom.tsx
'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { ShopifyProduct } from '@/lib/shopify';
import ProductDescription from '@/components/shared/ProductDescription';
import ProductImageCarousel from '@/components/shared/ProductImageCarousel';

interface ProductShowroomProps {
  product: ShopifyProduct;
  formattedPrice: string;
}

const FEATURES = [
  'Envío Gratis (Contra entrega)',
  'Soporte 24/7',
  'Hasta 2 años de garantía',
];

// Visual mapping for swatches — Shopify only stores option value names,
// so we map the ones we know about to a color or an image.
const COLOR_SWATCHES: Record<string, string> = {
  Negro: '#292929',
  'Negro Azabache': '#292929',
  Plata: '#D9D9D9',
  Plateado: '#D9D9D9',
  Blanco: '#F5F5F5',
  Dorado: '#D4AF37',
  Gris: '#888888',
  Bronce: '#CD7F32',
};

const SWATCH_IMAGES: Record<string, string> = {
  Madera: '/Images_Icons/ColorChoice1.png',
  Metal: '/Images_Icons/ColorChoice2.png',
  Blindado: '/Images_Icons/ColorChoice3.png',
  Blindada: '/Images_Icons/ColorChoice3.png',
};

function isColorOption(name: string) {
  return name.toLowerCase().includes('color');
}

function isMaterialOption(name: string) {
  return ['material', 'tipo', 'tipo de puerta'].includes(name.toLowerCase());
}

export default function ProductShowroom({ product, formattedPrice: initialFormattedPrice }: ProductShowroomProps) {
  const images = product.images.nodes;
  const variants = product.variants?.nodes ?? [];
  const options = useMemo(() => product.options ?? [], [product.options]);

  const [activeImage, setActiveImage] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>(() =>
    Object.fromEntries(options.map((o) => [o.name, o.values[0]]))
  );
  const [isBuying, setIsBuying] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { openCart, setCartCount } = useCart();

  const activeVariant = useMemo(() => {
    if (!variants.length) return undefined;
    return (
      variants.find(
        (v) =>
          v.selectedOptions?.length &&
          v.selectedOptions.every((opt) => selections[opt.name] === opt.value)
      ) ?? variants[0]
    );
  }, [variants, selections]);

  const price = activeVariant
    ? parseFloat(activeVariant.price.amount)
    : parseFloat(product.priceRange.minVariantPrice.amount);
  const formattedPrice = activeVariant
    ? `COP ${price.toLocaleString('es-CO')}`
    : initialFormattedPrice;
  const isOutOfStock = activeVariant ? !activeVariant.availableForSale : false;

  const selectOption = (optionName: string, value: string) =>
    setSelections((prev) => ({ ...prev, [optionName]: value }));

  const handleAddToCart = async (openDrawer: boolean) => {
    if (!activeVariant?.id) return;
    openDrawer ? setIsBuying(true) : setIsAdding(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantId: activeVariant.id, quantity: 1 }),
      });
      const data = await res.json();
      if (data?.cart?.totalQuantity != null) {
        setCartCount(data.cart.totalQuantity);
      }
      window.dispatchEvent(
        new CustomEvent('cart-updated', { detail: { openDrawer: true } })
      );
      openCart();
    } catch (err) {
      console.error('Add to cart failed', err);
    } finally {
      openDrawer ? setIsBuying(false) : setIsAdding(false);
    }
  };

  return (
    <section id="productos" className="bg-[#f2f2f2] py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-16 items-start">
          {/* Image carousel */}
          <ProductImageCarousel
            images={images}
            title={product.title}
            activeIndex={activeImage}
            onIndexChange={setActiveImage}
            variant="floating"
            aspectClassName="aspect-4/5 lg:aspect-776/805"
            bgClassName="bg-[#e5e5e5]"
            className="relative w-full"
            priority
          />

          {/* Product info */}
          <div className="flex flex-col">
            <div className="pb-4">
              <p className="text-[#070707] text-[15px] font-neue mb-1">iShkel</p>
              <h1
                className="text-[#070707] text-[24px] sm:text-[26px] lg:text-[28px] font-medium font-neue tracking-tight leading-[1.2]"
                style={{ textWrap: 'balance' } as React.CSSProperties}
              >
                {product.title}
              </h1>
            </div>

            <ProductDescription
              descriptionHtml={product.descriptionHtml}
              description={product.description}
              className="pb-6 text-[#070707] text-[14px] font-medium font-neue leading-[20px]"
            />

            {/* Option selectors — generic, driven by whatever options this product has */}
            {options.map((option) => {
              const selected = selections[option.name];

              if (isMaterialOption(option.name)) {
                return (
                  <div
                    key={option.name}
                    className="flex items-center justify-between py-5 border-t border-b border-[#191817]"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="font-neue font-normal text-[13px] text-[#9a9a9a]">
                        Instalado en puertas de:
                      </span>
                      <span
                        key={`material-${selected}`}
                        className="font-neue font-medium text-[14px] text-[#191817] inline-block animate-[labelSlide_0.35s_ease-out]"
                      >
                        {selected}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {option.values.map((materialName) => {
                        const isActive = selected === materialName;
                        const imageSrc = SWATCH_IMAGES[materialName];
                        return (
                          <button
                            key={materialName}
                            onClick={() => selectOption(option.name, materialName)}
                            aria-label={`Seleccionar material ${materialName}`}
                            aria-pressed={isActive}
                            className={`relative w-[28px] h-[28px] rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 ease-out ${
                              isActive
                                ? 'ring-2 ring-[#191817] ring-offset-2 ring-offset-[#f2f2f2] scale-105'
                                : 'ring-1 ring-[#aca69f] hover:ring-[#626262] hover:scale-105'
                            }`}
                          >
                            {imageSrc ? (
                              <Image
                                src={imageSrc}
                                alt={materialName}
                                width={28}
                                height={28}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <span
                                className="block w-full h-full"
                                style={{ backgroundColor: '#aca69f' }}
                              />
                            )}
                            {isActive && (
                              <span className="absolute inset-0 bg-black/10 pointer-events-none" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              const label = isColorOption(option.name) ? 'Color' : option.name;
              return (
                <div
                  key={option.name}
                  className="flex items-center justify-between py-5 border-t border-[#191817] last:border-b"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="font-neue font-normal text-[13px] text-[#9a9a9a]">
                      {label}:
                    </span>
                    <span
                      key={`${option.name}-${selected}`}
                      className="font-neue font-medium text-[14px] text-[#191817] inline-block animate-[labelSlide_0.35s_ease-out]"
                    >
                      {selected}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    {option.values.map((value) => {
                      const isActive = selected === value;
                      const swatchColor = COLOR_SWATCHES[value];
                      const swatchImage = SWATCH_IMAGES[value];

                      if (swatchImage || swatchColor) {
                        return (
                          <button
                            key={value}
                            onClick={() => selectOption(option.name, value)}
                            aria-label={`Seleccionar ${label.toLowerCase()} ${value}`}
                            aria-pressed={isActive}
                            className={`relative w-[28px] h-[28px] rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 ease-out ${
                              isActive
                                ? 'ring-2 ring-[#191817] ring-offset-2 ring-offset-[#f2f2f2]'
                                : 'ring-1 ring-[#c4c4c4] hover:ring-[#626262]'
                            }`}
                          >
                            {swatchImage ? (
                              <Image
                                src={swatchImage}
                                alt={value}
                                width={28}
                                height={28}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <span
                                className={`block rounded-full transition-all duration-300 ease-out ${
                                  isActive ? 'w-[18px] h-[18px]' : 'w-[20px] h-[20px]'
                                }`}
                                style={{ backgroundColor: swatchColor }}
                              />
                            )}
                            {isActive && swatchColor && (
                              <svg
                                className="absolute inset-0 m-auto w-3 h-3 text-white pointer-events-none mix-blend-difference animate-[checkPop_0.3s_ease-out]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                        );
                      }

                      // Fallback: no known visual for this value, render a text pill
                      return (
                        <button
                          key={value}
                          onClick={() => selectOption(option.name, value)}
                          aria-pressed={isActive}
                          className={`px-3 h-[28px] rounded-full text-[12px] font-neue font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-[#191817] text-white'
                              : 'bg-white text-[#191817] ring-1 ring-[#c4c4c4] hover:ring-[#626262]'
                          }`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Features */}
            <ul className="pt-6 pb-2 space-y-2">
              {FEATURES.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-[14px] font-medium font-neue text-black tracking-[0.1px] leading-[20px]"
                >
                  <svg
                    className="shrink-0 mt-1"
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                  >
                    <path
                      d="M1 5.5L4 8.5L10 1.5"
                      stroke="#626262"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* Price — animates when the selected variant changes */}
            <div className="pt-2 pb-4">
              <p
                key={`price-${activeVariant?.id}`}
                className="font-neue font-normal text-[24px] text-[#191817] animate-[labelSlide_0.4s_ease-out]"
              >
                {formattedPrice}
              </p>
              {isOutOfStock && (
                <p className="font-neue text-[13px] text-[#c62828] mt-1">
                  Esta combinación está agotada
                </p>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 max-w-[374px]">
              <button
                onClick={() => handleAddToCart(true)}
                disabled={!activeVariant?.availableForSale || isBuying || isAdding}
                className="h-12 w-full border-2 border-[#191817] rounded-[15px] text-[#191817] text-[14.5px] font-medium font-neue tracking-[0.1px] hover:bg-[#191817] hover:text-white active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBuying ? 'Cargando…' : 'Comprar ahora'}
              </button>
              <button
                onClick={() => handleAddToCart(false)}
                disabled={!activeVariant?.availableForSale || isBuying || isAdding}
                className="relative h-[51px] w-full rounded-[11.5px] bg-[#3b3b3b] p-[1.5px] active:scale-[0.99] transition-transform duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="relative h-full w-full rounded-[10px] bg-black overflow-hidden flex items-center justify-center">
                  <div className="absolute -top-4 -right-4 w-24 h-9 bg-white/10 blur-xl rounded-full" />
                  <div className="absolute -bottom-4 -left-6 w-20 h-9 bg-white/5 blur-xl rounded-full" />
                  <span className="relative text-white text-[18px] sm:text-[20px] font-neue">
                    {isAdding ? 'Añadiendo…' : 'Añadir al carrito'}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
