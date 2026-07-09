'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Productos' },
  { href: '/Soporte', label: 'Soporte' },
  { href: '/pro', label: 'iShkel Pro (Constructores)' },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

const menuContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const menuItem: Variants = {
  hidden: { opacity: 0, y: -8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
};

export default function Navbar({ dark = false }: { dark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, cartCount, setCartCount } = useCart();
  const prefersReducedMotion = useReducedMotion();

  const lightText = scrolled !== dark;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Fetch cart count on mount
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await fetch('/api/cart');
        const data = await response.json();
        if (data.cart) {
          setCartCount(data.cart.totalQuantity || 0);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCartCount();

    const handleCartUpdate = (event: Event) => {
      fetchCartCount();
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.openDrawer) {
        openCart();
      }
    };
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, [setCartCount, openCart]);

  const linkClass = `text-[15px] font-neue transition-colors duration-500 ${
    lightText ? 'text-[#070707] hover:text-[#070707]/50' : 'text-white hover:text-white/70'
  }`;

  const mobileLinkClass =
    'block py-4 text-lg font-neue text-[#070707] border-b border-[#070707]/10 hover:text-[#070707]/60 transition-colors';

  const navSolid =
    scrolled ||
    mobileMenuOpen ||
    (dark && !scrolled);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? dark
              ? 'bg-black shadow-[0_2px_24px_rgba(0,0,0,0.4)]'
              : 'bg-white shadow-[0_2px_24px_rgba(0,0,0,0.08)]'
            : dark
              ? 'bg-white shadow-[0_2px_24px_rgba(0,0,0,0.08)]'
              : 'bg-linear-to-b from-black/60 to-transparent'
        }`}
      >
        <div className="max-w-450 mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <Image
                src="/Images_Icons/iShkel_White.png"
                alt="iShkel Logo"
                width={120}
                height={120}
                className={`transition-all duration-500 ${lightText || mobileMenuOpen ? 'invert' : ''}`}
              />
            </Link>
          </div>

          {/* Center Nav Links — desktop */}
          <div className="hidden lg:flex items-center gap-10 pt-2">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={`group relative ${linkClass}`}>
                {label}
                <span className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* Right Side — desktop icons + mobile cart/menu */}
          <div className="flex items-center gap-4 sm:gap-5 lg:gap-6 pt-2">
            {/* Account — desktop only */}
            

            {/* Cart — visible on all screen sizes */}
            <button
              onClick={openCart}
              className="relative transition-opacity duration-300 hover:opacity-60"
              aria-label="Abrir carrito"
            >
              {cartCount > 0 ? (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-all duration-500 ${scrolled ? '' : 'opacity-90'}`}
                >
                  <mask
                    id="mask0_cart_filled"
                    style={{ maskType: 'alpha' } as React.CSSProperties}
                    maskUnits="userSpaceOnUse"
                    x="5"
                    y="17"
                    width="40"
                    height="25"
                  >
                    <path
                      d="M10.0532 18.75L13.1656 36.9792H36.8228L40 18.75H43.75V40.625H6.25V18.75H10.0532Z"
                      fill={lightText || mobileMenuOpen ? '#191817' : 'white'}
                      stroke={lightText || mobileMenuOpen ? '#191817' : 'white'}
                      strokeWidth="1.6"
                    />
                  </mask>
                  <g mask="url(#mask0_cart_filled)">
                    <path
                      d="M13.5589 39.375L10.8506 23.125H39.1494L36.4411 39.375H13.5589Z"
                      stroke={lightText || mobileMenuOpen ? '#191817' : 'white'}
                      strokeWidth="1.6"
                    />
                  </g>
                  <mask
                    id="mask1_cart_filled"
                    style={{ maskType: 'alpha' } as React.CSSProperties}
                    maskUnits="userSpaceOnUse"
                    x="9"
                    y="9"
                    width="32"
                    height="10"
                  >
                    <path
                      d="M40.625 9.375H9.375V18.75H40.625V9.375Z"
                      fill={lightText || mobileMenuOpen ? '#191817' : 'white'}
                    />
                  </mask>
                  <g mask="url(#mask1_cart_filled)">
                    <path
                      d="M25 26.5625C29.3147 26.5625 32.8125 23.0647 32.8125 18.75C32.8125 14.4353 29.3147 10.9375 25 10.9375C20.6853 10.9375 17.1875 14.4353 17.1875 18.75C17.1875 23.0647 20.6853 26.5625 25 26.5625Z"
                      stroke={lightText || mobileMenuOpen ? '#191817' : 'white'}
                      strokeWidth="1.6"
                    />
                  </g>
                  <motion.circle
                    key={cartCount}
                    cx="36"
                    cy="22"
                    r="5"
                    fill="#E85D3F"
                    initial={prefersReducedMotion ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  />
                  <rect x="19" y="26" width="12" height="2" rx="1" fill={lightText || mobileMenuOpen ? '#191817' : 'white'} />
                  <rect x="19" y="29" width="12" height="2" rx="1" fill={lightText || mobileMenuOpen ? '#191817' : 'white'} />
                  <rect x="20" y="32" width="10" height="2" rx="1" fill={lightText || mobileMenuOpen ? '#191817' : 'white'} />
                  <rect x="18" y="26" width="15" height="2" rx="1" fill={lightText || mobileMenuOpen ? '#191817' : 'white'} />
                </svg>
              ) : (
                <Image
                  src="/Images_Icons/cartIcon.svg"
                  alt="Cart Icon"
                  width={32}
                  height={32}
                  className={`transition-all duration-500 ${lightText || mobileMenuOpen ? 'invert' : 'opacity-70'}`}
                />
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className={`lg:hidden relative w-6 h-6 p-1 flex items-center justify-center transition-colors duration-500 ${
                lightText || mobileMenuOpen ? 'text-[#070707]' : 'text-white'
              }`}
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              <motion.span
                className="absolute block h-[1.5px] w-4.5 bg-current rounded-full"
                animate={mobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: EASE }}
              />
              <motion.span
                className="absolute block h-[1.5px] w-4.5 bg-current rounded-full"
                animate={mobileMenuOpen ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: EASE }}
              />
              <motion.span
                className="absolute block h-[1.5px] w-4.5 bg-current rounded-full"
                animate={mobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: EASE }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay + panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.button
              type="button"
              className="absolute inset-0 top-20 bg-black/40"
              aria-label="Cerrar menú"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            />

            <motion.div
              className="absolute top-20 left-0 right-0 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: EASE }}
            >
              <motion.nav
                className="max-w-450 mx-auto px-5 sm:px-8 py-2"
                variants={menuContainer}
                initial="hidden"
                animate="show"
              >
                {navLinks.map(({ href, label }) => (
                  <motion.div key={href} variants={prefersReducedMotion ? undefined : menuItem}>
                    <Link
                      href={href}
                      className={mobileLinkClass}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
