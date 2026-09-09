# Geek Solution “Centro de Operaciones” Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar el sitio actual en una experiencia moderna de “Centro de Operaciones” que atienda nuevos clientes y clientes actuales mediante asesoría, WhatsApp, teléfono, correo y Freshdesk.

**Architecture:** Mantener React, Vite y Tailwind, reemplazando el tema azul claro/oscuro por un sistema visual verde, claro y de contraste oscuro estratégico. Separar layout, metadatos, panel operativo, catálogo de servicios y formulario en componentes enfocados; mantener el contenido empresarial como datos centralizados y sincronizar filtros relevantes con la URL.

**Tech Stack:** React 19, React Router 7, Vite 8, Tailwind CSS 4, Motion, Vitest, Testing Library, Docker y Nginx.

**Spec:** `docs/superpowers/specs/2026-09-07-geek-solution-redesign-design.md`

## Global Constraints

- Paleta: Verde Geek `#00A859`, Verde eléctrico `#39E58C`, Negro tinta `#0B0F0D`, Grafito `#18201C`, Blanco frío `#F5F8F6` y Gris técnico `#66736C`.
- Tipografías: Space Grotesk para títulos, Manrope para texto e IBM Plex Mono para estados y datos.
- Acción comercial principal: “Solicitar asesoría”; WhatsApp es alternativa inmediata; Portal es acceso permanente para clientes actuales.
- No rediseñar el logotipo ni inventar testimonios, clientes, métricas o certificaciones.
- Respetar `prefers-reduced-motion`, foco visible, contraste AA, HTML semántico y navegación por teclado.
- Mantener React, Vite, Tailwind, Motion, Docker y Nginx; no añadir CMS, backend ni autenticación.
- El formulario usa `VITE_WEB3FORMS_ACCESS_KEY` y debe funcionar en la imagen Docker mediante argumento de compilación.

---

## File Structure

### Create

- `src/test/setup.js`: extensiones de Testing Library para Vitest.
- `src/components/layout/SiteHeader.jsx`: navegación de escritorio y móvil.
- `src/components/layout/SiteFooter.jsx`: canales y navegación secundaria.
- `src/components/layout/MobileActionBar.jsx`: acciones móviles con safe area.
- `src/components/PageMeta.jsx`: título, descripción y `theme-color` por ruta.
- `src/components/ActionButton.jsx`: estilos de enlaces y botones por variante.
- `src/components/OperationsPanel.jsx`: firma visual del hero.
- `src/components/ServiceResolver.jsx`: accesos por necesidad en Inicio.
- `src/components/ServiceCatalog.jsx`: filtros de Servicios sincronizados con URL.
- `src/components/AudienceSelector.jsx`: selector Empresa/Hogar.
- `src/components/ContactForm.jsx`: validación y envío del formulario.
- `src/pages/NotFoundPage.jsx`: estado 404 dentro del layout.
- `src/utils/contactForm.js`: validación y creación del payload.
- `src/utils/contactForm.test.js`: pruebas unitarias del formulario.
- `src/components/ServiceCatalog.test.jsx`: prueba de filtros y URL.
- `src/components/AudienceSelector.test.jsx`: prueba accesible del selector.
- `src/pages/NotFoundPage.test.jsx`: prueba de la página 404.

### Modify

- `package.json`: scripts de pruebas y dependencias de desarrollo.
- `vite.config.js`: configuración de Vitest.
- `src/index.css`: tokens, fuentes, foco, movimiento reducido y utilidades del nuevo diseño.
- `src/components/ui.jsx`: iconos decorativos accesibles y `SectionIntro`.
- `src/components/motion.js`: variantes compatibles con movimiento reducido.
- `src/components/SiteLayout.jsx`: composición del nuevo layout.
- `src/main.jsx`: retirar el proveedor de tema.
- `src/App.jsx`: ruta 404 real.
- `src/data/siteContent.js`: datos de servicios, audiencias, proceso y metadatos.
- `src/pages/HomePage.jsx`: nueva portada.
- `src/pages/ServicesPage.jsx`: catálogo filtrable.
- `src/pages/AboutPage.jsx`: composición editorial.
- `src/pages/ContactPage.jsx`: composición con selector y formulario separados.
- `src/pages/PortalPage.jsx`: acceso dedicado a Freshdesk.
- `src/pages/TermsPage.jsx`: navegación interna por secciones.
- `index.html`: tema, fuentes y metadatos base.
- `Dockerfile`: argumento del endpoint de contacto.
- `docker-compose.yml`: argumento de compilación.
- `.env.example`: valor documentado para compilación.
- `nginx.conf`: cabeceras y caché.
- `README.md`: desarrollo, pruebas y despliegue.

