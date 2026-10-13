import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BatteryCharging, Minus, Plus, Power, Snowflake, Sun, Zap } from 'lucide-react'

const AMBIENT = 34
const MIN_TARGET = 2
const MAX_TARGET = 12

const MODES = [
  { id: 'solar', label: 'Solar', icon: Sun, screen: 'Solar Charging ON' },
  { id: 'wireless', label: 'Wireless', icon: Zap, screen: 'Wireless Charging ON' },
  { id: 'off', label: 'Unplugged', icon: Power, screen: 'Not charging' },
]
const PRESETS = [
  { value: 4, label: '4°C Ideal' },
  { value: 8, label: '8°C' },
  { value: 12, label: '12°C' },
]

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n))

export default function BottleWidget() {
  const [target, setTarget] = useState(4)
  const [mode, setMode] = useState('solar')
  const [sim, setSim] = useState({ temp: 28, battery: 68 })

  // One tick per second: temperature moves toward the target, battery charges or drains.
  useEffect(() => {
    const id = setInterval(() => {
      setSim(({ temp, battery }) => {
        const hasPower = battery > 0
        let nextTemp
        if (hasPower) {
          const diff = target - temp
          nextTemp = Math.abs(diff) <= 0.6 ? target : temp + Math.sign(diff) * 0.6
        } else {
          nextTemp = Math.min(AMBIENT, temp + 0.3)
        }
        const working = hasPower && Math.abs(target - temp) > 0.15
        const charge = mode === 'solar' ? 0.5 : mode === 'wireless' ? 1.2 : 0
        const drain = working ? 0.7 : 0.15
        return { temp: nextTemp, battery: clamp(battery + charge - drain, 0, 100) }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [target, mode])

  const temp = Math.round(sim.temp)
  const battery = Math.round(sim.battery)
  const working = sim.battery > 0 && Math.abs(target - sim.temp) > 0.15
  const status =
    sim.battery <= 0
      ? 'Out of power. The temperature is drifting back up.'
      : working
        ? `Cooling to ${target}°C…`
        : `Holding ${target}°C. Perfectly chilled.`
  const modeInfo = MODES.find((m) => m.id === mode)
  const cold = clamp((AMBIENT - sim.temp) / (AMBIENT - MIN_TARGET), 0, 1)

  return (
    <div className="grid gap-8 md:grid-cols-5">
      {/* Bottle with live screen */}
      <div className="relative grid place-items-center overflow-hidden rounded-2xl border border-white/10 bg-navy-950/60 p-6 md:col-span-2">
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: 0.25 + cold * 0.55,
            backgroundImage: 'radial-gradient(60% 50% at 50% 55%, rgba(56,182,255,0.55), transparent 70%)',
          }}
          aria-hidden="true"
        />
        <svg
          viewBox="0 0 220 380"
          className="relative h-auto w-full max-w-[220px]"
          role="img"
          aria-label={`Breeze Hydration bottle display: ${temp} degrees Celsius current, target ${target}, battery ${battery} percent`}
        >
          <defs>
            <linearGradient id="bottleBody" x1="0" x2="1">
              <stop offset="0" stopColor="#0c1422" />
              <stop offset="0.5" stopColor="#1a2436" />
              <stop offset="1" stopColor="#070b14" />
            </linearGradient>
            <pattern id="solarGrid" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M16 0H0V16" fill="none" stroke="#24456f" strokeWidth="1" />
            </pattern>
          </defs>
          <ellipse cx="110" cy="366" rx="70" ry="8" fill="#000" opacity="0.35" />
          {/* cap + body */}
          <rect x="60" y="12" width="100" height="60" rx="18" fill="url(#bottleBody)" />
          <rect x="38" y="60" width="144" height="300" rx="36" fill="url(#bottleBody)" stroke="#2a3a55" strokeWidth="1" />
          {/* flexible solar panel */}
          <rect x="48" y="104" width="124" height="214" rx="14" fill="#0a1a33" />
          <rect x="48" y="104" width="124" height="214" rx="14" fill="url(#solarGrid)" />
          {/* Indonesian flag accent */}
          <rect x="146" y="74" width="24" height="8" rx="1.5" fill="#e11d48" />
          <rect x="146" y="82" width="24" height="8" rx="1.5" fill="#f1f5f9" />
          {/* screen */}
          <rect x="66" y="122" width="88" height="140" rx="10" fill="#04121f" stroke="#38b6ff" strokeOpacity="0.55" />
          <g textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif">
            <text x="110" y="144" fontSize="11" fontWeight="700" fill="#8fd6ff">BREEZE</text>
            <text x="110" y="156" fontSize="7" fill="#8fd6ff">Smart Hydration</text>
            <text x="110" y="202" fontSize="42" fontWeight="700" fill="#ffffff">{temp}°C</text>
            <text x="110" y="216" fontSize="8" fill="#8fd6ff">Current</text>
            <text x="110" y="232" fontSize="8.5" fill="#cbd5e1">Target: {target}°C</text>
            <text x="110" y="244" fontSize="8.5" fill="#cbd5e1">Battery: {battery}%</text>
            <text x="110" y="256" fontSize="7.5" fontWeight="600" fill={mode === 'off' ? '#94a3b8' : '#4ade80'}>
              {modeInfo.screen}
            </text>
          </g>
          <text x="110" y="300" textAnchor="middle" fontSize="13" letterSpacing="2.5" fill="#9aa4b2" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif">
            BREEZE
          </text>
        </svg>
      </div>

      {/* Controls */}
      <div className="space-y-7 md:col-span-3">
        <div>
          <div className="flex items-center justify-between">
            <p id="target-label" className="text-sm font-semibold text-white">
              Target temperature
            </p>
            <span className="text-xs text-ink/50">Outside: {AMBIENT}°C</span>
          </div>
          <div className="mt-3 flex items-center gap-3" role="group" aria-labelledby="target-label">
            <button
              type="button"
              onClick={() => setTarget((t) => Math.max(MIN_TARGET, t - 1))}
              disabled={target <= MIN_TARGET}
              aria-label="Lower target temperature"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-brand hover:bg-brand/10 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <Minus className="h-5 w-5" />
            </button>
            <output
              aria-live="polite"
              className="grid h-12 min-w-[6.5rem] place-items-center rounded-full bg-white/[0.06] px-5 font-display text-xl font-bold text-white ring-1 ring-white/10"
            >
              {target}°C
            </output>
            <button
              type="button"
              onClick={() => setTarget((t) => Math.min(MAX_TARGET, t + 1))}
              disabled={target >= MAX_TARGET}
              aria-label="Raise target temperature"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-brand hover:bg-brand/10 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setTarget(p.value)}
                aria-pressed={target === p.value}
                className={`h-10 rounded-full px-4 text-sm font-semibold transition-colors ${
                  target === p.value
                    ? 'bg-brand text-navy-950'
                    : 'border border-white/15 text-ink/80 hover:border-brand/60 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p id="charge-label" className="text-sm font-semibold text-white">
            Charging
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2" role="group" aria-labelledby="charge-label">
            {MODES.map((m) => {
              const Icon = m.icon
              const selected = mode === m.id
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  aria-pressed={selected}
                  className={`flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors ${
                    selected
                      ? 'bg-brand text-navy-950 shadow-glow-sm'
                      : 'border border-white/15 text-ink/80 hover:border-brand/60 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {m.label}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 font-semibold text-white">
              <BatteryCharging className="h-4 w-4 text-glow" aria-hidden="true" />
              Battery
            </span>
            <span className="font-display font-bold text-white">{battery}%</span>
          </div>
          <div
            role="progressbar"
            aria-label="Battery level"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={battery}
            className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10"
          >
            <motion.div
              className="h-full origin-left rounded-full bg-gradient-to-r from-brand to-glow"
              animate={{ scaleX: sim.battery / 100 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>

        <p
          role="status"
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ink/85"
        >
          <Snowflake className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          {status}
        </p>
      </div>
    </div>
  )
}
