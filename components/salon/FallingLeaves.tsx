import type { SeasonTheme } from '@/lib/theme'

const LEAVES = [
  { left: '4%', delay: '0s', duration: '13s', size: 28, drift: '36px', spin: '320deg', sway: '3.1s', color: '#B04A2A', kind: 0 },
  { left: '12%', delay: '2.4s', duration: '15s', size: 34, drift: '-48px', spin: '-280deg', sway: '3.8s', color: '#C4783A', kind: 1 },
  { left: '21%', delay: '6s', duration: '12s', size: 22, drift: '28px', spin: '400deg', sway: '2.6s', color: '#8A341C', kind: 0 },
  { left: '31%', delay: '1.1s', duration: '16s', size: 32, drift: '52px', spin: '-360deg', sway: '4.2s', color: '#D4A04A', kind: 1 },
  { left: '42%', delay: '4.5s', duration: '14s', size: 26, drift: '-32px', spin: '260deg', sway: '3.4s', color: '#B04A2A', kind: 0 },
  { left: '52%', delay: '8s', duration: '13s', size: 36, drift: '44px', spin: '-420deg', sway: '3.6s', color: '#E8B87A', kind: 1 },
  { left: '61%', delay: '0.6s', duration: '17s', size: 24, drift: '-40px', spin: '300deg', sway: '2.9s', color: '#8A341C', kind: 0 },
  { left: '70%', delay: '3.2s', duration: '12.5s', size: 30, drift: '30px', spin: '-240deg', sway: '3.3s', color: '#C4783A', kind: 1 },
  { left: '78%', delay: '7s', duration: '15.5s', size: 26, drift: '-56px', spin: '380deg', sway: '4s', color: '#B04A2A', kind: 0 },
  { left: '86%', delay: '1.8s', duration: '14s', size: 32, drift: '38px', spin: '-300deg', sway: '3.5s', color: '#D4A04A', kind: 1 },
  { left: '93%', delay: '5.2s', duration: '16s', size: 20, drift: '-24px', spin: '340deg', sway: '2.8s', color: '#8A341C', kind: 0 },
  { left: '26%', delay: '10s', duration: '18s', size: 24, drift: '46px', spin: '-260deg', sway: '3.7s', color: '#E8B87A', kind: 1 },
] as const

const PETALS = [
  { left: '8%', delay: '0s', duration: '18s', size: 14, drift: '28px', spin: '200deg', sway: '4.2s', color: '#F2C2D0', kind: 0 },
  { left: '22%', delay: '3s', duration: '20s', size: 18, drift: '-36px', spin: '-160deg', sway: '4.8s', color: '#E8A0B4', kind: 1 },
  { left: '38%', delay: '7s', duration: '17s', size: 12, drift: '22px', spin: '240deg', sway: '3.6s', color: '#F7D6E0', kind: 0 },
  { left: '54%', delay: '1.4s', duration: '22s', size: 16, drift: '-20px', spin: '-220deg', sway: '5s', color: '#D67894', kind: 1 },
  { left: '68%', delay: '5.5s', duration: '19s', size: 14, drift: '32px', spin: '180deg', sway: '4.4s', color: '#F2C2D0', kind: 0 },
  { left: '82%', delay: '9s', duration: '21s', size: 18, drift: '-28px', spin: '-140deg', sway: '4.6s', color: '#E8A0B4', kind: 1 },
  { left: '46%', delay: '12s', duration: '23s', size: 12, drift: '18px', spin: '260deg', sway: '3.8s', color: '#F7D6E0', kind: 0 },
  { left: '92%', delay: '2.2s', duration: '18s', size: 15, drift: '-16px', spin: '-200deg', sway: '4s', color: '#D67894', kind: 1 },
] as const

function Leaf({ kind, color }: { kind: number; color: string }) {
  if (kind === 1) {
    return (
      <svg viewBox="0 0 24 24" fill={color} className="h-full w-full">
        <path d="M12 2C8 6 4 8 4 13c0 4 3.5 7 8 9 4.5-2 8-5 8-9 0-5-4-7-8-11z" />
        <path d="M12 6v14" stroke="#3E2418" strokeOpacity="0.35" strokeWidth="0.8" fill="none" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill={color} className="h-full w-full">
      <path d="M12 22c0-6-1-8-4-8-4 0-5-4-2-6-2-2 0-5 3-3 0-3 3-4 3-4s3 1 3 4c3-2 5 1 3 3 3 2 2 6-2 6-3 0-4 2-4 8z" />
    </svg>
  )
}

function Petal({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className="h-full w-full">
      <ellipse cx="12" cy="12" rx="5" ry="10" />
    </svg>
  )
}

export default function FallingLeaves({ theme }: { theme: SeasonTheme }) {
  const pieces = theme === 'autumn' ? LEAVES : theme === 'spring' ? PETALS : null
  if (!pieces) return null

  return (
    <div aria-hidden className="falling-leaves pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {pieces.map((piece, i) => (
        <span
          key={i}
          className="falling-leaf absolute"
          style={{
            left: piece.left,
            width: piece.size,
            height: piece.size,
            animationDuration: piece.duration,
            animationDelay: piece.delay,
            ['--leaf-drift' as string]: piece.drift,
            ['--leaf-spin' as string]: piece.spin,
          }}
        >
          <span className="leaf-sway block h-full w-full" style={{ animationDuration: piece.sway }}>
            {theme === 'spring' ? <Petal color={piece.color} /> : <Leaf kind={piece.kind} color={piece.color} />}
          </span>
        </span>
      ))}
    </div>
  )
}
