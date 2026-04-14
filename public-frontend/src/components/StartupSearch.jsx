import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function StartupSearch({ onSearch, onFilter }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    status: 'all',
    setor: 'all',
  })

  const setores = [
    'Tecnologia',
    'Saúde',
    'Educação',
    'Fintech',
    'Agro',
    'E-commerce',
    'SaaS',
    'Hardware',
    'Sustentabilidade',
  ]

  const status = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'ATIVA', label: 'Ativa' },
    { value: 'PRE_INCUBACAO', label: 'Pré-Incubação' },
    { value: 'INCUBACAO', label: 'Incubação' },
    { value: 'ACELERACAO', label: 'Aceleração' },
    { value: 'GRADUADA', label: 'Graduada' },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  const clearFilters = () => {
    setFilters({ status: 'all', setor: 'all' })
    setSearchTerm('')
    onFilter({ status: 'all', setor: 'all' })
    onSearch('')
  }

  const activeFiltersCount = Object.values(filters).filter(v => v !== 'all').length

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar startups por nome, descrição ou setor..."
            className="w-full pl-12 pr-32 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-900 placeholder-gray-400"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
            {(searchTerm || activeFiltersCount > 0) && (
              <button
                type="button"
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Limpar
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
                showFilters 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              <Filter className="w-4 h-4" />
              Filtros
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-blue-600 text-xs font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Filtros Avançados</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status da Startup
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
              >
                {status.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Setor Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Setor de Atuação
              </label>
              <select
                value={filters.setor}
                onChange={(e) => handleFilterChange('setor', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
              >
                <option value="all">Todos os Setores</option>
                {setores.map((setor) => (
                  <option key={setor} value={setor}>
                    {setor}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {filters.status !== 'all' && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {status.find(s => s.value === filters.status)?.label}
                    <button
                      onClick={() => handleFilterChange('status', 'all')}
                      className="hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.setor !== 'all' && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {filters.setor}
                    <button
                      onClick={() => handleFilterChange('setor', 'all')}
                      className="hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
