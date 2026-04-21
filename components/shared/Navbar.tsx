'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? 'bg-white shadow-[0_2px_24px_rgba(0,0,0,0.08)]'
            : 'bg-linear-to-b from-black/60 to-transparent'
        }`}
      >
        <div className="max-w-[infinite] mx-auto px-8 lg:px-12 h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
            <Image
              src="/Images_Icons/iShkel_White.png"
              alt="iShkel Logo"
              width={120}
              height={120}
              className={`transition-all duration-500 ${scrolled ? 'invert' : ''}`}
            />
            </Link>
          </div>

          {/* Center Nav Links */}
          <div className="hidden lg:flex  items-center gap-10 pt-2">
            <a
              href="/products"
              className={`text-[15px] font-neue transition-colors duration-500 ${
                scrolled ? 'text-[#070707] hover:text-[#070707]/50' : 'text-white hover:text-white/70'
              }`}
            >
              Productos
            </a>
            <a
              href="/Servicios"
              className={`text-[15px] font-neue transition-colors duration-500 ${
                scrolled ? 'text-[#070707] hover:text-[#070707]/50' : 'text-white hover:text-white/70'
              }`}
            >
              Servicios
            </a>
            <a
              href="/Soporte"
              className={`text-[15px] font-neue transition-colors duration-500 ${
                scrolled ? 'text-[#070707] hover:text-[#070707]/50' : 'text-white hover:text-white/70'
              }`}
            >
              Soporte
            </a>
            <a
              href="/Pro"
              className={`text-[15px] font-neue transition-colors duration-500 ${
                scrolled ? 'text-[#070707] hover:text-[#070707]/50' : 'text-white hover:text-white/70'
              }`}
            >
              iShkel Pro (Constructores)
            </a>
          </div>

          {/* Right Side Icons */}
          <div className="hidden lg:flex items-center gap-6 pt-2">
            <button className="transition-opacity duration-300 hover:opacity-60">
              <Image
                src="/Images_Icons/account_icon.svg"
                alt="Account Icon"
                width={32}
                height={32}
                className={`transition-all duration-500 ${scrolled ? 'invert' : 'opacity-70'}`}
              />
            </button>
            <button className="transition-opacity duration-300 hover:opacity-60">
              <Image
                src="/Images_Icons/cartIcon.svg"
                alt="Cart Icon"
                width={32}
                height={32}
                className={`transition-all duration-500 ${scrolled ? 'invert' : 'opacity-70'}`}
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden transition-colors duration-500 ${
              scrolled ? 'text-[#070707]' : 'text-white'
            }`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      
    </>
  );
}
