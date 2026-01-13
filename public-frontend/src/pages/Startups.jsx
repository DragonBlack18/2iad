import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Search, Filter, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { startupsAPI } from '../lib/api'

export default function Startups() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['startups', search, statusFilter],
    queryFn: () => startupsAPI.getAll({ search, status: statusFilter })
  })
  
  const startups = data?.data?.startups || []
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="pt-24 pb-12 gradient text-white">
        <div className="container px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <p className="uppercase tracking-loose text-sm md:text-base mb-4">Conheça o Ecossistema</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Startups Incubadas
            </h1>
            <p className="text-lg md:text-xl leading-relaxed opacity-90">
              Empresas inovadoras transformando o mercado com tecnologia e criatividade
            </p>
          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="relative -mt-12">
        <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fillRule="nonzero">
              <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
              <path d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z" opacity="0.100000001"></path>
              <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" opacity="0.200000003"></path>
            </g>
          </g>
        </svg>
      </div>
      
      <section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-6">
          {/* Filtros */}
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar startups..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-200 py-3 pl-12 pr-4 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border-2 border-gray-200 px-5 py-3 focus:border-blue-500 focus:outline-none transition-colors"
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-600 mt-4">Carregando startups...</p>
            </div>
          )}
          
          {/* Error */}
          {error && (
            <div className="text-center py-12 bg-red-50 rounded-lg">
              <div className="text-red-600 font-semibold">Erro ao carregar startups</div>
              <p className="text-red-500 text-sm mt-2">Tente novamente mais tarde</p>
            </div>
          )}
          
          {/* Startups Grid */}
          {!isLoading && !error && startups.length > 0 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {startups.map((startup) => (
                <div key={startup.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
                        {startup.segment}
                      </span>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                        startup.status === 'ATIVA' ? 'bg-green-100 text-green-700' :
                        startup.status === 'GRADUADA' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {startup.status}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{startup.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {startup.description}
                    </p>
                    
                    <Link
                      to={`/startups/${startup.slug}`}
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-purple-600 transition-colors"
                    >
                      Saiba mais <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Empty State */}
          {!isLoading && !error && startups.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <div className="text-gray-400 text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhuma startup encontrada</h3>
              <p className="text-gray-500">Tente ajustar os filtros de busca</p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="gradient py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-4 text-3xl lg:text-4xl font-bold text-white">
            Quer fazer parte deste ecossistema?
          </h2>
          <p className="mb-8 text-lg lg:text-xl text-white opacity-90">
            Inscreva-se nos nossos editais e transforme sua startup com nosso apoio
          </p>
          <a
            href="/editais"
            className="inline-block bg-white text-purple-600 font-bold rounded-full py-4 px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Ver Editais Abertos
          </a>
        </div>
      </section>
    </div>
  )
}
