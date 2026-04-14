import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { planilhasAPI } from '../services/api';
import SpreadsheetViewer from '../components/SpreadsheetViewer';

export default function PlanilhaDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [planilha, setPlanilha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permission, setPermission] = useState('READ');

  useEffect(() => {
    loadPlanilha();
  }, [id]);

  const loadPlanilha = async () => {
    try {
      const data = await planilhasAPI.getById(id);
      setPlanilha(data);
      
      // Determinar permissão do usuário
      // Por enquanto, assume OWNER para SUPER_ADMIN
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user.role === 'SUPER_ADMIN') {
          setPermission('OWNER');
        } else {
          // Buscar permissão real do usuário
          const userPermission = data.permissoes?.find(p => p.user_id === user.id);
          setPermission(userPermission?.permissao || 'READ');
        }
      }
    } catch (error) {
      console.error('Erro ao carregar planilha:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir esta planilha? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      await planilhasAPI.delete(id);
      navigate('/admin/planilhas');
    } catch (error) {
      alert('Erro ao excluir planilha');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!planilha) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Planilha não encontrada</h2>
          <Link to="/admin/planilhas" className="text-blue-600 hover:text-blue-700">
            Voltar para planilhas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/planilhas" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{planilha.nome}</h1>
                <p className="text-sm text-gray-600 mt-1">Planilha • {planilha.tipo || 'GERAL'}</p>
              </div>
            </div>
            {permission === 'OWNER' && (
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-sm font-medium"
              >
                Excluir Planilha
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SpreadsheetViewer planilhaId={id} permission={permission} />
      </main>
    </div>
  );
}
