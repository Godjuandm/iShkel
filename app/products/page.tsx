import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';
import { getAllProducts, ShopifyListProduct } from '@/lib/shopify';
import Footer from '@/components/shared/Footer';
import ScrollReveal from '@/components/shared/ScrollReveal';

const SPANISH_COLOR_MAP: Record<string, string> = {
  'negro': '#292929',
  'negro azabache': '#292929',
  'blanco': '#f5f5f5',
  'plata': '#C0C0C0',
  'plateado': '#C0C0C0',
  'dorado': '#D4AF37',
  'gris': '#888888',
  'rojo': '#CC0000',
  'azul': '#1E3A8A',
  'bronce': '#CD7F32',
};

function colorNameToHex(name: string): string {
  return SPANISH_COLOR_MAP[name.toLowerCase()] ?? '#D9D9D9';
}

function formatCOP(amount: string): string {
  return new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(
    parseFloat(amount)
  );
}

function getProductColors(product: ShopifyListProduct): string[] {
  const colorOption = product.options.find(
    (o) => o.name.toLowerCase() === 'color'
  );
  if (!colorOption || colorOption.values.length === 0) return ['#D9D9D9', '#292929'];
  return colorOption.values.map(colorNameToHex);
}

function getProductImage(product: ShopifyListProduct): string {
  return (
    product.featuredImage?.url ??
    product.images.nodes[0]?.url ??
    '/ProductsImages/iShkelSampleFX 1.png'
  );
}

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

const TAG_STYLES: Record<string, string> = {
  'new':         'bg-white text-black',
  'nuevo':       'bg-white text-black',
  'novedad':     'bg-white text-black',
  'sale':        'bg-red-500 text-white',
  'oferta':      'bg-red-500 text-white',
  'descuento':   'bg-red-500 text-white',
  'best seller': 'bg-[#191817] text-white',
  'best-seller': 'bg-[#191817] text-white',
  'más vendido': 'bg-[#191817] text-white',
  'featured':    'bg-[#191817] text-white',
  'destacado':   'bg-[#191817] text-white',
  'limited':     'bg-amber-500 text-white',
  'limitado':    'bg-amber-500 text-white',
};

function tagStyle(tag: string): string {
  return TAG_STYLES[tag.toLowerCase()] ?? 'bg-white/90 text-black';
}

const TagBadges = ({ tags, small = false }: { tags: string[]; small?: boolean }) => (
  <>
    {tags.map((tag) => (
      <span
        key={tag}
        className={`${small ? 'px-2.5 py-0.5 text-[11px]' : 'px-3.5 py-1 text-[13px]'} rounded-full font-normal leading-none ${tagStyle(tag)}`}
      >
        {tag}
      </span>
    ))}
  </>
);

type CardProduct = {
  handle: string;
  title: string;
  price: string;
  image: string;
  tags: string[];
  colors: string[];
};

const ProductCard = ({ product }: { product: CardProduct }) => (
  <Link href={`/products/${product.handle}`} className="group block">
    <div className="bg-[#fafafa] rounded-[15px] relative h-80 flex flex-col overflow-hidden">
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1.5">
        <TagBadges tags={product.tags} small />
      </div>
      <div className="relative flex-1 w-full p-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          quality={95}
          className="object-contain group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 22vw"
        />
      </div>
      <div className="flex items-center justify-between px-4 py-3.5 shrink-0 bg-[#fafafa]">
        <span className="text-[#191817] text-[11px] font-normal">COP {product.price}</span>
        <span className="text-[#191817] text-[11px] font-normal truncate max-w-[60%]">{product.title}</span>
      </div>
    </div>
  </Link>
);

const FeaturedProductCard = ({ product }: { product: CardProduct }) => (
  <Link href={`/products/${product.handle}`} className="group block h-full">
    <div className="bg-[#fafafa] rounded-[15px] relative h-full flex flex-col overflow-hidden">
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1.5">
        <TagBadges tags={product.tags} />
      </div>
      <div className="px-5 pt-5 shrink-0">
        <h3 className="text-[#191817] text-[20px] font-normal tracking-[0.1px]">
          {product.title}
        </h3>
      </div>
      <div className="relative flex-1 w-full mt-4 p-5">
        <Image
          src={product.image}
          alt={product.title}
          fill
          quality={95}
          className="object-contain group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 1024px) 100vw, 33vw"
          priority
        />
      </div>
      <div className="flex items-center justify-between px-5 py-4 shrink-0 bg-[#fafafa]">
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



export default async function ProductsPage() {
  const shopifyProducts = await getAllProducts();

  const products: CardProduct[] = shopifyProducts.map((p) => ({
    handle: p.handle,
    title: p.title,
    price: formatCOP(p.priceRange.minVariantPrice.amount),
    image: getProductImage(p),
    tags: p.tags,
    colors: getProductColors(p),
  }));

  const featuredProduct = products[0];
  const gridProducts = products.slice(1);

  return (
    <main className="min-h-screen bg-white font-neue">
      <ProductsNavbar />

      <section className="pt-24 md:pt-28 pb-8 md:pb-12 px-4 md:px-8 lg:px-14">
        <div className="max-w-340 mx-auto">
          <ScrollReveal direction="up" duration={0.7} distance={28}>
            <h1 className="text-[32px] md:text-[42px] font-medium text-[#0e0e0e] tracking-[-0.64px] mb-10 md:mb-12">
              Cerradura para tu casa
            </h1>
          </ScrollReveal>
          {featuredProduct && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
              <ScrollReveal direction="up" distance={32} duration={0.9} className="h-164">
                <FeaturedProductCard product={featuredProduct} />
              </ScrollReveal>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[320px]">
                {gridProducts.slice(0, 6).map((product, i) => (
                  <ScrollReveal key={product.handle} direction="up" distance={24} duration={0.7} delay={i * 0.08}>
                    <ProductCard product={product} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="relative w-full h-135 md:h-250.75 overflow-hidden">
        <Image
          src="/ProductsImages/HeroProduct.png"
          alt="Seguridad inteligente para su hogar"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute bottom-12 left-8 md:left-16 lg:left-24">
          <ScrollReveal direction="up" distance={32} duration={1} start="top 90%">
            <h2 className="text-[#f2f2f2] text-[32px] md:text-[42px] font-medium-light tracking-[-0.64px] leading-[1.2] max-w-130">
              Ingenieria y seguridad biometrica 3d por primera vez en Colombia.
            </h2>
          </ScrollReveal>
        </div>
      </section>

      <NewsletterSection />
      <Footer/>
    </main>
  );
}
