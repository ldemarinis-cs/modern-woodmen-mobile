import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../layout/StatusBar'
import { NavBar } from '../layout/NavBar'
import { ClockIcon, BellIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid'

// ─── Mock data ─────────────────────────────────────────────────────────────────

const stages = [
  { id: 1, label: 'Application Submitted', done: true },
  { id: 2, label: 'Underwriting Review',   done: false, current: true },
  { id: 3, label: 'Medical Exam',          done: false },
  { id: 4, label: 'Policy Approval',       done: false },
  { id: 5, label: 'Policy Issued',         done: false },
]

const activityLog = [
  { id: 7, date: 'Apr 29 · 2h ago',  title: 'Follow-up sent to Dr. Carter\'s office',        detail: 'Medical Records Team · 3rd contact attempt',        icon: 'clock'  },
  { id: 6, date: 'Apr 22',            title: 'Follow-up sent to Dr. Carter\'s office',        detail: 'Medical Records Team · 2nd contact attempt',        icon: 'clock'  },
  { id: 5, date: 'Apr 15',            title: 'APS form requested from Dr. Carter\'s office',  detail: 'Medical Records Team · initial request',            icon: 'clock'  },
  { id: 4, date: 'Apr 13',            title: 'Underwriting review started',                   detail: 'All initial documents verified',                     icon: 'check'  },
  { id: 3, date: 'Apr 12',            title: 'Medical history form submitted',                detail: 'Uploaded by James Anderson',                        icon: 'check'  },
  { id: 2, date: 'Apr 11',            title: 'Medical records form requested',                detail: 'Sent to james@email.com',                           icon: 'check'  },
  { id: 1, date: 'Apr 10',            title: 'Application received',                          detail: 'Confirmation sent to james@email.com',              icon: 'check'  },
]

// ─── Screen ────────────────────────────────────────────────────────────────────

export function ApplicationDetailScreen() {
  const navigate = useNavigate()
  const currentStageIndex = stages.findIndex(s => s.current)

  return (
    <div className="flex flex-col h-full bg-neutral-100">
      <StatusBar />
      <NavBar
        title="Application Status"
        onBack={() => navigate('/')}
        backLabel="Home"
        hideBell
      />

      <div className="flex-1 overflow-y-auto pb-8">

        {/* ── Stage progress ───────────────────────────────────────────────── */}
        <div className="bg-white border-b border-neutral-200 px-4 pt-4 pb-5">

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-sans text-xs text-neutral-400 leading-4 mb-0.5">
                Stage {currentStageIndex + 1} of {stages.length}
              </p>
              <p className="font-sans font-semibold text-base text-neutral-800 leading-[22px]">
                Underwriting Review
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-[10px] py-[4px] bg-yellow-100 text-yellow-800 font-sans font-semibold text-sm leading-5">
              <span className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
              Pending
            </span>
          </div>

          {/* Step dots */}
          <div className="flex items-center gap-0">
            {stages.map((stage, i) => (
              <div key={stage.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-6 h-6 flex items-center justify-center shrink-0 ${
                      stage.done
                        ? 'bg-mw-green'
                        : stage.current
                        ? 'bg-brand'
                        : 'bg-neutral-200'
                    }`}
                  >
                    {stage.done ? (
                      <CheckCircleSolid className="w-4 h-4 text-white" />
                    ) : (
                      <span className={`font-sans font-semibold text-xs ${stage.current ? 'text-white' : 'text-neutral-400'}`}>
                        {stage.id}
                      </span>
                    )}
                  </div>
                </div>
                {i < stages.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 ${stage.done ? 'bg-mw-green' : 'bg-neutral-200'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step labels — only show current stage label below */}
          <p className="font-sans text-xs text-neutral-400 leading-4 mt-2">
            Completed: Application Submitted
          </p>
        </div>

        {/* ── Current delay ────────────────────────────────────────────────── */}
        <div className="px-4 pt-5 pb-2">
          <p className="font-sans font-semibold text-xs text-neutral-500 leading-4 mb-3 uppercase tracking-[0.08em]">
            What's pending
          </p>

          <div className="bg-white border border-neutral-200">
            {/* Delay reason */}
            <div className="px-4 pt-4 pb-4 flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-100 flex items-center justify-center shrink-0 mt-0.5">
                <ClockIcon className="w-4 h-4 text-yellow-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans font-semibold text-sm text-neutral-800 leading-5">
                  Waiting on Dr. Carter's office
                </p>
                <p className="font-sans text-sm text-neutral-500 leading-5 mt-0.5">
                  APS medical records form
                </p>
                <p className="font-sans text-xs text-neutral-400 leading-4 mt-1">
                  Requested Apr 11 · 18 days with no response
                </p>
              </div>
            </div>

            {/* Ownership row */}
            <div className="border-t border-neutral-100 px-4 py-3 flex items-start gap-0">
              <div className="flex-1">
                <p className="font-sans text-xs text-neutral-400 leading-4 mb-0.5">Handling this</p>
                <p className="font-sans font-medium text-sm text-neutral-700 leading-5">Medical Records Team</p>
                <p className="font-sans text-xs text-neutral-400 leading-4 mt-0.5">Modern Woodmen central office</p>
              </div>
              <div className="w-px bg-neutral-100 self-stretch mx-4" />
              <div className="flex-1">
                <p className="font-sans text-xs text-neutral-400 leading-4 mb-0.5">Your advisor</p>
                <p className="font-sans font-medium text-sm text-brand leading-5">Sarah Mitchell</p>
                <p className="font-sans text-xs text-neutral-400 leading-4 mt-0.5">Is monitoring this request</p>
              </div>
            </div>
          </div>

          {/* Notification CTA */}
          <div className="bg-brand-97 border border-brand-88 px-4 py-3 flex items-center gap-3 mt-3">
            <BellIcon className="w-5 h-5 text-brand shrink-0" />
            <p className="font-sans text-sm text-neutral-600 leading-5">
              You'll be notified the moment Dr. Carter's form is received.
            </p>
          </div>
        </div>

        {/* ── Activity log ─────────────────────────────────────────────────── */}
        <div className="px-4 pt-4">
          <p className="font-sans font-semibold text-xs text-neutral-500 leading-4 mb-3 uppercase tracking-[0.08em]">
            Activity log
          </p>

          <div className="bg-white border border-neutral-200 overflow-hidden">
            {activityLog.map((item, i) => (
              <div
                key={item.id}
                className={`flex items-start gap-3 px-4 py-3 ${
                  i < activityLog.length - 1 ? 'border-b border-neutral-100' : ''
                }`}
              >
                {/* Timeline indicator */}
                <div className="flex flex-col items-center self-stretch shrink-0 pt-1">
                  {item.icon === 'check' ? (
                    <CheckCircleIcon className="w-4 h-4 text-mw-green shrink-0" />
                  ) : (
                    <ClockIcon className="w-4 h-4 text-yellow-600 shrink-0" />
                  )}
                  {i < activityLog.length - 1 && (
                    <div className="w-px flex-1 bg-neutral-100 mt-1" />
                  )}
                </div>

                <div className="flex-1 min-w-0 pb-1">
                  <p className="font-sans font-semibold text-sm text-neutral-800 leading-5">
                    {item.title}
                  </p>
                  <p className="font-sans text-xs text-neutral-400 leading-4 mt-0.5">
                    {item.detail}
                  </p>
                </div>

                <p className="font-sans text-xs text-neutral-400 leading-4 shrink-0 pt-0.5">
                  {item.date}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
