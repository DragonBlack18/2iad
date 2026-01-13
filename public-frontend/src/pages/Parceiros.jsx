import { useQuery } from '@tanstack/react-query'
import { ExternalLink, Building2, Handshake } from 'lucide-react'
import { parceirosAPI } from '../lib/api'

export default function Parceiros() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['parceiros'],
    queryFn: () => parceirosAPI.getAll()
  })
  
  const parceiros = data?.data?.parceiros || []
  
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
              {parceiros.map((parceiro) => (
                <div 
                  key={parceiro.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl border border-gray-100"
                >
                  <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                    {parceiro.logoUrl ? (
                      <img 
                        src={parceiro.logoUrl} 
                        alt={parceiro.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <Building2 className="h-16 w-16 text-gray-300" />
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{parceiro.name}</h3>
                    {parceiro.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {parceiro.description}
                      </p>
                    )}
                    
                    {parceiro.website && (
                      <a
                        href={parceiro.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-purple-600 transition-colors text-sm"
                      >
                        Visitar Website
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Empty State */}
          {!isLoading && !error && parceiros.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <div className="text-gray-400 text-6xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">Nenhum parceiro cadastrado</h3>
              <p className="text-gray-500">Estamos construindo nossa rede de parceiros</p>
            </div>
          )}
        </div>
      </section>

      {/* Benefícios Section */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-5xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
            Benefícios de Ser Parceiro
          </h2>
          <div className="w-full mb-12">
            <div className="h-1 mx-auto bg-blue-500 w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Handshake className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Networking Qualificado</h3>
              <p className="text-gray-600 leading-relaxed">
                Acesso a uma rede de startups inovadoras, investidores e outros parceiros estratégicos.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Visibilidade</h3>
              <p className="text-gray-600 leading-relaxed">
                Exposição da sua marca em eventos, workshops e materiais de comunicação da incubadora.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Acesso a Inovação</h3>
              <p className="text-gray-600 leading-relaxed">
                Primeiro contato com soluções inovadoras desenvolvidas pelas startups incubadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-4 text-3xl lg:text-4xl font-bold text-white">
            Quer ser nosso parceiro?
          </h2>
          <p className="mb-8 text-lg lg:text-xl text-white opacity-90">
            Junte-se a nós para fortalecer o ecossistema de inovação e apoiar empreendedores
          </p>
          <a
            href="mailto:contato@incubadora2iad.com.br"
            className="inline-block bg-white text-purple-600 font-bold rounded-full py-4 px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Entre em Contato
          </a>
        </div>
      </section>
    </div>
  )
}
