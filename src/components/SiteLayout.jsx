import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { companyProfile, navItems } from '../data/siteContent.js'
import { IconArrow, IconClose, IconMenu } from './ui.jsx'

function NavItem({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `text-sm transition hover:text-white ${isActive ? 'text-white' : 'text-slate-300'}`
      }
    >
      {children}
    </NavLink>
  )
}

function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative overflow-x-hidden bg-bg text-slate-200">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_22%),radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.16),_transparent_18%),linear-gradient(180deg,_#050816_0%,_#07101d_34%,_#091221_100%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(125,211,252,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.18),_transparent_60%)] blur-3xl" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/65 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 shadow-[0_0_40px_rgba(34,211,238,0.15)]">
              <span className="font-display text-sm font-bold tracking-[0.3em] text-white">GS</span>
            </div>
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-white">Geek Solution</p>
              <p className="text-xs text-slate-400">Soporte, redes, seguridad y servicios cloud</p>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <NavItem key={item.to} to={item.to}>
                {item.label}
              </NavItem>
            ))}
            <NavLink
              to="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-100 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-cyan-300/14"
            >
              Solicitar consulta
              <IconArrow />
            </NavLink>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
            aria-label="Abrir menu"
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>

        {menuOpen ? (
          <div className="border-t border-white/10 bg-slate-950/95 px-5 py-5 backdrop-blur-xl lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-slate-200"
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
            </div>
          </div>
        ) : null}
      </header>

      <Outlet />

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="font-display text-xl font-semibold text-white">Geek Solution</p>
            <p className="mt-2 text-sm text-slate-400">
              {companyProfile.summary}
            </p>
            <p className="mt-2 text-sm text-slate-500">{companyProfile.supportSummary}</p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-slate-400">
            <NavLink to="/" className="transition hover:text-white">Inicio</NavLink>
            <NavLink to="/servicios" className="transition hover:text-white">Servicios</NavLink>
            <NavLink to="/portal-ayuda" className="transition hover:text-white">Portal</NavLink>
            <NavLink to="/terminos" className="transition hover:text-white">Terminos</NavLink>
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
