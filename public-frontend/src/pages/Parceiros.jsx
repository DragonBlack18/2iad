import { useQuery } from '@tanstack/react-query'
import { ExternalLink, Building2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { parceirosAPI } from '../lib/api'

export default function Parceiros() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['parceiros'],
    queryFn: () => parceirosAPI.getAll()
  })
  
  const parceiros = data?.data?.parceiros || []
  
  return (
    <div className="py-16">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Nossos Parceiros
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Empresas e instituições que apoiam o desenvolvimento do ecossistema de inovação
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
            <div className="text-red-600">Erro ao carregar parceiros</div>
          </div>
        )}
        
        {/* Parceiros Grid */}
        {!isLoading && !error && parceiros.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {parceiros.map((parceiro) => (
              <Card key={parceiro.id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-gray-100">
                    {parceiro.logoUrl ? (
                      <img 
                        src={parceiro.logoUrl} 
                        alt={parceiro.name}
                        className="max-h-20 max-w-full object-contain"
                      />
                    ) : (
                      <Building2 className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <CardTitle>{parceiro.name}</CardTitle>
                  {parceiro.description && (
                    <CardDescription>{parceiro.description}</CardDescription>
                  )}
                </CardHeader>
                {parceiro.website && (
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href={parceiro.website} target="_blank" rel="noopener noreferrer">
                        Visitar Website
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
        
        {/* Empty State */}
        {!isLoading && !error && parceiros.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-600">Nenhum parceiro cadastrado</div>
          </div>
        )}
        
        {/* CTA Section */}
        <section className="mt-16">
          <Card className="border-primary-200 bg-primary-50/30">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  Quer ser nosso parceiro?
                </h2>
                <p className="mx-auto mb-6 max-w-2xl text-gray-600">
                  Junte-se a nós para fortalecer o ecossistema de inovação e apoiar 
                  empreendedores a transformarem suas ideias em negócios de sucesso.
                </p>
                <Button size="lg" asChild>
                  <a href="mailto:contato@incubadora2iad.com.br">
                    Entre em Contato
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
