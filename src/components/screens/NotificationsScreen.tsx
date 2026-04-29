import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../layout/StatusBar'
import { NavBar } from '../layout/NavBar'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import {
  DocumentTextIcon,
  UserCircleIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid'

// ─── Mock data ─────────────────────────────────────────────────────────────────

type NotificationItem = {
  id: number
  unread: boolean
  icon: 'check' | 'clock' | 'user' | 'doc'
  title: string
  body: string
  time: string
  route?: string
}

const today: NotificationItem[] = [
  {
    id: 1,
    unread: true,
    icon: 'clock',
    title: 'Third follow-up sent to Dr. Carter\'s office',
    body: "Your Medical Records Team sent another request for the APS form. No action needed — we'll notify you when it's received.",
    time: '2h ago',
    route: '/application-detail',
  },
]

const earlier: NotificationItem[] = [
  {
    id: 2,
    unread: true,
    icon: 'clock',
    title: 'Still waiting on medical records',
    body: "Your underwriting team sent a second follow-up to Dr. Carter's office. No action needed from you.",
    time: 'Apr 22',
    route: '/application-detail',
  },
  {
    id: 3,
    unread: false,
    icon: 'user',
    title: 'Your representative has changed',
    body: "Sarah Mitchell is your new advisor after a recent reassignment. She'll reach out within 2 business days.",
    time: 'Apr 20',
    route: '/',
  },
  {
    id: 4,
    unread: false,
    icon: 'doc',
    title: 'Underwriting review started',
    body: 'All submitted documents have been verified. Your application is now in underwriting review.',
    time: 'Apr 13',
    route: '/application-detail',
  },
  {
    id: 5,
    unread: false,
    icon: 'check',
    title: 'Documents received',
    body: 'Your medical history form was received. Next step: underwriting review.',
    time: 'Apr 12',
    route: '/application-detail',
  },
]

// ─── Notification cell ─────────────────────────────────────────────────────────

function NotifIcon({ type }: { type: NotificationItem['icon'] }) {
  const base = 'w-4 h-4'
  switch (type) {
    case 'check': return <CheckCircleIcon className={`${base} text-mw-green`} />
    case 'clock': return <ClockIcon className={`${base} text-yellow-600`} />
    case 'user':  return <UserCircleIcon className={`${base} text-brand`} />
    case 'doc':   return <DocumentTextIcon className={`${base} text-neutral-500`} />
  }
}

function NotifIconBg({ type }: { type: NotificationItem['icon'] }) {
  switch (type) {
    case 'check': return 'bg-green-100'
    case 'clock': return 'bg-yellow-100'
    case 'user':  return 'bg-brand-97 border border-brand-88'
    case 'doc':   return 'bg-neutral-100'
  }
}

function NotifCell({ item, last }: { item: NotificationItem; last: boolean }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => item.route && navigate(item.route)}
      className={`w-full flex items-start gap-3 px-4 py-4 text-left active:opacity-70 transition-opacity ${
        last ? '' : 'border-b border-neutral-100'
      } ${item.unread ? 'bg-white' : 'bg-white'}`}
    >
      {/* Unread dot */}
      <div className="flex flex-col items-center pt-1 shrink-0" style={{ width: 8 }}>
        {item.unread && (
          <span className="w-2 h-2 rounded-full bg-brand shrink-0" />
        )}
      </div>

      {/* Icon */}
      <div className={`w-8 h-8 flex items-center justify-center shrink-0 ${NotifIconBg({ type: item.icon })}`}>
        <NotifIcon type={item.icon} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`font-sans font-semibold text-sm leading-5 ${item.unread ? 'text-neutral-800' : 'text-neutral-600'}`}>
            {item.title}
          </p>
          <span className="font-sans text-xs text-neutral-400 leading-4 shrink-0 mt-0.5">{item.time}</span>
        </div>
        <p className="font-sans text-sm text-neutral-500 leading-5 mt-0.5 line-clamp-2">
          {item.body}
        </p>
      </div>

      <ChevronRightIcon className="w-4 h-4 text-neutral-300 shrink-0 mt-1" />
    </button>
  )
}

// ─── Screen ────────────────────────────────────────────────────────────────────

export function NotificationsScreen() {
  const navigate = useNavigate()
  const unreadCount = [...today, ...earlier].filter(n => n.unread).length

  return (
    <div className="flex flex-col h-full bg-neutral-100">
      <StatusBar />
      <NavBar
        title="Notifications"
        onBack={() => navigate('/')}
        backLabel="Home"
        hideBell
      />

      <div className="flex-1 overflow-y-auto pb-8">

        {/* Unread count strip */}
        {unreadCount > 0 && (
          <div className="bg-brand px-4 py-2 flex items-center justify-between">
            <p className="font-sans text-sm text-white/90 leading-5">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
            <button className="font-sans text-sm text-white/70 leading-5 active:opacity-70 transition-opacity">
              Mark all read
            </button>
          </div>
        )}

        {/* Today */}
        <div className="px-4 pt-5 pb-2">
          <p className="font-sans font-semibold text-xs text-neutral-500 leading-4 uppercase tracking-[0.08em]">
            Today
          </p>
        </div>
        <div className="mx-4 bg-white border border-neutral-200 overflow-hidden mb-4">
          {today.map((item, i) => (
            <NotifCell key={item.id} item={item} last={i === today.length - 1} />
          ))}
        </div>

        {/* Earlier */}
        <div className="px-4 pb-2">
          <p className="font-sans font-semibold text-xs text-neutral-500 leading-4 uppercase tracking-[0.08em]">
            Earlier
          </p>
        </div>
        <div className="mx-4 bg-white border border-neutral-200 overflow-hidden">
          {earlier.map((item, i) => (
            <NotifCell key={item.id} item={item} last={i === earlier.length - 1} />
          ))}
        </div>

      </div>
    </div>
  )
}
