import { motion } from 'framer-motion'
import Logo from './Logo.jsx'

// Node graph drawn from the logo's circuit motif: straight traces + round nodes on a coarse grid.
const NODES = [
  [300, 300], // 0: hub (behind the logo)
  [130, 150],
  [260, 80],
  [450, 120],
  [540, 260],
  [500, 430],
  [350, 520],
  [160, 470],
  [60, 320],
  [200, 220],
  [410, 210],
  [430, 370],
  [240, 400],
]

const EDGES = [
  [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 1],
  [9, 1], [9, 2], [9, 0], [10, 3], [10, 2], [10, 0], [11, 5], [11, 4],
  [11, 0], [12, 7], [12, 6], [12, 0], [9, 8], [10, 4], [11, 6], [12, 8],
]

// Edges that carry a travelling signal dot.
const PULSES = [9, 12, 15, 18, 3, 6]

const edgePath = ([a, b]) => {
  const [x1, y1] = NODES[a]
  const [x2, y2] = NODES[b]
  return `M${x1} ${y1} L${x2} ${y2}`
}

export default function CircuitNetwork() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]" aria-hidden="true">
      <div className="absolute inset-[18%] rounded-full bg-brand/25 blur-3xl" />

      <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" fill="none">
        <g
          className="origin-center animate-spinSlow motion-reduce:animate-none"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <circle cx="300" cy="300" r="250" stroke="#38b6ff" strokeOpacity="0.18" strokeDasharray="2 10" />
        </g>
        <g
          className="origin-center animate-spinSlowReverse motion-reduce:animate-none"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <circle cx="300" cy="300" r="170" stroke="#38b6ff" strokeOpacity="0.28" strokeDasharray="6 14" />
        </g>

        {EDGES.map((edge, i) => (
          <motion.path
            key={i}
            d={edgePath(edge)}
            stroke="#38b6ff"
            strokeOpacity="0.42"
            strokeWidth="1.25"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, delay: 0.25 + i * 0.05, ease: 'easeOut' }}
          />
        ))}

        <g className="motion-reduce:hidden">
          {PULSES.map((edgeIndex, i) => (
            <circle key={edgeIndex} r="3.5" fill="#22d3ee">
              <animateMotion
                dur={`${3.2 + (i % 3) * 0.7}s`}
                begin={`${i * 0.6}s`}
                repeatCount="indefinite"
                path={edgePath(EDGES[edgeIndex])}
              />
            </circle>
          ))}
        </g>

        {NODES.slice(1).map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="9" fill="#38b6ff" opacity="0.12" />
            <circle
              cx={cx}
              cy={cy}
              r="4.5"
              fill="#8fd6ff"
              className="animate-pulseNode motion-reduce:animate-none"
              style={{
                animationDelay: `${(i % 6) * 0.45}s`,
                transformBox: 'fill-box',
                transformOrigin: 'center',
              }}
            />
          </g>
        ))}
      </svg>

      <div className="absolute inset-0 grid place-items-center">
        <div className="animate-drift motion-reduce:animate-none">
          <Logo className="h-[34vw] max-h-48 w-[34vw] max-w-48 sm:max-h-52 sm:max-w-52" glow />
        </div>
      </div>
    </div>
  )
}
