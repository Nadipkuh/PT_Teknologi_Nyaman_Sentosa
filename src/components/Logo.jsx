import { asset } from '../data/content.js'

export default function Logo({ className = 'h-10 w-10', glow = false }) {
  return (
    <img
      src={asset('images/tns-logo.png')}
      alt="TNS shield logo"
      width="380"
      height="385"
      className={`${className} object-contain ${glow ? 'drop-shadow-[0_0_28px_rgba(56,182,255,0.55)]' : ''}`}
    />
  )
}
