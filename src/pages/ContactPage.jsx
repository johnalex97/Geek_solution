import ContactForm from '../components/ContactForm.jsx'
import PageMeta from '../components/PageMeta.jsx'
import { contactCards, pageMeta } from '../data/siteContent.js'

function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8">
      <PageMeta {...pageMeta['/contacto']} />
      <div className="grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <section aria-labelledby="contact-heading">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#007a3f]">Contacto</p>
          <h1 id="contact-heading" className="mt-6 text-balance font-display text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.055em] sm:text-5xl">Conversemos sobre lo que necesitas resolver.</h1>
          <p className="mt-6 text-pretty text-base leading-8 text-[var(--technical-gray)]">Atendemos consultas comerciales y técnicas para empresas y hogares. Escríbenos o llámanos por el canal que prefieras.</p>
          <dl className="mt-8 divide-y divide-black/15 border-y border-black/15">
            {contactCards.map((item) => (
              <div key={item.label} className="py-5">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--technical-gray)]">{item.label}</dt>
                <dd className="mt-2 break-words font-display text-lg sm:text-xl">
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="inline-flex min-h-11 items-center underline decoration-black/20 underline-offset-4 transition-colors hover:text-[#007a3f]">{item.value}</a>
                  ) : item.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <div className="rounded-2xl border border-black/15 bg-white p-5 sm:p-8">
          <ContactForm accessKey={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY} />
        </div>
      </div>
    </main>
  )
}

export default ContactPage
