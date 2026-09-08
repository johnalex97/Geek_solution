export const navItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Contacto', to: '/contacto' },
  { label: 'Términos', to: '/terminos' },
  { label: 'Portal', to: '/portal-ayuda' },
]

export const pageMeta = {
  '/': {
    title: 'Geek Solution | Soporte, redes y servicios cloud en Honduras',
    description: 'Soluciones de soporte técnico, redes, seguridad y cloud para empresas y hogares en Honduras. Conoce Geek Solution y solicita asesoría.',
  },
  '/servicios': {
    title: 'Servicios tecnológicos | Geek Solution',
    description: 'Explora nuestros servicios de soporte técnico, redes, videovigilancia, antivirus, cloud y educación tecnológica.',
  },
  '/nosotros': {
    title: 'Nosotros | Geek Solution',
    description: 'Conoce a Geek Solution, una pyme hondureña con más de 12 años de experiencia en informática y servicios ejecutados bajo normativas SLA.',
  },
  '/contacto': {
    title: 'Contacto y asesoría | Geek Solution',
    description: 'Cuéntanos qué necesitas resolver. Contacta a Geek Solution en Tegucigalpa por formulario, teléfono, correo o WhatsApp.',
  },
  '/portal-ayuda': {
    title: 'Portal de soporte | Geek Solution',
    description: 'Accede al portal de soporte de Geek Solution para gestionar tus solicitudes y dar seguimiento a tus tickets.',
  },
  '/terminos': {
    title: 'Términos y condiciones | Geek Solution',
    description: 'Consulta las condiciones de ingreso de equipos, diagnóstico, costos, garantía y pagos de los servicios de Geek Solution.',
  },
  '*': {
    title: 'Página no encontrada | Geek Solution',
    description: 'No encontramos esta página. Vuelve al inicio de Geek Solution, contáctanos o accede al portal de soporte.',
  },
}

export const stats = [
  { value: '12+', label: 'años de experiencia en informática' },
  { value: 'SLA', label: 'ejecución con tiempos definidos' },
  { value: '100%', label: 'pyme hondureña' },
]

export const services = [
  {
    slug: 'soporte',
    eyebrow: 'Helpdesk',
    title: 'Soporte técnico general especializado',
    description:
      'Nuestro Geek Squad brinda múltiples servicios generales especializados con profesionales certificados para servir calidad.',
    bullets: ['Helpdesk', 'Reparación de computadores', 'Electricidad residencial'],
  },
  {
    slug: 'redes',
    eyebrow: 'Redes',
    title: 'Implementación, conectividad y cableado estructurado',
    description:
      'Soporte en redes, control de accesos a sitios web, apoyo a departamentos de informática, configuraciones básicas Wi-Fi e instalación de cableado estructurado certificado.',
    bullets: ['Puntos de red', 'Wi-Fi básico', 'Cableado certificado'],
  },
  {
    slug: 'seguridad',
    eyebrow: 'Video Vigilancia',
    title: 'Seguridad física con implementación certificada',
    description:
      'Distribuidores autorizados de equipos de vigilancia HIKVISION con personal certificado en implementación de soluciones de seguridad física.',
    bullets: ['HIKVISION', 'Implementación certificada', 'Seguridad física'],
  },
  {
    slug: 'antivirus',
    eyebrow: 'AntiVirus',
    title: 'Protección para hogares y empresas',
    description:
      'Mantenga segura su información personal con soluciones antivirus. Somos socios de Kaspersky y brindamos protección adaptada a hogares y empresas.',
    bullets: ['Kaspersky', 'Hogares', 'Empresas'],
  },
  {
    slug: 'cloud',
    eyebrow: 'Cloud',
    title: 'Servicios en la nube y administración centralizada',
    description:
      'Optimice recursos mediante servicios cloud, implementación SaaS, respaldos automáticos, administración centralizada y monitoreo de infraestructura tecnológica.',
    bullets: ['SaaS', 'Respaldos automáticos', 'Monitoreo'],
  },
  {
    slug: 'educacion',
    eyebrow: 'Educación',
    title: 'Charlas, talleres y formación tecnológica',
    description:
      'Galería de eventos y charlas de emprendimiento tecnológico en colegios y universidades, con actividades orientadas a desarrollo profesional y tecnología aplicada.',
    bullets: ['Podcast', 'Arduino', 'Robótica'],
  },
]

