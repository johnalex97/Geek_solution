import { contactCards } from '../../data/siteContent.js'
import { ActionButton } from '../ActionButton.jsx'

export default function MobileActionBar() {
  const whatsapp = contactCards.find((contact) => contact.label === 'WhatsApp')

  return (
    <nav aria-label="Contacto rápido" className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-[var(--paper)] px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-2 [&>a]:px-2 [&>a]:whitespace-nowrap">
        <ActionButton href={whatsapp.href} variant="secondary">WhatsApp</ActionButton>
        <ActionButton to="/contacto">Solicitar asesoría</ActionButton>
      </div>
    </nav>
  )
}
