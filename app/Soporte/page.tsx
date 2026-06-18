'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

const SECTION_LABELS: Record<string, string> = {
  'seccion-1': 'Preventa, Asesoria e instalacion',
  'seccion-2': 'Soporte Postventa y Configuración Técnica',
};

const SUPPORT_LINKS = [
  { id: 'ubicacion', label: '¿Dónde están ubicados?', shortLabel: 'Ubicación', section: 'seccion-1' },
  { id: 'contraentrega', label: '¿El pago es contraentrega?', shortLabel: 'Contraentrega', section: 'seccion-1' },
  { id: 'instalacion-solo', label: '¿Instalación solamente?', shortLabel: 'Solo instalar', section: 'seccion-1' },
  { id: 'ciudades', label: '¿En qué ciudades instalan?', shortLabel: 'Ciudades', section: 'seccion-1' },
  { id: 'duracion', label: '¿Cuánto demora la instalación?', shortLabel: 'Duración', section: 'seccion-1' },
  { id: 'diy', label: '¿Puedo instalarla yo mismo?', shortLabel: 'Yo mismo', section: 'seccion-1' },
  { id: 'garantia', label: 'Garantía', shortLabel: 'Garantía', section: 'seccion-1' },
  { id: 'soporte-posventa', label: 'Soporte posventa', shortLabel: 'Posventa', section: 'seccion-1' },
  { id: 'auditoria', label: 'Visita de auditoría GRATIS', shortLabel: 'Auditoría', section: 'seccion-1' },
  { id: 'sin-internet', label: '¿Sirven sin internet?', shortLabel: 'Sin internet', section: 'seccion-1' },
  { id: 'compatibilidad', label: '¿Sirve en mi puerta?', shortLabel: 'Compatibilidad', section: 'seccion-1' },
  { id: 'agendar', label: '¿Cómo agendar una visita?', shortLabel: 'Agendar', section: 'seccion-1' },
  { id: 'puerta-seguridad', label: 'Mi puerta es de seguridad', shortLabel: 'Pta. seguridad', section: 'seccion-1' },
  { id: 'anadir-usuarios', label: '¿Cómo añadir usuarios?', shortLabel: 'Añadir usuarios', section: 'seccion-2' },
  { id: 'eliminar-usuarios', label: '¿Cómo eliminar usuarios?', shortLabel: 'Eliminar usuarios', section: 'seccion-2' },
  { id: 'volumen', label: '¿Cómo ajustar el volumen?', shortLabel: 'Volumen', section: 'seccion-2' },
  { id: 'vincular-app', label: '¿Cómo vincular la app?', shortLabel: 'Vincular app', section: 'seccion-2' },
  { id: 'apertura-remota', label: '¿Cómo abrir remotamente?', shortLabel: 'Apertura remota', section: 'seccion-2' },
  { id: 'claves-temporales', label: '¿Cómo añadir claves temporales?', shortLabel: 'Claves temp.', section: 'seccion-2' },
  { id: 'sensores', label: '¿Cómo activar sensores?', shortLabel: 'Sensores', section: 'seccion-2' },
  { id: 'bateria', label: '¿Cómo cargar la batería?', shortLabel: 'Batería', section: 'seccion-2' },
  { id: 'uso-seguridad', label: 'Uso en puerta de seguridad', shortLabel: 'Uso pta. seg.', section: 'seccion-2' },
  { id: 'registros-acceso', label: 'Registros de acceso', shortLabel: 'Registros', section: 'seccion-2' },
  { id: 'videovigilancia', label: 'Videovigilancia y registros', shortLabel: 'Videovigilancia', section: 'seccion-2' },
];

