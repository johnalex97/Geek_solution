import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { companyProfile, navItems } from '../data/siteContent.js'
import { useTheme } from './theme.jsx'
import { IconArrow, IconClose, IconMenu, IconMoon, IconSun } from './ui.jsx'

function NavItem({ to, children, onClick, isLight }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `text-sm transition ${isLight ? 'hover:text-slate-950' : 'hover:text-white'} ${isActive ? (isLight ? 'text-slate-950' : 'text-white') : (isLight ? 'text-slate-600' : 'text-slate-300')}`
      }
    >
      {children}
    </NavLink>
  )
}

function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isLight, toggleTheme } = useTheme()
  const portalItem = navItems.find((item) => item.to === '/portal-ayuda')
  const primaryNavItems = navItems.filter((item) => item.to !== '/portal-ayuda')

  return (
    <div className="theme-shell relative overflow-x-hidden">
      <div
        className={`pointer-events-none fixed inset-0 -z-10 ${
          isLight
            ? 'bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.14),_transparent_24%),radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.12),_transparent_18%),linear-gradient(180deg,_#f8fbff_0%,_#eef6ff_36%,_#dbeafe_100%)]'
            : 'bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_22%),radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.16),_transparent_18%),linear-gradient(180deg,_#050816_0%,_#07101d_34%,_#091221_100%)]'
        }`}
      />
      <div className="theme-light-grid pointer-events-none fixed inset-0 -z-10 opacity-40 [background-size:72px_72px]" />
      <div
        className={`pointer-events-none fixed inset-x-0 top-0 -z-10 h-96 blur-3xl ${
          isLight
            ? 'bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.12),_transparent_60%)]'
            : 'bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.18),_transparent_60%)]'
        }`}
      />

      <header className="theme-header fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="overflow-hidden rounded-2xl border border-cyan-400/20 bg-white shadow-[0_0_40px_rgba(34,211,238,0.12)]">
              <img
                src="/logo-geek-solution.jpg"
                alt="Logo de Geek Solution"
                className="size-11 object-cover"
              />
            </div>
            <div>
              <p className={`font-display text-sm font-semibold uppercase tracking-[0.28em] ${isLight ? 'text-slate-950' : 'text-white'}`}>Geek Solution</p>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Soporte, redes, seguridad y servicios cloud</p>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-8 lg:flex">
            {primaryNavItems.map((item) => (
              <NavItem key={item.to} to={item.to} isLight={isLight}>
                {item.label}
              </NavItem>
            ))}
            <NavLink
              to="/contacto"
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition duration-300 hover:-translate-y-0.5 ${
                isLight
                  ? 'border-cyan-500/30 bg-cyan-500 text-white hover:border-cyan-600 hover:bg-cyan-600'
                  : 'border-cyan-400/30 bg-cyan-400/10 text-cyan-100 hover:border-cyan-300/50 hover:bg-cyan-300/14'
              }`}
            >
              Solicitar consulta
              <IconArrow />
            </NavLink>
            {portalItem ? (
              <NavItem to={portalItem.to} isLight={isLight}>
                {portalItem.label}
              </NavItem>
            ) : null}
            <button
              type="button"
              onClick={toggleTheme}
              className={`inline-flex size-11 items-center justify-center rounded-2xl border transition ${
                isLight
                  ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              }`}
              aria-label={isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
            >
              {isLight ? <IconMoon /> : <IconSun />}
            </button>
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className={`inline-flex size-11 items-center justify-center rounded-2xl border transition ${
                isLight
                  ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              }`}
              aria-label={isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
            >
              {isLight ? <IconMoon /> : <IconSun />}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className={`inline-flex size-11 items-center justify-center rounded-2xl border transition ${
                isLight
                  ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              }`}
              aria-label="Abrir menu"
            >
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className={`border-t px-5 py-5 backdrop-blur-xl lg:hidden ${isLight ? 'border-slate-200 bg-white/95' : 'border-white/10 bg-slate-950/95'}`}>
            <div className="mx-auto flex max-w-7xl flex-col gap-3">
              {primaryNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-2xl border px-4 py-3 text-sm ${isLight ? 'border-slate-200 bg-slate-50 text-slate-700' : 'border-white/8 bg-white/4 text-slate-200'}`}
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/contacto"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950"
              >
                Solicitar consulta
                <IconArrow />
              </NavLink>
              {portalItem ? (
                <NavLink
                  to={portalItem.to}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-2xl border px-4 py-3 text-sm ${isLight ? 'border-slate-200 bg-slate-50 text-slate-700' : 'border-white/8 bg-white/4 text-slate-200'}`}
                >
                  {portalItem.label}
                </NavLink>
              ) : null}
            </div>
          </div>
        ) : null}
      </header>

      <Outlet />

      <footer className={`border-t ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/95">
              <img
                src="/logo-geek-solution.jpg"
                alt="Logo de Geek Solution"
                className="size-14 object-cover"
              />
            </div>
            <div>
              <p className={`font-display text-xl font-semibold ${isLight ? 'text-slate-950' : 'text-white'}`}>Geek Solution</p>
              <p className={`mt-2 text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {companyProfile.summary}
              </p>
              <p className={`mt-2 text-sm ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>{companyProfile.supportSummary}</p>
            </div>
          </div>
          <div className={`flex flex-wrap gap-5 text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            <NavLink to="/" className={`transition ${isLight ? 'hover:text-slate-950' : 'hover:text-white'}`}>Inicio</NavLink>
            <NavLink to="/servicios" className={`transition ${isLight ? 'hover:text-slate-950' : 'hover:text-white'}`}>Servicios</NavLink>
            <NavLink to="/portal-ayuda" className={`transition ${isLight ? 'hover:text-slate-950' : 'hover:text-white'}`}>Portal</NavLink>
            <NavLink to="/terminos" className={`transition ${isLight ? 'hover:text-slate-950' : 'hover:text-white'}`}>Términos</NavLink>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/50433837341"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex size-[3.75rem] items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-500 text-slate-950 shadow-[0_20px_40px_rgba(16,185,129,0.35)] transition duration-300 hover:-translate-y-1 hover:bg-emerald-400"
        aria-label="Abrir WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20 11.5a8 8 0 0 1-11.8 7l-4.2 1 1.1-4A8 8 0 1 1 20 11.5Zm-11-3.1c-.2-.4-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.4-1.1 1.1-1.1 2.7s1.1 3.1 1.3 3.3c.2.2 2.1 3.3 5.1 4.4 2.5.9 3 .7 3.5.7.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.1-1.3-.1-.1-.4-.2-.9-.4-.4-.2-1-.5-1.2-.6-.2-.1-.4-.1-.6.1-.2.2-.7.9-.8 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.6-.9-.8-1.5-1.9-1.7-2.2-.2-.3 0-.4.1-.6.1-.1.2-.3.3-.4.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6 0-.1-.5-1.2-.8-1.7Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  )
}

export default SiteLayout
