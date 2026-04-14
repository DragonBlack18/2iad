import { useState, useEffect } from 'react';
import Spreadsheet from 'react-spreadsheet';
import { planilhasAPI } from '../services/api';
import './Spreadsheet.css';

export default function SpreadsheetViewer({ planilhaId, permission = 'READ' }) {
  const [planilha, setPlanilha] = useState(null);
  const [data, setData] = useState([]);
  const [columnLabels, setColumnLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPlanilha();
  }, [planilhaId]);

  const loadPlanilha = async () => {
    try {
      const planilhaData = await planilhasAPI.getById(planilhaId);
      setPlanilha(planilhaData);
      
      // Converter dados do backend para formato react-spreadsheet
      const labels = planilhaData.colunas?.sort((a, b) => a.ordem - b.ordem).map(col => col.nome) || [];
      setColumnLabels(labels);
      
      const rows = planilhaData.linhas?.sort((a, b) => a.ordem - b.ordem).map(linha => {
        return planilhaData.colunas?.sort((a, b) => a.ordem - b.ordem).map(coluna => {
          const celula = linha.celulas?.find(c => c.coluna_id === coluna.id);
          const value = celula?.valor_texto || celula?.valor_numero?.toString() || 
                       (celula?.valor_data ? new Date(celula.valor_data).toLocaleDateString('pt-BR') : '') ||
                       (celula?.valor_boolean !== null ? celula.valor_boolean.toString() : '') || '';
          return { value, celulaId: celula?.id };
        }) || [];
      }) || [];
      
      setData(rows);
    } catch (error) {
      console.error('Erro ao carregar planilha:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDataChange = async (newData) => {
    if (permission === 'READ') return;
    
    setData(newData);
    setSaving(true);
    
    try {
      // Salvar alterações no backend
      for (let rowIndex = 0; rowIndex < newData.length; rowIndex++) {
        const linha = planilha.linhas?.sort((a, b) => a.ordem - b.ordem)[rowIndex];
        if (!linha) continue;
        
        for (let colIndex = 0; colIndex < newData[rowIndex].length; colIndex++) {
          const coluna = planilha.colunas?.sort((a, b) => a.ordem - b.ordem)[colIndex];
          if (!coluna) continue;
          
          const cellData = newData[rowIndex][colIndex];
          const cellValue = cellData?.value || '';
          const celulaId = data[rowIndex]?.[colIndex]?.celulaId;
          
          if (celulaId) {
            await planilhasAPI.updateCelula(celulaId, { valor: cellValue });
          }
        }
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar alterações');
    } finally {
      setTimeout(() => setSaving(false), 500);
    }
  };

  const handleAddLinha = async () => {
    try {
      await planilhasAPI.addLinha(planilhaId);
      await loadPlanilha();
    } catch (error) {
      console.error('Erro ao adicionar linha:', error);
      alert('Erro ao adicionar linha');
    }
  };

  const handleAddColuna = async () => {
    const nomeColuna = prompt('Nome da nova coluna:');
    if (!nomeColuna) return;

    try {
      await planilhasAPI.addColuna(planilhaId, {
        nome: nomeColuna,
        tipo: 'TEXT',
        ordem: (planilha.colunas?.length || 0) + 1
      });
      await loadPlanilha();
    } catch (error) {
      console.error('Erro ao adicionar coluna:', error);
      alert('Erro ao adicionar coluna');
    }
  };

  const handleExportCSV = () => {
    const csv = [
      columnLabels.join(','),
      ...data.map(row => row.map(cell => `"${cell?.value || ''}"`).join(','))
    ].join('\n');
    
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${planilha?.nome || 'planilha'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">Carregando planilha...</p>
      </div>
    );
  }

  if (!planilha) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-gray-600">Planilha não encontrada</p>
      </div>
    );
  }

  const canEdit = permission === 'WRITE' || permission === 'OWNER';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{planilha.nome}</h2>
            {planilha.descricao && (
              <p className="text-sm text-gray-600 mt-1">{planilha.descricao}</p>
            )}
          </div>
          {saving && (
            <span className="text-sm text-blue-600 flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Salvando...
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            permission === 'OWNER' ? 'bg-purple-100 text-purple-700' :
            permission === 'WRITE' ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {permission}
          </span>
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar CSV
          </button>
          {canEdit && (
            <>
              <button
                onClick={handleAddColuna}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
              >
                + Coluna
              </button>
              <button
                onClick={handleAddLinha}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
              >
                + Linha
              </button>
            </>
          )}
        </div>
      </div>

      {/* Spreadsheet Grid */}
      <div className="p-4">
        {data.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Planilha vazia</h3>
            <p className="text-gray-600 mb-4">Adicione linhas e colunas para começar</p>
            {canEdit && (
              <button
                onClick={handleAddLinha}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
              >
                Adicionar Primeira Linha
              </button>
            )}
          </div>
        ) : (
          <div style={{ maxHeight: '70vh', overflow: 'auto' }} className="spreadsheet-container">
            <Spreadsheet
              data={data}
              onChange={canEdit ? handleDataChange : undefined}
              columnLabels={columnLabels}
              darkMode={false}
              hideRowIndicators={false}
              hideColumnIndicators={false}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-600 flex-wrap gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span>📊 {data.length} linhas × {columnLabels.length} colunas</span>
            <span>📅 {new Date(planilha.updated_at).toLocaleString('pt-BR')}</span>
            <span>v{planilha.versao}</span>
          </div>
          <div>
            👤 {planilha.criador?.nome || 'Sistema'}
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          💡 Dicas: Duplo clique para editar • Ctrl+C/V para copiar/colar • Tab/Setas para navegar • Enter confirma
        </div>
      </div>
    </div>
  );
}
