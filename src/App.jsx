import { useState } from 'react'
import './App.css'

const navigation = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Helpdesk', href: '#helpdesk' },
  { label: 'Redes y Software', href: '#redes-software' },
  { label: 'Educación', href: '#educacion' },
  { label: 'Contáctenos', href: '#contacto' },
]

const serviceCards = [
  {
    title: 'Helpdesk y soporte técnico',
    description:
      'Atención técnica especializada, diagnóstico, continuidad operativa y resolución ágil para usuarios y empresas.',
    icon: 'support',
  },
  {
    title: 'Redes y cableado estructurado',
    description:
      'Instalación de puntos de red, configuración WiFi y despliegues certificados para infraestructura estable.',
    icon: 'network',
  },
  {
    title: 'Seguridad y videovigilancia',
    description:
      'Implementación de soluciones HIKVISION, control visual y seguridad física con personal certificado.',
    icon: 'shield',
  },
  {
    title: 'Antivirus empresarial',
    description:
      'Protección de equipos y datos con soluciones Kaspersky adaptadas a hogares, pymes y operación corporativa.',
    icon: 'lock',
  },
  {
    title: 'Servicios en la nube',
    description:
      'SaaS, respaldos automáticos, administración centralizada y monitoreo de infraestructura tecnológica.',
    icon: 'cloud',
  },
  {
    title: 'Educación tecnológica',
    description:
      'Charlas, talleres y eventos de emprendimiento, robótica y alto rendimiento para instituciones educativas.',
    icon: 'academy',
  },
]

const networkServices = [
  {
    title: 'Redes',
    copy:
      'Soporte en redes, control de accesos web, apoyo al departamento de informática, puntos de red, WiFi básico y cableado estructurado certificado.',
  },
  {
    title: 'Vídeo Vigilancia',
    copy:
      'Distribuidores autorizados de HIKVISION con personal certificado en implementación de soluciones de seguridad física.',
  },
  {
    title: 'AntiVirus',
    copy:
      'Soluciones antivirus para proteger información personal y empresarial, con respaldo comercial de Kaspersky.',
  },
  {
    title: 'Servicios en la Nube',
    copy:
      'Optimización de recursos mediante cloud, SaaS, respaldos automáticos, gestión centralizada y monitoreo.',
  },
]

const helpdeskServices = [
  'Instalación, mantenimiento y reparación de electricidad residencial',
  'Reparación de computadores',
]

const educationItems = [
  'Podcast de tecnología, emprendimiento y desarrollo profesional',
  'Meeting Pro-Gamers',
  'Charlas de PC de alto rendimiento y eSports',
  'Taller Arduino en UNAH',
  'Coaching en CUTEC',
  'Taller de Robótica en UNITEC',
  'Charlas en Instituto Renacimiento',
]

const termsBlocks = [
  {
    title: 'Ingreso de equipos',
    items: [
      'Ticket obligatorio para recepción',
      'Tiempo de revisión de hasta 4 días',
      'No hay responsabilidad por configuraciones personales',
      'El respaldo de información es responsabilidad del cliente',
    ],
  },
  {
    title: 'Costos',
    items: [
      'Diagnóstico: L. 900',
      'Consultoría local: L. 2,000',
      'Consultoría fuera de la ciudad: L. 3,700',
    ],
  },
  {
    title: 'Garantía',
    items: [
      '1 mes en reparaciones',
      'No aplica por daños de terceros',
      'Equipos no retirados en 30 días se reciclan',
    ],
  },
  {
    title: 'Pagos',
    items: [
      'Tarjeta, transferencia y cheque',
      'Facturación con CAI',
      'Penalización por cheque rebotado: L. 900',
    ],
  },
]

const metrics = [
  { value: '12+', label: 'Años en el área tecnológica' },
  { value: 'SLA', label: 'Atención con tiempos establecidos' },
  { value: '100%', label: 'PYME hondureña' },
]

const contactDetails = [
  { label: 'Correo', value: 'consultas@geeksolutionhn.com', href: 'mailto:consultas@geeksolutionhn.com' },
  { label: 'WhatsApp', value: '+504 3383-7341', href: 'https://wa.me/50433837341' },
  { label: 'Teléfono', value: '+504 2213-0624', href: 'tel:+50422130624' },
  { label: 'Horario', value: 'Lunes a viernes de 8:00 am a 5:00 pm' },
]

