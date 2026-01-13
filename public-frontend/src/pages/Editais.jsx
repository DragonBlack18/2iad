import { useQuery } from '@tanstack/react-query'
import { Calendar, FileText, Clock, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
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
      ABERTO: 'bg-green-100 text-green-800',
      FECHADO: 'bg-gray-100 text-gray-800',
      EM_ANALISE: 'bg-yellow-100 text-yellow-800'
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
    <div className="py-16">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Editais
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Confira os editais de seleção disponíveis e faça parte do ecossistema 2IAD
          </p>
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
            <div className="text-red-600">Erro ao carregar editais</div>
          </div>
        )}
        
        {/* Editais List */}
        {!isLoading && !error && editais.length > 0 && (
          <div className="space-y-6">
            {editais.map((edital) => (
              <Card key={edital.id} className={`transition-all hover:shadow-lg ${
                isOpen(edital) ? 'border-primary-300 bg-primary-50/30' : ''
              }`}>
                <CardHeader>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                      getStatusBadge(edital.status)
                    }`}>
                      {getStatusText(edital.status)}
                    </span>
                    {isOpen(edital) && (
                      <span className="rounded-full bg-primary-500 px-3 py-1 text-sm font-medium text-white">
                        Inscrições Abertas
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-2xl">{edital.title}</CardTitle>
                  <CardDescription className="text-base">
                    {edital.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 flex flex-wrap gap-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Início: {formatDate(edital.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Término: {formatDate(edital.endDate)}</span>
                    </div>
                  </div>
                  
                  {edital.pdfUrl && (
                    <Button asChild>
                      <a href={edital.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2 h-4 w-4" />
                        Ver Edital Completo
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* Empty State */}
        {!isLoading && !error && editais.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <div className="text-gray-600 mb-2">Nenhum edital disponível no momento</div>
                <p className="text-sm text-gray-500">
                  Acompanhe nossas redes sociais para saber quando novos editais forem publicados
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
