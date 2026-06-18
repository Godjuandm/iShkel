'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';

const products = [
  {
    id: '1',
    handle: 'serie-s-t',
    title: 'Serie S | T',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    category: 'Cerraduras eléctricas',
    isNew: true,
    isFeatured: true,
    colors: ['#D9D9D9', '#292929'],
  },
  {
    id: '2',
    handle: 'serie-x-r',
    title: 'Serie X | R',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    category: 'Cerraduras eléctricas',
    isNew: true,
    colors: ['#D9D9D9', '#292929'],
  },
  {
    id: '3',
    handle: 'serie-f-s',
    title: 'Serie F | S',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    category: 'Cerraduras eléctricas',
    isNew: false,
    colors: ['#D9D9D9', '#292929'],
  },
  {
    id: '4',
    handle: 'serie-fx-under',
    title: 'Serie Fx | Under',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    category: 'Cerraduras eléctricas',
    isNew: false,
    colors: ['#D9D9D9', '#292929'],
  },
  {
    id: '5',
    handle: 'serie-fx-camon',
    title: 'Serie Fx Camon',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    category: 'Cerraduras eléctricas',
    isNew: false,
    colors: ['#D9D9D9', '#292929'],
  },
  {
    id: '6',
    handle: 'cerradura-fx-321312',
    title: 'Cerradura FX 321312',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    category: 'Candados y pestillos',
    isNew: false,
    colors: ['#D9D9D9', '#292929'],
  },
];

const ColorSwatches = ({ colors, large = false }: { colors: string[]; large?: boolean }) => (
  <div className="flex items-center gap-2">
    {colors.map((color, index) => (
      <button
        key={index}
        className={`${large ? 'w-6 h-6' : 'w-5 h-5'} rounded-full border border-[#626262] flex items-center justify-center bg-white`}
      >
        <span
          className={`${large ? 'w-4.5 h-4.5' : 'w-3.5 h-3.5'} rounded-full`}
          style={{ backgroundColor: color }}
        />
      </button>
    ))}
  </div>
);

const ProductCard = ({ product }: { product: typeof products[0] }) => (
  <Link href={`/products/${product.handle}`} className="group block">
    <div className="bg-[#fafafa] rounded-[15px] p-4 relative h-60 flex flex-col overflow-hidden">
      {product.isNew && (
        <span className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-[13px] text-black font-normal z-10">
          New
        </span>
      )}
      <div className="relative flex-1 w-full">
        <Image
          src={product.image}
          alt={product.title}
          fill
          quality={95}
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 22vw"
        />
      </div>
      <div className="flex items-center justify-between pt-2 shrink-0">
        <span className="text-[#191817] text-[11px] font-normal">COP {product.price}</span>
        <ColorSwatches colors={product.colors} />
      </div>
    </div>
  </Link>
);

const FeaturedProductCard = ({ product }: { product: typeof products[0] }) => (
  <Link href={`/products/${product.handle}`} className="group block h-full">
    <div className="bg-[#fafafa] rounded-[15px] p-6 relative h-full flex flex-col overflow-hidden">
      {product.isNew && (
        <span className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full text-[14px] text-black font-normal z-10">
          New
        </span>
      )}
      <h3 className="text-[#191817] text-[20px] font-normal tracking-[0.1px] mb-4 shrink-0">
        {product.title}
      </h3>
      <div className="relative flex-1 w-full">
        <Image
          src={product.image}
          alt={product.title}
          fill
          quality={95}
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 1024px) 100vw, 33vw"
          priority
        />
      </div>
      <div className="flex items-center justify-between mt-4 shrink-0">
        <span className="text-[#191817] text-[12px] font-normal">COP {product.price}</span>
        <ColorSwatches colors={product.colors} large />
      </div>
    </div>
  </Link>
);

function ProductsNavbar() {
  return <Navbar dark />;
}

const NewsletterSection = () => (
  <section className="bg-[#0e0e0e] py-16 md:py-20">
    <div className="max-w-150 mx-auto text-center px-4">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Image
          src="/Images_Icons/iShekelLogo.png"
          alt="iShkel"
          width={55}
          height={55}
        />
        <span className="text-[#f2f2f2] text-[20px] font-normal">iShkel</span>
      </div>
      <h2 className="text-[#f2f2f2] text-[20px] font-medium tracking-[1.7px] uppercase mb-4">
        Join the iShkel newsletter
      </h2>
      <p className="text-[#f2f2f2] text-[16px] tracking-[0.2px] mb-8">
        Se el primer en disfrutar nuestras ofertas especiales y eventos
      </p>
      <button className="px-8 py-3 border-2 border-[#f2f2f2] rounded-[15px] text-[#f2f2f2] text-[14.6px] font-medium hover:bg-[#f2f2f2] hover:text-[#0e0e0e] transition-colors duration-300">
        Regístrate hoy!
      </button>
    </div>
  </section>
);

const ProductsFooter = () => (
  <footer className="bg-black py-12 md:py-16 px-4 md:px-8 lg:px-12">
    <div className="max-w-340 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto] gap-12">
        <div className="max-w-88.25">
          <h3 className="text-white text-[22.6px] font-light tracking-[-1.56px] mb-4">
            iShkel
          </h3>
          <p className="text-white/70 text-[16px] leading-6 tracking-[-0.64px] mb-6">
            Especialistas en cerraduras inteligentes premium con instalación certificada en puertas tradicionales y de alta seguridad. Líder en Colombia desde 2018.
          </p>
          <p className="text-white/70 text-[16px] tracking-[-0.64px]">
            © 2026 iShkel, Created by Diego
          </p>
        </div>
        <div className="flex gap-12 md:gap-16 lg:gap-20">
          <div>
            <h4 className="text-white text-[16px] font-medium tracking-[-0.64px] mb-4">Pages</h4>
            <ul className="space-y-3">
              <li><Link href="/blog" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/works" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Works</Link></li>
              <li><Link href="/contact" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/404" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">404</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[16px] font-medium tracking-[-0.64px] mb-4">Info</h4>
            <ul className="space-y-3">
              <li><Link href="/terminos" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Termino</Link></li>
              <li><Link href="/privacidad" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Privacidad</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[16px] font-medium tracking-[-0.64px] mb-4">Sociales</h4>
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
      <ProductsNavbar />

      <section className="pt-24 md:pt-28 pb-8 md:pb-12 px-4 md:px-8 lg:px-14">
        <div className="max-w-340 mx-auto">
          <h1 className="text-[32px] md:text-[42px] font-medium text-[#0e0e0e] tracking-[-0.64px] mb-8 md:mb-10">
            Cerradura para tu casa
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4">
            <div className="h-124">
              <FeaturedProductCard product={featuredProduct} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[240px]">
              {gridProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full h-135 md:h-250.75 overflow-hidden">
        <Image
          src="/ProductsImages/hero-image.png"
          alt="Seguridad inteligente para su hogar"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority 
        />
        <div className="absolute bottom-12 left-8 md:left-16 lg:left-24">
          <h2 className="text-[#f2f2f2] text-[32px] md:text-[42px] font-medium-light tracking-[-0.64px] leading-[1.2] max-w-130">
            Ingenieria y seguridad biometrica 3d por primera vez en Colombia.
          </h2>
        </div>
      </section>

      <NewsletterSection />
      <ProductsFooter />
    </main>
  );
}
