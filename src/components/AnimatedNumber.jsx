import { useEffect, useRef } from 'react'
import { animate, useMotionValue } from 'framer-motion'

// Tweens a number without re-rendering React on every frame.
export default function AnimatedNumber({ value, decimals = 1 }) {
  const ref = useRef(null)
  const mv = useMotionValue(value)

  useEffect(() => {
    if (ref.current) ref.current.textContent = mv.get().toFixed(decimals)
    const unsubscribe = mv.on('change', (v) => {
      if (ref.current) ref.current.textContent = v.toFixed(decimals)
    })
    return unsubscribe
  }, [mv, decimals])

  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.6, ease: 'easeOut' })
    return () => controls.stop()
  }, [mv, value])

  return <span ref={ref} />
}
