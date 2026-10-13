import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, Target } from 'lucide-react'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

const TABS = [
  {
    id: 'vision',
    label: 'Vision',
    icon: Eye,
    statement: 'Integrating Technology with Comfort',
    body: 'A future where the smartest technology is the one you barely notice. It handles the heat, the weight and the hurry quietly, so you can get on with your day.',
  },
  {
    id: 'mission',
    label: 'Mission',
    icon: Target,
    statement: 'Introducing Technology to Everyone and Bringing Comfort in Rush',
    body: 'We bring accessible innovation into everyday life, blending into your dynamic routine to deliver effortless comfort right when you need it.',
  },
]

export default function VisionMission() {
  const [active, setActive] = useState('vision')
  const tabRefs = useRef({})
  const current = TABS.find((t) => t.id === active)

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const index = TABS.findIndex((t) => t.id === active)
    const next = TABS[(index + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length]
    setActive(next.id)
    tabRefs.current[next.id]?.focus()
  }

  return (
    <section id="vision" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(55% 60% at 100% 50%, rgba(56,182,255,0.16), transparent 70%), linear-gradient(180deg, #021a3d 0%, #010f27 100%)',
        }}
      />
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Vision & Mission" title="Technology should ease your pace, not add to it." />
          <Reveal delay={0.1}>
            <p className="mt-8 text-base leading-relaxed text-ink/75 sm:text-lg">
              In a world that never slows down, innovation has to fit your life, not the other way
              around.
            </p>
            <p className="mt-5 font-display text-lg font-semibold text-white sm:text-xl">
              True technology doesn't just advance. It makes living lighter.
            </p>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur-md">
            <div
              role="tablist"
              aria-label="Vision and Mission"
              onKeyDown={onKeyDown}
              className="relative grid grid-cols-2 gap-1 rounded-2xl bg-navy-950/60 p-1"
            >
              {TABS.map((tab) => {
                const Icon = tab.icon
                const selected = tab.id === active
                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      tabRefs.current[tab.id] = el
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(tab.id)}
                    className={`relative flex h-12 items-center justify-center gap-2 rounded-xl font-display text-sm font-semibold transition-colors ${
                      selected ? 'text-navy-950' : 'text-ink/70 hover:text-white'
                    }`}
                  >
                    {selected ? (
                      <motion.span
                        layoutId="vm-pill"
                        className="absolute inset-0 rounded-xl bg-brand shadow-glow-sm"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    ) : null}
                    <Icon className="relative h-4 w-4" aria-hidden="true" />
                    <span className="relative">{tab.label}</span>
                  </button>
                )
              })}
            </div>

            <div className="min-h-[19rem] p-6 sm:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  role="tabpanel"
                  id={`panel-${current.id}`}
                  aria-labelledby={`tab-${current.id}`}
                  tabIndex={0}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                    Our {current.label}
                  </p>
                  <p className="mt-5 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-white">
                    {current.statement}
                  </p>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
                    {current.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
