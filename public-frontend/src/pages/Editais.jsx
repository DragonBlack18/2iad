import { useQuery } from '@tanstack/react-query'
import { Calendar, FileText, Clock, ExternalLink } from 'lucide-react'
import { editaisAPI } from '../lib/api'
import { formatDate } from '../lib/utils'

export default function Editais() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['editais'],
    queryFn: () => editaisAPI.getAll()
  })
  
  const editais = data?.data?.editais || []
  
  const getStatusBadge = (status) => {
    const badges = {
      ABERTO: 'bg-green-100 text-green-800 border-green-200',
      FECHADO: 'bg-gray-100 text-gray-800 border-gray-200',
      EM_ANALISE: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
    return badges[status] || badges.FECHADO
  }
  
  const getStatusText = (status) => {
    const texts = {
      ABERTO: 'Aberto',
      FECHADO: 'Fechado',
      EM_ANALISE: 'Em Análise'
    }
    return texts[status] || status
  }
  
  const isOpen = (edital) => {
    const now = new Date()
    const start = new Date(edital.startDate)
    const end = new Date(edital.endDate)
    return edital.status === 'ABERTO' && now >= start && now <= end
  }
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="pt-24 pb-12 gradient text-white">
        <div className="container px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <p className="uppercase tracking-loose text-sm md:text-base mb-4">Oportunidades</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Editais de Seleção
            </h1>
            <p className="text-lg md:text-xl leading-relaxed opacity-90">
              Confira os editais disponíveis e candidate-se para fazer parte do ecossistema 2IAD
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
        <div className="container max-w-5xl mx-auto px-6">
          {/* Loading */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-600 mt-4">Carregando editais...</p>
            </div>
          )}
          
          {/* Error */}
          {error && (
            <div className="text-center py-12 bg-red-50 rounded-lg">
              <div className="text-red-600 font-semibold">Erro ao carregar editais</div>
              <p className="text-red-500 text-sm mt-2">Tente novamente mais tarde</p>
            </div>
          )}
          
          {/* Editais List */}
          {!isLoading && !error && editais.length > 0 && (
            <div className="space-y-8">
              {editais.map((edital) => (
                <div 
                  key={edital.id} 
                  className={`bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 ${
                    isOpen(edital) ? 'border-2 border-green-400' : 'border border-gray-200'
                  }`}
                >
                  <div className="p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`border-2 rounded-full px-4 py-1 text-sm font-bold ${
                        getStatusBadge(edital.status)
                      }`}>
                        {getStatusText(edital.status)}
                      </span>
                      {isOpen(edital) && (
                        <span className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full px-4 py-1 text-sm font-bold shadow-md animate-pulse">
                          📢 Inscrições Abertas
                        </span>
                      )}
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                      {edital.title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {edital.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-6 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <Calendar className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 font-medium">Início</div>
                          <div className="text-gray-800 font-semibold">{formatDate(edital.startDate)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <Clock className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 font-medium">Término</div>
                          <div className="text-gray-800 font-semibold">{formatDate(edital.endDate)}</div>
                        </div>
                      </div>
                    </div>
                    
                    {edital.pdfUrl && (
                      <a
                        href={edital.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg px-6 py-3 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                      >
                        <FileText className="h-5 w-5" />
                        Ver Edital Completo
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Empty State */}
          {!isLoading && !error && editais.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">Nenhum edital disponível no momento</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Acompanhe nossas redes sociais para saber quando novos editais forem publicados
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12">
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-4">
            <details className="bg-white rounded-lg shadow-md p-6 cursor-pointer">
              <summary className="font-semibold text-lg text-gray-800">
                Quem pode se candidatar aos editais?
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Empreendedores com ideias inovadoras ou startups em estágio inicial que buscam 
                suporte para desenvolvimento e crescimento do negócio.
              </p>
            </details>
            
            <details className="bg-white rounded-lg shadow-md p-6 cursor-pointer">
              <summary className="font-semibold text-lg text-gray-800">
                Qual o processo de seleção?
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                O processo inclui análise documental, avaliação do potencial de inovação, 
                pitch e entrevista com a equipe gestora da incubadora.
              </p>
            </details>
            
            <details className="bg-white rounded-lg shadow-md p-6 cursor-pointer">
              <summary className="font-semibold text-lg text-gray-800">
                Quanto tempo dura a incubação?
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                O período de incubação varia entre 12 e 24 meses, dependendo do estágio 
                de desenvolvimento da startup e suas necessidades específicas.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-4 text-3xl lg:text-4xl font-bold text-white">
            Ainda tem dúvidas?
          </h2>
          <p className="mb-8 text-lg lg:text-xl text-white opacity-90">
            Entre em contato conosco e descubra como podemos ajudar sua startup
          </p>
          <a
            href="/contato"
            className="inline-block bg-white text-purple-600 font-bold rounded-full py-4 px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Fale Conosco
          </a>
        </div>
      </section>
    </div>
  )
}
