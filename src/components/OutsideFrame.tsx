import { useNavigate } from 'react-router-dom'

// Presentation-only component — rendered beside the phone frame, not inside it.
// Shows iOS push notification mockups for the two key scenarios:
//   1. Proactive update — delay in progress (team following up on Dr. Carter's form)
//   2. Reassignment — advisor changed due to turnover

type PushNotificationProps = {
  time: string
  title: string
  body: string
  scenario: 'update' | 'reassignment'
}

function PushNotification({ time, title, body, scenario }: PushNotificationProps) {
  const accent = scenario === 'update' ? '#25BB96' : '#1B6090'

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: 16,
        padding: '12px 14px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        width: 300,
      }}
    >
      {/* App icon */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: '#1B6090',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <img src="/mw-shield.webp" alt="" aria-hidden="true" style={{ height: 24, width: 'auto' }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
          <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 600, fontSize: 12, color: '#1F293A', letterSpacing: 0.1 }}>
            Modern Woodmen
          </span>
          <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 11, color: '#9AA6B6' }}>
            {time}
          </span>
        </div>
        <p style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 600, fontSize: 13, color: '#1F293A', margin: '0 0 2px 0', lineHeight: '18px' }}>
          {title}
        </p>
        <p style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 13, color: '#485568', margin: 0, lineHeight: '18px' }}>
          {body}
        </p>
      </div>
    </div>
  )
}

export function OutsideFrame() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        paddingTop: 60,
        width: 300,
        flexShrink: 0,
      }}
    >
      {/* Push notifications section */}
      <div>
        <p
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: '0.10em',
            color: '#9AA6B6',
            textTransform: 'uppercase',
            marginBottom: 12,
            marginTop: 0,
          }}
        >
          iOS Push Notifications
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PushNotification
            scenario="update"
            time="2h ago"
            title="Follow-up sent to Dr. Carter's office"
            body="Your team sent a third request for your medical records form. You'll be notified when it's received."
          />
          <PushNotification
            scenario="reassignment"
            time="Apr 20"
            title="Your representative has changed"
            body="Sarah Mitchell is your new advisor. She'll reach out within 2 business days."
          />
        </div>

        <p
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 11,
            color: '#9AA6B6',
            marginTop: 12,
            lineHeight: '16px',
          }}
        >
          Tap the bell icon in the app for the full notification center.
        </p>

        {/* Lock screen links */}
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: '0.10em',
              color: '#9AA6B6',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            iOS Lock Screen
          </p>
          {[
            { label: 'Application update notification', route: '/lockscreen/followup' },
            { label: 'Rep reassignment notification',   route: '/lockscreen/reassignment' },
          ].map(({ label, route }) => (
            <button
              key={route}
              onClick={() => navigate(route)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#F2F5F8',
                border: '1px solid #E3E8EF',
                borderRadius: 0,
                padding: '10px 12px',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 12, color: '#364152', fontWeight: 500 }}>
                {label}
              </span>
              <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 12, color: '#1B6090', fontWeight: 600, marginLeft: 8, flexShrink: 0 }}>
                View →
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#E3E8EF' }} />

      {/* Caption for presentation context */}
      <div>
        <p
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: '0.10em',
            color: '#9AA6B6',
            textTransform: 'uppercase',
            marginBottom: 8,
            marginTop: 0,
          }}
        >
          Key Scenarios
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              label: 'Delay visibility',
              desc: 'Member sees who owns the hold-up and what specifically is waiting — not just "in review."',
            },
            {
              label: 'Proactive updates',
              desc: 'Push fires the moment a blocker resolves. No need to check in or call an advisor.',
            },
            {
              label: 'Advisor reassignment',
              desc: 'Turnover is communicated clearly and immediately. Continuity of service, not silence.',
            },
          ].map(({ label, desc }) => (
            <div key={label}>
              <p style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 600, fontSize: 12, color: '#1F293A', margin: '0 0 2px 0' }}>
                {label}
              </p>
              <p style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 12, color: '#687587', margin: 0, lineHeight: '17px' }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
