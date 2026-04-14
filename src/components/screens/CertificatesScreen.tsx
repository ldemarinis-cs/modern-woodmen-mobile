import { StatusBar } from '../layout/StatusBar'
import { NavBar } from '../layout/NavBar'
import { TabBar } from '../layout/TabBar'
import { DocumentTextIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline'

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
            <p className="font-sans text-sm font-semibold text-neutral-500 leading-4 tracking-[0.2px] mb-1">
              Coverage Requested
            </p>
            <p className="font-display font-semibold text-4xl text-neutral-800 leading-10 tracking-tight">
              $250,000
            </p>
            <p className="font-sans text-sm text-neutral-500 leading-5 mt-1">
              Whole Life Insurance
            </p>
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-neutral-100">
              <DocumentMagnifyingGlassIcon className="w-4 h-4 text-brand shrink-0" />
              <span className="font-sans font-semibold text-xs text-brand leading-4">
                Application in review
              </span>
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
