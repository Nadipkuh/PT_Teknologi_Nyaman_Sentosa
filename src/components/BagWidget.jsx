import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedNumber from './AnimatedNumber.jsx'

const MAX_LOAD = 15
const OFFSET = 0.95 // demo value: share of the load levitation cancels

export default function BagWidget() {
  const [on, setOn] = useState(false)
  const [load, setLoad] = useState(8)

  const felt = on ? load * (1 - OFFSET) : load
  const pct = (kg) => `${Math.max(3, (kg / MAX_LOAD) * 100)}%`

  return (
    <div className="grid gap-8 md:grid-cols-5">
      {/* Scene */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-950/60 p-4 md:col-span-2">
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: on ? 1 : 0.25,
            backgroundImage: 'radial-gradient(55% 45% at 50% 80%, rgba(34,211,238,0.35), transparent 70%)',
          }}
          aria-hidden="true"
        />
        <svg
          viewBox="0 0 320 300"
          className="relative h-auto w-full"
          role="img"
          aria-label={
            on
              ? 'Backpack floating above the ground with magnetic levitation on'
              : 'Backpack resting on the ground with magnetic levitation off'
          }
        >
          <defs>
            <linearGradient id="bagBody" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#47576d" />
              <stop offset="1" stopColor="#222d3b" />
            </linearGradient>
          </defs>

          <line x1="20" y1="272" x2="300" y2="272" stroke="#38b6ff" strokeOpacity="0.25" />

          {/* contact shadow */}
          <motion.ellipse
            cx="160"
            cy="274"
            rx="74"
            ry="7"
            fill="#000"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            animate={{ scaleX: on ? 0.6 : 1, opacity: on ? 0.18 : 0.5 }}
            transition={{ duration: 0.5 }}
          />

          {/* magnetic field rings */}
          {[0, 1, 2].map((i) => (
            <motion.ellipse
              key={i}
              cx="160"
              cy="268"
              rx={46 + i * 22}
              ry={6 + i * 2.5}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1.5"
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              animate={
                on
                  ? { opacity: [0.15, 0.85, 0.15], scale: [0.96, 1.04, 0.96] }
                  : { opacity: 0, scale: 1 }
              }
              transition={
                on
                  ? { duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }
                  : { duration: 0.3 }
              }
            />
          ))}

          {/* bag: lifts when levitation is on */}
          <motion.g animate={{ y: on ? -38 : 0 }} transition={{ type: 'spring', stiffness: 110, damping: 14 }}>
            {/* straps */}
            <path d="M104 96 C70 108 70 192 104 218" fill="none" stroke="#161f2b" strokeWidth="9" strokeLinecap="round" />
            <path d="M216 96 C250 108 250 192 216 218" fill="none" stroke="#161f2b" strokeWidth="9" strokeLinecap="round" />
            {/* laptop poking out of the top */}
            <rect x="120" y="34" width="80" height="76" rx="7" fill="#0f1620" stroke="#38b6ff" strokeOpacity="0.6" />
            <line x1="132" y1="46" x2="132" y2="98" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
            {/* body */}
            <rect x="98" y="72" width="124" height="172" rx="28" fill="url(#bagBody)" />
            <rect x="112" y="150" width="96" height="72" rx="16" fill="#1a2330" />
            {/* control panel */}
            <rect x="134" y="104" width="52" height="26" rx="7" fill="#04121f" stroke="#38b6ff" strokeOpacity="0.7" />
            <circle cx="146" cy="117" r="3.5" fill={on ? '#4ade80' : '#64748b'} />
            <text
              x="168"
              y="121"
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="#e8f1ff"
              fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            >
              {on ? 'ON' : 'OFF'}
            </text>
            {/* levitation module */}
            <ellipse cx="160" cy="246" rx="48" ry="10" fill="#0b1522" stroke="#8fd6ff" strokeOpacity={on ? 0.9 : 0.35} />
            <ellipse cx="160" cy="246" rx="30" ry="5.5" fill="none" stroke="#22d3ee" strokeOpacity={on ? 0.9 : 0.3} />
          </motion.g>
        </svg>
      </div>

      {/* Controls + readout */}
      <div className="space-y-7 md:col-span-3">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div>
            <p id="lev-label" className="font-display text-base font-bold text-white">
              Magnetic Levitation
            </p>
            <p className="mt-0.5 text-sm text-ink/60">{on ? 'ON · load offset active' : 'OFF · full load on your back'}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={on}
            aria-labelledby="lev-label"
            onClick={() => setOn((v) => !v)}
            className={`relative h-9 w-[4.25rem] shrink-0 rounded-full transition-colors duration-300 ${
              on ? 'bg-brand shadow-glow-sm' : 'bg-white/15'
            }`}
          >
            <motion.span
              className="absolute left-1 top-1 h-7 w-7 rounded-full bg-white shadow"
              animate={{ x: on ? 32 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="load" className="text-sm font-semibold text-white">
              What’s in your bag?
            </label>
            <span className="font-display text-sm font-bold text-white">{load} kg</span>
          </div>
          <input
            id="load"
            type="range"
            min="2"
            max={MAX_LOAD}
            step="0.5"
            value={load}
            onChange={(e) => setLoad(Number(e.target.value))}
            className="mt-3 h-11 w-full cursor-pointer accent-brand"
          />
          <div className="flex justify-between text-xs text-ink/50">
            <span>Light day · 2 kg</span>
            <span>Laptops + gear · {MAX_LOAD} kg</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm text-ink/60">You feel</p>
          <p className="mt-1 font-display text-5xl font-extrabold tracking-tight text-white">
            <AnimatedNumber value={felt} decimals={1} />
            <span className="ml-2 text-xl font-semibold text-brand">kg</span>
          </p>

          <div className="mt-5 space-y-3 text-xs">
            <div>
              <div className="mb-1 flex justify-between text-ink/60">
                <span>Without levitation</span>
                <span>{load} kg</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-white/50" style={{ width: pct(load) }} />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-ink/60">
                <span>With levitation</span>
                <span>{(load * (1 - OFFSET)).toFixed(1)} kg</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand to-glow transition-[width] duration-500"
                  style={{ width: pct(load * (1 - OFFSET)) }}
                />
              </div>
            </div>
          </div>
        </div>

        <p role="status" className="text-sm text-ink/70">
          {on
            ? `Levitation is on. About ${Math.round(OFFSET * 100)}% of the weight is gone.`
            : `Levitation is off. You are carrying the full ${load} kg.`}
        </p>
      </div>
    </div>
  )
}