### Delete

- `src/components/theme.jsx`: retirar al final, cuando ninguna página dependa del selector global claro/oscuro.
- `src/assets/react.svg`, `src/assets/vite.svg`: recursos del starter de Vite sin referencias.

---

### Task 1: Test Harness and Dependency Baseline

**Files:**
- Modify: `package.json`
- Modify: `vite.config.js`
- Create: `src/test/setup.js`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: comando `npm test -- --run`; entorno `jsdom`; matchers de `@testing-library/jest-dom`.
- Consumes: configuración existente de Vite y React.

- [ ] **Step 1: Add test dependencies and compatible security updates**

Run:

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm audit fix
```

Expected: `package.json` and `package-lock.json` change; no forced major downgrade.

- [ ] **Step 2: Add the test script**

Add to `scripts` in `package.json`:

```json
"test": "vitest"
```

- [ ] **Step 3: Configure Vitest**

Update `vite.config.js`:

```js
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
    passWithNoTests: true,
  },
})
```

Create `src/test/setup.js`:

```js
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 4: Verify the harness**

Run: `npm test -- --run`

Expected: Vitest exits successfully with “No test files found” only if configured to pass with no tests; otherwise continue immediately to Task 2 before using the full-suite gate.

- [ ] **Step 5: Commit the baseline**

```bash
git add package.json package-lock.json vite.config.js src/test/setup.js
git commit -m "test: add frontend test harness"
```

If Git identity remains unavailable, record the commit boundary in the task log and continue without changing global Git configuration.

---

### Task 2: Contact Domain Logic

**Files:**
- Create: `src/utils/contactForm.js`
- Create: `src/utils/contactForm.test.js`

**Interfaces:**
- Produces: `validateContactForm(formData) -> Record<string, string>`.
- Produces: `createContactPayload(formData) -> { name, email, phone, audience, message, source }`.
- Consumes: fields `{ name, email, phone, audience, message, website }`.

- [ ] **Step 1: Write failing validation tests**

Create `src/utils/contactForm.test.js`:

```js
import { describe, expect, it } from 'vitest'
import { createContactPayload, validateContactForm } from './contactForm.js'

describe('validateContactForm', () => {
  it('requires name, email, audience and message', () => {
    expect(validateContactForm({ name: '', email: '', audience: '', message: '' })).toEqual({
      name: 'Ingresa tu nombre.',
      email: 'Ingresa un correo válido.',
      audience: 'Selecciona si buscas ayuda para una empresa o un hogar.',
      message: 'Cuéntanos qué necesitas resolver.',
    })
  })

  it('rejects an invalid email', () => {
    expect(validateContactForm({ name: 'Ana', email: 'ana', audience: 'empresa', message: 'Redes' })).toEqual({
      email: 'Ingresa un correo válido.',
    })
  })
})

describe('createContactPayload', () => {
  it('trims values and includes the audience', () => {
    expect(createContactPayload({
      name: ' Ana ', email: ' ana@example.com ', phone: ' 9999 ', audience: 'empresa', message: ' Redes ',
    })).toEqual({
      name: 'Ana', email: 'ana@example.com', phone: '9999', audience: 'empresa', message: 'Redes',
      source: 'Sitio web Geek Solution',
    })
  })
})
```

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- --run src/utils/contactForm.test.js`

Expected: FAIL because `contactForm.js` does not exist.

- [ ] **Step 3: Implement the pure functions**

Create `src/utils/contactForm.js`:

```js
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(formData) {
  const errors = {}
  if (!formData.name?.trim()) errors.name = 'Ingresa tu nombre.'
  if (!emailPattern.test(formData.email?.trim() ?? '')) errors.email = 'Ingresa un correo válido.'
  if (!['empresa', 'hogar'].includes(formData.audience)) {
    errors.audience = 'Selecciona si buscas ayuda para una empresa o un hogar.'
  }
  if (!formData.message?.trim()) errors.message = 'Cuéntanos qué necesitas resolver.'
  return errors
}

