import { termsBlocks } from '../data/siteContent.js'
import { fadeUp, MotionArticle, MotionSection } from '../components/motion.js'
import { SectionTag } from '../components/ui.jsx'

function TermsPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8">
      <MotionSection {...fadeUp}>
        <SectionTag>Terminos</SectionTag>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-none tracking-[-0.06em] text-white sm:text-6xl">
          Terminos y condiciones de servicio para ingreso, revision, garantia y pagos.
        </h1>
      </MotionSection>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {termsBlocks.map((block, index) => (
          <MotionArticle
            key={block.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
          >
            <h2 className="font-display text-2xl font-semibold tracking-[-0.04em] text-white">{block.title}</h2>
            <div className="mt-5 space-y-3">
              {block.items.map((item) => (
                <p key={item} className="text-sm leading-7 text-slate-300">{item}</p>
              ))}
            </div>
          </MotionArticle>
        ))}
      </div>
    </main>
  )
}

export default TermsPage
