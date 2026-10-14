import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'

interface Props {
  /** Staff-authored Markdown — untrusted. Raw HTML is dropped and the output sanitized. */
  children: string
  className?: string
}

const PROSE =
  'text-charcoal/75 leading-relaxed space-y-5 [&_strong]:font-semibold [&_strong]:text-charcoal [&_em]:italic [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-1.5 [&_h1]:font-serif [&_h1]:text-3xl [&_h2]:font-serif [&_h2]:text-2xl [&_h3]:font-serif [&_h3]:text-xl [&_h1]:text-charcoal [&_h2]:text-charcoal [&_h3]:text-charcoal [&_blockquote]:border-l-2 [&_blockquote]:border-mauve [&_blockquote]:pl-4 [&_blockquote]:italic [&_a]:text-mauve [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-mauve-dark'

export default function SafeMarkdown({ children, className = 'text-lg' }: Props) {
  return (
    <div className={`${PROSE} ${className}`}>
      <ReactMarkdown
        skipHtml
        rehypePlugins={[rehypeSanitize]}
        components={{
          a: ({ node: _node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
