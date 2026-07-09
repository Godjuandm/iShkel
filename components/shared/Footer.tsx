import Link from 'next/link';

type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

type NavColumn = {
  heading: string;
  links: NavLink[];
};

const navColumns: NavColumn[] = [
  {
    heading: 'Páginas',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Productos', href: '/products' },
      { label: 'Soporte', href: '/Soporte' },
      { label: 'iShkel Pro', href: '/pro' },
    ],
  },
  {
    heading: 'Info',
    links: [
      { label: 'Términos', href: '/terminos' },
      { label: 'Privacidad', href: '/privacidad' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    heading: 'Sociales',
    links: [
      { label: 'Instagram', href: 'https://instagram.com', external: true },
      { label: 'YouTube', href: 'https://youtube.com', external: true },
      { label: 'Facebook', href: 'https://facebook.com', external: true },
      { label: 'TikTok', href: 'https://tiktok.com', external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] font-neue">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 lg:px-14 pt-20 md:pt-28 pb-14">

        {/* Large wordmark — mirrors the hero gradient */}
        <div className="mb-14 md:mb-20">
          <h2
            className="text-[72px] sm:text-[110px] md:text-[148px] lg:text-[180px] font-medium leading-none tracking-[-0.03em] select-none"
            style={{
              background: 'linear-gradient(90deg, #626262 2.88%, #F2F2F2 73.08%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            iShkel
          </h2>
          <p className="text-white/40 text-[15px] md:text-[16px] leading-relaxed mt-5 max-w-[340px]">
            Cerraduras inteligentes de lujo. Biometría facial 3D e instalación certificada en toda Colombia.
          </p>
        </div>

        {/* Links + CTA row */}
        <div className="border-t border-white/[0.08] pt-10 md:pt-12 flex flex-col lg:flex-row justify-between gap-12 lg:gap-0">

          {/* Nav columns */}
          <div className="flex flex-wrap gap-12 md:gap-16 lg:gap-20">
            {navColumns.map(({ heading, links }) => (
              <div key={heading}>
                <h4 className="text-white/30 text-[11px] font-medium tracking-[0.12em] uppercase mb-5">
                  {heading}
                </h4>
                <ul className="space-y-3.5">
                  {links.map(({ label, href, external = false }) =>
                    external ? (
                      <li key={label}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/50 text-[15px] hover:text-white transition-colors duration-300"
                        >
                          {label}
                        </a>
                      </li>
                    ) : (
                      <li key={label}>
                        <Link
                          href={href}
                          className="text-white/50 text-[15px] hover:text-white transition-colors duration-300"
                        >
                          {label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col items-start lg:items-end justify-between gap-6 lg:pl-20">
            <p className="text-white/40 text-[14px] leading-relaxed max-w-[200px] lg:text-right">
              ¿Listo para proteger tu hogar con tecnología de lujo?
            </p>
            <a
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-[15px] text-white text-[14px] font-normal hover:bg-white hover:text-[#0a0a0a] active:scale-[0.98] transition-all duration-300 group"
            >
              Ver Catálogo
              <span className="group-hover:translate-x-0.5 transition-transform duration-300">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 lg:px-14 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/25 text-[13px]">© 2026 iShkel. Created by Diego.</p>
          <p className="text-white/25 text-[13px]">Líder en cerraduras inteligentes en Colombia desde 2018.</p>
        </div>
      </div>
    </footer>
  );
}