export function createContactPayload(formData) {
  return {
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    audience: formData.audience,
    message: formData.message.trim(),
    source: 'Sitio web Geek Solution',
  }
}
```

- [ ] **Step 4: Verify passing tests**

Run: `npm test -- --run src/utils/contactForm.test.js`

Expected: 3 tests pass.

- [ ] **Step 5: Commit contact logic**

```bash
git add src/utils/contactForm.js src/utils/contactForm.test.js
git commit -m "test: define contact form behavior"
```

---

### Task 3: Visual Foundation and Shared Primitives

**Files:**
- Modify: `src/index.css`
- Modify: `index.html`
- Modify: `src/components/ui.jsx`
- Modify: `src/components/motion.js`
- Create: `src/components/ActionButton.jsx`
- Modify: `src/components/theme.jsx` (compatibilidad temporal)

**Interfaces:**
- Produces: CSS variables `--geek-green`, `--signal-green`, `--ink`, `--graphite`, `--paper`, `--technical-gray`.
- Produces: `ActionButton({ to, href, variant, children, className })`.
- Produces: `SectionIntro({ eyebrow, title, description, align })`.
- Produces: `useRevealMotion()` returning Motion props with reduced-motion support.

- [ ] **Step 1: Replace theme tokens and global interaction rules**

Replace the theme-specific rules in `src/index.css` with:

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Manrope", sans-serif;
  --font-display: "Space Grotesk", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
}

:root {
  color-scheme: light;
  --geek-green: #00a859;
  --signal-green: #39e58c;
  --ink: #0b0f0d;
  --graphite: #18201c;
  --paper: #f5f8f6;
  --technical-gray: #66736c;
}

html { scroll-behavior: smooth; }
body { margin: 0; min-width: 320px; overflow-x: hidden; background: var(--paper); color: var(--ink); }
* { box-sizing: border-box; }
:focus-visible { outline: 3px solid var(--signal-green); outline-offset: 3px; }
[id] { scroll-margin-top: 7rem; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}
```

- [ ] **Step 2: Update document metadata and font connection**

Add inside `index.html` `<head>`:

```html
<meta name="theme-color" content="#F5F8F6" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

- [ ] **Step 3: Add accessible primitives**

In `ui.jsx`, add `aria-hidden="true"` and `focusable="false"` to every decorative SVG. Export:

```jsx
export function SectionIntro({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''
  return (
    <div className={`max-w-3xl ${alignment}`}>
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--geek-green)]">{eyebrow}</p>
      <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-pretty leading-8 text-[var(--technical-gray)]">{description}</p> : null}
    </div>
  )
}
```

- [ ] **Step 4: Create ActionButton and reduced-motion reveal**

Create `ActionButton.jsx`:

```jsx
import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-[var(--geek-green)] text-white hover:bg-[#008f4c] active:translate-y-px',
  secondary: 'border border-black/15 bg-white text-[var(--ink)] hover:border-[var(--geek-green)] hover:text-[var(--geek-green)]',
  portal: 'bg-[var(--ink)] text-white hover:bg-[var(--graphite)]',
}

export function ActionButton({ to, href, variant = 'primary', className = '', children, ...props }) {
  const classes = `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-[transform,background-color,border-color,color] ${variants[variant]} ${className}`
  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>
  if (href) return <a href={href} className={classes} {...props}>{children}</a>
  return <button className={classes} {...props}>{children}</button>
}
```

Update `motion.js`:

Update `motion.js`:

```js
import { motion, useReducedMotion } from 'motion/react'

export function useRevealMotion() {
  const reduceMotion = useReducedMotion()
  return reduceMotion
    ? { initial: false }
    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.55 } }
}

