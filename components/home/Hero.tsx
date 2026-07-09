'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <video
            src="/Videos/VideoHome.mp4"
            poster="/Images_Icons/homePageImg.jpeg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center px-6"
          initial={prefersReducedMotion ? undefined : 'hidden'}
          animate={prefersReducedMotion ? undefined : 'show'}
          variants={container}
        >
          <motion.h1
            variants={item}
            className="pb-5 font-neue font-medium text-[clamp(2.4rem,11vw,80px)] leading-[0.95] tracking-[-0.02em] text-center"
            style={{
              background: 'linear-gradient(90deg, #626262 2.88%, #F2F2F2 73.08%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Cerradura inteligente
            <span> de lujo iShkel</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-2 text-white text-[16px] sm:text-[18px] font-neue font-medium text-center"
          >
            Más que una chapa digital, Protege tu hogar hoy mismo con cerraduras inteligentes de lujo en Colombia{" "}<br /> y protección avanzada con biometría facial 3D y control total desde cualquier lugar.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 mt-5 w-full max-w-85 sm:max-w-none sm:w-auto"
          >
            <a href="/products" className="relative group active:scale-[0.98] transition-transform duration-200">
              <div className="absolute inset-0 rounded-[15px] bg-linear-to-r from-[#3b3b3b] to-[#a1a1a1] blur-[2px] opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              <div className="relative rounded-[15px] bg-linear-to-r from-[#3b3b3b] to-[#a1a1a1] p-0.5 w-full sm:w-50 h-12">
                <div className="rounded-[13px] bg-[#070707] w-full h-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-15 h-7.5 bg-white/10 blur-[10px] rounded-full" />
                  <div className="absolute bottom-0 left-0 w-10 h-7.5 bg-white/5 blur-[10px] rounded-full" />
                  <span className="relative font-neue font-normal text-[18px] sm:text-[20px] text-white">
                    Ver Catalogo!
                  </span>
                </div>
              </div>
            </a>
            <a
              href="#saber-mas"
              className="border-2 border-[#f2f2f2] text-white font-neue font-normal text-[15px] sm:text-[15px] rounded-[15px] hover:bg-white/5 active:scale-[0.98] transition-all duration-300 w-full sm:w-50 h-12 flex items-center justify-center"
            >
              Visita previa sin costo
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
