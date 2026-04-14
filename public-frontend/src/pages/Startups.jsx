import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ArrowRight, Building2, ExternalLink } from 'lucide-react'
import { useState, useMemo } from 'react'
import { startupsAPI } from '../lib/api'
import StartupSearch from '../components/StartupSearch'
import OptimizedImage from '../components/OptimizedImage'

export default function Startups() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({ status: 'all', setor: 'all' })
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['startups'],
    queryFn: () => startupsAPI.getAll()
  })
  
  const startups = data?.data?.startups || []
  
  // Filter and search logic
  const filteredStartups = useMemo(() => {
    return startups.filter(startup => {
      // Search filter
      const matchesSearch = !searchTerm || 
        startup.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        startup.descricao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        startup.setor?.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Status filter
      const matchesStatus = filters.status === 'all' || startup.status === filters.status
      
      // Setor filter
      const matchesSetor = filters.setor === 'all' || startup.setor === filters.setor
      
      return matchesSearch && matchesStatus && matchesSetor
    })
  }, [startups, searchTerm, filters])
  
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
          {/* Search and Filters */}
          <div className="mb-12">
            <StartupSearch 
              onSearch={setSearchTerm}
              onFilter={setFilters}
            />
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              {isLoading ? (
                'Carregando...'
              ) : (
                <>
                  <span className="font-bold text-gray-900">{filteredStartups.length}</span>
                  {filteredStartups.length === 1 ? ' startup encontrada' : ' startups encontradas'}
                </>
              )}
            </p>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="text-center py-16">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600 mt-4 font-medium">Carregando startups...</p>
            </div>
          )}
          
          {/* Error */}
          {error && (
            <div className="text-center py-16 bg-red-50 rounded-xl">
              <div className="text-red-600 font-bold text-lg">Erro ao carregar startups</div>
              <p className="text-red-500 text-sm mt-2">Tente novamente mais tarde</p>
            </div>
          )}
          
          {/* No Results */}
          {!isLoading && !error && filteredStartups.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <div className="text-gray-600 font-bold text-lg">Nenhuma startup encontrada</div>
              <p className="text-gray-500 text-sm mt-2">Tente ajustar os filtros de busca</p>
            </div>
          )}
          
          {/* Startups Grid */}
          {!isLoading && !error && filteredStartups.length > 0 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredStartups.map((startup) => (
                <div key={startup.id} className="group bg-white rounded-xl shadow-card hover:shadow-card-hover overflow-hidden transition-all duration-300 hover-lift">
                  {startup.logo && (
                    <OptimizedImage
                      src={startup.logo}
                      alt={startup.nome}
                      aspectRatio="aspect-[16/9]"
                    />
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                        {startup.setor || 'Tecnologia'}
                      </span>
                      <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                        startup.status === 'ATIVA' ? 'bg-green-100 text-green-700' :
                        startup.status === 'GRADUADA' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {startup.status || 'ATIVA'}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {startup.nome}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                      {startup.descricao}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/startups/${startup.slug}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Ver Detalhes
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      {startup.website && (
                        <a
                          href={startup.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Empty State */}
          {!isLoading && !error && startups.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <div className="text-gray-600 font-bold text-lg">Ainda não há startups cadastradas</div>
              <p className="text-gray-500 text-sm mt-2">Em breve teremos novidades!</p>
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
          <Link
            to="/editais"
            className="inline-block bg-white text-blue-600 font-bold rounded-full py-4 px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Ver Editais Abertos
          </Link>
        </div>
      </section>
    </div>
  )
}