export const MotionDiv = motion.div
export const MotionArticle = motion.article
export const MotionSection = motion.section
```

- [ ] **Step 5: Keep temporary theme compatibility while pages migrate**

Keep `ThemeProvider` active until Task 9 because the untouched pages still consume `useTheme`. Add this temporary suppression directly before the hook export so the baseline linter can pass:

```jsx
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
```

Remove both the provider and this file in Task 9 after all pages have migrated.

- [ ] **Step 6: Verify foundation**

Run, as separate commands:

```bash
npm run lint
npm run build
```

Expected: both commands exit 0; legacy pages continue rendering through the temporary provider.

- [ ] **Step 7: Commit foundation**

```bash
git add src/index.css index.html src/components/ui.jsx src/components/motion.js src/components/ActionButton.jsx src/components/theme.jsx
git commit -m "feat: establish Geek operations design system"
```

---

### Task 4: Global Layout, Metadata and 404

**Files:**
- Create: `src/components/layout/SiteHeader.jsx`
- Create: `src/components/layout/SiteFooter.jsx`
- Create: `src/components/layout/MobileActionBar.jsx`
- Create: `src/components/PageMeta.jsx`
- Modify: `src/components/SiteLayout.jsx`
- Create: `src/pages/NotFoundPage.jsx`
- Create: `src/pages/NotFoundPage.test.jsx`
- Modify: `src/App.jsx`
- Modify: `src/data/siteContent.js`

**Interfaces:**
- Produces: `pageMeta[pathname] = { title, description }`.
- Produces: `PageMeta({ title, description })` updating `document.title` and description meta.
- Produces: layout with `<a href="#main-content">Saltar al contenido</a>` and a single `<main id="main-content">` per page.

- [ ] **Step 1: Write failing 404 test**

Create `src/pages/NotFoundPage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import NotFoundPage from './NotFoundPage.jsx'

describe('NotFoundPage', () => {
  it('offers recovery routes', () => {
    render(<MemoryRouter><NotFoundPage /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: /página no encontrada/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /volver al inicio/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /portal de soporte/i })).toHaveAttribute('href', '/portal-ayuda')
  })
})
```

- [ ] **Step 2: Run the 404 test and verify failure**

Run: `npm test -- --run src/pages/NotFoundPage.test.jsx`

Expected: FAIL because `NotFoundPage.jsx` does not exist.

- [ ] **Step 3: Implement metadata and layout components**

Create `PageMeta.jsx`:

```jsx
import { useEffect } from 'react'

export default function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = title
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.append(meta)
    }
    meta.content = description
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#F5F8F6')
  }, [title, description])
  return null
}
```

Build `SiteHeader` with semantic navigation, accurate `aria-expanded`, `aria-controls="mobile-navigation"`, Escape handling and a label that alternates between “Abrir menú” and “Cerrar menú”. Build the footer and mobile action bar from `companyProfile` and `navItems`.

- [ ] **Step 4: Compose SiteLayout**

Use this landmark structure:

```jsx
<div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
  <a href="#main-content" className="sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Saltar al contenido</a>
  <SiteHeader />
  <Outlet />
  <SiteFooter />
  <MobileActionBar />
