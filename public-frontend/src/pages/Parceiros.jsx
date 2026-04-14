import { useQuery } from '@tanstack/react-query'
import { Building2 } from 'lucide-react'
import { parceirosAPI } from '../lib/api'

export default function Parceiros() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['parceiros'],
    queryFn: () => parceirosAPI.getAll()
  })
  
  const parceiros = data?.data?.parceiros || []
  
  const getTipoBadge = (tipo) => {
    const badges = {
      'ACADEMICO': { color: 'bg-blue-100 text-blue-700', label: 'Acadêmico', icon: '🎓' },
      'FINANCEIRO': { color: 'bg-green-100 text-green-700', label: 'Financeiro', icon: '💰' },
      'TECNICO': { color: 'bg-purple-100 text-purple-700', label: 'Técnico', icon: '⚡' },
      'ESTRATEGICO': { color: 'bg-orange-100 text-orange-700', label: 'Estratégico', icon: '🎯' },
      'GOVERNAMENTAL': { color: 'bg-cyan-100 text-cyan-700', label: 'Governamental', icon: '🏛️' }
    }
    return badges[tipo] || { color: 'bg-gray-100 text-gray-700', label: tipo, icon: '🤝' }
  }
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="pt-24 pb-12 gradient text-white">
        <div className="container px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <p className="uppercase tracking-loose text-sm md:text-base mb-4">Networking & Parcerias</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Nossos Parceiros
            </h1>
            <p className="text-lg md:text-xl leading-relaxed opacity-90">
              Empresas e instituições que apoiam o desenvolvimento do ecossistema de inovação
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
          {/* Loading */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-600 mt-4">Carregando parceiros...</p>
            </div>
          )}
          
          {/* Error */}
          {error && (
            <div className="text-center py-12 bg-red-50 rounded-lg">
              <div className="text-red-600 font-semibold">Erro ao carregar parceiros</div>
              <p className="text-red-500 text-sm mt-2">Tente novamente mais tarde</p>
            </div>
          )}
          
          {/* Parceiros Grid */}
          {!isLoading && !error && parceiros.length > 0 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {parceiros.map((parceiro) => {
                const badge = getTipoBadge(parceiro.tipo)
                return (
                  <div 
                    key={parceiro.id}
                    className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-blue-500 hover:shadow-lg transition-all"
                  >
                    {/* Logo */}
                    <div className="mb-6">
                      {parceiro.logo ? (
                        <img 
                          src={parceiro.logo} 
                          alt={parceiro.nome}
                          className="w-full h-32 object-contain"
                        />
                      ) : (
                        <div className="w-full h-32 flex items-center justify-center bg-gray-50 rounded-lg">
                          <Building2 className="h-16 w-16 text-gray-300" />
                        </div>
                      )}
                    </div>
                    
                    {/* Nome */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {parceiro.nome}
                    </h3>
                    
                    {/* Tipo Badge */}
                    <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full mb-4 ${badge.color}`}>
                      <span>{badge.icon}</span>
                      {badge.label}
                    </span>
                    
                    {/* Descrição */}
                    {parceiro.descricao && (
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {parceiro.descricao}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
          
          {/* Empty State */}
          {!isLoading && !error && parceiros.length === 0 && (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🤝</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Nenhum parceiro cadastrado</h3>
              <p className="text-gray-600 text-lg">Estamos construindo nossa rede de parceiros</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
