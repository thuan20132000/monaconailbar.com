import type { SeasonTheme } from '@/lib/theme'

const FLAKES = [
  { left: '3%', delay: '0s', duration: '16s', size: 3, drift: '18px', opacity: 0.85 },
  { left: '8%', delay: '4s', duration: '20s', size: 5, drift: '-22px', opacity: 0.55 },
  { left: '14%', delay: '1.5s', duration: '18s', size: 2, drift: '12px', opacity: 0.7 },
  { left: '19%', delay: '8s', duration: '22s', size: 4, drift: '-16px', opacity: 0.4 },
  { left: '25%', delay: '2s', duration: '15s', size: 3, drift: '24px', opacity: 0.75 },
  { left: '31%', delay: '6s', duration: '19s', size: 6, drift: '-10px', opacity: 0.35 },
  { left: '37%', delay: '0.8s', duration: '21s', size: 2, drift: '14px', opacity: 0.6 },
  { left: '43%', delay: '5s', duration: '17s', size: 4, drift: '-20px', opacity: 0.5 },
  { left: '49%', delay: '9s', duration: '23s', size: 3, drift: '16px', opacity: 0.65 },
  { left: '55%', delay: '3s', duration: '16s', size: 5, drift: '-14px', opacity: 0.4 },
  { left: '61%', delay: '7s', duration: '20s', size: 2, drift: '20px', opacity: 0.8 },
  { left: '67%', delay: '1s', duration: '18s', size: 4, drift: '-18px', opacity: 0.45 },
  { left: '73%', delay: '10s', duration: '22s', size: 3, drift: '12px', opacity: 0.6 },
  { left: '79%', delay: '2.5s', duration: '15s', size: 6, drift: '-24px', opacity: 0.3 },
  { left: '85%', delay: '6.5s', duration: '19s', size: 2, drift: '10px', opacity: 0.75 },
  { left: '91%', delay: '4.5s', duration: '21s', size: 4, drift: '-12px', opacity: 0.5 },
  { left: '96%', delay: '8.5s', duration: '17s', size: 3, drift: '16px', opacity: 0.55 },
  { left: '47%', delay: '12s', duration: '24s', size: 2, drift: '-8px', opacity: 0.7 },
] as const

export default function Snowfall({ theme }: { theme: SeasonTheme }) {
  if (theme !== 'winter') return null

  return (
    <div aria-hidden className="snowfall pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {FLAKES.map((flake, i) => (
        <span
          key={i}
          className="snowflake absolute"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animationDuration: flake.duration,
            animationDelay: flake.delay,
            ['--snow-drift' as string]: flake.drift,
          }}
        />
      ))}
    </div>
  )
}
