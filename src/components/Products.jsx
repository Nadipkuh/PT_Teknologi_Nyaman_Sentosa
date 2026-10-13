import { Feather, Gauge, BatteryCharging, Hand, ShieldCheck, Snowflake, ThumbsUp } from 'lucide-react'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import BottleWidget from './BottleWidget.jsx'
import BagWidget from './BagWidget.jsx'
import { asset } from '../data/content.js'

const PRODUCTS = [
  {
    id: 'breeze-hydration',
    tag: 'Smart Water Bottle',
    name: 'Breeze Hydration',
    headline: 'Ice-cold at 4°C, even when the city is blazing.',
    image: 'images/breeze-hydration.jpg',
    imageAlt: 'Hand holding the Breeze Hydration bottle on a sunny Indonesian street, display showing 4°C',
    imagePosition: '64% 50%',
    benefits: [
      { icon: Snowflake, title: 'Always the right chill', text: 'Keeps your drink at the ideal 4°C in extreme heat.' },
      { icon: Gauge, title: 'Know at a glance', text: 'A real-time digital display shows temperature and battery.' },
      { icon: BatteryCharging, title: 'Never stranded', text: 'Dual charging: wireless, plus a flexible solar panel.' },
      { icon: Hand, title: 'Secure in your hand', text: 'Ergonomic anti-slip grip, with subtle Indonesian flag accents.' },
    ],
    widgetTitle: 'Try the display',
    widgetNote: 'Interactive demo with illustrative values',
    Widget: BottleWidget,
  },
  {
    id: 'breeze-bag',
    tag: 'Anti-Gravity Backpack',
    name: 'Breeze Bag',
    headline: 'Carry the whole day. Feel almost none of it.',
    image: 'images/breeze-bag.jpg',
    imageAlt: 'The Breeze Anti-Gravity Backpack floating above the ground, carrying a gaming laptop',
    imagePosition: '60% 50%',
    benefits: [
      { icon: Feather, title: 'Weightless loads', text: 'Magnetic levitation counters heavy loads. Even several gaming laptops feel virtually weightless.' },
      { icon: Gauge, title: 'Status, live', text: 'A smart digital control panel keeps you informed in real time.' },
      { icon: ShieldCheck, title: 'Gear stays safe', text: 'Spacious, thick padded compartments protect what matters.' },
      { icon: ThumbsUp, title: 'Comfort for hours', text: 'An ergonomic design makes carrying effortless.' },
    ],
    widgetTitle: 'Feel the difference',
    widgetNote: 'Interactive demo with illustrative values',
    Widget: BagWidget,
  },
]

function ProductBlock({ product, flip }) {
  const { Widget } = product
  return (
    <article aria-labelledby={`${product.id}-title`} className="space-y-8">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-glow">
            <img
              src={asset(product.image)}
              alt={product.imageAlt}
              loading="lazy"
              width="1400"
              height="765"
              className="aspect-[16/11] w-full object-cover transition-transform duration-700 hover:scale-[1.03] sm:aspect-[16/10]"
              style={{ objectPosition: product.imagePosition }}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent"
              aria-hidden="true"
            />
            <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-navy-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              {product.tag}
            </span>
          </div>
        </Reveal>

        <Reveal className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`} delay={0.1}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">{product.name}</p>
          <h3
            id={`${product.id}-title`}
            className="mt-4 font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-bold leading-[1.08] tracking-tight text-white"
          >
            {product.headline}
          </h3>
          <ul className="mt-8 space-y-5">
            {product.benefits.map((b) => {
              const Icon = b.icon
              return (
                <li key={b.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand ring-1 ring-brand/30">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-base font-bold text-white">{b.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink/70">{b.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>

      <Reveal delay={0.05}>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md sm:p-8">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
            <h4 className="font-display text-xl font-bold text-white">{product.widgetTitle}</h4>
            <p className="text-xs text-ink/50">{product.widgetNote}</p>
          </div>
          <Widget />
        </div>
      </Reveal>
    </article>
  )
}

export default function Products() {
  return (
    <section id="products" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(45% 30% at 0% 20%, rgba(56,182,255,0.14), transparent 70%), radial-gradient(45% 30% at 100% 75%, rgba(18,74,156,0.5), transparent 70%), linear-gradient(180deg, #010f27, #021a3d 50%, #010f27)',
        }}
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Products"
          title="Two Breeze products. Zero extra weight on your day."
          lead="Built around what changes for you, not around a spec sheet."
        />
        <div className="mt-16 space-y-28 sm:mt-20 sm:space-y-36">
          {PRODUCTS.map((p, i) => (
            <ProductBlock key={p.id} product={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
