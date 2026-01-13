import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, Building2, Users, Award, TrendingUp } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { startupsAPI, parceirosAPI } from '../lib/api'

export default function Home() {
  const { data: startupsData } = useQuery({
    queryKey: ['startups'],
    queryFn: () => startupsAPI.getAll({ status: 'ATIVA' })
  })
  
  const { data: parceirosData } = useQuery({
    queryKey: ['parceiros'],
    queryFn: () => parceirosAPI.getAll()
  })
  
  const startups = startupsData?.data?.startups || []
  const parceiros = parceirosData?.data?.parceiros || []
  
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient py-20 text-white">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              Transformando Ideias em Startups de Sucesso
            </h1>
            <p className="mb-8 text-lg md:text-xl opacity-90">
              A Incubadora 2IAD oferece infraestrutura, mentoria e networking para 
              empreendedores que desejam inovar e crescer.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="outline" className="bg-white text-primary-500 hover:bg-gray-100" asChild>
                <Link to="/editais">
                  Ver Editais Abertos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" className="text-white border-white hover:bg-white/10" asChild>
                <Link to="/sobre">Conheça a 2IAD</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <Building2 className="mx-auto mb-4 h-10 w-10 text-primary-500" />
              <div className="text-3xl font-bold text-gray-900">{startups.length}+</div>
              <div className="text-sm text-gray-600">Startups Incubadas</div>
            </div>
            <div className="text-center">
              <Users className="mx-auto mb-4 h-10 w-10 text-primary-500" />
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Empreendedores</div>
            </div>
            <div className="text-center">
              <Award className="mx-auto mb-4 h-10 w-10 text-primary-500" />
              <div className="text-3xl font-bold text-gray-900">{parceiros.length}+</div>
              <div className="text-sm text-gray-600">Parceiros</div>
            </div>
            <div className="text-center">
              <TrendingUp className="mx-auto mb-4 h-10 w-10 text-primary-500" />
              <div className="text-3xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600">Taxa de Sucesso</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Startups Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Startups Incubadas
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Conheça as empresas inovadoras que fazem parte do nosso ecossistema
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {startups.slice(0, 6).map((startup) => (
              <Card key={startup.id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 text-sm font-medium text-primary-500">
                    {startup.segment}
                  </div>
                  <CardTitle>{startup.name}</CardTitle>
                  <CardDescription>{startup.description}</CardDescription>
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
          
          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link to="/startups">Ver Todas as Startups</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Parceiros Section */}
      <section className="bg-gray-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Nossos Parceiros
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Empresas e instituições que apoiam o ecossistema de inovação
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
            {parceiros.slice(0, 8).map((parceiro) => (
              <div 
                key={parceiro.id}
                className="flex items-center justify-center rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{parceiro.name}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/parceiros">Ver Todos os Parceiros</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Infraestrutura Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Nossa Infraestrutura
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Ambiente completo para o desenvolvimento da sua startup
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Coworking</CardTitle>
                <CardDescription>
                  Espaço colaborativo com internet de alta velocidade e estrutura completa
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Salas de Reunião</CardTitle>
                <CardDescription>
                  Salas equipadas para reuniões, apresentações e workshops
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Mentoria</CardTitle>
                <CardDescription>
                  Acompanhamento com especialistas em negócios, tecnologia e mercado
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="hero-gradient py-16 text-white">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Pronto para Transformar sua Ideia?
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Entre em contato conosco e descubra como podemos ajudar sua startup a crescer
            </p>
            <Button size="lg" variant="outline" className="bg-white text-primary-500 hover:bg-gray-100" asChild>
              <Link to="/contato">
                Fale Conosco
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