</div>
```

Each page owns `<main id="main-content">`; never nest a second `<main>` inside the layout.

- [ ] **Step 5: Implement and route the 404 page**

Replace the wildcard redirect in `App.jsx` with:

```jsx
<Route path="*" element={<NotFoundPage />} />
```

The page must include the heading “Página no encontrada”, explanatory copy and links to Inicio, Contacto and Portal.

- [ ] **Step 6: Verify layout behavior**

Run:

```bash
npm test -- --run src/pages/NotFoundPage.test.jsx
npm run lint
npm run build
```

Expected: test passes; lint and build exit 0.

- [ ] **Step 7: Commit global shell**

```bash
git add src/components/layout src/components/PageMeta.jsx src/components/SiteLayout.jsx src/pages/NotFoundPage.jsx src/pages/NotFoundPage.test.jsx src/App.jsx src/data/siteContent.js
git commit -m "feat: rebuild navigation and route recovery"
```

---

### Task 5: Operations Hero and Home Page

**Files:**
- Create: `src/components/OperationsPanel.jsx`
- Create: `src/components/ServiceResolver.jsx`
- Modify: `src/pages/HomePage.jsx`
- Modify: `src/data/siteContent.js`

**Interfaces:**
- Produces: `OperationsPanel({ systems })`, where each system is `{ name, status, detail }`.
- Produces: `ServiceResolver({ services })`, linking every service to `/servicios?categoria=<slug>`.
- Consumes: `services`, `companyProfile`, `operationsSystems`, `audienceContent`, `processSteps`.

- [ ] **Step 1: Extend business data**

Add:

```js
export const operationsSystems = [
  { name: 'Soporte', status: 'Activo', detail: 'Atención técnica y helpdesk' },
  { name: 'Redes', status: 'Activo', detail: 'Conectividad e infraestructura' },
  { name: 'Seguridad', status: 'Activo', detail: 'Videovigilancia y protección' },
  { name: 'Cloud', status: 'Activo', detail: 'Respaldo y administración' },
]

export const processSteps = [
  { title: 'Cuéntanos qué ocurre', description: 'Recibimos tu consulta por formulario, WhatsApp, teléfono o correo.' },
  { title: 'Evaluamos la solución', description: 'Definimos alcance, prioridad y el canal de atención adecuado.' },
  { title: 'Ponemos la solución en marcha', description: 'Ejecutamos el servicio y mantenemos comunicación durante el proceso.' },
]
```

- [ ] **Step 2: Build the operations panel**

Render a dark `section` with accessible status text, SVG connection lines marked `aria-hidden="true"`, and Motion entry driven by `useReducedMotion`. Do not animate continuously; the status dots remain static after entry.

- [ ] **Step 3: Build the resolver**

Render a semantic list of six links. Derive slugs explicitly in `siteContent.js` (`soporte`, `redes`, `seguridad`, `cloud`, `antivirus`, `educacion`) rather than from display text.

- [ ] **Step 4: Recompose HomePage**

Use this order: hero, resolver, Empresa/Hogar split, experience/SLA, three-step process and final CTA. The hero copy is:

```text
Tecnología que mantiene tu operación funcionando.
Soporte, redes, seguridad y nube para hogares y empresas en Honduras.
```

Use `ActionButton` for “Solicitar asesoría” and “Hablar por WhatsApp”. Add `PageMeta` with a home-specific title and description.

- [ ] **Step 5: Verify home**

Run, as separate commands:

```bash
npm run lint
npm run build
```

Expected: both exit 0; output contains no missing-import error.

- [ ] **Step 6: Commit home redesign**

```bash
git add src/components/OperationsPanel.jsx src/components/ServiceResolver.jsx src/pages/HomePage.jsx src/data/siteContent.js
git commit -m "feat: create operations-focused home page"
```

---

### Task 6: Filterable Service Catalog

**Files:**
- Create: `src/components/ServiceCatalog.jsx`
- Create: `src/components/ServiceCatalog.test.jsx`
- Modify: `src/pages/ServicesPage.jsx`
- Modify: `src/data/siteContent.js`

**Interfaces:**
- Produces: `ServiceCatalog({ services })` reading/writing `categoria` through `useSearchParams`.
- Consumes: service objects with `{ slug, eyebrow, title, description, problem, result, bullets }`.

- [ ] **Step 1: Write failing URL filter test**

Create `src/components/ServiceCatalog.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import ServiceCatalog from './ServiceCatalog.jsx'

const services = [
  { slug: 'redes', eyebrow: 'Redes', title: 'Redes administradas', description: 'Conectividad', problem: 'Caídas', result: 'Continuidad', bullets: [] },
  { slug: 'cloud', eyebrow: 'Cloud', title: 'Nube administrada', description: 'Respaldos', problem: 'Pérdida', result: 'Recuperación', bullets: [] },
]

function LocationProbe() { return <output>{useLocation().search}</output> }

