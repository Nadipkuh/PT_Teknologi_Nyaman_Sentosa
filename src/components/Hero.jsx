import { motion } from 'framer-motion'
import { ArrowRight, BatteryCharging, Snowflake } from 'lucide-react'
import { Eyebrow } from './SectionHeading.jsx'
import CircuitNetwork from './CircuitNetwork.jsx'
import { COMPANY } from '../data/content.js'

const STATS = [
  { value: '4°C', label: 'Ideal chill, even in extreme heat' },
  { value: '2', label: 'Flagship Breeze products' },
  { value: '2×', label: 'Charging: wireless + solar' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pt-32"
    >
      {/* Background: navy gradient, soft cyan glows and a faint circuit grid. */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(60% 50% at 85% 20%, rgba(56,182,255,0.20), transparent 70%), radial-gradient(50% 45% at 0% 100%, rgba(18,74,156,0.55), transparent 70%), linear-gradient(180deg, #010f27 0%, #021a3d 70%, #021a3d 100%)',
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(143,214,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(143,214,255,0.5) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(70% 60% at 60% 40%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(70% 60% at 60% 40%, black, transparent 80%)',
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-7"
        >
          <motion.div variants={item}>
            <Eyebrow>{COMPANY.slogan}</Eyebrow>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-[clamp(2.6rem,7.4vw,6.25rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-white"
          >
            Technology That Makes Living{' '}
            <span className="bg-gradient-to-r from-brand via-glow to-brand-soft bg-clip-text text-transparent">
              Lighter.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg"
          >
            TNS brings everyday innovation into your routine without adding weight to it. Smarter
            hydration. Effortless carrying. Comfort right when you need it.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="#products"
              className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-brand px-8 font-semibold text-navy-950 shadow-glow-sm transition-all duration-300 hover:bg-brand-soft hover:shadow-glow active:scale-[0.98]"
            >
              <span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                aria-hidden="true"
              />
              <span className="relative">Explore Products</span>
              <ArrowRight
                className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="#contact"
              className="group inline-flex h-14 items-center gap-2 font-semibold text-white underline decoration-brand/50 decoration-2 underline-offset-8 transition-colors hover:decoration-brand"
            >
              Get in touch
              <ArrowRight className="h-4 w-4 opacity-60 transition-all group-hover:translate-x-1 group-hover:opacity-100" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-14 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-8 sm:gap-8"
          >
            {STATS.map((s) => (
              <div key={s.value}>
                <dt className="font-display text-3xl font-bold text-white sm:text-4xl">{s.value}</dt>
                <dd className="mt-2 text-xs leading-snug text-ink/60 sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5"
        >
          <CircuitNetwork />

          <div className="absolute left-0 top-[14%] hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:flex">
            <Snowflake className="h-4 w-4 text-brand" aria-hidden="true" />
            Self-cooling · 4°C
          </div>
          <div className="absolute bottom-[14%] right-0 hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:flex">
            <BatteryCharging className="h-4 w-4 text-glow" aria-hidden="true" />
            Solar + wireless charging
          </div>
        </motion.div>
      </div>
    </section>
  )
}
