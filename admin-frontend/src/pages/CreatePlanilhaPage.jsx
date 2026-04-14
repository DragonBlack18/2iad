import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { planilhasAPI } from '../services/api';

export default function CreatePlanilhaPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    tipo: 'GERAL',
    template: false,
    startup_id: null,
    colunas: [
      { nome: 'Coluna A', tipo: 'TEXT', ordem: 1 },
      { nome: 'Coluna B', tipo: 'TEXT', ordem: 2 },
      { nome: 'Coluna C', tipo: 'NUMBER', ordem: 3 }
    ]
  });
  const [loading, setLoading] = useState(false);

  const handleAddColuna = () => {
    setFormData({
      ...formData,
      colunas: [
        ...formData.colunas,
        { nome: `Coluna ${String.fromCharCode(65 + formData.colunas.length)}`, tipo: 'TEXT', ordem: formData.colunas.length + 1 }
      ]
    });
  };

  const handleRemoveColuna = (index) => {
    setFormData({
      ...formData,
      colunas: formData.colunas.filter((_, i) => i !== index)
    });
  };

  const handleColunaChange = (index, field, value) => {
    const newColunas = [...formData.colunas];
    newColunas[index][field] = value;
    setFormData({ ...formData, colunas: newColunas });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await planilhasAPI.create(formData);
      navigate(`/admin/planilhas/${result.planilha.id}`);
    } catch (error) {
      alert(error.response?.data?.error || 'Erro ao criar planilha');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Nova Planilha</h1>
          <div className="flex items-center gap-2 mt-4">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Informações</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Colunas</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Planilha *
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Planilha Financeira 2026"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Descreva o propósito desta planilha"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo
                </label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="GERAL">Geral</option>
                  <option value="FINANCEIRO">Financeiro</option>
                  <option value="OPERACIONAL">Operacional</option>
                  <option value="RECURSOS_HUMANOS">Recursos Humanos</option>
                  <option value="MARKETING">Marketing</option>
                </select>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate('/admin/planilhas')}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!formData.nome}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próximo: Configurar Colunas →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Configurar Colunas</h3>
                  <button
                    type="button"
                    onClick={handleAddColuna}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
                  >
                    + Adicionar Coluna
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.colunas.map((coluna, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={coluna.nome}
                          onChange={(e) => handleColunaChange(index, 'nome', e.target.value)}
                          placeholder="Nome da coluna"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="w-40">
                        <select
                          value={coluna.tipo}
                          onChange={(e) => handleColunaChange(index, 'tipo', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="TEXT">Texto</option>
                          <option value="NUMBER">Número</option>
                          <option value="DATE">Data</option>
                          <option value="BOOLEAN">Sim/Não</option>
                        </select>
                      </div>
                      {formData.colunas.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveColuna(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition font-medium"
                >
                  ← Voltar
                </button>
                <button
                  type="submit"
                  disabled={loading || formData.colunas.length === 0}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Criando...
                    </>
                  ) : (
                    'Criar Planilha'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
