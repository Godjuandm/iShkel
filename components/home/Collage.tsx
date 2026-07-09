'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface Product {
  id: number;
  image: string;
  alt: string;
  href?: string;
  width: number;
  height: number;
}

const products: Product[] = [
  { id: 1, image: '/Images_Icons/Collage_Image_1.png', alt: 'Smart Lock iShkel - Black Modern Design', href: '/products', width: 440, height: 560 },
  { id: 2, image: '/Images_Icons/Collage_Image_2.png', alt: 'Smart Lock iShkel - Decorated Door', href: '/products', width: 350, height: 530 },
  { id: 3, image: '/Images_Icons/Collage_Image_3.png', alt: 'Smart Lock iShkel - Silver Model', href: '/products', width: 440, height: 560 },
  { id: 4, image: '/Images_Icons/Collage_Image_4.png', alt: 'Smart Lock iShkel - Touchscreen', href: '/products', width: 440, height: 560 },
  { id: 5, image: '/Images_Icons/Collage_Image_5.png', alt: 'Smart Lock iShkel - Wall Mounted', href: '/products', width: 340, height: 560 },
  { id: 6, image: '/Images_Icons/Collage_Image_6.png', alt: 'Smart Lock iShkel - Modern Interior', href: '/products', width: 440, height: 560 },
];

// Spring smoothing for parallax — higher stiffness = tighter to scroll,
// lower damping = more float. These values give a subtle fluid lag.
const PARALLAX_SPRING = { stiffness: 120, damping: 30, mass: 0.5 };

export default function CollageSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const column1 = [products[0], products[3]];
  const column2 = [products[1], products[4]];
  const column3 = [products[2], products[5]];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax transforms — negative = upward, positive = downward.
  // Column 1: slow upward · Column 2: slight downward · Column 3: fastest upward
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [180, -280]), PARALLAX_SPRING);
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [-100, 160]), PARALLAX_SPRING);
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [320, -480]), PARALLAX_SPRING);

  const entranceTransition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section ref={sectionRef} className="w-full bg-[#F3F3F3] py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4">

        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={entranceTransition}
        >

          <h1 className="text-3xl md:text-[50px] font-neue font-medium text-[#1a1a1a] mt-3 mb-4 leading-tight">
            Projectos{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, #626262 0%, #1a1a1a 50%, #626262 100%)',
              }}
            >
              iShkel
            </span>
          </h1>
          <p className="text-[15px] text-[#555] leading-relaxed max-w-xl mx-auto">
            Somos la elección predilecta en Bogotá, Medellín, y el eje Cafetero 
            para quienes buscan reemplazar sus chapas tradicionales por la tecnologia de iShkel elegancia y control total.
          </p>
        </motion.div>

        {/* Masonry columns — desktop: 3 cols, mobile: 2 cols */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 items-start"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...entranceTransition, delay: 0.1 }}
        >

          {/* Column 1 — offset down, moves upward */}
          <motion.div className="flex flex-col gap-4 md:gap-5 mt-20 md:mt-42 will-change-transform" style={{ y: y1 }}>
            {column1.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {/* Column 2 — starts at top, moves downward */}
          <motion.div className="flex flex-col gap-4 md:gap-5 will-change-transform" style={{ y: y2 }}>
            {column2.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {/* Column 3 — offset down (hidden on mobile), moves upward */}
          <motion.div className="hidden md:flex flex-col gap-5 mt-42 will-change-transform" style={{ y: y3 }}>
            {column3.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className="relative group overflow-hidden bg-[#e0e0e0] rounded-[15px] shadow-sm transition-shadow duration-500 hover:shadow-2xl"
      style={{ aspectRatio: `${product.width} / ${product.height}` }}
    >
      <Image
        src={product.image}
        alt={product.alt}
        width={product.width}
        height={product.height}
        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
      />

      {/* Gradient overlay — fades in on hover */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-[15px]" />

      {/* Button — slides up on hover */}
      <Link
        href={product.href || '/products'}
        className="absolute bottom-4 left-4 right-4 flex items-center justify-center py-3.5 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-white/35"
      >
        <span className="text-sm font-medium text-white">
          Ver Producto
        </span>
      </Link>
    </div>
  );
}