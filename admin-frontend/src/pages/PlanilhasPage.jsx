import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { planilhasAPI } from '../services/api';

export default function PlanilhasPage() {
  const [planilhas, setPlanilhas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlanilhas();
  }, []);

  const loadPlanilhas = async () => {
    try {
      const data = await planilhasAPI.getAll();
      setPlanilhas(data.planilhas || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Planilhas</h1>
            </div>
            <Link
              to="/admin/planilhas/criar"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium"
            >
              + Nova Planilha
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {planilhas.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma planilha encontrada</h3>
            <p className="text-gray-600">As planilhas criadas aparecerão aqui.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {planilhas.map((planilha) => (
              <div key={planilha.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{planilha.nome}</h3>
                    <p className="text-sm text-gray-600 mt-1">{planilha.descricao}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <span>{planilha._count?.colunas || 0} colunas</span>
                      <span>{planilha._count?.linhas || 0} linhas</span>
                      <span>v{planilha.versao}</span>
                    </div>
                  </div>
                  <Link
                    to={`/admin/planilhas/${planilha.id}`}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition text-sm font-medium"
                  >
                    Visualizar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
