'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Mock product data - replace with Shopify API later
const getProductByHandle = (handle: string) => {
  return {
    id: '1',
    handle: handle,
    title: 'Cerradura FX 2026',
    price: '2,000,000',
    description: 'Fabricadas con aleación de zinc de grado Aeronáutico e integrado con acero inoxidable 304, Resistente a la corrosión, impactos y temperaturas extremas. Diseño que perdura.',
    images: [
      '/Images_Icons/product-lock-1.png',
      '/Images_Icons/product-lock-1.png',
      '/Images_Icons/product-lock-1.png',
    ],
    features: [
      'Cerradura Biometrica',
      'Garantia 20 Meses',
      'Soporte Extendido',
    ],
    colors: [
      { name: 'Plata', value: '#D9D9D9' },
      { name: 'Negro', value: '#292929' },
    ],
  };
};

// Navbar Component
const ProductNavbar = () => (
  <nav className="bg-[#0e0e0e] w-full px-4 md:px-8 lg:px-10 py-4">
    <div className="max-w-[1360px] mx-auto flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/Images_Icons/ishkel-logo.png"
          alt="iShkel"
          width={55}
          height={55}
          className="w-[55px] h-[55px]"
        />
        <span className="text-white text-[20px] font-medium">iShkel</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 lg:gap-12">
        <Link href="/products" className="text-white text-[15px] font-medium hover:opacity-80">
          Productos
        </Link>
        <Link href="/servicios" className="text-white text-[15px] font-medium hover:opacity-80">
          Servicios
        </Link>
        <Link href="/soporte" className="text-white text-[15px] font-medium hover:opacity-80">
          Soporte
        </Link>
        <Link href="/pro" className="text-white text-[15px] font-medium hover:opacity-80">
          iShkel Pro (Constructores)
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-white hover:opacity-80">
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M16 8C13.7909 8 12 9.79086 12 12C12 14.2091 13.7909 16 16 16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8ZM10 12C10 8.68629 12.6863 6 16 6C19.3137 6 22 8.68629 22 12C22 15.3137 19.3137 18 16 18C12.6863 18 10 15.3137 10 12ZM16 22C12.134 22 9 25.134 9 29H7C7 24.0294 11.0294 20 16 20C20.9706 20 25 24.0294 25 29H23C23 25.134 19.866 22 16 22Z" fill="white"/>
          </svg>
        </button>
        <button className="text-white hover:opacity-80">
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
            <path d="M10 10V8C10 4.68629 12.6863 2 16 2C19.3137 2 22 4.68629 22 8V10M6 10H26L27 30H5L6 10Z" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </nav>
);

// Footer Component
const ProductFooter = () => (
  <footer className="bg-black py-12 md:py-16 px-4 md:px-8 lg:px-12">
    <div className="max-w-[1360px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto] gap-12">
        <div className="max-w-[353px]">
          <h3 className="text-white text-[22.6px] font-light tracking-[-1.56px] mb-4">iShkel</h3>
          <p className="text-white/70 text-[16px] leading-[24px] tracking-[-0.64px] mb-6">
            Especialistas en cerraduras inteligentes premium con instalación certificada en puertas tradicionales y de alta seguridad. Líder en Colombia desde 2018.
          </p>
          <p className="text-white/70 text-[16px] tracking-[-0.64px]">© 2026 iShkel, Created by Diego</p>
        </div>

        <div className="flex gap-12 md:gap-16 lg:gap-20">
          <div>
            <h4 className="text-white text-[16px] font-medium tracking-[-0.64px] mb-4">Pages</h4>
            <ul className="space-y-3">
              <li><Link href="/blog" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white">Blog</Link></li>
              <li><Link href="/works" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white">Works</Link></li>
              <li><Link href="/contact" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[16px] font-medium tracking-[-0.64px] mb-4">Info</h4>
            <ul className="space-y-3">
              <li><Link href="/terminos" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white">Termino</Link></li>
              <li><Link href="/privacidad" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white">Privacidad</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[16px] font-medium tracking-[-0.64px] mb-4">Sociales</h4>
            <ul className="space-y-3">
              <li><a href="https://instagram.com" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white">Instagram</a></li>
              <li><a href="https://youtube.com" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white">YouTube</a></li>
              <li><a href="https://facebook.com" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white">Facebook</a></li>
              <li><a href="https://tiktok.com" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white">TikTok</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default function ProductDetailPage({ params }: { params: { handle: string } }) {
  const product = getProductByHandle(params.handle);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <main className="min-h-screen bg-white">
      <ProductNavbar />

      {/* Breadcrumb */}
      <div className="px-4 md:px-8 lg:px-14 py-4">
        <div className="max-w-[1360px] mx-auto">
          <nav className="flex items-center gap-2 text-sm text-[#555]">
            <Link href="/" className="hover:text-black">Inicio</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-black">Productos</Link>
            <span>/</span>
            <span className="text-black">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="px-4 md:px-8 lg:px-14 py-8 md:py-12">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Left - Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-[#fafafa] rounded-[15px] overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.title}
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 bg-[#fafafa] rounded-[10px] overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-black' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} - ${index + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Product Info */}
            <div className="flex flex-col">
              {/* Badge */}
              <span className="text-[#555] text-sm font-medium mb-2">iShkel</span>

              {/* Title */}
              <h1 className="text-[32px] md:text-[42px] font-normal text-black tracking-[-0.64px] mb-4">
                {product.title}
              </h1>

              {/* Description */}
              <p className="text-[#555] text-base leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <p className="text-sm text-[#888] mb-3">Características</p>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-black">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <p className="text-sm text-[#888] mb-3">Color: {product.colors[selectedColor].name}</p>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedColor === index ? 'border-black' : 'border-[#626262]'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-full"
                        style={{ backgroundColor: color.value }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-sm text-[#888] mb-3">Cantidad</p>
                <div className="flex items-center border border-gray-300 rounded-[10px] w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 text-lg"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 text-lg font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <p className="text-sm text-[#888] mb-1">Plan de pago disponible</p>
                <p className="text-[28px] md:text-[32px] font-bold text-black">
                  COP {product.price}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 px-8 py-4 bg-white border-2 border-black text-black rounded-[15px] font-medium hover:bg-black hover:text-white transition-all duration-300">
                  Comprar ahora
                </button>
                <button className="flex-1 px-8 py-4 bg-[#E85D3F] text-white rounded-[15px] font-medium hover:bg-[#d14e32] transition-all duration-300">
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section - Optional */}
      <section className="px-4 md:px-8 lg:px-14 py-12 bg-[#f2f2f2]">
        <div className="max-w-[1360px] mx-auto">
          <h2 className="text-[28px] md:text-[32px] font-normal text-black mb-8">
            Productos relacionados
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, index) => (
              <Link href="/products/fx-2025" key={index} className="group">
                <div className="bg-white rounded-[15px] p-4">
                  <div className="relative aspect-square mb-4">
                    <Image
                      src="/Images_Icons/product-lock-1.png"
                      alt="Related product"
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-[#191817] text-sm">COP 2,00,300</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ProductFooter />
    </main>
  );
}