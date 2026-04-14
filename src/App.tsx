import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HomeScreen } from './components/screens/HomeScreen'
import { CertificatesScreen } from './components/screens/CertificatesScreen'
import { MessagesScreen } from './components/screens/MessagesScreen'

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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PageTransition><HomeScreen /></PageTransition>}
        />
        <Route
          path="/certificates"
          element={<PageTransition><CertificatesScreen /></PageTransition>}
        />
        <Route
          path="/messages"
          element={<PageTransition><MessagesScreen /></PageTransition>}
        />
        <Route
          path="/*"
          element={<PageTransition><HomeScreen /></PageTransition>}
        />
      </Routes>
    </BrowserRouter>
  )
}
