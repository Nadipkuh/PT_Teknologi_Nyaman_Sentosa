import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Globe, Loader2, Mail, MapPin, Phone, Send, UserRound } from 'lucide-react'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { CONTACT } from '../data/content.js'

const EMPTY = { name: '', email: '', message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(v) {
  const errors = {}
  if (v.name.trim().length < 2) errors.name = 'Tell us your name (at least 2 characters).'
  if (!EMAIL_RE.test(v.email.trim())) errors.email = 'Enter an email like name@company.com so we can reply.'
  if (v.message.trim().length < 10) errors.message = 'A few more words please (at least 10 characters).'
  return errors
}

const field =
  'mt-2 block w-full rounded-xl border bg-white/[0.05] px-4 text-base text-white placeholder:text-ink/35 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40'

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-white">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-2 text-sm text-rose-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  )
}

function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success
  const timer = useRef(null)
  const refs = { name: useRef(null), email: useRef(null), message: useRef(null) }

  useEffect(() => () => clearTimeout(timer.current), [])

  const errors = validate(values)
  const show = (key) => (touched[key] ? errors[key] : undefined)

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }))

  const onSubmit = (e) => {
    e.preventDefault()
    if (status === 'loading') return
    const firstInvalid = ['name', 'email', 'message'].find((k) => errors[k])
    if (firstInvalid) {
      setTouched({ name: true, email: true, message: true })
      refs[firstInvalid].current?.focus()
      return
    }
    setStatus('loading')
    // Simulated request. Replace with a real endpoint (Formspree, your API, ...) when ready.
    timer.current = setTimeout(() => setStatus('success'), 1600)
  }

  const reset = () => {
    setValues(EMPTY)
    setTouched({})
    setStatus('idle')
  }

  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:p-9">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex min-h-[26rem] flex-col items-start justify-center"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-300/30">
              <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
            </span>
            <h3 className="mt-6 font-display text-3xl font-bold text-white">Message received.</h3>
            <p className="mt-3 max-w-md text-ink/75">
              Thanks, {values.name.trim().split(' ')[0]}. In a live setup, {CONTACT.person} ({CONTACT.role}) would
              reply to {values.email.trim()}.
            </p>
            <p className="mt-3 max-w-md text-sm text-ink/50">
              This is a demo form, nothing was transmitted. To reach TNS now, write to {CONTACT.email}.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 h-12 rounded-full border border-white/20 px-6 font-semibold text-white transition-colors hover:border-brand hover:bg-brand/10"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="name" label="Name" error={show('name')}>
                <input
                  ref={refs.name}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={values.name}
                  onChange={onChange}
                  onBlur={onBlur}
                  aria-invalid={Boolean(show('name'))}
                  aria-describedby={show('name') ? 'name-error' : undefined}
                  disabled={status === 'loading'}
                  className={`${field} h-12 ${show('name') ? 'border-rose-400/70' : 'border-white/15'}`}
                />
              </Field>
              <Field id="email" label="Email" error={show('email')}>
                <input
                  ref={refs.email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={values.email}
                  onChange={onChange}
                  onBlur={onBlur}
                  aria-invalid={Boolean(show('email'))}
                  aria-describedby={show('email') ? 'email-error' : undefined}
                  disabled={status === 'loading'}
                  className={`${field} h-12 ${show('email') ? 'border-rose-400/70' : 'border-white/15'}`}
                />
              </Field>
            </div>
            <Field id="message" label="Message" error={show('message')}>
              <textarea
                ref={refs.message}
                id="message"
                name="message"
                rows={5}
                placeholder="What would you like to know about Breeze?"
                value={values.message}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={Boolean(show('message'))}
                aria-describedby={show('message') ? 'message-error' : undefined}
                disabled={status === 'loading'}
                className={`${field} resize-y py-3 ${show('message') ? 'border-rose-400/70' : 'border-white/15'}`}
              />
            </Field>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-brand px-8 font-semibold text-navy-950 shadow-glow-sm transition-all hover:bg-brand-soft hover:shadow-glow active:scale-[0.99] disabled:cursor-wait disabled:opacity-80 sm:w-auto"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value, href }) {
  const content = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand ring-1 ring-brand/30 transition-colors group-hover:bg-brand group-hover:text-navy-950">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">{label}</span>
        <span className="mt-0.5 block break-words font-display text-base font-semibold text-white">{value}</span>
      </span>
    </>
  )
  const cls =
    'group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md transition-colors'
  return href ? (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`${cls} hover:border-brand/50 hover:bg-white/[0.07]`}
    >
      {content}
    </a>
  ) : (
    <div className={cls}>{content}</div>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(50% 40% at 100% 0%, rgba(56,182,255,0.18), transparent 70%), radial-gradient(40% 40% at 0% 100%, rgba(18,74,156,0.5), transparent 70%), linear-gradient(180deg, #010f27, #021a3d)',
        }}
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact Us"
          title={
            <>
              Let’s make your day <span className="text-brand">lighter.</span>
            </>
          }
          lead="Questions, partnerships, or just curious about Breeze? Our team is one message away."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <Reveal className="space-y-4 lg:col-span-5" delay={0.1}>
            <InfoRow icon={UserRound} label="Contact person" value={`${CONTACT.person}, ${CONTACT.role}`} />
            <InfoRow icon={Mail} label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
            <InfoRow icon={Phone} label="Phone" value={CONTACT.phone} href={CONTACT.phoneHref} />
            <InfoRow icon={Globe} label="Website" value={CONTACT.website} href={CONTACT.websiteHref} />

            {/* Location card: dotted map texture with the flag accent from the Breeze bottle. */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-950/60 p-6">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: 'radial-gradient(rgba(143,214,255,0.55) 1px, transparent 1.2px)',
                  backgroundSize: '14px 14px',
                  maskImage: 'radial-gradient(70% 90% at 85% 50%, black, transparent 80%)',
                  WebkitMaskImage: 'radial-gradient(70% 90% at 85% 50%, black, transparent 80%)',
                }}
                aria-hidden="true"
              />
              <div className="relative flex items-center gap-4">
                <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-navy-950">
                  <span className="absolute inset-0 animate-ping rounded-full bg-brand/40 motion-reduce:animate-none" aria-hidden="true" />
                  <MapPin className="relative h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">Location</p>
                  <p className="mt-0.5 flex items-center gap-2 font-display text-base font-semibold text-white">
                    Indonesia
                    <span className="flex h-3 w-5 flex-col overflow-hidden rounded-[2px]" aria-hidden="true">
                      <span className="h-1/2 bg-rose-600" />
                      <span className="h-1/2 bg-slate-100" />
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-ink/60">Full office address coming soon.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