const FAQS = [
  {
    id: 'ubicacion',
    question: '¿Dónde están ubicados?',
    answer: (
      <p>
        Nuestra sede central de operaciones está ubicada en <strong>Bogotá</strong>, lugar desde donde
        se coordina toda la logística nacional hacia nuestras diferentes sedes regionales. Contamos
        con bodegas físicas y empleados a total disposición en las ciudades de{' '}
        <strong>Cali, Villavicencio, Barranquilla, Medellín y todo el Eje Cafetero</strong>,
        garantizando una atención rápida y un stock permanente.
      </p>
    ),
  },
  {
    id: 'contraentrega',
    question: '¿El pago es contraentrega?',
    answer: (
      <p>
        <strong>Sí, contamos con servicio contraentrega.</strong> Además, para garantizar tu
        satisfacción al 100%, en nuestras ciudades de operación principal ofrecemos la opción de{' '}
        <strong>pago contrainstalación</strong>; de esta manera, pagas tu equipo únicamente cuando ya
        esté instalado y verifiques su perfecto funcionamiento.
      </p>
    ),
  },
  {
    id: 'instalacion-solo',
    question: '¿Ofrecen servicio de instalación solamente?',
    answer: (
      <p>
        No. iShkel se reserva los derechos de su equipo técnico calificado y{' '}
        <strong>
          no ofrece servicios de instalación a terceros ni a cerraduras que no sean de nuestra marca
        </strong>
        . Nuestro personal técnico trabaja exclusivamente para garantizar el estándar premium y la
        seguridad de los productos oficiales iShkel.
      </p>
    ),
  },
  {
    id: 'ciudades',
    question: '¿En qué ciudades y municipios instalan?',
    answer: (
      <p>
        <strong>Ofrecemos cobertura de instalación en toda Colombia.</strong> En las ciudades donde
        tenemos operación directa mantenemos tasas fijas y preferenciales. Para otros municipios o
        zonas adicionales fuera de nuestra cobertura directa, se aplicará un costo extra por
        desplazamiento; estos van desde los $99,000 COP dependiendo de la ubicación exacta.
      </p>
    ),
  },
  {
    id: 'duracion',
    question: '¿Cuánto demora la instalación?',
    answer: (
      <p>
        El proceso toma aproximadamente <strong>entre 1.5 y 3 horas</strong>, dependiendo del tipo de
        puerta (madera, metal o seguridad) y de las adaptaciones mecánicas que requiera el marco para
        asegurar un encaje milimétrico.
      </p>
    ),
  },
  {
    id: 'diy',
    question: '¿Puedo instalarla yo mismo?',
    answer: (
      <p>
        <strong>Sí, es posible en ciertos casos.</strong> iShkel te entrega un manual detallado y una
        guía de instalación paso a paso para que puedas realizar el proceso de forma autónoma en{' '}
        <strong>puertas estándar de madera o metal</strong>. Sin embargo, en{' '}
        <strong>puertas de seguridad y puertas blindadas</strong>, el proceso es considerablemente más
        complejo; por ende,{' '}
        <strong>
          no recomendamos ni permitimos la autoinstalación en este tipo de estructuras
        </strong>
        , ya que de hacerlo se perderá de forma inmediata la garantía del producto.
      </p>
    ),
  },
  {
    id: 'garantia',
    question: 'Garantía',
    answer: (
      <>
        <p className="mb-4">
          En iShkel manejamos una garantía extendida a nivel nacional de{' '}
          <strong>12, 20 o 24 meses</strong>, dependiendo del modelo y el caso específico de compra.
          El soporte se gestiona de manera inmediata a través de nuestros canales de atención
          digitales. Si se presenta un problema que no se pueda resolver de forma remota, un asesor o
          técnico especializado se acercará a tu domicilio:
        </p>
        <ul className="space-y-2 mb-4">
          <li>
            <strong>Atención estándar:</strong> Contamos con hasta 24–72 horas hábiles para
            programar la visita y resolver el inconveniente.
          </li>
          <li>
            <strong>Atención por urgencias:</strong> Dependiendo de la gravedad de la situación
            (por ejemplo, si te quedas por fuera de tu propiedad), nuestros tiempos de respuesta en
            urgencias se reducen a <strong>una hora o menos</strong>, sujeto a disponibilidad y
            ubicación.
          </li>
        </ul>
        <p className="text-[14px] lg:text-[16px] text-[#9a9a9a] italic">
          Nota: La garantía cubre al 100% cualquier defecto de fábrica de la cerradura, su
          electrónica o su mecanismo de embutir. En el caso de las puertas de seguridad con
          adaptación al mecanismo original de la puerta, la garantía solo cubrirá las manijas
          digitales. No cubre el mal funcionamiento o la falta de mantenimiento de la puerta misma.
          Si el lío es de la cerradura, iShkel asume la solución en su totalidad; si el problema
          proviene de un fallo estructural de la puerta, nuestro equipo puede encargarse de la
          reparación, pero el costo del servicio será asumido al 100% por el cliente.
        </p>
      </>
    ),
  },
  {
    id: 'soporte-posventa',
    question: 'Soporte posventa',
    answer: (
      <>
        <p className="mb-4">
          Tu tranquilidad no tiene horario. Al adquirir un producto iShkel, tienes acceso a un{' '}
          <strong>soporte posventa premium disponible 24/7</strong> a través de nuestros canales
          digitales para atender cualquier duda de configuración, fallos técnicos o emergencias en
          tiempo real.
        </p>
        <p>
          Número de contacto de soporte en Colombia:{' '}
          <a
            href="tel:+573014123250"
            className="text-[#070707] font-medium underline underline-offset-4 decoration-[#070707]/30 hover:decoration-[#070707] transition-colors"
          >
            +57 301 412 3250
          </a>
        </p>
      </>
    ),
  },
  {
    id: 'auditoria',
    question: '¿Cómo funciona la visita de auditoría GRATIS?',
    answer: (
      <>
        <p className="mb-3">
          Para garantizar que elijas el modelo perfecto, dispondrás de uno de nuestros expertos en un
          sistema de visitas totalmente gratis donde vamos a tu ubicación, miramos la puerta donde
          piensas instalarla, auditamos y vemos la posibilidad de instalación. También llevamos las
          cerraduras que desees para que veas cómo quedarían en tu puerta antes de instalar y las
          compares con total libertad para que tomes una mejor decisión con más información.
        </p>
        <p className="text-[14px] lg:text-[16px] text-[#9a9a9a] italic">
          Solo disponible por el momento en Bogotá y alrededores.
        </p>
      </>
    ),
  },
  {
    id: 'sin-internet',
    question: '¿Sirven sin internet?',
    answer: (
      <p>
        <strong>Sí, funcionan al 100% de forma local.</strong> Los métodos de apertura como huella
        dactilar, reconocimiento facial, lectura de palma, tarjetas físicas y códigos numéricos no
        requieren conexión a internet. La conectividad Wi-Fi solo es necesaria para funciones
        remotas, como ver la cámara en vivo, recibir notificaciones en tu celular o generar claves
        temporales a distancia.
      </p>
    ),
  },
  {
    id: 'compatibilidad',
    question: '¿Cómo sé si en mi puerta sirve?',
    answer: (
      <>
        <p className="mb-4">
          Nuestras cerraduras se adaptan a la gran mayoría de puertas (madera, metal, aluminio,
          seguridad, blindadas). El requisito principal es que la puerta tenga un grosor mínimo de{' '}
          <strong>35 mm a 40 mm</strong>. Para estar completamente seguro, envíanos una foto del
          perfil de tu puerta a nuestra línea de atención y la validaremos de inmediato.
        </p>
        <a
          href="https://wa.me/573014123250"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white rounded-xl text-[15px] font-medium hover:bg-[#1ebe5d] transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Consultar compatibilidad por WhatsApp
        </a>
      </>
    ),
  },
  {
    id: 'agendar',
    question: '¿Cómo agendar una visita o asesorarme mejor?',
    answer: (
      <>
        <p className="mb-4">
          Puedes agendar tu auditoría o recibir asesoría personalizada haciendo clic en el botón de{' '}
          <strong>WhatsApp de Soporte</strong> en nuestra web, o diligenciando el formulario de
          contacto. Un asesor experto se comunicará contigo en menos de 15 minutos para guiarte en
          la visita de auditoría.
        </p>
        <p className="mb-5 text-[14px] lg:text-[16px] text-[#626262]">
          En Bogotá la visita se puede agendar inmediatamente y un asesor se encargará el mismo día.
        </p>
        <a
          href="https://wa.me/573014123250"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white rounded-xl text-[15px] font-medium hover:bg-[#1ebe5d] transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Agendar visita por WhatsApp
        </a>
      </>
    ),
  },
  {
    id: 'puerta-seguridad',
    question: 'Mi puerta es de seguridad, ¿cómo se puede adaptar?',
    answer: (
      <>
        <p className="mb-3">
          Las puertas de seguridad (con láminas de acero internas o pasadores múltiples) requieren un
          trabajo de herrería y perforación especializada. Nuestro equipo técnico cuenta con las
          herramientas de alta precisión necesarias para adaptar el mecanismo de embutir o en su
          defecto las manijas digitales de iShkel sin debilitar ni alterar la estructura blindada
          original de tu puerta.
        </p>
        <p className="text-[14px] lg:text-[16px] text-[#626262]">
          Si estás en Bogotá agenda una visita de auditoría; muchas de estas puertas necesitan un
          mantenimiento previo. Asegúrate antes de instalar — es gratis con iShkel.
        </p>
      </>
    ),
  },
  // --- Section 2 ---
  {
    id: 'anadir-usuarios',
    question: '¿Cómo añadir usuarios?',
    answer: (
      <>
        <div className="mb-4 p-4 bg-[#fafafa] rounded-xl border border-[#ececec] text-[14px] lg:text-[15px] text-[#626262]">
          <strong className="text-[#070707]">Nota de seguridad:</strong> Para realizar cualquiera de
          las siguientes configuraciones, siempre requerirás verificar primero la{' '}
          <strong>Clave Administrador</strong> o la huella maestra configurada inicialmente en el
          dispositivo.
        </div>
        <ol className="list-decimal pl-5 space-y-2 marker:text-[#070707] marker:font-medium">
          <li>Toca la pantalla para encender el panel numérico.</li>
          <li>
            Presiona las teclas <strong>*</strong> y <strong>#</strong> consecutivamente para ingresar
            al menú del sistema.
          </li>
          <li>
            Verifica tu identidad de Administrador (coloca tu huella maestra o digita la clave de
            administrador seguida de <strong># o Tarjeta de Admin siempre debajo del #5</strong>).
          </li>
          <li>
            Selecciona la opción <strong>1: Añadir Usuario</strong> (User Settings).
          </li>
          <li>
            Selecciona el método que deseas registrar: Huella (6 veces), Rostro (secuencia de
            rostro), Clave (2 veces y al final <strong>#</strong>) o Tarjeta (poner debajo del #5 o
            donde dice Card) y sigue las instrucciones por voz de la cerradura.
          </li>
          <li>Sal con asterisco hasta que apague el panel y listo.</li>
        </ol>
      </>
    ),
  },
  {
    id: 'eliminar-usuarios',
    question: '¿Cómo eliminar usuarios?',
    answer: (
      <ol className="list-decimal pl-5 space-y-2 marker:text-[#070707] marker:font-medium">
        <li>
          Ingresa al menú de configuración (<strong>* + # + Verificación de Administrador</strong>).
        </li>
        <li>
          Selecciona la opción <strong>2: Eliminar Usuario</strong> (Delete User).
        </li>
        <li>
          Introduce el número de ID asignado al usuario (ej: 012) o utiliza el método físico que
          deseas borrar (pasa la tarjeta o digita la clave a eliminar).
        </li>
        <li>
          Confirma con la tecla <strong>#</strong>.
        </li>
        <li>Sal con asterisco hasta que apague el panel y listo.</li>
      </ol>
    ),
  },
  {
    id: 'volumen',
    question: '¿Cómo bajar o subir el volumen?',
    answer: (
      <ol className="list-decimal pl-5 space-y-2 marker:text-[#070707] marker:font-medium">
        <li>
          Accede al menú del sistema (<strong>* + # + Administrador</strong>).
        </li>
        <li>
          Selecciona la opción de <strong>Ajustes de Sistema</strong> (usualmente opción 3 o 4 según
          el modelo).
        </li>
        <li>
          En los modelos <strong>Fx Under</strong> y <strong>X | R</strong> debería aparecer como
          opción principal para bajar el volumen — dale a la opción y grádualo a gusto.
        </li>
        <li>
          Si no está, dirígete a la opción 3 y grádualo a gusto.
        </li>
        <li>Selecciona entre los niveles disponibles: Alto, Bajo o Modo Silencio (Mute).</li>
      </ol>
    ),
  },
  {
    id: 'vincular-app',
    question: '¿Cómo añadir al internet / Vincular con la aplicación?',
    answer: (
      <ol className="list-decimal pl-5 space-y-2 marker:text-[#070707] marker:font-medium">
        <li>
          Descarga la aplicación oficial recomendada en tu manual (<strong>Tuya Smart / Smart Life</strong>) y
          asegúrate de que tu celular esté conectado a una red{' '}
          <strong>Wi-Fi de 2.4 GHz</strong> (las redes 5G no son compatibles). Usa alguna red que no
          diga al final «plus» ni «5g».
        </li>
        <li>
          Antes de emparejar, asegúrate de que el router esté cerca del dispositivo.
        </li>
        <li>
          Accede al menú del sistema (<strong>* + # + Administrador</strong>).
        </li>
        <li>
          Busca la opción <strong>&quot;Add Module&quot;</strong> o <strong>&quot;Remote Settings&quot;</strong>. En las
          series <strong>Fx | Under</strong> y <strong>X | R</strong> aparecen en el menú principal.
          En la serie <strong>Fx | Camon</strong>: opción 3 → opción 3. En la serie{' '}
          <strong>F | S</strong>: opción 1 → opción 3. Esto activará el modo emparejamiento.
        </li>
        <li>El panel numérico empezará a parpadear.</li>
        <li>
          En la app presiona <strong>&quot;Añadir dispositivo&quot;</strong> (el <strong>+</strong> en
          la parte superior derecha). Si es la primera vez, acepta todos los permisos que solicite.
        </li>
        <li>
          En el radar de búsqueda debería aparecer la cerradura. Dale click y escribe la clave del
          Wi-Fi (verifica que esté bien digitada).
        </li>
        <li>Espera a que se enlace y listo — ya disfrutarás de las funciones remotas.</li>
      </ol>
    ),
  },
  {
    id: 'apertura-remota',
    question: '¿Cómo abrir remotamente?',
    answer: (
      <>
        <p className="mb-4">
          En las series <strong>S | T</strong>, <strong>F | S</strong> y <strong>X | R</strong>, por
          motivos de alta seguridad, la cerradura no puede abrirse de la nada desde la app. El
          visitante debe <strong>timbrar en la cerradura</strong> (presionando el botón de timbre del
          panel). Esto enviará una notificación emergente en tiempo real a tu celular junto con la
          captura de la cámara; desde la app podrás presionar el botón{' '}
          <strong>&quot;Confirmar Apertura Remota&quot;</strong>.
        </p>
        <p>
          En las series <strong>Fx | Camon</strong> y <strong>Fx | Under</strong>, basta con mantener
          presionado la figura de candado que aparece en la interfaz. Para cerrar, lo mismo.
        </p>
      </>
    ),
  },
  {
    id: 'claves-temporales',
    question: '¿Cómo añadir claves temporales?',
    answer: (
      <p>
        Abre la aplicación vinculada en tu celular, ve a la sección de la cerradura y busca la
        opción <strong>&quot;Claves Temporales&quot;</strong> o <strong>&quot;Temporary Password&quot;</strong>. Puedes
        generar un código aleatorio válido, o programar una clave personalizada con días y horarios
        específicos de inicio y expiración.
      </p>
    ),
  },
  {
    id: 'sensores',
    question: '¿Cómo activar o quitar sensores de proximidad / Sensor de humanos?',
    answer: (
      <ol className="list-decimal pl-5 space-y-2 marker:text-[#070707] marker:font-medium">
        <li>
          Accede al menú del sistema (<strong>* + # + Administrador</strong>).
        </li>
        <li>
          Dirígete a la opción 3. En <strong>Fx | Under</strong>, dirígete a la opción que dice{' '}
          <strong>Body Ind</strong>. Por defecto estará en <strong>H</strong> (detección sensible /
          alta); <strong>L</strong> sería la más baja y <strong>0</strong> anula la detección de
          movimientos.
        </li>
        <li>Sal con asterisco hasta que apague el panel y listo.</li>
      </ol>
    ),
  },
  {
    id: 'bateria',
    question: '¿Cómo quitar y poner la batería a cargar?',
    answer: (
      <ol className="list-decimal pl-5 space-y-2 marker:text-[#070707] marker:font-medium">
        <li>
          En el panel interior de la puerta, retira de forma suave la tapa superior de la cerradura
          (algunos modelos requieren deslizarla hacia arriba, otros tienen tornillos).
        </li>
        <li>Retira el bloque de la batería de litio.</li>
        <li>
          Conecta la batería usando un cable <strong>Tipo-C</strong> convencional. El indicador LED
          cambiará de rojo (cargando) a <strong>verde o azul</strong> (carga completa).
        </li>
        <li>Vuelve a colocarla en su posición original y asegura la tapa.</li>
      </ol>
    ),
  },
  {
    id: 'uso-seguridad',
    question: '¿Cómo usar la cerradura en una puerta de seguridad?',
    answer: (
      <>
        <p className="mb-4">
          Dependiendo de la puerta de seguridad, la parte manual y los cerrojos integrados como el
          nocturno <strong>quedan deshabilitados</strong>, y solo se pueden utilizar de manera digital
          con los botones de apertura y cierre que están dentro de la cerradura.
        </p>
        <p className="mb-4">
          Por temas de facilidad, comodidad y conveniencia,{' '}
          <strong>iShkel recomienda para puertas de seguridad tener dos baterías</strong>. Mientras
          se está cargando una batería, pones la otra y así nunca te quedarás sin poder entrar o
          salir de tu propiedad.
        </p>
        <p className="text-[14px] lg:text-[16px] text-[#9a9a9a] italic">
          Las puertas que los asesores dejen explícitamente configuradas con las funciones manuales
          activas no tendrán ninguna variación en su funcionamiento.
        </p>
      </>
    ),
  },
  {
    id: 'registros-acceso',
    question: '¿Cómo usar los registros de acceso (Huella, Rostro, Tarjeta y Palma)?',
    answer: (
      <ul className="space-y-2">
        <li>
          <strong>Huella:</strong> Coloca la yema del dedo de forma centrada cubriendo todo el
          lector.
        </li>
        <li>
          <strong>Rostro:</strong> Párate frente a la cerradura a una distancia de entre 40 y 80 cm.
          Evita usar gorras o elementos que obstruyan excesivamente las facciones durante el escaneo
          inicial.
        </li>
        <li>
          <strong>Palma:</strong> Eleva tu mano abierta frente a la cámara superior a unos 20 cm de
          distancia de forma pausada.
        </li>
        <li>
          <strong>Tarjeta:</strong> Acerca la tarjeta física directamente sobre el ícono de lectura
          del panel numérico.
        </li>
        <li>
          <strong>Clave:</strong> Digita tu clave y al final siempre digita el numeral{' '}
          <strong>#</strong>.
        </li>
      </ul>
    ),
  },
  {
    id: 'videovigilancia',
    question: '¿Cómo usar la videovigilancia y ver los registros?',
    answer: (
      <>
        <p className="mb-4">
          Dentro de la aplicación móvil, ingresa al módulo de tu cerradura iShkel:
        </p>
        <ul className="space-y-3">
          <li>
            <strong>Videovigilancia:</strong> Presiona la opción{' '}
            <strong>&quot;Cámara de videovigilancia&quot;</strong> o &quot;Video Surveillance&quot; para activar el
            lente gran angular de la mirilla digital y ver qué sucede afuera en tiempo real. Desde
            ahí podrás hablar, escuchar, grabar y abrir remotamente.
          </li>
          <li>
            <strong>Registros de Acceso:</strong> Entra a la sección{' '}
            <strong>&quot;Historial&quot; o &quot;Log&quot;</strong>. Allí se desplegará una lista cronológica exacta
            con fecha, hora y el nombre o ID del usuario que abrió la puerta, además de capturas de
            fotos en caso de intentos fallidos o alertas de seguridad.
          </li>
        </ul>
      </>
    ),
  },
];

/* ---------- Desktop Sidebar ---------- */
function DesktopSidebar({
  activeSection,
  onNavigate,
}: {
  activeSection: string;
  onNavigate: (id: string) => void;
}) {
  const sections = Object.entries(SECTION_LABELS);

  return (
    <aside className="hidden lg:block w-[300px] xl:w-[340px] shrink-0">
      <div className="sticky top-28 pt-10 pl-4 xl:pl-8 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
        <p className="text-[12px] tracking-wide uppercase text-[#9a9a9a] mb-2 font-neue">
          Centro de ayuda
        </p>
        <h2 className="text-[26px] xl:text-[30px] font-medium text-[#070707] mb-6 font-neue tracking-tight">
          iShkel Soporte
        </h2>

        <nav>
          {sections.map(([sectionId, sectionLabel]) => {
            const sectionLinks = SUPPORT_LINKS.filter((l) => l.section === sectionId);
            return (
              <div key={sectionId} className="mb-5">
                <p className="text-[11px] tracking-widest uppercase text-[#9a9a9a] font-neue font-medium mb-2 pl-4">
                  {sectionLabel}
                </p>
                <ul className="space-y-0.5">
                  {sectionLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <li key={link.id}>
                        <button
                          onClick={() => onNavigate(link.id)}
                          className={`relative w-full text-left py-1.5 pl-4 pr-3 rounded-lg text-[14px] xl:text-[15px] font-neue transition-all duration-300 ease-out ${
                            isActive
                              ? 'text-[#070707] font-medium bg-[#f5f5f5]'
                              : 'text-[#626262] hover:text-[#070707] hover:bg-[#fafafa]'
                          }`}
                        >
                          <span
                            className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] rounded-full bg-[#070707] transition-all duration-300 ${
                              isActive ? 'h-4 opacity-100' : 'h-0 opacity-0'
                            }`}
                          />
                          {link.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

/* ---------- Mobile Sticky Tabs ---------- */
function MobileTabs({
  activeSection,
  onNavigate,
}: {
  activeSection: string;
  onNavigate: (id: string) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const activeTab = tabRefs.current[activeSection];
    const scroller = scrollerRef.current;
    if (!activeTab || !scroller) return;

    const tabRect = activeTab.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();
    const offset =
      activeTab.offsetLeft - scroller.offsetLeft - (scrollerRect.width - tabRect.width) / 2;

    scroller.scrollTo({ left: offset, behavior: 'smooth' });
  }, [activeSection]);

  return (
    <div className="lg:hidden sticky top-20 z-40 bg-white/85 backdrop-blur-xl border-b border-[#ececec]">
      <div
        ref={scrollerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-5 py-3"
        style={{ scrollbarWidth: 'none' }}
      >
        {SUPPORT_LINKS.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <button
              key={link.id}
              ref={(el) => {
                tabRefs.current[link.id] = el;
              }}
              onClick={() => onNavigate(link.id)}
              className={`shrink-0 px-4 h-10 rounded-full text-[14px] font-neue font-medium transition-all duration-300 ease-out active:scale-95 ${
                isActive
                  ? 'bg-[#070707] text-white shadow-sm'
                  : 'bg-[#f3f3f3] text-[#626262] hover:bg-[#ececec]'
              }`}
            >
              {link.shortLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- FAQ Content ---------- */
function FAQContent() {
  const sections = Object.entries(SECTION_LABELS);

  return (
    <main className="flex-1 px-5 sm:px-8 lg:px-16 lg:border-l lg:border-[#ececec] lg:pt-16 lg:pb-24">
      <div className="max-w-[720px] mx-auto lg:mx-0">
        <header className="lg:hidden pt-8 pb-6">
          <p className="text-[12px] tracking-wide uppercase text-[#9a9a9a] mb-2 font-neue">
            Centro de ayuda
          </p>
          <h1
            className="text-[34px] sm:text-[38px] font-medium text-[#070707] font-neue tracking-tight leading-[1.1]"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            iShkel Soporte
          </h1>
          <p
            className="mt-3 text-[15px] text-[#626262] font-neue leading-relaxed"
            style={{ textWrap: 'pretty' } as React.CSSProperties}
          >
            Todo lo que necesitas saber sobre tu cerradura inteligente.
          </p>
        </header>

        <div className="pb-16 lg:pb-0">
          {sections.map(([sectionId, sectionLabel], sectionIdx) => {
            const sectionFaqs = FAQS.filter(
              (faq) => SUPPORT_LINKS.find((l) => l.id === faq.id)?.section === sectionId
            );
            return (
              <div key={sectionId} className={sectionIdx > 0 ? 'mt-16 lg:mt-20' : ''}>
                <div className="mb-8 lg:mb-10">
                  <p className="text-[11px] tracking-widest uppercase text-[#9a9a9a] font-neue font-medium mb-2">
                    Sección {sectionIdx + 1}
                  </p>
                  <h2 className="text-[22px] lg:text-[28px] font-medium text-[#070707] font-neue tracking-tight">
                    {sectionLabel}
                  </h2>
                  {sectionIdx === 1 && (
                    <p className="mt-2 text-[14px] lg:text-[15px] text-[#626262] font-neue">
                      Guía paso a paso para configurar y dominar las funciones de tu cerradura
                      inteligente.
                    </p>
                  )}
                  <div className="mt-4 h-px bg-[#ececec]" />
                </div>

                <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                  {sectionFaqs.map((faq, idx) => (
                    <article
                      key={faq.id}
                      id={faq.id}
                      className="scroll-mt-36 lg:scroll-mt-28 rounded-2xl bg-[#fafafa] lg:bg-transparent p-6 sm:p-7 lg:p-0 lg:mb-10"
                      style={{
                        animation: 'fadeUp 0.6s ease-out both',
                        animationDelay: `${idx * 50}ms`,
                      }}
                    >
                      <h3
                        className="text-[20px] sm:text-[22px] lg:text-[28px] xl:text-[32px] font-medium text-[#070707] mb-3 lg:mb-4 leading-[1.25] lg:leading-[1.3] font-neue tracking-tight"
                        style={{ textWrap: 'balance' } as React.CSSProperties}
                      >
                        {faq.question}
                      </h3>
                      <div
                        className="text-[15px] sm:text-[16px] lg:text-[18px] text-[#626262] leading-[1.65] font-neue"
                        style={{ textWrap: 'pretty' } as React.CSSProperties}
                      >
                        {faq.answer}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        :global(.scrollbar-hide::-webkit-scrollbar) {
          display: none;
        }
      `}</style>
    </main>
  );
}

/* ---------- Page ---------- */
export default function SoportePage() {
  const [activeSection, setActiveSection] = useState<string>(SUPPORT_LINKS[0].id);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const isMobile = window.innerWidth < 1024;
    const offset = isMobile ? 160 : 110;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });
  };

  useEffect(() => {
    const ids = SUPPORT_LINKS.map((l) => l.id);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white font-neue antialiased">
      <Navbar />
      <MobileTabs activeSection={activeSection} onNavigate={scrollToSection} />
      <div className="pt-20 lg:pt-24 flex max-w-[1440px] mx-auto">
        <DesktopSidebar activeSection={activeSection} onNavigate={scrollToSection} />
        <FAQContent />
      </div>
      <Footer />
    </div>
  );
}
