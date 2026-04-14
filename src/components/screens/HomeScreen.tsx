import { useRef, useState } from 'react'
import { StatusBar } from '../layout/StatusBar'
import { NavBar } from '../layout/NavBar'
import { TabBar } from '../layout/TabBar'
import { ApplicationStatusSummary, StageCarousel } from '../shared/ApplicationStageTracker'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import woodmenIcon from '../../assets/woodmen-icon.svg'
import woodmenPrairie from '../../assets/woodmen-prarie.svg'

// ─── Mock data ────────────────────────────────────────────────────────────────
// NOTE: No policy data shown while application is in review — policy does not
// exist yet. Recent activity is limited to application-related events only.

const recentActivity = [
  { id: 4, title: 'Underwriting Started',        subtitle: 'Review typically takes 5–10 days',       date: 'Apr 13', amount: null,     positive: null  },
  { id: 3, title: 'Documents Submitted',         subtitle: 'Medical history form uploaded',          date: 'Apr 12', amount: null,     positive: null  },
  { id: 2, title: 'Documents Requested',         subtitle: 'Medical history form',                  date: 'Apr 11', amount: null,     positive: null  },
  { id: 1, title: 'Application Received',        subtitle: 'Confirmation sent to james@email.com', date: 'Apr 10', amount: null,     positive: null  },
]

// ─── Section header ────────────────────────────────────────────────────────────

function SectionHeader({ title, onSeeAll }: { title: string; onSeeAll?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-3 px-4">
      <h2 className="font-sans font-semibold text-base text-neutral-800 leading-[22px]">{title}</h2>
      {onSeeAll && (
        <button
          onClick={onSeeAll}
          className="font-sans text-sm text-mw-green leading-5 active:opacity-70 transition-opacity"
        >
          See all
        </button>
      )}
    </div>
  )
}

// ─── Screen ────────────────────────────────────────────────────────────────────

export function HomeScreen() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrolled(e.currentTarget.scrollTop > 24)
  }

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col h-full bg-neutral-100">
      <StatusBar />
      <NavBar scrolled={scrolled} onLogoPress={scrollToTop} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto pb-[83px]" onScroll={handleScroll}>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        {/* Accessibility: text-white ≈ 6.5:1, text-white/80 ≈ 4.8:1 on #1B6090.
            Never use brand tint tokens as text on bg-brand — they fail WCAG AA. */}
        <div className="bg-brand px-6 pt-5 pb-20 relative overflow-hidden">


          {/* Decorative: radial glow from bottom-right — softens the flat blue */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 90% 100%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 40%, transparent 68%)',
            }}
          />

          {/* Decorative: prairie SVG — bottom-right, low opacity */}
          <img
            src={woodmenPrairie}
            alt=""
            aria-hidden="true"
            className="absolute -bottom-12 -right-12 pointer-events-none"
            style={{
              width: 405,
              opacity: 0.10,
              maskImage: 'linear-gradient(to right, transparent 0%, white 40%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, white 40%)',
            }}
          />

          {/* Content — sits above decorative layers */}
          <div className="relative">

            {/* Block 1 — who */}
            <div className="mb-6">
              <p className="font-sans font-semibold text-xl text-white leading-7">
                Good morning, James
              </p>
              <span className="inline-flex items-center gap-1.5 mt-2 px-2 py-1 bg-white/10 border border-white/20">
                <img src={woodmenIcon} alt="" aria-hidden="true" className="w-4 h-4 shrink-0 opacity-70" />
                <span className="font-sans text-xs text-white/70 leading-none tracking-[0.2px]">
                  Member since 2026
                </span>
              </span>
            </div>

            {/* Block 2 — what they applied for */}
            <div>
              <p className="text-sm font-sans font-semibold text-white/90 leading-5 mb-1">
                Coverage Requested
              </p>
              <p className="font-display font-semibold text-4xl text-white leading-10 tracking-tight">
                $250,000
              </p>
              <p className="font-sans text-sm text-white/80 leading-5">
                Whole Life Insurance
              </p>
            </div>

          </div>
        </div>

        {/* ── Application status summary — overlaps hero ─────────────────── */}
        <div className="px-4 -mt-12 mb-4 relative z-10">
          <ApplicationStatusSummary />
        </div>

        {/* ── Stage carousel — full bleed, no container ─────────────────── */}
        <div className="mb-6">
          <StageCarousel />
        </div>

        {/* ── Recent activity ─────────────────────────────────────────────── */}
        <div className="mb-4">
          <SectionHeader title="Application Activity" onSeeAll={() => {}} />
          <div className="mx-4 bg-white border border-neutral-200 overflow-hidden">
            {recentActivity.map((item, i) => (
              <button
                key={item.id}
                className={`w-full flex items-center gap-3 px-4 py-4 min-h-[44px] active:opacity-70 transition-opacity text-left ${
                  i < recentActivity.length - 1 ? 'border-b border-neutral-100' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="flex flex-col items-center self-stretch shrink-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    i === recentActivity.length - 1 ? 'bg-brand' : 'bg-brand-74'
                  }`} />
                  {i < recentActivity.length - 1 && (
                    <div className="w-px flex-1 bg-neutral-200 mt-1" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-sans font-semibold text-sm text-neutral-800 leading-5 truncate">
                    {item.title}
                  </p>
                  <p className="font-sans text-xs text-neutral-400 leading-4">{item.subtitle}</p>
                </div>

                <div className="text-right shrink-0">
                  <p className="font-sans text-xs text-neutral-400 leading-4">{item.date}</p>
                </div>

                <ChevronRightIcon className="w-4 h-4 text-neutral-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>

      </div>

      <TabBar />
    </div>
  )
}
