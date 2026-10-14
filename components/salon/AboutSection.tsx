import SafeMarkdown from '@/components/salon/SafeMarkdown'

interface Props {
  title: string
  /** Untrusted Markdown. */
  body: string
}

export default function AboutSection({ title, body }: Props) {
  return (
    <section id="about" className="bg-cream py-20 lg:py-28 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-mauve mb-3 text-center">
          About
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl font-light text-charcoal text-center text-balance mb-10">
          {title}
        </h2>
        <SafeMarkdown>{body}</SafeMarkdown>
      </div>
    </section>
  )
}
