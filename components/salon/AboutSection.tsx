import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'

interface Props {
  title: string
  /** Staff-authored Markdown — untrusted. Raw HTML is dropped and the output sanitized. */
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

        <div className="text-charcoal/75 text-lg leading-relaxed space-y-5 [&_strong]:font-semibold [&_strong]:text-charcoal [&_em]:italic [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-1.5 [&_h1]:font-serif [&_h1]:text-3xl [&_h2]:font-serif [&_h2]:text-2xl [&_h3]:font-serif [&_h3]:text-xl [&_h1]:text-charcoal [&_h2]:text-charcoal [&_h3]:text-charcoal [&_blockquote]:border-l-2 [&_blockquote]:border-mauve [&_blockquote]:pl-4 [&_blockquote]:italic [&_a]:text-mauve [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-mauve-dark">
          <ReactMarkdown
            skipHtml
            rehypePlugins={[rehypeSanitize]}
            components={{
              a: ({ node: _node, ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer" />
              ),
            }}
          >
            {body}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  )
}