it('filters services and reflects the category in the URL', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter><ServiceCatalog services={services} /><LocationProbe /></MemoryRouter>)
  await user.click(screen.getByRole('button', { name: 'Redes' }))
  expect(screen.getByText('Redes administradas')).toBeInTheDocument()
  expect(screen.queryByText('Nube administrada')).not.toBeInTheDocument()
  expect(screen.getByText('?categoria=redes')).toBeInTheDocument()
})
```

- [ ] **Step 2: Verify the test fails**

Run: `npm test -- --run src/components/ServiceCatalog.test.jsx`

Expected: FAIL because `ServiceCatalog.jsx` does not exist.

- [ ] **Step 3: Implement the catalog**

Use `useSearchParams`; render “Todos” plus one button per service. Set `aria-pressed` on every filter. An unknown category falls back to all services without throwing. The core state is:

```jsx
const [searchParams, setSearchParams] = useSearchParams()
const selected = searchParams.get('categoria') ?? 'todos'
const validSelection = services.some((service) => service.slug === selected) ? selected : 'todos'
const visibleServices = validSelection === 'todos'
  ? services
  : services.filter((service) => service.slug === validSelection)

function selectCategory(slug) {
  setSearchParams(slug === 'todos' ? {} : { categoria: slug })
}
```

Cards show “Problema”, “Solución” and “Resultado”. Add these exact fields to the six existing service records:

```js
const serviceOutcomes = {
  soporte: { problem: 'Fallas que interrumpen el trabajo diario.', result: 'Equipos y usuarios con atención técnica clara.' },
  redes: { problem: 'Conexiones inestables o infraestructura desordenada.', result: 'Una red organizada, documentada y preparada para crecer.' },
  seguridad: { problem: 'Poca visibilidad y control de espacios críticos.', result: 'Videovigilancia instalada para supervisar mejor la operación.' },
  antivirus: { problem: 'Equipos y datos expuestos a amenazas.', result: 'Protección adaptada al uso de hogares y empresas.' },
  cloud: { problem: 'Información dispersa y respaldos inconsistentes.', result: 'Servicios centralizados con respaldo y monitoreo.' },
  educacion: { problem: 'Brechas de conocimiento tecnológico aplicado.', result: 'Formación práctica para estudiantes y profesionales.' },
}
```

- [ ] **Step 4: Rebuild ServicesPage**

Add `PageMeta`, a concise intro, `ServiceCatalog`, and a final contact CTA. Remove per-card animations with accumulating delays.

- [ ] **Step 5: Verify catalog**

Run, as separate commands:

```bash
npm test -- --run src/components/ServiceCatalog.test.jsx
npm run lint
npm run build
```

Expected: filter test passes; lint and build exit 0.

- [ ] **Step 6: Commit services**

```bash
git add src/components/ServiceCatalog.jsx src/components/ServiceCatalog.test.jsx src/pages/ServicesPage.jsx src/data/siteContent.js
git commit -m "feat: add shareable service filters"
```

---

### Task 7: Informational Pages

**Files:**
- Modify: `src/pages/AboutPage.jsx`
- Modify: `src/pages/PortalPage.jsx`
- Modify: `src/pages/TermsPage.jsx`

**Interfaces:**
- Consumes: `companyProfile`, `educationHighlights`, `pillars`, `stats`, `termsBlocks`.
- Produces: unique `PageMeta` for each route and `id` anchors for every terms block.

- [ ] **Step 1: Rebuild AboutPage**

Create an editorial layout with one main story column, verified experience blocks and an education section. Keep the existing “12+” and “100% PYME hondureña” claims, but do not add client logos or certification names beyond existing content.

- [ ] **Step 2: Rebuild PortalPage**

Use a dark focused panel with Freshdesk as the single primary external action. Add secondary links to Services and Contact. Explain that users can crear solicitudes, seguir incidencias y comunicarse con soporte.

- [ ] **Step 3: Rebuild TermsPage**

Add a navigation list linking to sanitized explicit IDs: `ingreso-de-equipos`, `costos`, `garantia`, `pagos`. Render each block as a section with `<h2>` and `<ul>`, not loose paragraphs.

- [ ] **Step 4: Add route metadata**

Use `PageMeta` with these title suffixes:

```text
Nosotros | Geek Solution
Portal de soporte | Geek Solution
Términos de servicio | Geek Solution
```

- [ ] **Step 5: Verify informational pages**

Run, as separate commands:

```bash
npm run lint
npm run build
```

Expected: both exit 0; all imported content keys exist.

- [ ] **Step 6: Commit pages**

```bash
git add src/pages/AboutPage.jsx src/pages/PortalPage.jsx src/pages/TermsPage.jsx
git commit -m "feat: redesign company support and terms pages"
```

---

### Task 8: Audience-Aware Accessible Contact Flow

**Files:**
- Create: `src/components/AudienceSelector.jsx`
- Create: `src/components/AudienceSelector.test.jsx`
- Create: `src/components/ContactForm.jsx`
- Modify: `src/pages/ContactPage.jsx`
- Modify: `Dockerfile`
- Modify: `docker-compose.yml`
- Modify: `.env.example`
- Modify: `README.md`

**Interfaces:**
- Produces: `AudienceSelector({ value, onChange, error })` with values `empresa | hogar`.
- Produces: `ContactForm({ endpoint })`; payload generated by `createContactPayload`.
- Consumes: `VITE_WEB3FORMS_ACCESS_KEY` compiled by Vite.

- [ ] **Step 1: Write failing audience accessibility test**

Create `src/components/AudienceSelector.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import AudienceSelector from './AudienceSelector.jsx'