function Icon({ name }) {
  const icons = {
    support: <path d="M12 4a8 8 0 0 0-8 8v2a2 2 0 0 0 2 2h1v-5H5.08A7 7 0 0 1 19 11h-1.92v5H18a2 2 0 0 0 2-2v-2a8 8 0 0 0-8-8Zm-2 10v2a2 2 0 0 0 2 2h1" />,
    network: <path d="M4 6h6v4H4V6Zm10 0h6v4h-6V6ZM9 14h6v4H9v-4ZM7 10v2m10-2v2m-5 0v2m-5 0h10" />,
    shield: <path d="M12 3 5 6v6c0 4.2 2.7 7.8 7 9 4.3-1.2 7-4.8 7-9V6l-7-3Zm-2 9 1.5 1.5L15 10" />,
    lock: <path d="M8 10V8a4 4 0 1 1 8 0v2m-9 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />,
    cloud: <path d="M7 18h9a4 4 0 0 0 .4-7.98A5.5 5.5 0 0 0 6 11.5 3.5 3.5 0 0 0 7 18Zm5-8v7m0 0-2.5-2.5M12 17l2.5-2.5" />,
    academy: <path d="m3 9 9-5 9 5-9 5-9-5Zm3 3.5v4.5c0 .6 2.7 2 6 2s6-1.4 6-2v-4.5" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    globe: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 0c2.2 2.4 3.5 5.6 3.5 9S14.2 18.6 12 21m0-18C9.8 5.4 8.5 8.6 8.5 12s1.3 6.6 3.5 9m-8-9h16" />,
    file: <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M9 13h6M9 17h6" />,
    whatsapp: <path d="M20 11.5a8 8 0 0 1-11.8 7l-4.2 1 1.1-4A8 8 0 1 1 20 11.5Zm-11-3.1c-.2-.4-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.4-1.1 1.1-1.1 2.7s1.1 3.1 1.3 3.3c.2.2 2.1 3.3 5.1 4.4 2.5.9 3 .7 3.5.7.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.1-1.3-.1-.1-.4-.2-.9-.4-.4-.2-1-.5-1.2-.6-.2-.1-.4-.1-.6.1-.2.2-.7.9-.8 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.6-.9-.8-1.5-1.9-1.7-2.2-.2-.3 0-.4.1-.6.1-.1.2-.3.3-.4.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6 0-.1-.5-1.2-.8-1.7Z" />,
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#inicio" onClick={closeMenu}>
            <span className="brand-mark">GS</span>
            <span>
              <strong>Geek Solution</strong>
              <small>Tegucigalpa, Honduras</small>
            </span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={isMenuOpen}
            aria-label="Abrir menú"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <Icon name={isMenuOpen ? 'close' : 'menu'} />
          </button>

          <nav className={`site-nav ${isMenuOpen ? 'is-open' : ''}`}>
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
            <a className="button button-primary button-sm" href="#portal-ayuda" onClick={closeMenu}>
              Portal de Ayuda
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">Soporte técnico, redes, seguridad y nube</div>
              <h1>Soluciones tecnológicas empresariales con imagen moderna y confianza real.</h1>
              <p className="hero-text">
                Geek Solution es una empresa de innovaciones tecnológicas comprometida con brindar
                soluciones de alto nivel, ejecutadas bajo normativas SLA, optimizando costos y
                agregando valor a cada servicio.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contacto">
                  Solicitar asesoría
                  <Icon name="arrow" />
                </a>
                <a className="button button-secondary" href="#redes-software">
                  Explorar soluciones
                </a>
              </div>

              <div className="hero-metrics">
                {metrics.map((metric) => (
                  <article key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className="hero-panel">
              <div className="panel-glow" />
              <div className="hero-card hero-card-primary">
                <span className="card-tag">Sobre Nosotros</span>
                <h2>Especialistas en instalaciones de red y sistemas de seguridad.</h2>
                <p>
                  Más de 12 años de experiencia en informática respaldan una propuesta visual más
                  profesional para presentar soporte, infraestructura y continuidad empresarial.
                </p>
              </div>
              <div className="hero-card hero-card-secondary">
                <div>
                  <span>Sector</span>
                  <strong>Servicios y tecnologías de la información</strong>
                </div>
                <div>
                  <span>Ubicación</span>
                  <strong>Tegucigalpa, Honduras</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="servicios">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Servicios Generales</span>
              <h2>Estructura empresarial clara, moderna y preparada para seguir ampliándose.</h2>
              <p>
                Se conserva la lógica del sitio original, pero con mejor jerarquía visual, tarjetas
                más sólidas y una narrativa corporativa orientada a empresas.
              </p>
            </div>

            <div className="services-grid">
              {serviceCards.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className="service-icon">
                    <Icon name={service.icon} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section alternate-section" id="helpdesk">
          <div className="container split-grid">
            <div className="content-card">
              <span className="eyebrow">Helpdesk</span>
              <h2>Nuestro Geek Squad brinda múltiples servicios generales especializados.</h2>
              <p>
                Profesionales certificados para servir con calidad, soporte técnico y atención
                orientada a continuidad operativa.
              </p>
            </div>

            <div className="list-card">
              {helpdeskServices.map((item) => (
                <article className="list-row" key={item}>
                  <span className="highlight-dot" />
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="redes-software">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Redes y Software</span>
              <h2>Infraestructura, seguridad y operación digital bajo una sola presentación.</h2>
              <p>
                El contenido fue reorganizado como un bloque corporativo que comunica mejor soporte,
                videovigilancia, antivirus y servicios cloud.
              </p>
            </div>

            <div className="solutions-grid">
              {networkServices.map((item) => (
                <article className="solution-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about-section" id="nosotros">
          <div className="container about-grid">
            <div className="about-panel">
              <span className="eyebrow">Nuestra Empresa</span>
              <h2>Empresa cloud de innovaciones tecnológicas orientada a valor, tiempos y confianza.</h2>
              <p>
                Somos una PYME 100% hondureña comprometida con soluciones de alto nivel, ejecutadas en
                tiempos establecidos bajo normativas SLA, optimizando costos y agregando valor a cada
                uno de nuestros servicios.
              </p>
            </div>

            <div className="about-highlights">
              <article className="highlight-item">
                <span className="highlight-dot" />
                <p>Especialistas en instalaciones de red y sistemas de seguridad certificados.</p>
              </article>
              <article className="highlight-item">
                <span className="highlight-dot" />
                <p>Más de 12 años de experiencia en el rubro de la informática.</p>
              </article>
              <article className="highlight-item">
                <span className="highlight-dot" />
                <p>Modelo visual corporativo 2026: limpio, tecnológico y listo para escalar.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="educacion">
          <div className="container split-grid">
            <div className="content-card">
              <span className="eyebrow">Educación</span>
              <h2>Eventos, charlas y actividades para impulsar emprendimiento tecnológico.</h2>
              <p>
                La sección de educación ahora se presenta como una agenda institucional más ordenada,
                útil para seguir agregando galerías, fotos o videos.
              </p>
            </div>
            <div className="education-grid">
              {educationItems.map((item) => (
                <article className="education-item" key={item}>
                  <Icon name="academy" />
                  <span>{item}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section alternate-section" id="portal-ayuda">
          <div className="container portal-grid">
            <div className="portal-card">
              <Icon name="globe" />
              <span className="eyebrow">Portal de Ayuda</span>
              <h2>Soporte técnico con acceso corporativo y enfoque en continuidad del servicio.</h2>
              <p>
                Garantizamos continuidad, disponibilidad y calidad del servicio. Esta sección queda
                preparada para conectar un portal de asistencia real.
              </p>
              <a className="button button-primary" href="#contacto">
                Acceso a portal de asistencia
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="terminos">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Términos y Condiciones</span>
              <h2>Información esencial presentada en una estructura más legible y profesional.</h2>
            </div>

            <div className="terms-grid">
              {termsBlocks.map((block) => (
                <article className="terms-card" key={block.title}>
                  <div className="terms-head">
                    <Icon name="file" />
                    <h3>{block.title}</h3>
                  </div>
                  <div className="terms-list">
                    {block.items.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contacto">
          <div className="container contact-grid">
            <div className="contact-copy">
              <span className="eyebrow">Contáctenos</span>
              <h2>Canales claros para consultas, soporte y nuevas oportunidades comerciales.</h2>
              <p>
                Si tienes alguna consulta puedes escribirnos o llamarnos. El bloque ya incluye un
                formulario visual y accesos rápidos a correo, WhatsApp y teléfono.
              </p>
              <div className="contact-list">
                {contactDetails.map((item) => (
                  <article key={item.label}>
                    <span>{item.label}</span>
                    {item.href ? (
                      <strong>
                        <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                          {item.value}
                        </a>
                      </strong>
                    ) : (
                      <strong>{item.value}</strong>
                    )}
                  </article>
                ))}
              </div>
            </div>

            <form className="contact-card">
              <h3>Formulario de contacto</h3>
              <p>Base lista para conectar envío real por correo, backend o CRM.</p>
              <label>
                Nombre
                <input type="text" name="name" placeholder="Tu nombre" />
              </label>
              <label>
                Correo
                <input type="email" name="email" placeholder="tu@empresa.com" />
              </label>
              <label>
                Mensaje
                <textarea name="message" rows="5" placeholder="Cuéntanos qué solución necesitas" />
              </label>
              <div className="contact-actions">
                <button className="button button-primary" type="submit">
                  Enviar consulta
                </button>
                <a className="button button-secondary" href="https://wa.me/50433837341" target="_blank" rel="noreferrer">
                  WhatsApp directo
                </a>
              </div>
              <div className="contact-note">
                Departamento Técnico · Oficina Virtual · SAC: +504 2213-0624 / +504 3383-7341
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <div>
            <strong>Geek Solution</strong>
            <p>Departamento Técnico · Oficina Virtual · SAC: +504 2213-0624 / +504 3383-7341</p>
          </div>
          <div className="footer-links">
            <a href="#inicio">Inicio</a>
            <a href="#portal-ayuda">Portal de Ayuda</a>
            <a href="#terminos">Términos y Condiciones</a>
            <a href="mailto:consultas@geeksolutionhn.com">consultas@geeksolutionhn.com</a>
          </div>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href="https://wa.me/50433837341"
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <Icon name="whatsapp" />
      </a>
    </div>
  )
}

export default App
