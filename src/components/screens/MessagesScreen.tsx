import { useRef, useEffect, useState } from 'react'
import { PaperAirplaneIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { StatusBar } from '../layout/StatusBar'
import { NavBar } from '../layout/NavBar'
import { TabBar } from '../layout/TabBar'

// ─── Mock data ────────────────────────────────────────────────────────────────

type Message = {
  id: number
  from: 'user' | 'staff'
  text: string
  time: string
  staffName?: string
  staffInitials?: string
}

const mockMessages: Message[] = [
  {
    id: 1,
    from: 'staff',
    text: 'Hi James, I wanted to let you know that we have received your application and all submitted documents. Your file has been passed along to our underwriting team.',
    time: 'Apr 13, 9:42 AM',
    staffName: 'Sarah M.',
    staffInitials: 'SM',
  },
  {
    id: 2,
    from: 'user',
    text: 'Thank you! How long does underwriting typically take?',
    time: 'Apr 13, 9:55 AM',
  },
  {
    id: 3,
    from: 'staff',
    text: 'Great question. The review typically takes 5–10 business days. We will reach out directly if we need any additional information from you in the meantime.',
    time: 'Apr 13, 10:02 AM',
    staffName: 'Sarah M.',
    staffInitials: 'SM',
  },
  {
    id: 4,
    from: 'user',
    text: 'Perfect, I will keep an eye out. Thanks Sarah.',
    time: 'Apr 13, 10:08 AM',
  },
]

// ─── Staff avatar ─────────────────────────────────────────────────────────────

function StaffAvatar({ initials }: { initials: string }) {
  return (
    <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center shrink-0">
      <span className="font-sans font-semibold text-xs text-white leading-none">
        {initials}
      </span>
    </div>
  )
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.from === 'user'

  return (
    <div className="flex flex-row items-start gap-2">
      {/* Spacer to align user bubbles correctly */}
      {isUser && <div className="w-8 shrink-0" />}

      <div className={`flex flex-col gap-3 ${isUser ? 'place-content-end' : 'items-start'}`}>
        <div className="flex flex-row gap-2 items-center">
          {/* Staff avatar — only for staff messages */}
          {!isUser && (
            <StaffAvatar initials={message.staffInitials ?? '?'} />
          )}
          {/* Staff name */}
          {!isUser && message.staffName && (
            <span className="font-sans font-semibold text-xs text-neutral-700 leading-4 ml-1">
              {message.staffName}
            </span>
          )}
        </div>

        <div className={`flex flex-col gap-2 ${isUser ? 'pr-2 pl-8' : 'pl-2 pr-8'}`}>

          {/* Bubble */}
          <div
            className={`px-4 py-3 ${isUser
              ? 'bg-brand text-white'
              : 'bg-white border border-neutral-200 text-neutral-800'
              }`}
          >
            <p className={`font-sans text-sm leading-5 ${isUser ? 'text-white' : 'text-neutral-800'}`}>
              {message.text}
            </p>
          </div>

          {/* Timestamp */}
          <span className="font-sans text-[10px] text-neutral-400 leading-3 mx-2">
            {message.time}
          </span>

        </div>
      </div>
    </div>
  )
}

// ─── Screen ──────────────────────────────────────────────────────────────────

export function MessagesScreen() {
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' })
  }, [])

  return (
    <div className="flex flex-col h-full bg-neutral-100">
      <StatusBar />
      <NavBar title="Messages" />

      {/* Thread */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {mockMessages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Compose bar — sits above tab bar */}
      <div className="bg-white border-t border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button className="flex items-center justify-center w-[44px] h-[44px] text-neutral-400 active:opacity-70 transition-opacity shrink-0">
          <PlusCircleIcon className="w-6 h-6" />
        </button>
        <div className="flex-1 bg-neutral-100 border border-neutral-200 px-4 py-2 flex items-center min-h-[44px]">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Message your representative..."
            className="flex-1 bg-transparent font-sans text-sm text-neutral-800 placeholder:text-neutral-400 outline-none leading-5"
          />
        </div>
        <button
          className={`flex items-center justify-center w-[44px] h-[44px] shrink-0 transition-opacity ${input.trim() ? 'text-brand active:opacity-70' : 'text-neutral-300'
            }`}
          disabled={!input.trim()}
        >
          <PaperAirplaneIcon className="w-6 h-6" />
        </button>
      </div>

      <TabBar />
    </div>
  )
}
