import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { companyProfile, navItems } from '../../data/siteContent.js'
import { ActionButton } from '../ActionButton.jsx'
import { IconArrow, IconClose, IconMenu } from '../ui.jsx'

const primaryNavItems = navItems.filter((item) => !['/', '/terminos', '/portal-ayuda'].includes(item.to))
const portalItem = navItems.find((item) => item.to === '/portal-ayuda')

function NavigationLinks({ onNavigate }) {
  return primaryNavItems.map((item) => (
    <NavLink
      key={item.to}
      to={item.to}
      onClick={onNavigate}
      className={({ isActive }) => `rounded-lg px-3 py-3 text-sm font-semibold transition-colors hover:text-[#007a3f] ${isActive ? 'text-[#007a3f]' : 'text-[var(--ink)]'}`}
    >
      {item.label}
    </NavLink>
  ))
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[var(--paper)]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <NavLink to="/" onClick={closeMenu} aria-label={`${companyProfile.name}, inicio`} className="flex min-w-0 items-center gap-3 rounded-lg">
          <img src="/logo-geek-solution.jpg" alt="" width="44" height="44" className="size-11 shrink-0 rounded-lg object-cover" />
          <span className="font-display text-lg font-semibold tracking-tight">{companyProfile.name}</span>
        </NavLink>

        <nav aria-label="Navegación principal" className="hidden items-center gap-1 lg:flex">
          <NavigationLinks />
          <ActionButton to={portalItem.to} variant="portal" className="ml-3">Portal de soporte</ActionButton>
          <ActionButton to="/contacto" className="ml-2">Solicitar asesoría <IconArrow aria-hidden="true" /></ActionButton>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-black/15 bg-white transition-colors hover:border-[#007a3f] hover:bg-[#e4f4ea] hover:text-[#007a3f] lg:hidden"
        >
          {menuOpen ? <IconClose aria-hidden="true" /> : <IconMenu aria-hidden="true" />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Navegación móvil"
        hidden={!menuOpen}
        className="max-h-[calc(100dvh-10rem-env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain border-t border-black/10 bg-[var(--paper)] px-5 py-5 lg:hidden"
      >
        <div className="mx-auto grid max-w-7xl gap-2">
          <NavigationLinks onNavigate={closeMenu} />
          <ActionButton to="/contacto" onClick={closeMenu}>Solicitar asesoría <IconArrow aria-hidden="true" /></ActionButton>
          <ActionButton to={portalItem.to} variant="portal" onClick={closeMenu}>Portal de soporte</ActionButton>
        </div>
      </nav>
    </header>
  )
}
