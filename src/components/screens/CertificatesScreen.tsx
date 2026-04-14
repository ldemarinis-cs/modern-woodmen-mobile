import { StatusBar } from '../layout/StatusBar'
import { NavBar } from '../layout/NavBar'
import { TabBar } from '../layout/TabBar'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

// ─── Screen ────────────────────────────────────────────────────────────────────

export function CertificatesScreen() {
  return (
    <div className="flex flex-col h-full bg-neutral-100">
      <StatusBar />
      <NavBar title="Certificates" />

      <div className="flex-1 overflow-y-auto pb-[83px] flex flex-col">

        {/* ── Empty state — application in progress, no certificate yet ── */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4">

          {/* Icon */}
          <div className="bg-neutral-200 p-5">
            <DocumentTextIcon className="w-10 h-10 text-neutral-400" />
          </div>

          {/* Copy */}
          <div className="flex flex-col gap-2">
            <h2 className="font-display font-semibold text-xl text-neutral-800 leading-7">
              No certificates yet
            </h2>
            <p className="font-sans text-sm text-neutral-500 leading-5">
              Your certificate will appear here once your policy is approved and issued. You are currently in the application review stage.
            </p>
          </div>

          {/* Status callout */}
          <div className="w-full bg-white border border-neutral-200 text-left px-4 py-4 mt-2">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-brand mt-1.5 shrink-0" />
              <div>
                <p className="font-sans font-semibold text-sm text-neutral-800 leading-5">
                  Application in review
                </p>
                <p className="font-sans text-sm text-neutral-500 leading-5 mt-0.5">
                  Whole Life Insurance · $250,000 coverage
                </p>
              </div>
            </div>
          </div>

          {/* Questions CTA */}
          <p className="font-sans text-xs text-neutral-400 leading-5 mt-2">
            Questions? Call us at{' '}
            <a
              href="tel:8004479811"
              className="text-brand font-semibold"
            >
              800-447-9811
            </a>
          </p>

        </div>
      </div>

      <TabBar />
    </div>
  )
}
