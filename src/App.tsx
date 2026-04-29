import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HomeScreen } from './components/screens/HomeScreen'
import { CertificatesScreen } from './components/screens/CertificatesScreen'
import { MessagesScreen } from './components/screens/MessagesScreen'
import { ApplicationDetailScreen } from './components/screens/ApplicationDetailScreen'
import { NotificationsScreen } from './components/screens/NotificationsScreen'
import { LockScreen } from './components/screens/LockScreen'
import { OutsideFrame } from './components/OutsideFrame'

function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  return (
    <div
      key={pathname}
      className="flex-1 overflow-hidden min-w-0 min-h-0"
      style={{ animation: 'page-enter 380ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both' }}
    >
      {children}
    </div>
  )
}

function PhoneContent() {
  return (
    <Routes>
      <Route path="/" element={<PageTransition><HomeScreen /></PageTransition>} />
      <Route path="/certificates" element={<PageTransition><CertificatesScreen /></PageTransition>} />
      <Route path="/messages" element={<PageTransition><MessagesScreen /></PageTransition>} />
      <Route path="/application-detail" element={<PageTransition><ApplicationDetailScreen /></PageTransition>} />
      <Route path="/notifications" element={<PageTransition><NotificationsScreen /></PageTransition>} />
      <Route path="/lockscreen/followup" element={<LockScreen scenario="followup" />} />
      <Route path="/lockscreen/reassignment" element={<LockScreen scenario="reassignment" />} />
      <Route path="/*" element={<PageTransition><HomeScreen /></PageTransition>} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="phone-frame">
        <PhoneContent />
      </div>
      <OutsideFrame />
    </BrowserRouter>
  )
}