it('announces and changes the selected audience', async () => {
  const user = userEvent.setup()
  const onChange = vi.fn()
  render(<AudienceSelector value="" onChange={onChange} error="Selecciona una opción." />)
  expect(screen.getByRole('group', { name: /tipo de atención/i })).toHaveAccessibleDescription('Selecciona una opción.')
  await user.click(screen.getByRole('radio', { name: /empresa/i }))
  expect(onChange).toHaveBeenCalledWith('empresa')
})
```

- [ ] **Step 2: Verify audience test fails**

Run: `npm test -- --run src/components/AudienceSelector.test.jsx`

Expected: FAIL because `AudienceSelector.jsx` does not exist.

- [ ] **Step 3: Implement AudienceSelector**

Use `<fieldset>` and `<legend>Tipo de atención</legend>` with two radio inputs. Associate error text through `aria-describedby`; keep label and control in one clickable target:

```jsx
export default function AudienceSelector({ value, onChange, error }) {
  return (
    <fieldset aria-describedby={error ? 'audience-error' : undefined}>
      <legend className="text-sm font-semibold">Tipo de atención</legend>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {[
          ['empresa', 'Empresa'],
          ['hogar', 'Hogar'],
        ].map(([option, label]) => (
          <label key={option} className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-black/15 bg-white px-4">
            <input type="radio" name="audience" value={option} checked={value === option} onChange={() => onChange(option)} />
            {label}
          </label>
        ))}
      </div>
      {error ? <p id="audience-error" className="mt-2 text-sm text-red-700">{error}</p> : null}
    </fieldset>
  )
}
```

- [ ] **Step 4: Implement ContactForm**

Start with:

```js
const initialForm = { name: '', email: '', phone: '', audience: '', message: '', website: '' }
```

On invalid submit, set errors then focus the first control using refs ordered `name`, `email`, `audience`, `message`. Use `autoComplete="name"`, `autoComplete="email"`, `autoComplete="tel"`; set `spellCheck={false}` on email. Associate every inline error and set `aria-invalid`. Render status inside `<div role="status" aria-live="polite">`. Change loading copy to “Enviando…” and disable the button only after validation passes and the request starts.

Keep the honeypot visually hidden and label it for automated form tools:

```jsx
<label className="sr-only" aria-hidden="true">
  No completar este campo
  <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
</label>
```

- [ ] **Step 5: Recompose ContactPage**

Place audience selection and form on the right; keep email, phone, WhatsApp and schedule on the left. Add `PageMeta` and ensure external links use `rel="noreferrer"`.

- [ ] **Step 6: Inject the endpoint into Docker builds**

In the build stage of `Dockerfile`, before `RUN npm run build`, add:

```dockerfile
ARG VITE_WEB3FORMS_ACCESS_KEY
ENV VITE_WEB3FORMS_ACCESS_KEY=$VITE_WEB3FORMS_ACCESS_KEY
```

In `docker-compose.yml`:

```yaml
services:
  web:
    build:
      context: .
      args:
        VITE_WEB3FORMS_ACCESS_KEY: ${VITE_WEB3FORMS_ACCESS_KEY}
