# Geek Solution — Rediseño “Centro de Operaciones”

## Objetivo

Rediseñar el sitio de Geek Solution para proyectar confianza empresarial sin perder una personalidad geek reconocible. El sitio debe atender con claridad dos audiencias —nuevos clientes y clientes actuales— y ofrecer varias formas de contacto sin competir entre sí.

La acción comercial principal será “Solicitar asesoría”. WhatsApp funcionará como alternativa inmediata y el Portal de soporte será el acceso permanente para clientes actuales. Teléfono y correo aparecerán como canales secundarios en Contacto y el pie de página.

## Dirección visual

La dirección aprobada es “Centro de operaciones tecnológico”: una interfaz clara y precisa, inspirada en estados de red, tickets y sistemas conectados. El hero será el único momento visualmente intenso; el resto del sitio usará espacios amplios, superficies limpias y jerarquías directas.

### Paleta

- Verde Geek `#00A859`: marca, acciones principales y estados activos.
- Verde eléctrico `#39E58C`: conexiones, detalles y microinteracciones.
- Negro tinta `#0B0F0D`: encabezados y secciones de alto contraste.
- Grafito `#18201C`: superficies oscuras secundarias.
- Blanco frío `#F5F8F6`: fondo principal.
- Gris técnico `#66736C`: textos secundarios.

El verde será un acento medido, no un relleno dominante. Se eliminará el azul/cian actual porque no está conectado con el logotipo existente.

### Tipografía

- Space Grotesk: títulos y mensajes principales.
- Manrope: texto de lectura, navegación y formularios.
- IBM Plex Mono: estados técnicos, etiquetas y datos puntuales.

Las fuentes deberán cargarse con `font-display: swap` y contar con alternativas del sistema. Los encabezados usarán balance de línea para evitar viudas.

### Firma visual

El elemento memorable será un panel de operaciones conectado que muestre Soporte, Redes, Seguridad y Cloud como sistemas activos. Tendrá una animación orquestada al cargar y una versión estática cuando el usuario prefiera movimiento reducido.

## Arquitectura de información

### Navegación global

El encabezado fijo incluirá logotipo, Servicios, Nosotros, Contacto, Portal y una acción destacada “Solicitar asesoría”. En móvil se usará un menú accesible con `aria-expanded`, cierre por Escape y estados de foco visibles.

El pie de página ofrecerá navegación secundaria, teléfono, correo, WhatsApp, ubicación y horario. Todas las páginas incluirán un enlace para saltar al contenido principal.

### Inicio

1. Hero con la promesa “Tecnología que mantiene tu operación funcionando”.
2. Acciones “Solicitar asesoría” y “Hablar por WhatsApp”.
3. Panel de operaciones con los cuatro sistemas principales.
4. Selector visual “¿Qué necesitas resolver?” con los seis servicios.
5. Bloques diferenciados para empresas y hogares.
6. Evidencia de experiencia y compromisos SLA.
7. Proceso de trabajo explicado de forma breve.
8. Llamado final a solicitar una evaluación técnica.

### Servicios

El catálogo permitirá filtrar por necesidad: Soporte, Redes, Seguridad, Cloud, Antivirus y Educación. Los filtros actualizarán la URL para que cada estado pueda compartirse. Cada servicio mostrará el problema que resuelve, la solución ofrecida y el resultado esperado.

### Nosotros

La página combinará historia, experiencia, capacidades, certificaciones declaradas y actividades educativas en una composición editorial. No inventará métricas, clientes ni certificaciones que no estén respaldadas por el contenido del negocio.

### Contacto

El usuario elegirá primero “Empresa” u “Hogar”. La selección se enviará junto al formulario y quedará reflejada visualmente, sin ocultar los canales alternativos.

El formulario incluirá nombre, correo, teléfono opcional, tipo de cliente y mensaje. Tendrá validación accesible, foco en el primer error, estados anunciados mediante `aria-live` y mensajes con un siguiente paso claro. Durante el envío se bloquearán envíos duplicados.

