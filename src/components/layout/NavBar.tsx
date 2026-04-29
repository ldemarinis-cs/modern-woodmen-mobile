import { useNavigate } from 'react-router-dom'
import { BellIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'

// [ui-candidate] NavBar
// Reason: iOS-style top navigation bar used on every screen
// Props needed: title, rightAction, scrolled, onLogoPress, onBack, backLabel, hideBell

type NavBarProps = {
  title?: string
  rightAction?: React.ReactNode
  scrolled?: boolean
  onLogoPress?: () => void
  onBack?: () => void
  backLabel?: string
  hideBell?: boolean
}

export function NavBar({ title, rightAction, scrolled = false, onLogoPress, onBack, backLabel = 'Back', hideBell = false }: NavBarProps) {
  const navigate = useNavigate()
  const isSubPage = !!title

  return (
    <div className="bg-brand flex items-center justify-between px-4 h-[56px] shrink-0 overflow-hidden">

      {/* Left — back button on sub-pages, shield mark on home */}
      <div className="flex items-center" style={{ minWidth: 44 }}>
        {onBack ? (
          <button
            onClick={onBack}
            aria-label={backLabel}
            className="flex items-center gap-0.5 h-[44px] text-white active:opacity-70 transition-opacity -ml-1"
          >
            <ChevronLeftIcon className="w-5 h-5 shrink-0" />
            <span className="font-sans text-sm text-white leading-5">{backLabel}</span>
          </button>
        ) : (
          <button
            onClick={isSubPage ? undefined : onLogoPress}
            aria-label={isSubPage ? 'Modern Woodmen' : 'Scroll to top'}
            className="flex items-center justify-center w-[44px] h-[44px] active:opacity-70 transition-opacity"
            style={isSubPage ? undefined : {
              opacity: scrolled ? 1 : 0,
              transform: scrolled ? 'translateX(0)' : 'translateX(12px)',
              transition: 'opacity 280ms ease, transform 280ms ease',
              pointerEvents: scrolled ? 'auto' : 'none',
            }}
          >
            <img src="/mw-shield.webp" alt="Modern Woodmen" className="h-8 w-auto" />
          </button>
        )}
      </div>

      {/* Center */}
      <div className="relative flex items-center justify-center">

        {/* Sub-page title — static */}
        {isSubPage && (
          <span className="font-sans font-semibold text-base text-white leading-[22px] tracking-[0.2px]">
            {title}
          </span>
        )}

        {/* Home — full lockup, fades out on scroll */}
        {!isSubPage && (
          <div
            className="flex items-center gap-1.5"
            style={{
              opacity: scrolled ? 0 : 1,
              transform: scrolled ? 'translateX(-8px)' : 'translateX(0)',
              transition: 'opacity 240ms ease, transform 280ms ease',
              pointerEvents: scrolled ? 'none' : 'auto',
            }}
          >
            <div className="flex flex-col place-content-end text-right">
              <span className="font-display font-semibold text-lg text-white leading-tight">
                Modern Woodmen
              </span>
              <span className="font-sans text-[10px] text-white/70 tracking-[0.12em] leading-none">
                FRATERNAL FINANCIAL
              </span>
            </div>
            <img src="/mw-shield.webp" alt="" aria-hidden="true" className="h-9 w-auto" />
          </div>
        )}

        {/* Home — "Home" label fades in on scroll */}
        {!isSubPage && (
          <span
            className="absolute font-sans font-semibold text-base text-white leading-[22px] tracking-[0.2px]"
            style={{
              opacity: scrolled ? 1 : 0,
              transition: 'opacity 240ms ease',
              pointerEvents: 'none',
            }}
          >
            Home
          </span>
        )}
      </div>

      {/* Right — bell or custom action */}
      <div className="w-[44px] flex items-center justify-end">
        {rightAction ?? (
          hideBell ? <div className="w-[44px]" /> : (
            <button
              onClick={() => navigate('/notifications')}
              aria-label="Notifications"
              className="flex items-center justify-center w-[44px] h-[44px] text-white active:opacity-70 transition-opacity relative"
            >
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-green-500 rounded-full" />
            </button>
          )
        )}
      </div>
    </div>
  )
}