export const pillars = [
  'Somos una empresa cloud de innovaciones tecnológicas comprometida con brindar soluciones de alto nivel a nuestros clientes.',
  'Ejecutamos servicios en tiempos establecidos bajo normativas SLA, optimizando costos y agregando valor en cada entrega.',
  'Somos especialistas en instalaciones de red y contamos con certificaciones en sistemas de seguridad.',
  'Nuestra experiencia supera los 12 años en el rubro de la informática como PYME 100% hondureña.',
]

export const contactCards = [
  { label: 'Correo', value: 'consultas@geeksolutionhn.com', href: 'mailto:consultas@geeksolutionhn.com' },
  { label: 'Teléfono', value: '+504 2213-0624', href: 'tel:+50422130624' },
  { label: 'WhatsApp', value: '+504 3383-7341', href: 'https://wa.me/50433837341' },
  { label: 'Horario', value: 'Lunes a viernes · 8:00 am a 5:00 pm' },
]

export const termsBlocks = [
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
    items: ['Diagnóstico: L. 900', 'Consultoría local: L. 2,000', 'Consultoría fuera de la ciudad: L. 3,700'],
  },
  {
    title: 'Garantía',
    items: ['1 mes en reparaciones', 'No aplica por daños de terceros', 'Equipos no retirados en 30 días se reciclan'],
  },
  {
    title: 'Pagos',
    items: ['Tarjeta, transferencia y cheque', 'Facturación con CAI', 'Penalización por cheque rebotado: L. 900'],
  },
]

export const educationHighlights = [
  'Podcast de tecnología, emprendimiento y desarrollo profesional',
  'Meeting Pro-Gamers',
  'Charlas de PC de alto rendimiento y eSports',
  'Taller Arduino en UNAH',
  'Coaching en CUTEC',
  'Taller de Robótica en UNITEC',
  'Charlas en Instituto Renacimiento',
]

export const companyProfile = {
  name: 'Geek Solution',
  location: 'Tegucigalpa, Honduras',
  summary:
    'Empresa cloud de innovaciones tecnológicas comprometida con brindar soluciones de alto nivel, ejecutadas bajo normativas SLA, optimizando costos y agregando valor a cada servicio.',
  supportSummary:
    'Departamento Técnico, Oficina Virtual y SAC mediante +504 2213-0624 y +504 3383-7341.',
}

export const operationsSystems = [
  { name: 'Soporte', status: 'Activo', detail: 'Atención técnica y helpdesk' },
  { name: 'Redes', status: 'Activo', detail: 'Conectividad e infraestructura' },
  { name: 'Seguridad', status: 'Activo', detail: 'Videovigilancia y protección' },
  { name: 'Cloud', status: 'Activo', detail: 'Respaldo y administración' },
]

export const audienceContent = [
  {
    name: 'Empresa',
    title: 'Tu equipo necesita seguir trabajando.',
    description: 'Apoyo a tu departamento de informática, redes y administración cloud para la operación de tu empresa.',
    services: 'Helpdesk · Cableado estructurado · Cloud',
  },
  {
    name: 'Hogar',
    title: 'Tu tecnología también es parte de casa.',
    description: 'Soporte para tu computadora, configuración Wi-Fi y protección de tu información personal.',
    services: 'Reparación de equipos · Wi-Fi · Antivirus',
  },
]

export const processSteps = [
  { title: 'Cuéntanos qué ocurre', description: 'Recibimos tu consulta por formulario, WhatsApp, teléfono o correo.' },
  { title: 'Evaluamos la solución', description: 'Definimos alcance, prioridad y el canal de atención adecuado.' },
  { title: 'Ponemos la solución en marcha', description: 'Ejecutamos el servicio y mantenemos comunicación durante el proceso.' },
]
