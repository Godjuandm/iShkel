'use client';

import Image from 'next/image';
import { useState } from 'react';

type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    nodes: {
      url: string;
      altText: string | null;
    }[];
  };
};

type ShowroomProps = {
  product: Product;
};

export default function Showroom({ product }: ShowroomProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(1); // 0 = white, 1 = dark
  const [selectedDoor, setSelectedDoor] = useState(0);

  const images = product.images.nodes;
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const formattedPrice = `COP ${price.toLocaleString('es-CO')}`;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="bg-[#f2f2f2] w-full py-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row items-start gap-0">

          {/* Left - Product Image Carousel */}
          <div className="w-full lg:w-[58%] relative">
            <div className="relative rounded-[15px] overflow-hidden bg-white h-[650px] w-[717px] mt-[50px]">
              {/* Main Image */}
              {images.length > 0 && (
                <Image
                  src={images[currentImage]?.url}
                  alt={images[currentImage]?.altText || product.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}

              {/* Prev Arrow */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-[45px] h-[45px] bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#191817" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Next Arrow */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-[45px] h-[45px] bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#191817" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              {/* Dot Pagination */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === currentImage
                        ? 'w-[8px] h-[8px] bg-[#191817] rounded-[4px]'
                        : 'w-[4px] h-[4px] bg-[#8c8c8c] rounded-[2px]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="w-full lg:w-[42%] lg:pl-[116px] flex flex-col justify-center py-10 lg:py-16">

            {/* Brand + Title */}
            <div className="pb-2">
              <p className="font-neue font-normal text-[15px] text-[#070707]">iShkel</p>
              <h2 className="font-neue font-medium text-[20px] text-[#070707]">{product.title}</h2>
            </div>

            {/* Description */}
            <div className="pt-2 pb-4">
              <p className="font-neue font-medium text-[14px] text-[#070707] leading-[20px]">
                {product.description}
              </p>
            </div>

            {/* Color Selector */}
            <div className="flex items-center justify-between py-[21px] border-t border-b border-[#191817]">
              <p className="font-neue font-medium text-[14px] text-[#626262]">Negro Azabache</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedColor(0)}
                  className={`w-[25px] h-[25px] rounded-full border ${
                    selectedColor === 0 ? 'border-[#626262]' : 'border-[#626262]'
                  }`}
                >
                  <div className="w-full h-full rounded-full bg-[#D9D9D9] m-auto scale-75" />
                </button>
                <button
                  onClick={() => setSelectedColor(1)}
                  className={`w-[25px] h-[25px] rounded-full border ${
                    selectedColor === 1 ? 'border-[#626262]' : 'border-[#626262]'
                  }`}
                >
                  <div className="w-full h-full rounded-full bg-[#292929] m-auto scale-75" />
                </button>
              </div>
            </div>

            {/* Door Type Selector */}
            <div className="flex items-center justify-between py-[20px] border-b border-[#191817]">
              <p className="font-neue font-medium text-[14px] text-[#626262]">Tipo de puerta (Madera)</p>
              <div className="flex items-center gap-2">
                {[
                  '/Images_Icons/ColorChoice1.png',
                  '/Images_Icons/ColorChoice2.png',
                  '/Images_Icons/ColorChoice3.png',
                ].map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDoor(i)}
                    className={`w-[25px] h-[25px] rounded-full overflow-hidden border ${
                      selectedDoor === i ? 'border-[#626262]' : 'border-[#aca69f]'
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Door type ${i + 1}`}
                      width={25}
                      height={25}
                      className="object-cover rounded-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="pt-6 pb-4 space-y-2">
              {[
                'Envio Gratis(Contra entrega)',
                'Soporte 24/7',
                'Hasta 2 anos de garantia',
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7l3.5 3.5L12 4"
                      stroke={i < 2 ? '#626262' : '#747474'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-neue font-medium text-[14px] text-[#626262]">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="pt-2 pb-4">
              <p className="font-neue font-normal text-[24px] text-[#191817]">{formattedPrice}</p>
            </div>

            {/* Comprar ahora - Outline button */}
            <button className="w-full h-[48px] rounded-[15px] border-2 border-[#191817] flex items-center justify-center hover:bg-[#191817] hover:text-white transition-all duration-300 group">
            <span className="font-neue font-medium text-[14.5px] text-[#191817] tracking-[0.1px] group-hover:text-white transition-colors duration-300">
                Comprar ahora
            </span>
            </button>

            {/* Añadir al carrito - Metallic dark button (same as Hero style) */}
            <div className="relative mt-3 w-full h-[48px] group cursor-pointer">
            {/* Outer gradient glow */}
            <div className="absolute inset-0 rounded-[15px] bg-gradient-to-r from-[#3b3b3b] to-[#a1a1a1] blur-[2px] opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            <div className="relative rounded-[15px] bg-gradient-to-r from-[#3b3b3b] to-[#a1a1a1] p-[2px] w-full h-[48px]">
                <div className="rounded-[13px] bg-[#070707] w-full h-full flex items-center justify-center relative overflow-hidden">
                <span className="relative z-10 font-neue font-normal text-[20px] text-white">
                    Añadir al carrito
                </span>
                </div>
            </div>
            </div>

        

          </div>
        </div>
      </div>
    </section>
  );
}


