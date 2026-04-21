'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

// Sidebar Component - Sticky
function Sidebar({ activeSection }: { activeSection: string }) {
  const supportLinks = [
    { id: 'instalar', label: 'Como instalar tu cerradura' },
    { id: 'ordenar', label: 'Como ordenar tu cerradura' },
    { id: 'contraentrega', label: 'Puedo pagar contraentrega?' },
    { id: 'visitas', label: 'Visitas gratis' },
    { id: 'compatible', label: 'Es compatible con mi puerta?' },
    { id: 'internet', label: 'Puedo usarla sin internet?' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <aside className="hidden lg:block w-[350px] lg:w-[400px] shrink-0">
      <div className="sticky top-28 pt-10 pl-4s lg:pl-12">
        {/* Centro de ayuda label */}
        <p className="text-[14px] text-[#626262] mb-2 font-neue">Centro de ayuda</p>

        {/* iShkel Soporte Section */}
        <div className="mb-12">
          <h2 className="text-[28px] lg:text-[32px] font-medium text-[#070707] mb-6 font-neue">
            iShkel Soporte
          </h2>
          <ul className="space-y-3">
            {supportLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`text-[16px] lg:text-[18px] text-left transition-colors font-neue ${
                    activeSection === link.id
                      ? 'text-[#070707] font-medium'
                      : 'text-[#626262] hover:text-[#070707]'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Preguntas Frecuentes Section */}
        <div>
          <h2 className="text-[28px] lg:text-[32px] font-medium text-[#070707] mb-6 font-neue">
            Preguntas Frecuentes
          </h2>
          <ul className="space-y-3">
            {supportLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`text-[16px] lg:text-[18px] text-left transition-colors font-neue ${
                    activeSection === link.id
                      ? 'text-[#070707] font-medium'
                      : 'text-[#626262] hover:text-[#070707]'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

// Main Content Component - Scrollable
function MainContent() {
  const faqs = [
    {
      id: 'instalar',
      question: 'Como instalo iShkel in mi puerta',
      answer: (
        <>
          <p className="mb-4">
            La instalación es completamente sin obras. iShkel se adapta a cerraduras estándar
            colombianas y no necesitas herramientas especiales.
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Retira tu cerradura actual (tornillo y placa trasera)</li>
            <li>Coloca el módulo iShkel en el mismo espacio</li>
            <li>Conecta la app y empareja en menos de 2 minutos</li>
          </ol>
        </>
      ),
    },
    {
      id: 'ordenar',
      question: 'Como ordenar mi cerradura?',
      answer:
        'Puedes comprar directamente desde nuestra tienda online. Selecciona tu modelo, agrega al carrito y elige entre pago en línea o contra entrega. Envío gratis a todo Colombia.',
    },
    {
      id: 'contraentrega',
      question: 'Puedo pagar contra entrega?',
      answer:
        'Sí. Ofrecemos pago contraentrega en las principales ciudades de Colombia: Bogotá, Medellín, Cali, Barranquilla y más. Solo pagas cuando recibes tu iShkel en casa.',
    },
    {
      id: 'visitas',
      question: 'Visitas gratis?',
      answer:
        'Sí. Ofrecemos visitas técnicas gratuitas en Bogotá, Medellín y Cali para ayudarte con la instalación. Agenda la tuya después de tu compra. Llámanos aquí 3134348706',
    },
    {
      id: 'compatible',
      question: 'Es compatible con mi puerta?',
      answer:
        'iShkel es compatible con la gran mayoría de puertas residenciales y comerciales en Colombia. Funciona con cerraduras de mortaja y embutidas estándar. Si tienes dudas, escríbenos y te ayudamos.',
    },
    {
      id: 'internet',
      question: 'Puedo usarla sin internet?',
      answer:
        'Sí. iShkel funciona sin internet para acceso por huella dactilar y código PIN. La app y las notificaciones en tiempo real requieren conexión, pero tu puerta siempre responde.',
    },
  ];

  return (
    <main className="flex-1 pt-16 pb-24 px-6 md:px-8 lg:px-16 lg:border-l lg:border-[#e5e5e5]">
      <div className="max-w-[700px]">
        {/* Mobile: Show title */}
        <div className="lg:hidden mb-8">
          <p className="text-[14px] text-[#626262] mb-2 font-neue">Centro de ayuda</p>
          <h1 className="text-[32px] font-medium text-[#070707] font-neue">iShkel Soporte</h1>
        </div>

        {faqs.map((faq) => (
          <section key={faq.id} id={faq.id} className="mb-16 scroll-mt-28">
            <h3 className="text-[24px] md:text-[28px] lg:text-[36px] font-medium text-[#070707] mb-4 leading-[1.4] font-neue">
              {faq.question}
            </h3>
            <div className="text-[16px] md:text-[18px] lg:text-[20px] text-[#626262] leading-[1.6] font-neue">
              {faq.answer}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export default function SoportePage() {
  const [activeSection, setActiveSection] = useState('instalar');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['instalar', 'ordenar', 'contraentrega', 'visitas', 'compatible', 'internet'];
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-neue">
      {/* Your existing Navbar */}
      <Navbar />

      {/* Main Layout - Sidebar + Content */}
      <div className="pt-20 flex max-w-[1440px] mx-auto">
        {/* Sticky Sidebar (hidden on mobile) */}
        <Sidebar activeSection={activeSection} />

        {/* Scrollable Content */}
        <MainContent />
      </div>

      {/* Your existing Footer */}
      <Footer />
    </div>
  );
}