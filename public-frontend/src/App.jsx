import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Startups from './pages/Startups'
import StartupDetail from './pages/StartupDetail'
import Editais from './pages/Editais'
import Parceiros from './pages/Parceiros'
import Contato from './pages/Contato'
import NotFound from './pages/NotFound'

function App() {
  return (
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
  )
}

export default App
