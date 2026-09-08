import { useSearchParams } from 'react-router-dom'

export default function ServiceCatalog({ services }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const selected = searchParams.get('categoria') ?? 'todos'
  const validSelection = services.some((service) => service.slug === selected) ? selected : 'todos'
  const visibleServices = validSelection === 'todos'
    ? services
    : services.filter((service) => service.slug === validSelection)

  function selectCategory(slug) {
    setSearchParams(slug === 'todos' ? {} : { categoria: slug })
  }

  return (
    <section aria-labelledby="catalog-title">
      <div className="border-y border-black/15 py-5">
        <p id="catalog-title" className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--technical-gray)]">
          Filtrar por categoría
        </p>
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Categorías de servicios">
          <button
            type="button"
            aria-pressed={validSelection === 'todos'}
            onClick={() => selectCategory('todos')}
            className="min-h-11 rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-semibold transition-colors hover:border-[#007a3f] hover:text-[#007a3f] aria-pressed:border-[var(--ink)] aria-pressed:bg-[var(--ink)] aria-pressed:text-white"
          >
            Todos
          </button>
          {services.map((service) => (
            <button
              key={service.slug}
              type="button"
              aria-pressed={validSelection === service.slug}
              onClick={() => selectCategory(service.slug)}
              className="min-h-11 rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-semibold transition-colors hover:border-[#007a3f] hover:text-[#007a3f] aria-pressed:border-[var(--ink)] aria-pressed:bg-[var(--ink)] aria-pressed:text-white"
            >
              {service.eyebrow}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-10 grid gap-5 lg:grid-cols-2">
        {visibleServices.map((service) => (
          <li key={service.slug} className="border border-black/15 bg-white p-6 sm:p-8">
            <article>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#007a3f]">{service.eyebrow}</p>
              <h2 className="mt-4 max-w-xl text-balance font-display text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl">{service.title}</h2>

              <dl className="mt-7 space-y-5 border-t border-black/10 pt-6">
                <div>
                  <dt className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--technical-gray)]">Problema</dt>
                  <dd className="mt-2 text-sm leading-7">{service.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--technical-gray)]">Solución</dt>
                  <dd className="mt-2 text-sm leading-7">{service.description}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--technical-gray)]">Resultado</dt>
                  <dd className="mt-2 text-sm font-medium leading-7 text-[#007a3f]">{service.result}</dd>
                </div>
              </dl>

              {service.bullets.length > 0 ? (
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Incluye ${service.eyebrow}`}>
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="rounded-full bg-[var(--paper)] px-3 py-1.5 font-mono text-xs text-[var(--technical-gray)]">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
