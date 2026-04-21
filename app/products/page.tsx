'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// Product data
const products = [
  {
    id: '1',
    handle: 'fx-2026',
    title: 'FX 2026',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    isNew: true,
    isFeatured: true,
    colors: ['#D9D9D9', '#292929'],
  },
  {
    id: '2',
    handle: 'fx-2025',
    title: 'FX 2025',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    isNew: true,
    colors: ['#D9D9D9', '#292929'],
  },
  {
    id: '3',
    handle: 'fx-2024',
    title: 'FX 2024',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    isNew: false,
    colors: ['#D9D9D9', '#292929'],
  },
  {
    id: '4',
    handle: 'fx-2023',
    title: 'FX 2023',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    isNew: false,
    colors: ['#D9D9D9', '#292929'],
  },
  {
    id: '5',
    handle: 'fx-2022',
    title: 'FX 2022',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    isNew: false,
    colors: ['#D9D9D9', '#292929'],
  },
  {
    id: '6',
    handle: 'fx-2021',
    title: 'FX 2021',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    isNew: false,
    colors: ['#D9D9D9', '#292929'],
  },
  {
    id: '7',
    handle: 'fx-2020',
    title: 'FX 2020',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    isNew: false,
    colors: ['#D9D9D9', '#292929'],
  },
];

// Color Swatch Component
const ColorSwatches = ({ colors, size = 'small' }: { colors: string[]; size?: 'small' | 'large' }) => {
  const swatchSize = size === 'large' ? 'w-[25px] h-[25px]' : 'w-[20px] h-[20px]';
  const innerSize = size === 'large' ? 'w-[18.75px] h-[18.75px]' : 'w-[15px] h-[15px]';
  
  return (
    <div className="flex items-center gap-2">
      {colors.map((color, index) => (
        <button
          key={index}
          className={`${swatchSize} rounded-full border border-[#626262] flex items-center justify-center bg-white`}
        >
          <span
            className={`${innerSize} rounded-full`}
            style={{ backgroundColor: color }}
          />
        </button>
      ))}
    </div>
  );
};