```

Document that `.env` is read by Compose but intentionally excluded from the Docker build context.

- [ ] **Step 7: Verify contact flow**

Run:

```bash
npm test -- --run src/utils/contactForm.test.js src/components/AudienceSelector.test.jsx
npm run lint
npm run build
docker compose config
```

Expected: tests pass; lint/build exit 0; Compose resolves the build argument. If Docker is unavailable, record that environmental limitation and verify the YAML structure separately.

- [ ] **Step 8: Commit contact flow**

```bash
git add src/components/AudienceSelector.jsx src/components/AudienceSelector.test.jsx src/components/ContactForm.jsx src/pages/ContactPage.jsx Dockerfile docker-compose.yml .env.example README.md
git commit -m "feat: build accessible multi-channel contact flow"
```

---

### Task 9: Production Hardening, Cleanup and Final Verification

**Files:**
- Modify: `nginx.conf`
- Modify: `README.md`
- Modify: `src/main.jsx`
- Delete: `src/components/theme.jsx`
- Delete: unused and duplicate assets listed in File Structure.
- Inspect: all files in `src`, `public`, project root.

**Interfaces:**
- Produces: production server with SPA fallback, immutable hashed assets and baseline security headers.
- Consumes: completed application and test suite.

- [ ] **Step 1: Add safe Nginx headers**

Inside `server` add:

```nginx
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
```

Do not add HSTS at this container layer unless TLS terminates here; Easypanel or the reverse proxy owns HTTPS.

- [ ] **Step 2: Keep HTML uncached and hashed assets immutable**

Use:

```nginx
location = /index.html {
    add_header Cache-Control "no-cache";
}

location ~* \.[a-f0-9]{8,}\.(js|css)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location / {
    try_files $uri $uri/ /index.html;
}
```

- [ ] **Step 3: Remove the legacy theme and unused assets**

Confirm `rg -n "useTheme|ThemeProvider|components/theme" src` finds only `src/main.jsx` and `src/components/theme.jsx`. Remove the `ThemeProvider` wrapper/import from `main.jsx`, then delete `theme.jsx`. Delete only the remaining assets listed under “Delete”, confirming `rg` finds no import or URL reference before each deletion.

- [ ] **Step 4: Update README verification instructions**

Document:

```bash
npm install
npm run dev
npm test -- --run
npm run lint
npm run build
docker compose build
```

Include the `.env` build-argument flow and state that Vite variables are public compile-time configuration, never secrets.

- [ ] **Step 5: Run the complete automated gate**

Run:

```bash
npm test -- --run
npm run lint
npm run build
npm audit --omit=dev
```

Expected: all tests pass; lint/build exit 0; audit reports zero known high-severity vulnerabilities. If an advisory has no compatible fix, document the package, advisory, affected feature and why the static SPA is or is not exposed.

- [ ] **Step 6: Run production smoke tests**

Start `npm run preview -- --host 127.0.0.1` and request `/`, `/servicios?categoria=redes`, `/contacto`, `/portal-ayuda`, `/terminos` and `/ruta-inexistente`. Expected: every request loads the SPA and the unknown route renders the 404 interface instead of redirecting.

- [ ] **Step 7: Complete manual accessibility and responsive checks**

At 375 px, 768 px and 1440 px verify: no horizontal scroll; menu opens/closes by keyboard and Escape; focus never hides under the fixed header; mobile action bar does not cover content; safe-area padding is present; form errors are announced; reduced-motion disables entrance movement; all text remains readable at 200% zoom.

- [ ] **Step 8: Commit hardening**

```bash
git add nginx.conf README.md src/main.jsx src/components/theme.jsx src/assets logo
git commit -m "chore: harden and verify production site"
```

If Git identity remains unavailable, leave changes unstaged after verification and report the exact files changed so the repository owner can create commits locally.
