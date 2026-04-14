// [ui-candidate] StatusBar
// Reason: Mock iOS status bar used on every screen
// Props needed: time, style variant (light/dark)

export function StatusBar() {
  return (
    <div className="relative flex bg-brand items-end justify-between px-8 pb-2 h-[54px] shrink-0 z-10">
      {/* Time — left */}
      <span className="font-sans font-semibold text-sm text-white leading-5">9:41</span>

      {/* Dynamic Island — centered pill cutout */}
      <div
        className="absolute top-3 bg-neutral-900 rounded-full"
        style={{ width: 120, height: 34, left: '50%', transform: 'translateX(-50%)' }}
      />

      {/* Status icons — right */}
      <div className="flex items-center gap-1">
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden="true">
          <rect x="0" y="5" width="3" height="7" rx="1" fill="#FFFFFF" />
          <rect x="4.5" y="3" width="3" height="9" rx="1" fill="#FFFFFF" />
          <rect x="9" y="1" width="3" height="11" rx="1" fill="#FFFFFF" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#FFFFFF" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="#FFFFFF" />
          <path d="M3.5 6.5C4.9 5.1 6.35 4.4 8 4.4s3.1.7 4.5 2.1" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M1 4C2.9 2.1 5.3 1 8 1s5.1 1.1 7 3" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
        {/* Battery */}
        <div className="flex items-center">
          <div className="relative w-[24px] h-[12px] rounded-[3px] border-[1.5px] border-white flex items-center px-[2px]">
            <div className="h-[7px] w-full bg-white rounded-[1px]" />
          </div>
          <div className="w-[2px] h-[5px] bg-white rounded-r-[1px] ml-px" />
        </div>
      </div>
    </div>
  )
}