// Small Product Card Component
const ProductCard = ({ product }: { product: typeof products[0] }) => (
  <Link href={`/products/${product.handle}`} className="group block">
    <div className="bg-[#fafafa] rounded-[15px] p-4 relative h-[240px] flex flex-col">
      {/* New Badge */}
      {product.isNew && (
        <span className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-[14px] text-black font-normal z-10">
          New
        </span>
      )}

      {/* Product Image */}
      <div className="relative flex-1 w-full flex items-center justify-center py-4">
        <Image
          src={product.image}
          alt={product.title}
          width={155}
          height={157}
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-[#191817] text-[10px] font-normal">
          COP {product.price}
        </span>
        <ColorSwatches colors={product.colors} size="small" />
      </div>
    </div>
  </Link>
);

// Featured Product Card Component
const FeaturedProductCard = ({ product }: { product: typeof products[0] }) => (
  <Link href={`/products/${product.handle}`} className="group block h-full">
    <div className="bg-[#fafafa] rounded-[15px] p-6 relative h-full flex flex-col">
      {/* New Badge */}
      {product.isNew && (
        <span className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full text-[14px] text-black font-normal z-10">
          New
        </span>
      )}

      {/* Title */}
      <h3 className="text-[#191817] text-[20px] font-normal tracking-[0.1px] mb-4">
        {product.title}
      </h3>

      {/* Product Image */}
      <div className="relative flex-1 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={339}
          height={339}
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-[#191817] text-[11.8px] font-normal">
          COP {product.price}
        </span>
        <ColorSwatches colors={product.colors} size="large" />
      </div>
    </div>
  </Link>
);

// Navbar Component (Dark version for products page)
function ProductsNavbar() {
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
          <div className="flex items-center gap-3" >
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
              href="#servicios"
              className={`text-[15px] font-neue transition-colors duration-500 ${
                scrolled ? 'text-[#070707] hover:text-[#070707]/50' : 'text-white hover:text-white/70'
              }`}
            >
              Servicios
            </a>
            <a
              href="#soporte"
              className={`text-[15px] font-neue transition-colors duration-500 ${
                scrolled ? 'text-[#070707] hover:text-[#070707]/50' : 'text-white hover:text-white/70'
              }`}
            >
              Soporte
            </a>
            <a
              href="#pro"
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
// Newsletter Section
const NewsletterSection = () => (
  <section className="bg-[#0e0e0e] py-16 md:py-20">
    <div className="max-w-[600px] mx-auto text-center px-4">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <Image
          src="/Images_Icons/iShekelLogo.png"
          alt="iShkel"
          width={55}
          height={55}
        />
        <span className="text-[#f2f2f2] text-[20px] font-normal">iShkel</span>
      </div>

      {/* Title */}
      <h2 className="text-[#f2f2f2] text-[20px] font-medium tracking-[1.7px] uppercase mb-4">
        Join the iShkel newsletter
      </h2>

      {/* Description */}
      <p className="text-[#f2f2f2] text-[16px] tracking-[0.2px] mb-8">
        Se el primer en disfrutar nuestras ofertas especiales y eventos
      </p>

      {/* CTA Button */}
      <button className="px-8 py-3 border-2 border-[#f2f2f2] rounded-[15px] text-[#f2f2f2] text-[14.6px] font-medium hover:bg-[#f2f2f2] hover:text-[#0e0e0e] transition-colors duration-300">
        Regístrate hoy!
      </button>
    </div>
  </section>
);

// Footer Component
const ProductsFooter = () => (
  <footer className="bg-black py-12 md:py-16 px-4 md:px-8 lg:px-12">
    <div className="max-w-[1360px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto] gap-12">
        {/* Brand Column */}
        <div className="max-w-[353px]">
          <h3 className="text-white text-[22.6px] font-light tracking-[-1.56px] mb-4">
            iShkel
          </h3>
          <p className="text-white/70 text-[16px] leading-[24px] tracking-[-0.64px] mb-6">
            Especialistas en cerraduras inteligentes premium con instalación certificada en puertas tradicionales y de alta seguridad. Líder en Colombia desde 2018.
          </p>
          <p className="text-white/70 text-[16px] tracking-[-0.64px]">
            © 2026 iShkel, Created by Diego
          </p>
        </div>

        {/* Links Columns */}
        <div className="flex gap-12 md:gap-16 lg:gap-20">
          {/* Pages */}
          <div>
            <h4 className="text-white text-[16px] font-medium tracking-[-0.64px] mb-4">
              Pages
            </h4>
            <ul className="space-y-3">
              <li><Link href="/blog" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/works" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Works</Link></li>
              <li><Link href="/contact" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/404" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">404</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white text-[16px] font-medium tracking-[-0.64px] mb-4">
              Info
            </h4>
            <ul className="space-y-3">
              <li><Link href="/terminos" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Termino</Link></li>
              <li><Link href="/privacidad" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Privacidad</Link></li>
            </ul>
          </div>

          {/* Sociales */}
          <div>
            <h4 className="text-white text-[16px] font-medium tracking-[-0.64px] mb-4">
              Sociales
            </h4>
            <ul className="space-y-3">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">YouTube</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Facebook</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">TikTok</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default function ProductsPage() {
  const featuredProduct = products.find((p) => p.isFeatured) || products[0];
  const gridProducts = products.filter((p) => !p.isFeatured);

  return (
    <main className="min-h-screen bg-white font-neue">
      {/* Navbar */}
      <ProductsNavbar />

      {/* Products Section */}
      <section className="pt-24 md:pt-28 pb-8 md:pb-12 px-4 md:px-8 lg:px-14">
            <div className="max-w-[1360px] mx-auto">
                {/* Title */}
                <h1 className="text-[32px] md:text-[42px] font-normal text-[#0e0e0e] tracking-[-0.64px] mb-8 md:mb-10">
                Cerradura para tu casa
                </h1>

          {/* Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[439px_1fr] gap-6">
            {/* Featured Product - Large Card */}
            <div className="h-[498px]">
              <FeaturedProductCard product={featuredProduct} />
            </div>

            {/* Small Products Grid - 3 columns, 2 rows */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[240px]">
              {gridProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

     {/* Full Width Image Section */}
<section className="relative w-full h-[500px] md:h-[759px] overflow-hidden">
  <Image
    src="/ProductsImages/hero-image.png"
    alt="Seguridad inteligente para su hogar"
    fill
    className="object-cover object-center"
    sizes="100vw"
    priority
  />
  {/* Overlay Text */}
  <div className="absolute bottom-12 left-8 md:left-16 lg:left-24">
    <h2 className="text-[#f2f2f2] text-[32px] md:text-[42px] font-normal tracking-[-0.64px] leading-[1.2] max-w-[364px]">
      Seguridad inteligente para su hogar
    </h2>
  </div>
</section>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer */}
      <ProductsFooter />
    </main>
  );
}