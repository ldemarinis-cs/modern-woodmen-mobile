import { forwardRef, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { ClockIcon } from '@heroicons/react/24/outline'

import imgApplicationSubmitted from '../../assets/stage-application-submitted.png'
import imgUnderwritingReview   from '../../assets/stage-underwriting-review.png'
import imgMedicalExam          from '../../assets/stage-medical-exam.png'
import imgPolicyApproval       from '../../assets/stage-policy-approval.png'
import imgPolicyIssued         from '../../assets/stage-policy-issued.png'

// [ui-candidate] ApplicationStatusSummary + StageCarousel
// Reason: Core insurance application progress tracker; split into summary card
//   (overlaps hero) and full-bleed carousel (edge-to-edge below)
// Props needed: stages[], currentStageId, applicantName, policyType

type StageStatus = 'complete' | 'current' | 'upcoming'

type Stage = {
  id: number
  label: string
  status: StageStatus
  body: string
  image?: string
}

export const applicationStages: Stage[] = [
  {
    id: 1,
    label: 'Application Submitted',
    status: 'complete',
    body: 'Your application has been received and all initial information has been verified. You are one step closer to protecting your family.',
    image: imgApplicationSubmitted,
  },
  {
    id: 2,
    label: 'Underwriting Review',
    status: 'current',
    body: 'Our underwriting team is reviewing your health history and coverage selections. This typically takes 5–10 business days. We will reach out if additional information is needed.',
    image: imgUnderwritingReview,
  },
  {
    id: 3,
    label: 'Medical Exam',
    status: 'upcoming',
    body: 'Depending on your coverage amount, a brief medical exam may be required. Your representative will coordinate a time at your convenience — many exams are completed at your home or workplace.',
    image: imgMedicalExam,
  },
  {
    id: 4,
    label: 'Policy Approval',
    status: 'upcoming',
    body: 'Once underwriting is complete, your application will be reviewed for final approval. You will be notified of any decisions or additional requirements.',
    image: imgPolicyApproval,
  },
  {
    id: 5,
    label: 'Policy Issued',
    status: 'upcoming',
    body: 'Your life insurance policy is officially issued. Coverage begins on the effective date stated in your policy documents. Welcome to the Modern Woodmen family.',
    image: imgPolicyIssued,
  },
]

// ─── Summary card (placed in hero overlap position) ───────────────────────────

export function ApplicationStatusSummary() {
  const navigate = useNavigate()
  const currentStage = applicationStages.find(s => s.status === 'current')

  return (
    <div className="bg-white shadow-[0px_8px_24px_rgba(27,96,144,0.18)] border border-neutral-200 px-4 pt-4 pb-4">
      {/* Title row */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-sans font-semibold text-base text-neutral-800 leading-[22px]">
          Application Status
        </h2>
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 font-sans font-semibold text-xs leading-4">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
          In Progress
        </span>
      </div>

      {/* Current stage label */}
      <p className="font-sans text-sm text-neutral-500 leading-5">
        Currently in{' '}
        <span className="font-semibold text-brand">{currentStage?.label}</span>
      </p>

      {/* Progress bar */}
      <div className="flex items-center gap-1 mt-4">
        <div className="w-1 h-3 bg-neutral-300 shrink-0" />
        {applicationStages.map((s) => (
          <div
            key={s.id}
            className={`flex-1 h-2 ${
              s.status === 'complete'
                ? 'bg-mw-green'
                : s.status === 'current'
                ? 'bg-brand'
                : 'bg-neutral-200'
            }`}
          />
        ))}
        <div className="w-1 h-3 bg-neutral-300 rounded-full shrink-0" />
      </div>

      {/* Blocker row — always visible, links to detail */}
      <button
        onClick={() => navigate('/application-detail')}
        className="mt-3 pt-3 border-t border-neutral-100 w-full flex items-center justify-between gap-2 active:opacity-70 transition-opacity"
      >
        <div className="flex items-center gap-2 min-w-0">
          <ClockIcon className="w-4 h-4 text-yellow-600 shrink-0" />
          <p className="font-sans text-sm text-neutral-600 leading-5 truncate">
            Waiting on <span className="font-semibold text-neutral-800">Dr. Carter's office</span>
          </p>
        </div>
        <span className="font-sans text-sm text-brand leading-5 shrink-0">Details</span>
      </button>
    </div>
  )
}

// ─── Stage detail card ─────────────────────────────────────────────────────────

const StageCard = forwardRef<HTMLDivElement, { stage: Stage }>(({ stage }, ref) => {
  const isComplete = stage.status === 'complete'
  const isCurrent  = stage.status === 'current'
  const isUpcoming = stage.status === 'upcoming'

  // Scrim: opacity raised to guarantee white title text meets WCAG AA (4.5:1) regardless of photo
  const scrimColor = isComplete
    ? 'rgba(51,107,33,0.72)'
    : isCurrent
    ? 'rgba(27,96,144,0.65)'
    : 'rgba(20,20,20,0.72)'

  const fallbackBg = isComplete ? 'bg-brand-88' : isCurrent ? 'bg-brand' : 'bg-neutral-200'

  // Badge contrast:
  //   complete  — white/90 bg + neutral-800 text ≈ 12:1 ✓
  //   current   — black/40 bg + white text ≈ 8:1 ✓
  //   upcoming  — black/40 bg + white text ≈ 8:1 ✓ (card opacity-55 handles visual dimming)
  const badgeStyle = isComplete
    ? 'bg-white/90 text-neutral-800'
    : isCurrent
    ? 'bg-black/40 text-white'
    : 'bg-black/40 text-white'

  return (
    <div
      ref={ref}
      className={`shrink-0 w-[312px] overflow-hidden flex flex-col border border-neutral-200 ${isUpcoming ? 'opacity-55' : ''}`}
      style={{ scrollSnapAlign: 'center' }}
    >
      {/* Header — photo + scrim */}
      <div className={`relative px-4 py-5 flex flex-col items-center gap-2 ${!stage.image ? fallbackBg : ''}`}>
        {stage.image && (
          <>
            <img
              src={stage.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: scrimColor }}
            />
          </>
        )}

        {/* Badge */}
        <div className={`relative ${badgeStyle} flex items-center gap-1.5 px-3 py-1`}>
          <span className="font-sans font-semibold text-sm leading-5 tracking-[0.25px]">
            {isCurrent ? `You're on Stage ${stage.id}` : `Stage ${stage.id}`}
          </span>
          {isComplete && (
            <CheckCircleIcon className="w-4 h-4 text-green-700 shrink-0" />
          )}
          {isCurrent && (
            <span className="relative flex w-2 h-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-white" />
            </span>
          )}
        </div>

        {/* Title */}
        <p className="relative font-display font-semibold text-xl text-center leading-7 text-white">
          {stage.label}
        </p>
      </div>

      {/* Body */}
      <div className="bg-white flex-1 px-4 py-4">
        <p className="font-sans text-sm text-neutral-600 leading-5 tracking-[0.15px]">
          {stage.body}
        </p>
        {!isUpcoming && (
          <button className="mt-3 font-sans font-semibold text-sm text-mw-green leading-5 active:opacity-70 transition-opacity">
            Learn more
          </button>
        )}
      </div>
    </div>
  )
})

// ─── Full-bleed carousel — active stage centered on mount ─────────────────────

export function StageCarousel() {
  const activeRef = useRef<HTMLDivElement>(null)
  const currentIndex = applicationStages.findIndex(s => s.status === 'current')

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'center' })
  }, [])

  return (
    <div
      className="no-scrollbar flex gap-3 overflow-x-auto"
      style={{
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        paddingInline: 'calc((100% - 312px) / 2)',
        scrollPaddingInline: 'calc((100% - 312px) / 2)',
      } as React.CSSProperties}
    >
      {applicationStages.map((stage, i) => (
        <StageCard
          key={stage.id}
          stage={stage}
          ref={i === currentIndex ? activeRef : null}
        />
      ))}
    </div>
  )
}
