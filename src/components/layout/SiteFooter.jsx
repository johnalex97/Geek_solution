import { Link } from 'react-router-dom'
import { companyProfile, contactCards, navItems } from '../../data/siteContent.js'

export default function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-[var(--graphite)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_1fr] lg:gap-14 lg:px-8">
        <div>
          <Link to="/" aria-label={`${companyProfile.name}, inicio`} className="inline-flex items-center gap-3 rounded-lg">
            <img src="/logo-geek-solution.jpg" alt="" width="48" height="48" className="size-12 rounded-lg object-cover" />
            <span className="font-display text-xl font-semibold">{companyProfile.name}</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/75">{companyProfile.summary}</p>
          <p className="mt-4 text-sm text-white/75">{companyProfile.location}</p>
        </div>

        <nav aria-label="Navegación del pie de página">
          <h2 className="font-display text-lg font-semibold">Explora</h2>
          <ul className="mt-4 grid gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="inline-block rounded-sm py-2 text-sm text-white/75 transition-colors hover:text-[var(--signal-green)]">
                  {item.to === '/portal-ayuda' ? 'Portal de soporte' : item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby="footer-contact-title">
          <h2 id="footer-contact-title" className="font-display text-lg font-semibold">Hablemos</h2>
          <dl className="mt-5 grid gap-5 text-sm">
            {contactCards.map((contact) => (
              <div key={contact.label}>
                <dt className="text-xs text-white/60">{contact.label}</dt>
                <dd className="mt-1 break-words leading-6">
                  {contact.href ? <a href={contact.href} className="inline-block rounded-sm py-1 transition-colors hover:text-[var(--signal-green)]">{contact.value}</a> : contact.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
      <div className="border-t border-white/10 px-5 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-xs leading-6 text-white/60">
          <p>{companyProfile.supportSummary}</p>
          <div className="mt-5 flex flex-col items-center gap-2 border-t border-white/10 pt-5 text-center sm:flex-row sm:justify-between sm:text-left">
            <p>Geek Solution © 2026 | TODOS LOS DERECHOS RESERVADOS.</p>
            <p>Hecho por Jonatan Maradiaga</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
