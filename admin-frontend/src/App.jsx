import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Importação das páginas existentes
import ParceirosPage from './pages/ParceirosPage';
import PlanilhaDetailPage from './pages/PlanilhaDetailPage';

// Placeholders para páginas pendentes (TODO)
const Placeholder = ({ name }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold">{name}</h1>
    <p className="mt-4 text-gray-600">Página em desenvolvimento...</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<Placeholder name="Login" />} />
        
        {/* Rotas protegidas */}
        <Route path="/admin">
          <Route path="dashboard" element={<Placeholder name="Dashboard" />} />
          <Route path="parceiros" element={<ParceirosPage />} />
          <Route path="planilhas" element={<Placeholder name="Listagem de Planilhas" />} />
          <Route path="planilhas/:id" element={<PlanilhaDetailPage />} />
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;