'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

interface CarouselImage {
  url: string;
  altText: string | null;
}

interface ProductImageCarouselProps {
  images: CarouselImage[];
  title: string;
  activeIndex: number;
  onIndexChange: (index: number) => void;
  /** 'inline' = dots overlaid on the image (home showroom). 'floating' = dots below the image (PDP gallery). */
  variant?: 'inline' | 'floating';
  aspectClassName?: string;
  bgClassName?: string;
  className?: string;
  priority?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProductImageCarousel({
  images,
  title,
  activeIndex,
  onIndexChange,
  variant = 'inline',
  aspectClassName = 'aspect-4/5 lg:aspect-776/805',
  bgClassName = 'bg-white',
  className = '',
  priority = false,
}: ProductImageCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  const hasMultiple = images.length > 1;

  const next = () => onIndexChange((activeIndex + 1) % images.length);
  const prev = () => onIndexChange((activeIndex - 1 + images.length) % images.length);

  const arrowClass =
    variant === 'inline'
      ? 'w-[45px] h-[45px] bg-white shadow-md hover:scale-105'
      : 'size-11 sm:size-[45px] bg-white/90 hover:bg-white shadow-md active:scale-95';

  return (
    <div className={className}>
      <div
        className={`relative ${aspectClassName} w-full rounded-[15px] overflow-hidden ${bgClassName}`}
      >
        {images.map((image, i) => (
          <motion.div
            key={image.url}
            className="absolute inset-0"
            style={{ zIndex: i === activeIndex ? 10 : 0 }}
            initial={false}
            animate={
              prefersReducedMotion
                ? { opacity: i === activeIndex ? 1 : 0 }
                : { opacity: i === activeIndex ? 1 : 0, scale: i === activeIndex ? 1 : 1.02 }
            }
            transition={{ duration: 0.45, ease: EASE }}
          >
            <Image
              src={image.url}
              alt={image.altText || `${title} - imagen ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority={priority && i === 0}
            />
          </motion.div>
        ))}

        {hasMultiple && (
          <>
            <button
              onClick={prev}
              aria-label="Imagen anterior"
              className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 rounded-full flex items-center justify-center transition-all duration-200 ${arrowClass}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#191817" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Imagen siguiente"
              className={`absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 rounded-full flex items-center justify-center transition-all duration-200 ${arrowClass}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#191817" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {variant === 'inline' && (
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => onIndexChange(i)}
                    aria-label={`Ir a imagen ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'w-[8px] h-[8px] bg-[#191817]' : 'w-[4px] h-[4px] bg-[#8c8c8c]'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {variant === 'floating' && hasMultiple && (
        <div className="flex items-center justify-center gap-3 mt-5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => onIndexChange(i)}
              aria-label={`Ir a imagen ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-2 h-2 bg-[#191817]' : 'w-1.5 h-1.5 bg-[#8c8c8c] hover:bg-[#626262]'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
