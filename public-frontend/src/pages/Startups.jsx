import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Search, Filter, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { startupsAPI } from '../lib/api'

export default function Startups() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['startups', search, statusFilter],
    queryFn: () => startupsAPI.getAll({ search, status: statusFilter })
  })
  
  const startups = data?.data?.startups || []
  
  // Organizar por segmento
  const segments = [...new Set(startups.map(s => s.segment))]
  
  return (
    <div className="py-16">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Startups Incubadas
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Conheça as empresas inovadoras que fazem parte do ecossistema 2IAD
          </p>
        </div>
        
        {/* Filtros */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar startups..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-md border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Todos os Status</option>
              <option value="ATIVA">Ativas</option>
              <option value="GRADUADA">Graduadas</option>
              <option value="INATIVA">Inativas</option>
            </select>
          </div>
        </div>
        
        {/* Loading */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-600">Carregando...</div>
          </div>
        )}
        
        {/* Error */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-600">Erro ao carregar startups</div>
          </div>
        )}
        
        {/* Startups Grid */}
        {!isLoading && !error && startups.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {startups.map((startup) => (
              <Card key={startup.id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-primary-500">
                      {startup.segment}
                    </span>
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                      startup.status === 'ATIVA' ? 'bg-green-100 text-green-800' :
                      startup.status === 'GRADUADA' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {startup.status}
                    </span>
                  </div>
                  <CardTitle>{startup.name}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {startup.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0" asChild>
                    <Link to={`/startups/${startup.slug}`}>
                      Saiba mais <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* Empty State */}
        {!isLoading && !error && startups.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-600">Nenhuma startup encontrada</div>
          </div>
        )}
      </div>
    </div>
  )
}
