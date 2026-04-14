import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const Sobre = lazy(() => import('./pages/Sobre'))
const Startups = lazy(() => import('./pages/Startups'))
const StartupDetail = lazy(() => import('./pages/StartupDetail'))
const Editais = lazy(() => import('./pages/Editais'))
const Parceiros = lazy(() => import('./pages/Parceiros'))
const Contato = lazy(() => import('./pages/Contato'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
      <p className="text-gray-600">Carregando...</p>
    </div>
  </div>
)

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="startups" element={<Startups />} />
          <Route path="startups/:slug" element={<StartupDetail />} />
          <Route path="editais" element={<Editais />} />
          <Route path="parceiros" element={<Parceiros />} />
          <Route path="contato" element={<Contato />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
