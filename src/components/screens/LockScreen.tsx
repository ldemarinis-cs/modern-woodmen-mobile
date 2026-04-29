import { useNavigate } from 'react-router-dom'
import { Signal, Wifi, BatteryFull } from 'lucide-react'
import wallpaper from '../../assets/lockscreen-wallpaper.png'

// iOS lock screen mockup — presentation only, not part of the app UI system.
// Rounded corners and system-ui font intentional — mocking iOS chrome, not MW components.

export type LockScreenScenario = 'followup' | 'reassignment'

const content: Record<LockScreenScenario, { title: string; body: string; time: string }> = {
  followup: {
    title: 'Third follow-up sent',
    body: "Your team sent another request to Dr. Carter's office for your medical records form. You'll be notified when it's received.",
    time: '2h ago',
  },
  reassignment: {
    title: 'Your representative has changed',
    body: "Sarah Mitchell is now your advisor. She'll reach out within 2 business days to introduce herself.",
    time: 'Apr 20',
  },
}

export function LockScreen({ scenario }: { scenario: LockScreenScenario }) {
  const navigate = useNavigate()
  const notif = content[scenario]

  return (
    <div className="flex flex-col h-full relative overflow-hidden select-none">

      {/* Wallpaper */}
      <img
        src={wallpaper}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Scrim — darkens top and bottom for legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* ── Status bar row ─────────────────────────────────────────────────── */}
      <div
        className="relative z-10 flex items-center justify-between px-6"
        style={{ paddingTop: 14, paddingBottom: 4 }}
      >
        <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 600, fontSize: 15, color: 'white' }}>
          9:41
        </span>
        <div className="flex items-center gap-1.5">
          <Signal size={14} color="white" aria-hidden="true" />
          <Wifi    size={14} color="white" aria-hidden="true" />
          <BatteryFull size={18} color="white" aria-hidden="true" />
        </div>
      </div>

      {/* ── Clock ──────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center mt-8">
        <p
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 200,
            fontSize: 78,
            color: 'white',
            lineHeight: 1,
            letterSpacing: -3,
            margin: 0,
            textShadow: '0 2px 12px rgba(0,0,0,0.4)',
          }}
        >
          9:41
        </p>
        <p
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 400,
            fontSize: 17,
            color: 'rgba(255,255,255,0.88)',
            marginTop: 6,
            textShadow: '0 1px 6px rgba(0,0,0,0.4)',
          }}
        >
          Tuesday, April 29
        </p>
      </div>

      {/* ── Notification card ──────────────────────────────────────────────── */}
      <div className="relative z-10 px-4 mt-10">
        <button
          onClick={() => navigate(-1)}
          className="w-full text-left active:opacity-80 transition-opacity"
          aria-label="Open notification"
        >
          <div
            style={{
              background: 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: 16,
              padding: '13px 14px',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {/* App header row */}
            <div className="flex items-center gap-2 mb-2">
              <div
                style={{
                  width: 22, height: 22,
                  borderRadius: 6,
                  background: '#1B6090',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <img src="/mw-shield.webp" alt="" aria-hidden="true" style={{ height: 15, width: 'auto' }} />
              </div>
              <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 600, fontSize: 12, color: 'rgba(255,255,255,0.85)', flex: 1 }}>
                Modern Woodmen
              </span>
              <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                {notif.time}
              </span>
            </div>
            <p style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 600, fontSize: 14, color: 'white', margin: '0 0 3px 0', lineHeight: '19px' }}>
              {notif.title}
            </p>
            <p style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: '19px' }}>
              {notif.body}
            </p>
          </div>
        </button>
      </div>

      {/* ── Home indicator (iOS drag pill) ─────────────────────────────────── */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center z-10">
        <div style={{ width: 134, height: 5, background: 'rgba(255,255,255,0.55)', borderRadius: 100 }} />
      </div>
    </div>
  )
}
