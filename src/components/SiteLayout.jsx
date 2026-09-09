import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { pageMeta } from '../data/siteContent.js'
import PageMeta from './PageMeta.jsx'
import SiteHeader from './layout/SiteHeader.jsx'
import SiteFooter from './layout/SiteFooter.jsx'
import MobileActionBar from './layout/MobileActionBar.jsx'
import { ContactDraftContext, initialContactForm } from './contactDraft.js'
import useRouteNavigation from './useRouteNavigation.js'

export default function SiteLayout() {
  const contactDraft = useState(initialContactForm)
  useRouteNavigation()
  const { pathname } = useLocation()
  const routePath = pathname.toLowerCase().replace(/\/+$/, '') || '/'
  const metadata = pageMeta[routePath] ?? pageMeta['*']

  return (
    <div className="min-h-screen bg-[var(--paper)] pb-[calc(5rem+env(safe-area-inset-bottom))] text-[var(--ink)] lg:pb-0">
      <PageMeta {...metadata} />
      <a href="#main-content" className="sr-only z-[100] rounded-lg bg-white px-5 py-3 font-semibold focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Saltar al contenido</a>
      <SiteHeader />
      <ContactDraftContext.Provider value={contactDraft}>
        <Outlet />
      </ContactDraftContext.Provider>
      <SiteFooter />
      <MobileActionBar />
    </div>
  )
}
