'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

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
          <Image
            src="/Images_Icons/homePageImg.jpeg"
            alt="iShkel Serie Fx Smart Lock"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          <h1
            className="font-neue font-medium text-[clamp(3rem,10vw,120px)] leading-[0.95] tracking-[-0.02em] text-center"
            style={{
              background: 'linear-gradient(90deg, #626262 2.88%, #F2F2F2 73.08%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            iShkel Serie Fx
          </h1>

          <p className="mt-2 text-white text-[20px] sm:text-[30px] font-neue font-medium text-center">
            Protege lo que mas te importa con iShkel
          </p>

          <div className="flex items-center gap-5 mt-3">
            <a href="#productos" className="relative group">
              <div className="absolute inset-0 rounded-[15px] bg-linear-to-r from-[#3b3b3b] to-[#a1a1a1] blur-[2px] opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              <div className="relative rounded-[15px] bg-linear-to-r from-[#3b3b3b] to-[#a1a1a1] p-0.5 w-50 h-12">
                <div className="rounded-[13px] bg-[#070707] w-full h-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-15 h-7.5 bg-white/10 blur-[10px] rounded-full" />
                  <div className="absolute bottom-0 left-0 w-10 h-7.5 bg-white/5 blur-[10px] rounded-full" />
                  <span className="relative font-neue font-normal text-[20px] text-white">
                    Protegete Hoy!
                  </span>
                </div>
              </div>
            </a>
            <a
              href="#saber-mas"
              className="border-2 border-[#f2f2f2] text-white font-neue font-normal text-[20px] px-10 py-3.5 rounded-[15px] hover:bg-white/5 transition-all duration-300 w-[200px] h-[48px] flex items-center justify-center"
            >
              Saber Mas
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
