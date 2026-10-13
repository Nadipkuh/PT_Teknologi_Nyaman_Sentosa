import { Instagram, Linkedin, Mail, Youtube } from 'lucide-react'
import Logo from './Logo.jsx'
import { COMPANY, CONTACT, NAV, SOCIALS } from '../data/content.js'

const SOCIAL_ICONS = { Instagram, LinkedIn: Linkedin, YouTube: Youtube }

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-navy-950">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#home" className="inline-flex items-center gap-3">
              <Logo className="h-14 w-14" />
              <span className="leading-tight">
                <span className="block font-display text-sm font-bold tracking-[0.12em] text-white">
                  {COMPANY.nameUpper}
                </span>
                <span className="block text-sm text-brand-soft">{COMPANY.slogan}</span>
              </span>
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/60">
              Integrating technology with comfort, so everyday life can feel a little lighter.
            </p>
          </div>

          <nav aria-label="Quick links" className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Quick links</p>
            <ul className="mt-5 space-y-1">
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex h-10 items-center text-sm text-ink/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Stay connected</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-5 inline-flex h-10 items-center gap-2 text-sm text-ink/70 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 text-brand" aria-hidden="true" />
              {CONTACT.email}
            </a>
            <ul className="mt-4 flex gap-3">
              {SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.label]
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`TNS on ${s.label}`}
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-ink/80 transition-all hover:-translate-y-0.5 hover:border-brand hover:bg-brand/10 hover:text-white"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-ink/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2077 {COMPANY.name}. All rights reserved.</p>
          <a href={CONTACT.websiteHref} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            {CONTACT.website}
          </a>
        </div>
      </div>
    </footer>
  )
}
