import Reveal from './Reveal.jsx'

// The TNS signature: a circuit trace (node + line) leading into every eyebrow label.
export function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
      </span>
      <span className="h-px w-10 bg-gradient-to-r from-brand to-transparent" aria-hidden="true" />
      {children}
    </div>
  )
}

export default function SectionHeading({ eyebrow, title, lead, className = '' }) {
  return (
    <Reveal className={className}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,4.6vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-white">
        {title}
      </h2>
      {lead ? <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">{lead}</p> : null}
    </Reveal>
  )
}
