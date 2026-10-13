import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { CHAIRMAN, TEAM, VALUES, asset } from '../data/content.js'

const card =
  'rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md transition-colors duration-300'

function SubHeading({ children, note }) {
  return (
    <Reveal className="mb-8 flex items-end justify-between gap-4 border-b border-white/10 pb-4">
      <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">{children}</h3>
      {note ? <p className="hidden text-sm text-ink/50 sm:block">{note}</p> : null}
    </Reveal>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(45% 35% at 10% 10%, rgba(18,74,156,0.45), transparent 70%), linear-gradient(180deg, #021a3d, #021a3d)',
        }}
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Brand story + chairman */}
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="About Us"
              title={
                <>
                  Where comfort meets the <span className="text-brand">future.</span>
                </>
              }
            />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-ink/75 sm:text-lg">
              <Reveal delay={0.05}>
                <p>
                  TNS began with one question: why does the technology built to help us so often
                  weigh us down?
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  A small team of researchers, marketers and storytellers shared one belief:
                  comfort and technology belong together. Not as a trade-off. As a single idea.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>
                  Today that idea shapes every Breeze product. A bottle that keeps the chill. A
                  backpack that forgets the weight. Technology that fits into your routine instead
                  of crowding it.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="mt-10 border-l-2 border-brand pl-5 font-display text-xl font-semibold text-white sm:text-2xl">
                Make Your Dream Comfort.
              </p>
            </Reveal>
          </div>

          {/* Chairman spotlight */}
          <Reveal className="lg:col-span-5" delay={0.1}>
            <figure className={`${card} group relative overflow-hidden p-3`}>
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={asset(CHAIRMAN.photo)}
                  alt={`Portrait of ${CHAIRMAN.name}, TNS Chairman`}
                  width="640"
                  height="640"
                  loading="lazy"
                  className="aspect-[4/4.4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                    Our {CHAIRMAN.role}
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold text-white">{CHAIRMAN.name}</p>
                </div>
              </div>
              <blockquote className="relative px-4 pb-4 pt-6">
                <Quote className="absolute right-4 top-5 h-8 w-8 text-brand/30" aria-hidden="true" />
                <p className="max-w-[18ch] font-display text-3xl font-bold leading-tight text-white">
                  “{CHAIRMAN.quote}”
                </p>
              </blockquote>
            </figure>
          </Reveal>
        </div>

        {/* Team */}
        <div className="mt-24 sm:mt-28">
          <SubHeading note="The people behind Breeze">Meet Our Team</SubHeading>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => {
              const Icon = m.icon
              return (
                <motion.li
                  key={m.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className={`${card} group relative h-full p-6 hover:border-brand/50 hover:bg-white/[0.07] hover:shadow-glow-sm`}
                  >
                    <span
                      className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-brand"
                      aria-hidden="true"
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div
                      className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-brand to-navy-600 font-display text-2xl font-bold text-navy-950 ring-4 ring-brand/20"
                      aria-hidden="true"
                    >
                      {m.initials}
                    </div>
                    <h4 className="mt-6 font-display text-lg font-bold leading-snug text-white">{m.name}</h4>
                    <p className="mt-1 text-sm font-medium text-brand-soft">{m.role}</p>
                  </motion.div>
                </motion.li>
              )
            })}
          </ul>
        </div>

        {/* Core values */}
        <div className="mt-24 sm:mt-28">
          <SubHeading note="What guides every decision">Core Values</SubHeading>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.li
                  key={v.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`${card} group relative overflow-hidden p-6 hover:border-brand/50 hover:bg-white/[0.07]`}
                >
                  <span
                    className="absolute -right-2 -top-4 font-display text-8xl font-extrabold text-white/[0.04] transition-colors group-hover:text-brand/10"
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>
                  <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-brand/15 text-brand ring-1 ring-brand/30 transition-all duration-300 group-hover:bg-brand group-hover:text-navy-950 group-hover:shadow-glow-sm">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h4 className="relative mt-6 font-display text-xl font-bold text-white">{v.title}</h4>
                  <p className="relative mt-2 text-sm leading-relaxed text-ink/70">{v.text}</p>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
