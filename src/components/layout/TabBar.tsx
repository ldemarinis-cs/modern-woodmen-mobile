import { useNavigate, useLocation } from 'react-router-dom'
import {
  HomeIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeSolid,
  EnvelopeIcon as EnvelopeSolid,
  DocumentTextIcon as DocumentTextSolid,
  UserCircleIcon as UserCircleSolid,
} from '@heroicons/react/24/solid'

// [ui-candidate] TabBar
// Reason: Primary bottom navigation used on all top-level screens
// Props needed: none — reads route from useLocation

const tabs = [
  { id: 'home',         label: 'Home',         path: '/',              Icon: HomeIcon,         IconActive: HomeSolid },
  { id: 'messages',     label: 'Messages',     path: '/messages',      Icon: EnvelopeIcon,     IconActive: EnvelopeSolid },
  { id: 'certificates', label: 'Certificates', path: '/certificates',  Icon: DocumentTextIcon, IconActive: DocumentTextSolid },
  { id: 'profile',      label: 'Profile',      path: '/profile',       Icon: UserCircleIcon,   IconActive: UserCircleSolid },
]

export function TabBar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path)

  return (
    <div className="bg-white border-t border-neutral-200 shrink-0" style={{ height: 83 }}>
      <div className="flex items-start justify-around pt-2 px-2">
        {tabs.map(({ id, label, path, Icon, IconActive }) => {
          const active = isActive(path)
          return (
            <button
              key={id}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-1 min-w-[44px] min-h-[44px] justify-center active:opacity-70 transition-opacity"
            >
              {active
                ? <IconActive className="w-6 h-6 text-mw-green" />
                : <Icon className="w-6 h-6 text-neutral-400" />
              }
              <span
                className={`font-sans text-[10px] leading-[13px] tracking-[0.2px] ${
                  active ? 'text-mw-green font-semibold' : 'text-neutral-400 font-normal'
                }`}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