El endpoint `VITE_CONTACT_FORM_ENDPOINT` se inyectará durante la compilación de Docker mediante un argumento de construcción documentado y configurado en Compose/Easypanel.

### Portal de soporte

Será una página breve y funcional para clientes actuales, con acceso principal a Freshdesk, explicación de lo que se puede gestionar y un enlace secundario a Servicios. No se mezclará con el flujo de captación comercial.

### Términos

Los bloques actuales se convertirán en secciones legibles con navegación interna. Se conservará el contenido vigente sin modificar importes o condiciones comerciales.

### Página 404

Las rutas desconocidas mostrarán una página 404 dentro del layout, con opciones para volver al inicio, solicitar ayuda o entrar al portal. En el alojamiento estático la respuesta inicial puede seguir siendo HTTP 200 por el fallback de SPA; la interfaz no redirigirá silenciosamente al inicio.

## Componentes

- `SiteHeader`: navegación, acción comercial y menú móvil.
- `SiteFooter`: canales, ubicación y navegación secundaria.
- `ActionButton`: variantes principal, secundaria y portal.
- `OperationsPanel`: firma visual del hero.
- `ServiceResolver`: accesos y filtros por necesidad.
- `ServiceCard`: problema, solución y resultado.
- `AudienceSelector`: Empresa/Hogar y sincronización con el formulario.
- `ContactForm`: validación, envío y estados accesibles.
- `SectionIntro`: etiqueta, título y descripción compartidos.
- `PageMeta`: título y descripción por ruta.

El contenido empresarial permanecerá centralizado en `siteContent.js`; los metadatos por página podrán mantenerse en un mapa separado para evitar mezclar copy visible con configuración del documento.

## Movimiento y respuesta adaptable

Solo el panel de operaciones tendrá una secuencia de entrada notable. Los demás elementos usarán cambios de opacidad y desplazamientos cortos. No se utilizará `transition: all`.

En pantallas pequeñas, el panel aparecerá después del mensaje principal. WhatsApp y “Solicitar asesoría” se agruparán en una barra inferior respetando `env(safe-area-inset-bottom)`. En escritorio, WhatsApp podrá permanecer como acción flotante.

## Accesibilidad

- Foco visible con `:focus-visible` en todos los controles.
- Contraste AA para texto y controles.
- Etiquetas, `autocomplete`, `aria-invalid` y `aria-describedby` en el formulario.
- Iconos decorativos ocultos para tecnologías de asistencia.
- Dimensiones explícitas en imágenes.
- Compatibilidad con `prefers-reduced-motion`.
- Navegación semántica y jerarquía correcta de encabezados.

## SEO y despliegue

Cada ruta tendrá título y descripción propios. `index.html` incluirá `theme-color`; el documento reflejará el esquema claro predominante. Se conservará el fallback SPA de Nginx y se añadirán cabeceras seguras compatibles con el sitio.

Antes del despliegue se actualizarán las dependencias con vulnerabilidades y se comprobará el resultado con `npm audit`. No se aplicará una actualización automática sin revisar el cambio del lockfile y validar la aplicación.

## Verificación

- ESLint sin errores.
- Compilación de producción correcta.
- Pruebas automatizadas para validación del formulario, selección de audiencia, filtros y ruta 404.
- Prueba manual de navegación por teclado y movimiento reducido.
- Comprobación responsive en móvil, tableta y escritorio.
- Prueba del formulario desde una imagen Docker con endpoint configurado.
- Auditoría final de dependencias y revisión de metadatos por ruta.

## Fuera de alcance

- Rediseñar el logotipo.
- Crear un backend propio o almacenar contactos.
- Integrar autenticación con Freshdesk.
- Inventar testimonios, clientes, métricas o certificaciones.
- Añadir un CMS o panel administrativo.
