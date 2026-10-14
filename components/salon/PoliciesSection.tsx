import SafeMarkdown from '@/components/salon/SafeMarkdown'

interface Props {
  title: string
  /** Untrusted Markdown. */
  body: string
}

export default function PoliciesSection({ title, body }: Props) {
  return (
    <section id="policies" className="bg-cream-200 py-16 lg:py-20 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-mauve mb-3">
          Before you visit
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-light text-charcoal text-balance mb-8">
          {title}
        </h2>
        <SafeMarkdown className="text-base [&_li]:pl-1 marker:text-mauve">{body}</SafeMarkdown>
      </div>
    </section>
  )
}
